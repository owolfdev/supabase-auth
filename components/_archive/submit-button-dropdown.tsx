"use client";

import React, { useState } from "react";
import { useFormStatus } from "react-dom";
import { type ComponentProps } from "react";
import { createClient } from "@/utils/supabase/client";

type Props = ComponentProps<"button"> & {
  pendingText?: string;
  action2?: any;
};

export function SubmitButtonDropdown({
  children,
  pendingText,

  action2,
  ...props
}: Props) {
  const { pending, action } = useFormStatus();
  const [isOpen, setIsOpen] = useState(false); // State to control dropdown visibility

  const isPending = pending && action === props.formAction;

  const supabase = createClient();

  const toggleDropdown = (e: any) => {
    e.preventDefault(); // Prevents default form submission behavior
    e.stopPropagation(); // Stops the event from propagating further
    setIsOpen(!isOpen); // Toggles the dropdown visibility
    console.log("toggle dropdown");
  };

  const doIt = async (e: any) => {
    // e.preventDefault();
    console.log("do it");
    supabase.auth.signOut();
  };

  return (
    <div>
      <div>Pending: {JSON.stringify(isPending)}</div>
      <div>isOpen: {JSON.stringify(isOpen)}</div>
      <button onClick={toggleDropdown}>
        {/* {isOpen ? "Close" : "Open"} Dropdown */}
        {isPending ? pendingText : children}
      </button>
      {isOpen === true && (
        <div className="absolute bg-white border border-gray-200 mt-2 py-2 rounded-md shadow-md w-48">
          <form onSubmit={doIt}>
            <button
              //   {...props}
              type="submit"
              //   aria-disabled={pending}
              //   onClick={(e: any) => {
              //     //   e.preventDefault();
              //     setIsOpen(false);
              //   }}
            >
              Log Out
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

// "use client";

// import { useFormStatus } from "react-dom";
// import { type ComponentProps } from "react";

// type Props = ComponentProps<"button"> & {
//   pendingText?: string;
// };

// export function SubmitButtonDropdown({
//   children,
//   pendingText,
//   ...props
// }: Props) {
//   const { pending, action } = useFormStatus();

//   const isPending = pending && action === props.formAction;

//   return (
//     <div>
//       <div>Pending: {JSON.stringify(isPending)}</div>

//       <button {...props} type="submit" aria-disabled={pending}>
//         {isPending ? pendingText : children}
//       </button>
//     </div>
//   );
// }

// "use client";

// import { useFormStatus } from "react-dom";
// import { type ComponentProps } from "react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// type Props = ComponentProps<"button"> & {
//   pendingText?: string;
// };

// export function SubmitButtonDropdown({
//   children,
//   pendingText,
//   ...props
// }: Props) {
//   const { pending, action } = useFormStatus();

//   const isPending = pending && action === props.formAction;

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger>
//         <form action="">{isPending ? pendingText : children}</form>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent>
//         <DropdownMenuItem>
//           <form action="">
//             <button {...props} type="submit" aria-disabled={pending}>
//               {isPending ? pendingText : children}
//             </button>
//           </form>
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }
