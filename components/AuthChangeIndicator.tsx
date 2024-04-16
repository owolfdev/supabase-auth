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
  return (
    <div>
      <div>
        <Dialog>
          <DialogTrigger>
            {loggingOut ? "Logging Out..." : "Log Out"}
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Logging Out!</DialogTitle>
              {/* <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription> */}
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default AuthChangeIndicator;
