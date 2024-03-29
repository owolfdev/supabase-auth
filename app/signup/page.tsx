import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "@/components/submit-button";

export default function Signup({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm-password") as string;
    const supabase = createClient();

    if (password !== confirmPassword) {
      return redirect("/signup?message=Passwords do not match");
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect("/signup?message=Error signing up user");
    }

    return redirect(
      "/signup/thank-you?message=Check your email inbox to confirm sign up."
    );
  };

  return (
    <div className="flex-1 flex flex-col justify-center w-full px-8 sm:max-w-md gap-2 py-24">
      <h1 className="font-bold text-4xl pb-4">Sign Up</h1>
      <form className="flex-1 flex flex-col w-full  gap-2 text-foreground">
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
        />
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="confirm-password"
          placeholder="••••••••"
          required
        />

        <SubmitButton
          formAction={signUp}
          className="bg-yellow-400 rounded-md px-4 py-2 text-foreground mb-2"
          pendingText="Signing Up..."
        >
          Sign Up
        </SubmitButton>
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center bg-gray-200 rounded-md">
            {searchParams.message}
          </p>
        )}
        <div className="text-center">
          <Link href="/login">Already have an account? Sign in.</Link>
        </div>
      </form>
    </div>
  );
}
