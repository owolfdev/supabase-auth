"use client";
import React, { useState, useEffect } from "react";

function AuthTest() {
  const [loggingOut, setLoggingOut] = useState(false);
  const handleClick = () => {
    console.log("Logging out...");
    // alert("Logging out...");
    setLoggingOut(true);
  };
  return (
    <div>
      <div onClick={handleClick}>
        {loggingOut ? "Logging Out..." : "Log Out"}
      </div>
    </div>
  );
}

export default AuthTest;
