import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { SubmitButton } from "@/components/submit-button";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Divide } from "lucide-react";

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select()
    .eq("id", user?.id)
    .single();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  const userEmail = user?.email;

  return user ? (
    <div className="">
      <DropdownMenu>
        <DropdownMenuTrigger>
          {profile?.avatar_url ? (
            <Image
              alt="avatar"
              src={profile.avatar_url}
              width={40}
              height={40}
              className="rounded-full mt-2"
            />
          ) : (
            <div className="bg-yellow-400 rounded-full h-10 w-10 text-foreground mt-2 flex items-center text-center">
              <div className="w-full text-2xl capitalize">
                {(userEmail && userEmail[0]) || ""}
              </div>
            </div>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            {/* <form action={navigate}>
              <button type="submit">Profile</button>
            </form> */}
            <Link href="/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            {/* <Link href="/logout">Log Out</Link> */}
            <form>
              <button title="log out" formAction={signOut}>
                Log Out
              </button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ) : (
    <div className="">
      <Link href="/login">
        <SubmitButton className="bg-yellow-400 rounded-md px-4 py-2 text-foreground">
          Log In
        </SubmitButton>
      </Link>
    </div>
  );
}
