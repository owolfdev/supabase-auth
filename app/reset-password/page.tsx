import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "@/components/submit-button";
import { buttonVariants } from "@/components/ui/button";

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
      redirect(
        "/reset-password?message=Unable to send password reset link email. Please try again."
      );
      return {
        status: "error",
        message: "Could not send password reset email. Please try again later.",
      };
    }

    redirect(
      "/reset-password/thank-you?message=Password reset email sent. Please check your inbox to continue the reset process."
    );

    return {
      status: "success",
      message: "Password reset email sent. Please check your inbox.",
    };
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 py-24">
      <h1 className="font-bold text-4xl pb-4">Reset Password</h1>
      <form className="animate-in flex-1 flex flex-col w-full  gap-2 text-foreground">
        <label className="text-md" htmlFor="email">
          Add your account email to reset your password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
        />

        <SubmitButton
          formAction={resetPassword}
          className="bg-yellow-400 rounded-md px-4 py-2 text-foreground mb-2"
          pendingText="Sending Reset Link..."
        >
          Reset Password
        </SubmitButton>

        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center bg-gray-200 rounded-md">
            {searchParams.message}
          </p>
        )}
        <div className="text-center">
          <Link
            className={buttonVariants({ variant: "outline", size: "lg" })}
            href="/login"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
