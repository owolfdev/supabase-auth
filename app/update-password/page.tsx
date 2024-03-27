import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";

export default async function UpdateUser({
  searchParams,
}: {
  searchParams: { code: string; message: string };
}) {
  console.log("code: ", searchParams.code);

  // async function exchangeCodeForSession() {
  //   const supabase = createClient();
  //   const { data, error } = await supabase.auth.exchangeCodeForSession(
  //     searchParams.code
  //   );
  //   if (error) {
  //     console.error(error);
  //   } else {
  //     console.log("succes! session:", data);
  //     console.log("session.access_token: ", data.session.access_token);
  //     console.log("session.refresh_token: ", data.session.refresh_token);

  //     const access_token = data.session.access_token;
  //     const refresh_token = data.session.refresh_token;

  //     await supabase.auth.setSession({
  //       refresh_token: refresh_token,
  //       access_token: access_token,
  //     });
  //     //
  //     const mySession = await supabase.auth.getSession();
  //     console.log("mySession: ", mySession);
  //   }
  // }

  // exchangeCodeForSession();

  const changePassword = async (formData: FormData) => {
    "use server";
    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const new_password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm-password") as string;
    const supabase = createClient();

    const sessionData = await supabase.auth.getSession();

    if (!sessionData) {
      // return redirect("/login?message=You need to log in first");
      // console.log("You need to log in first");
    } else {
      // console.log("sessionData: ", sessionData);
    }

    if (new_password !== confirmPassword) {
      return redirect("/update-password?message=Passwords do not match");
    }

    const { data, error } = await supabase.auth.updateUser({
      // email: email,
      password: new_password,
    });

    if (error) {
      console.error("Error changing password:", error.message);
      return {
        status: "error",
        message: "Could not change your password.",
      };
    }

    redirect("/login?message=Password Changed. Please log in.");

    return {
      status: "success",
      message: "Password Changed. Please log in.",
    };
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      {/* <div>{sessionData?.user?.email}</div> */}

      <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
        <label className="text-md" htmlFor="password">
          New Password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <label className="text-md" htmlFor="confirm-password">
          Confirm New Password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="confirm-password"
          placeholder="••••••••"
          required
        />
        <SubmitButton
          formAction={changePassword}
          className="bg-yellow-400 rounded-md px-4 py-2 text-foreground mb-2"
          pendingText="Changing Password..."
        >
          Change Password
        </SubmitButton>
        {/* <SubmitButton
          formAction={signUp}
          className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
          pendingText="Signing Up..."
        >
          Sign Up
        </SubmitButton> */}
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
        <div className="text-center">
          <Link href="/login">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
