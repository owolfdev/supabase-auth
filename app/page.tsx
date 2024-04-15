import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "@/components/submit-button";
import Image from "next/image";
import Link from "next/link";

export default async function Index() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select()
    .eq("id", user?.id)
    .single();

  if (!user) {
    redirect("/login");
  }

  const goToProfilePage = async () => {
    "use server";
    return redirect(`/profile`);
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-lg gap-2 pt-24">
      <h1 className="font-bold text-4xl pb-4 text-center">
        Supabase Auth Template
      </h1>
      <div className="flex-1 w-full flex flex-col gap-10 items-center">
        <div className="flex flex-col gap-4 items-center">
          <p className="text-lg">Hello {profile?.name || user?.email}!</p>
          {profile?.avatar_url && (
            <Image
              src={profile?.avatar_url}
              width={300}
              height={300}
              alt="avatar image"
            />
          )}
          <p>You are logged in.</p>
        </div>
        <div>
          {/* <form action="">
            <SubmitButton
              formAction={goToProfilePage}
              className="bg-yellow-400 rounded-md px-4 py-2 text-foreground mb-2 text-lg"
              pendingText="Check Out Profile Page..."
            >
              Check Out Profile Page.
            </SubmitButton>
          </form> */}
          <Link
            className="bg-yellow-400 rounded-md px-4 py-2 text-foreground mb-2 text-lg"
            href="/profile"
          >
            Check Out Profile Page
          </Link>
        </div>
      </div>
    </div>
  );
}
