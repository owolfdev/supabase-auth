import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
// import { SubmitButton } from "./submit-button";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const resetPassword = async (formData: FormData) => {
    "use server";
    const email = formData.get("email") as string;
    const supabase = createClient();
    const origin = headers().get("origin");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${origin}/auth/callback`,
    });

    if (error) {
      console.error("Error sending password reset email:", error.message);
      return {
        status: "error",
        message: "Could not send password reset email. Please try again later.",
      };
    }

    redirect("/reset-password?message=Password reset email sent.");

    return {
      status: "success",
      message: "Password reset email sent. Please check your inbox.",
    };
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      {searchParams?.message && (
        <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
          {searchParams.message}
        </p>
      )}
      {/* <div className="text-center">
          <Link href="/login">Cancel</Link>
        </div> */}
      {/* </form> */}
    </div>
  );
}
