"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function AuthChangeIndicator() {
  const [loggingOut, setLoggingOut] = useState(false);
  const handleClick = () => {
    console.log("Logging out...");
    // alert("Logging out...");
    setLoggingOut(true);
  };
  return <div>Log Out</div>;
}

export default AuthChangeIndicator;
