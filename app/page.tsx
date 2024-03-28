import DeployButton from "../components/DeployButton";
import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import ConnectSupabaseSteps from "@/components/tutorial/ConnectSupabaseSteps";
import SignUpUserSteps from "@/components/tutorial/SignUpUserSteps";
import Header from "@/components/Header";
import { redirect } from "next/navigation";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { revalidatePath } from "next/cache";

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

  // if (profileError) {
  //   // Handle error, for example, render a message indicating profile loading failed
  //   return <div className="h-full">Error loading profile.</div>;
  // }

  if (!user) {
    redirect("/login");
  }

  if (!profile.active) {
    console.log("User is disabled");
    redirect(
      "/profile/disabled?message=Your account has been disabled. Please contact support."
    );
  }

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-lg gap-2 py-24">
      <h1 className="font-bold text-4xl pb-4 text-center">
        Supabase Auth Template
      </h1>
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <div className="flex flex-col gap-4 items-center">
          <p className="text-lg">Hello {profile?.name || user?.email}!</p>{" "}
          <p>You are logged in.</p>
        </div>
        <div>
          <Link
            className={buttonVariants({ variant: "default", size: "lg" })}
            href="/profile"
          >
            <span className="text-lg">Check out your profile page.</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
