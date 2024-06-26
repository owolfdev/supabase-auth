import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "@/components/submit-button";
import { headers } from "next/headers";
import Link from "next/link";
import { createAdminServiceRoleClient } from "@/utils/supabase/service-role";

import AvatarUploader from "./avatar";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: { message: string; userId: string };
}) {
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

  const updateUserName = async (formData: FormData) => {
    "use server";
    const username = formData.get("username") as string;
    const supabase = createClient();
    const origin = headers().get("origin");

    const { error } = await supabase
      .from("profiles")
      .update({
        name: username,
      })
      .eq("id", user.id);

    if (error) {
      console.error("Error sending password reset email:", error.message);
      return {
        status: "error",
        message: "Could not update user.",
      };
    }

    redirect(`/profile?message=Your user name has been updated ${username}`);

    return {
      status: "success",
      message: "Password reset email sent. Please check your inbox.",
    };
  };

  const deleteUserAccount = async (formData: FormData) => {
    "use server";

    console.log("delete user account");

    const deleteInput = formData.get("delete") as string;

    const supabaseServiceRollClient = createAdminServiceRoleClient();

    const {
      data: { session },
    } = await supabaseServiceRollClient.auth.getSession();

    console.log("delete input", deleteInput);

    const { error } = await supabaseServiceRollClient.auth.admin.deleteUser(
      searchParams.userId
    );

    redirect(`/login?message=Congratulations. Your account has been deleted.`);

    return {
      status: "success",
      message: "Account deleted.",
    };
  };

  const signOut = async (formData: FormData) => {
    "use server";
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error.message);
      return {
        status: "error",
        message: "Could not log out.",
      };
    }

    redirect("/login");

    return {
      status: "success",
      message: "Logged out.",
    };
  };

  const noAction = async (formData: FormData) => {
    "use server";
    console.log("no action");
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-lg gap-8 py-10 sm:py-24">
      <h1 className="font-bold text-4xl pb-4">Profile Page</h1>
      <div>
        {/* avatar */}
        <AvatarUploader />
      </div>
      {/* info */}
      <div>
        <div>
          <span className="font-bold">User name:</span>{" "}
          {profile?.name || "no name given"}
        </div>
        <div>
          <span className="font-bold">User email:</span> {user.email}
        </div>
        <div>
          <span className="font-bold">User id:</span> {user.id}
        </div>
      </div>

      {/* update user name */}
      <form className="animate-in flex-1 flex flex-col w-full gap-2 text-foreground pb-4">
        <label className="text-md" htmlFor="email">
          Update your user name.
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border"
          name="username"
          placeholder="New user name"
          required
        />
        <SubmitButton
          formAction={updateUserName}
          className="bg-yellow-400 rounded-md px-4 py-2 text-foreground "
          pendingText="Updating User Name..."
        >
          Update User Name
        </SubmitButton>

        {searchParams?.message && (
          <p className=" p-4 bg-foreground/10 text-foreground text-center bg-gray-200 rounded-md">
            {searchParams.message}
          </p>
        )}
      </form>

      <div className="">
        <Link
          className="bg-yellow-400 rounded-md px-4 py-2 text-foreground"
          href="/update-password"
        >
          Reset your account password.
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        {/* log out */}
        <form action={noAction}>
          {" "}
          <Dialog>
            <DialogTrigger asChild>
              <div>
                <Button variant="outline" formAction={noAction}>
                  Log Out
                </Button>
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-w-[360px] rounded-lg">
              <DialogHeader>
                <DialogTitle>Log Out?</DialogTitle>
                <DialogDescription>
                  Are you sure you want to log out?
                </DialogDescription>
              </DialogHeader>

              <DialogFooter>
                <div className="flex gap-4 items-center">
                  <Button formAction={noAction} variant="outline">
                    <DialogClose>Cancel</DialogClose>
                  </Button>

                  <form action={signOut}>
                    <DialogClose>
                      <Button formAction={signOut}>Log Out</Button>
                    </DialogClose>
                  </form>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </form>
        {/* delete user account */}
        <form action={noAction}>
          {" "}
          <Dialog>
            <DialogTrigger asChild>
              <div>
                <Button formAction={noAction} variant="outline">
                  Delete User Account
                </Button>
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-w-[360px] rounded-lg">
              <DialogHeader>
                <DialogTitle>Delete User Account?</DialogTitle>
                <DialogDescription>
                  <span className="font-bold">Wait!</span> Are you sure you want
                  to delete your account? This action is irreversible.
                </DialogDescription>
              </DialogHeader>

              <DialogFooter>
                <div className="flex gap-4 items-center">
                  <Button formAction={noAction} variant="outline">
                    <DialogClose>Cancel</DialogClose>
                  </Button>

                  <form action={deleteUserAccount}>
                    <DialogClose>
                      <Button
                        formAction={deleteUserAccount}
                        variant="destructive"
                      >
                        Delete This Account
                      </Button>
                    </DialogClose>
                  </form>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </form>
      </div>
    </div>
  );
}
