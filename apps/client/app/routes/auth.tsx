import type { Route } from "./+types/auth";
import { useState } from "react";
import Login from "~/components/signin";
import Register from "~/components/signup";

export function meta({}: Route.MetaArgs) {
  return [{ title: "WeFoundIt" }, { name: "description", content: "" }];
}

export default function Auth() {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <>
      <div className="relative min-h-screen bg-[#e1e1e1] dark:bg-[#1C1F23] transition-all duration-500 overflow-hidden">
        {/* Login Panel */}
        <div
          className={`absolute top-0 left-0 h-full transition-all duration-500 ease-in-out
          ${
            showRegister
              ? "translate-x-[-80%] md:translate-x-[-60%]"
              : "translate-x-0"
          }
          w-[100vw] md:w-[60vw] z-20`}
          style={{ maxWidth: showRegister ? "40vw" : "100vw" }}
        >
          <Login
            onSwitchToRegister={() => setShowRegister(true)}
            isStacked={!showRegister}
          />
        </div>
        {/* Register Panel */}
        <div
          className={`absolute top-0 right-0 h-full transition-all duration-500 ease-in-out
          ${
            showRegister
              ? "translate-x-0"
              : "translate-x-[80%] md:translate-x-[60%] opacity-0 md:opacity-100"
          }
          w-[100vw] md:w-[85vw] z-30`}
          style={{ maxWidth: showRegister ? "100vw" : "40vw" }}
        >
          <Register
            onSwitchToLogin={() => setShowRegister(false)}
            isStacked={showRegister}
          />
        </div>
      </div>
      <button
        onClick={() => setShowRegister(false)}
        className="absolute left-10 top-10 z-50 cursor-pointer"
      >
        <p className="text-3xl font-bold">Sign In</p>
      </button>
      <button
        onClick={() => setShowRegister(true)}
        className="absolute right-10 top-10 z-50 cursor-pointer"
      >
        <p className="text-3xl font-bold">Sign Up</p>
      </button>
    </>
  );
}
