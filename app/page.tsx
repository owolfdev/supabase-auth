import DeployButton from "../components/DeployButton";
import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";

import Header from "@/components/Header";
import { redirect } from "next/navigation";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { revalidatePath } from "next/cache";
import { SubmitButton } from "@/components/submit-button";
import Loading from "@/app/loading";

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

  // if (profile && !profile.active) {
  //   redirect(
  //     "/login?message=Your account has been disabled. Please contact support."
  //   );
  // }

  const test = async () => {
    "use server";
    console.log("test");
    return redirect(`/profile?userId=` + user?.id);
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-lg gap-2 py-24">
      {/* <Loading /> */}
      <h1 className="font-bold text-4xl pb-4 text-center">
        Supabase Auth Template
      </h1>
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <div className="flex flex-col gap-4 items-center">
          <p className="text-lg">Hello {profile?.name || user?.email}!</p>{" "}
          <p>You are logged in.</p>
        </div>
        <div>
          <form action="">
            <SubmitButton
              formAction={test}
              className="bg-yellow-400 rounded-md px-4 py-2 text-foreground mb-2 text-lg"
              pendingText="Check Out Profile Page..."
            >
              Check Out Profile Page.
            </SubmitButton>
          </form>
        </div>
      </div>
    </div>
  );
}
