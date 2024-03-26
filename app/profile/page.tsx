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
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="animate-in flex-1 flex flex-col gap-8 opacity-0 max-w-4xl px-3">
        <h1 className="text-4xl font-bold">Profile Page</h1>
        <div>Hey, {user.email}!</div>
        <div>User id: {user.id}</div>
        <div>Name: {profile.name || "no name assigned"}</div>
        <div>Phone: {profile.phone || "no phone assigned"}</div>
        <div>
          Description: {profile.description || "no description assigned"}
        </div>
        <div>Subscription: {profile.subscription || "basic"}</div>
        <div>Website: {profile.website || "no website assigned"}</div>
        <div>
          Website Description:{" "}
          {profile.website_description || "no website description assigned"}
        </div>
        <div>Location: {profile.location || "no location assigned"}</div>
        <div className="text-gray-400">Profile: {JSON.stringify(profile)}</div>
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Powered by{" "}
          <a
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Supabase
          </a>
        </p>
      </footer>
    </div>
  );
}
