// import AuthButton from "./AuthButton";
import AuthComponent from "./AuthComponent";
import Link from "next/link";
import { SubmitButtonTest } from "@/components/_archive/submit-button-test";
import { logOutFromSupabase } from "@/actions/actions";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

type NavBarProps = {
  className?: string; // Make className an optional prop
};

const NavBar: React.FC<NavBarProps> = ({ className }) => {
  //signOut function
  const signOut = async (): Promise<void> => {
    "use server";

    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error.message);
      return;
    }

    return redirect("/login");
  };

  return (
    <nav className="flex items-center border-b justify-between px-8 py-4 w-full">
      <div className="font-bold text-3xl">
        <Link className="" href="/">
          Supabase Auth
        </Link>
      </div>
      <div className="flex gap-4 items-center">
        <Link
          className="bg-yellow-400 rounded-md px-4 py-2 text-foreground  "
          href="https://github.com/owolfdev/supabase-auth"
          target="_blank"
        >
          Github Repo
        </Link>
        {/* <form>
          <SubmitButtonTest
            formAction={signOut}
            className="bg-yellow-400 rounded-md px-4 py-2 text-foreground mt-2"
            pendingText="Logging Out..."
          >
            Log Out
          </SubmitButtonTest>
        </form> */}
        <AuthComponent />
      </div>
    </nav>
  );
};

export default NavBar;
