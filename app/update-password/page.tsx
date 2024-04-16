import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "@/components/submit-button";
import { buttonVariants } from "@/components/ui/button";

export default async function UpdateUser({
  searchParams,
}: {
  searchParams: { code: string; message: string };
}) {
  const supabase = createClient();
  const sessionData = await supabase.auth.getSession();

  console.log("sessionData: ", sessionData);

  if (sessionData.data.session === null) {
    return redirect("/login?message=You need to log in first");
  } else {
    // console.log("sessionData: ", sessionData);
  }

  const changePassword = async (formData: FormData) => {
    "use server";
    console.log("changePassword!");
    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const new_password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm-password") as string;
    const supabase = createClient();

    const sessionData = await supabase.auth.getSession();

    console.log("sessionData: ", sessionData);

    if (!sessionData) {
      console.log("You need to log in first");
      // return redirect("/login?message=You need to log in first");
    } else {
      // console.log("sessionData: ", sessionData);
    }

    if (new_password !== confirmPassword) {
      return redirect("/update-password?message=Passwords do not match.");
    }

    const { data, error } = await supabase.auth.updateUser({
      // email: email,
      password: new_password,
    });

    console.log("data: ", data);

    if (error) {
      console.error("Error changing password:", error.message);
      redirect("/update-password?message=" + error.message);
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
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center bg-gray-200 rounded-md">
            {searchParams.message}
          </p>
        )}
        <div className="text-center pt-4">
          <Link
            className={buttonVariants({ variant: "outline", size: "lg" })}
            href="/profile"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
