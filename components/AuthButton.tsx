import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { SubmitButton } from "@/components/submit-button";

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return user ? (
    <div className="">
      <form action={signOut}>
        <SubmitButton
          formAction={signOut}
          className="bg-yellow-400 rounded-md px-4 py-2 text-foreground"
          pendingText="Logging Out..."
        >
          Log out
        </SubmitButton>
      </form>
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
