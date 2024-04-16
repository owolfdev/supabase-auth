import React from "react";
import { SubmitButtonDropdown } from "./submit-button-dropdown";
import test from "node:test";
import { logOutFromSupabase } from "@/actions/actions";
import { revalidatePath } from "next/cache";

function AuthLogoutComponent() {
  const testAction = async (formData: FormData) => {
    "use server";
    console.log("testAction");
    await logOutFromSupabase();
    // revalidatePath("/");
  };
  return (
    <div>
      <form action="">
        <SubmitButtonDropdown
          formAction={testAction}
          className="bg-yellow-400 rounded-md px-4 py-2 text-foreground "
          pendingText="Logging Out..."
          action2={logOutFromSupabase}
        >
          Log Out Test
        </SubmitButtonDropdown>
      </form>
    </div>
  );
}

export default AuthLogoutComponent;
