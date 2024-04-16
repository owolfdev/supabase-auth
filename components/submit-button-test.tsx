"use client";

import { useFormStatus } from "react-dom";
import { use, type ComponentProps } from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

type Props = ComponentProps<"button"> & {
  pendingText?: string;
};

export function SubmitButtonTest({ children, pendingText, ...props }: Props) {
  const { pending, action } = useFormStatus();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // console.log("pending:", pending);
    // console.log("action:", action);
    // console.log("props.formAction:", props.formAction);
    // console.log("props:", props);
    // console.log("pendingText:", pendingText);
    // console.log("children:", children);
  }, [pending, children, pendingText, props.formAction, props]);

  const isPending = pending && action === props.formAction;

  const handleClick = async () => {
    if (isPending) {
      return;
    }
    // setIsOpen(false);
  };

  return (
    <div>
      <div onClick={() => setIsOpen(!isOpen)}>
        {isPending ? (
          "pending"
        ) : (
          <Image
            alt="/"
            src="/avatar.png"
            height={40}
            width={40}
            className="rounded-full"
          />
        )}
      </div>
      {isOpen && (
        <div>
          <div
            onClick={(e: any) => {
              setIsOpen(false);
            }}
          >
            <Link href="/">Home</Link>
          </div>
          <div
            onClick={(e: any) => {
              setIsOpen(false);
            }}
          >
            <Link href="/profile">Profile</Link>
          </div>
          <button {...props} type="submit" aria-disabled={pending}>
            <div
              onClick={(e: any) => {
                setTimeout(() => {
                  setIsOpen(false);
                  e.preventDefault();
                }, 1000); // Delay the state update slightly
              }}
            >
              {isPending ? pendingText : children}
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
