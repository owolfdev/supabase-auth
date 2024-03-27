import DeployButton from "@/components/DeployButton";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import FetchDataSteps from "@/components/tutorial/FetchDataSteps";
import Header from "@/components/Header";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
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
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-lg gap-2 py-24">
      <h1 className="font-bold text-4xl pb-4">Profile Page</h1>
      <div>Hey, {user.email}!</div>
      <div>User id: {user.id}</div>
      <div>Profile id: {profile?.name || "no name given"}</div>
    </div>
  );
}
