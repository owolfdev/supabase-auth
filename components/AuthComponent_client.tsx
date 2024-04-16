"use client";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
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
import AuthButton from "./AuthButton_bak";
import { useState, useEffect } from "react";
import { get } from "http";

export default function AuthComponentClient() {
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<any>(null); // Specify a more precise type if possible
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [logoutMessage, setLogoutMessage] = useState<string>("logged in");
  const [supabaseClient, setSupabaseClient] = useState<any | null>(null);

  const router = useRouter();

  const getAuthUser = async () => {
    const supabase = createClient();

    const { data: authResponse } = await supabase.auth.getUser();

    //   console.log("auth response.user", authResponse.user); // Destructure to get user directly
    const userData: any | null = authResponse.user;

    setUser(userData); // Set user data directly without an extra object

    if (userData) {
      const { data: profileData } = await supabase
        .from("profiles")
        .select()
        .eq("id", userData.id)
        .single();
      setProfile(profileData);

      setUserEmail(userData.email);
    }

    //   supabase.auth.onAuthStateChange((event, session) => {
    //     console.log("event", event);
    //   });
  };

  useEffect(() => {
    getAuthUser();
  }, []);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        console.log("signed in");
        getAuthUser();
      }
      if (event === "SIGNED_OUT") console.log("signed out");
    });
  }, [supabaseClient]);

  const supabase = createClient();

  const signOut = async (): Promise<void> => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error.message);
      setLogoutMessage("Error logging out");
      return;
    }

    setLogoutMessage("logged out");

    getAuthUser();

    router.push("/login");
  };

  return user ? (
    <div className="">
      {logoutMessage && <div>{logoutMessage}</div>}
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
          <Link href="/">
            <DropdownMenuItem>Home</DropdownMenuItem>
          </Link>
          <Link href="/profile">
            <DropdownMenuItem>Profile</DropdownMenuItem>
          </Link>
          <DropdownMenuItem>
            <button title="log out" onClick={signOut}>
              Log Out
            </button>
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
