"use client";

import { useFormStatus } from "react-dom";
import { use, type ComponentProps } from "react";
import { useState, useEffect } from "react";

type Props = ComponentProps<"button"> & {
  pendingText?: string;
};

export function SubmitButton({ children, pendingText, ...props }: Props) {
  const { pending, action } = useFormStatus();

  // useEffect(() => {
  //   console.log("pending", pending);
  //   console.log("action", action);
  //   console.log("props.formAction", props.formAction);
  //   console.log("props", props);
  //   console.log("children", children);
  //   console.log("pendingText", pendingText);
  //   console.log("pendingText", pendingText);
  //   console.log("children", children);
  // }, [pending, children, pendingText, props.formAction, props]);

  const isPending = pending && action === props.formAction;

  return (
    <div>
      <button {...props} type="submit" aria-disabled={pending}>
        {isPending ? pendingText : children}
      </button>
    </div>
  );
}
