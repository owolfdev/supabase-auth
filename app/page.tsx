import DeployButton from "../components/DeployButton";
import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import ConnectSupabaseSteps from "@/components/tutorial/ConnectSupabaseSteps";
import SignUpUserSteps from "@/components/tutorial/SignUpUserSteps";
import Header from "@/components/Header";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Index() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select()
    .eq("id", user?.id)
    .single();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="flex-1 flex flex-col justify-center w-full px-8 sm:max-w-lg gap-2 py-24">
      <h1 className="font-bold text-4xl pb-4 text-center">
        Supabase Auth Template
      </h1>
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        Hi {profile?.name || user?.email}
        <div>
          <Link href="/profile">Check out your profile page.</Link>
        </div>
      </div>
    </div>
  );
}
