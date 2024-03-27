// "use client";

import AuthButton from "./AuthButton";
import Link from "next/link";

type NavBarProps = {
  className?: string; // Make className an optional prop
};

const NavBar: React.FC<NavBarProps> = ({ className }) => {
  return (
    <nav className="flex items-center border-b justify-between px-8 py-4 w-full">
      <div className="text-bold text-xl">
        <Link href="/">Supabase Auth</Link>
      </div>
      <AuthButton />
    </nav>
  );
};

export default NavBar;
