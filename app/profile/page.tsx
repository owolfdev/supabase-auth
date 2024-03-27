import DeployButton from "@/components/DeployButton";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import FetchDataSteps from "@/components/tutorial/FetchDataSteps";
import Header from "@/components/Header";
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "./submit-button";
import { headers } from "next/headers";
import Link from "next/link";

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

import { Label } from "@/components/ui/label";

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: { message: string };
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

    redirect(`/profile?message=Thank You ${username}.`);

    return {
      status: "success",
      message: "Password reset email sent. Please check your inbox.",
    };
  };

  const deleteUserAccount = async (formData: FormData) => {
    "use server";
    console.log("delete user account");
  };

  const noAction = async (formData: FormData) => {
    "use server";
    console.log("no action");
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-lg gap-2 py-24">
      <h1 className="font-bold text-4xl pb-4">Profile Page</h1>
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

      <form className="animate-in flex-1 flex flex-col w-full gap-2 text-foreground pt-8">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
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
              className="bg-yellow-400 rounded-md px-4 py-2 text-foreground mt-2"
              pendingText="Sending Reset Link..."
            >
              Update User Name
            </SubmitButton>
          </div>

          {searchParams?.message && (
            <p className=" p-4 bg-foreground/10 text-foreground text-center bg-gray-200 rounded-md">
              {searchParams.message}
            </p>
          )}

          <div className="">
            <Link href="/reset-password">Reset your account password.</Link>
          </div>
          <div></div>
        </div>
      </form>
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
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Delete User Account?</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete your account? This action is
                irreversible.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <form action={deleteUserAccount}>
                <div className="flex gap-4 items-center">
                  <Button formAction={noAction} variant="outline">
                    <DialogClose>Cancel</DialogClose>
                  </Button>
                  <DialogClose>
                    <Button
                      formAction={deleteUserAccount}
                      variant="destructive"
                    >
                      Delete This Account
                    </Button>
                  </DialogClose>
                </div>
              </form>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </form>
    </div>
  );
}
