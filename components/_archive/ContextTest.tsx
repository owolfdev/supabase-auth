"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the type for the context state
type ContextType = {
  sharedState: string;
  setSharedState: (newState: string) => void;
};

// Create a Context with an initial undefined type which will be set explicitly
const MyContext = createContext<ContextType | undefined>(undefined);

// Context Provider Client Component
interface MyProviderProps {
  children: ReactNode; // Typing children prop to accept React node elements
}

export function MyProvider({ children }: MyProviderProps) {
  const [sharedState, setSharedState] = useState<string>("Initial State");

  return (
    <MyContext.Provider value={{ sharedState, setSharedState }}>
      {children}
    </MyContext.Provider>
  );
}

// Button component that updates the context state
export function StateChangerButton() {
  const context = useContext(MyContext);

  // Guard to ensure context is not undefined
  if (!context) {
    throw new Error("StateChangerButton must be used within a MyProvider");
  }

  const { setSharedState } = context;

  return (
    <button onClick={() => setSharedState("State Updated by Button")}>
      Update State
    </button>
  );
}

// Component that displays the current state from the context
export function StateDisplayDiv() {
  const context = useContext(MyContext);

  // Guard to ensure context is not undefined
  if (!context) {
    throw new Error("StateDisplayDiv must be used within a MyProvider");
  }

  const { sharedState } = context;

  return <div>Current State: {sharedState}</div>;
}

// App component to show usage
export function StateChangeButton() {
  return (
    <MyProvider>
      <StateChangerButton />
    </MyProvider>
  );
}

export function StateDisplay() {
  return (
    <MyProvider>
      <StateDisplayDiv />
      <StateChangerButton />
    </MyProvider>
  );
}
