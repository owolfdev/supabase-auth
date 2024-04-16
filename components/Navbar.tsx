// import AuthButton from "./AuthButton";
import AuthComponent from "./AuthComponent";
import AuthComponentClient from "./_archive/AuthComponent_client";
import AuthLogoutComponent from "./_archive/AuthLogoutComponent";
import Link from "next/link";

type NavBarProps = {
  className?: string; // Make className an optional prop
};

const NavBar: React.FC<NavBarProps> = ({ className }) => {
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
        {/* <AuthComponentClient /> */}
        <AuthComponent />
      </div>
    </nav>
  );
};

export default NavBar;
