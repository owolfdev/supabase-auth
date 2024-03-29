import { revalidatePath } from "next/cache";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/components/submit-button";

export default async function Disabled({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("User:", user?.email);

  //   if (user) {
  //     await supabase.auth.signOut();
  //     console.log("User signed out");
  //     revalidatePath("/profile/disabled");
  //   }

  const signOutUser = async () => {
    "use server";

    const supabase = createClient();

    await supabase.auth.signOut();
    revalidatePath("/profile/disabled");

    redirect(
      `/login?message=Your account has been disabled. Please contact support.`
    );

    return {
      status: "success",
      message: "Account disabled.",
    };
  };

  const reEnableAccount = async () => {
    "use server";

    const supabase = createClient();
    // const origin = headers().get("origin");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase
      .from("profiles")
      .update({
        active: true,
      })
      .eq("id", user?.id);

    if (error) {
      console.error("Error enabling account:", error.message);
      return {
        status: "error",
        message: "Could not enable user.",
      };
    }

    redirect(`/profile?message=Your account has been reenabled.`);

    return {
      status: "success",
      message: "Account re-enabled.",
    };
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 py-24">
      <h1 className="font-bold text-4xl pb-4">Account Disabled</h1>
      <div className="flex-1 flex flex-col w-full items-center gap-6 text-foreground">
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center bg-gray-200 rounded-md">
            {searchParams.message}
          </p>
        )}
        <form className="flex flex-col gap-4">
          <Button
            className="text-lg"
            size="lg"
            type="submit"
            formAction={signOutUser}
          >
            Return to Login page.
          </Button>
          <SubmitButton
            formAction={reEnableAccount}
            className="bg-yellow-400 rounded-md px-4 py-2 text-foreground mb-2"
            pendingText="Reenableing account..."
          >
            Reenable Account
          </SubmitButton>
        </form>
      </div>
    </div>
  );
}
