// src/app/auth/signin/page.tsx
"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCredentialsSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn("credentials", { email, password, callbackUrl: "/" });
  };

  const socialSignIn = (provider: string) => {
    signIn(provider, { callbackUrl: "/" });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-zinc-100 p-4">
      <div className="w-full max-w-sm space-y-8 bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800 backdrop-blur-sm">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Agent OS</h1>
          <p className="text-zinc-400">Welcome to the Council Room</p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <button 
            onClick={() => socialSignIn("google")}
            className="flex items-center justify-center p-3 rounded-xl border border-zinc-800 hover:bg-zinc-800 transition-colors"
            title="Sign in with Google"
          >
            <span className="text-sm font-medium">Google</span>
          </button>
          <button 
            onClick={() => socialSignIn("apple")}
            className="flex items-center justify-center p-3 rounded-xl border border-zinc-800 hover:bg-zinc-800 transition-colors"
            title="Sign in with Apple"
          >
            <span className="text-sm font-medium">Apple</span>
          </button>
          <button 
            onClick={() => socialSignIn("facebook")}
            className="flex items-center justify-center p-3 rounded-xl border border-zinc-800 hover:bg-zinc-800 transition-colors"
            title="Sign in with Facebook"
          >
            <span className="text-sm font-medium">FB</span>
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-zinc-800"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-zinc-900 px-2 text-zinc-500">Or continue with email</span>
          </div>
        </div>

        <form onSubmit={handleCredentialsSignIn} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-xl bg-zinc-950 border border-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              placeholder="name@company.com"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-xl bg-zinc-950 border border-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all shadow-lg shadow-blue-900/20"
          >
            Enter the OS
          </button>
        </form>

        <p className="text-center text-xs text-zinc-500">
          By signing in, you agree to the Council's Terms of Service.
        </p>
      </div>
    </div>
  );
}
