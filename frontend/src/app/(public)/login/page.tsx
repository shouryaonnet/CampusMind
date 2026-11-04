"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import AuthShell from "@/components/auth/AuthShell";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthShell
      title="Welcome back"
      description="Sign in to access your personal academic workspace."
      footerText="Don't have an account?"
      footerLink="Create an account"
      footerHref="/register"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert("Login UI is ready. Backend authentication will be connected later.");
        }}
        className="space-y-5"
      >
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Email address
          </label>

          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3.5 transition focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-50">
            <Mail size={17} className="shrink-0 text-slate-400" />
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              className="h-12 w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
            />
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-sm font-medium text-slate-700"
            >
              Password
            </label>

            <Link
              href="/forgot-password"
              className="text-xs font-medium text-indigo-600 transition hover:text-indigo-700"
            >
              Forgot password?
            </Link>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3.5 transition focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-50">
            <LockKeyhole size={17} className="shrink-0 text-slate-400" />
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              placeholder="Enter your password"
              className="h-12 w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="shrink-0 text-slate-400 transition hover:text-slate-700"
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-slate-900 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200"
        >
          Sign in
        </button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-slate-100" />
        <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
          Secure account access
        </span>
        <div className="h-px flex-1 bg-slate-100" />
      </div>

      <p className="text-center text-xs leading-5 text-slate-400">
        Your account and personal academic library will be protected with
        secure authentication.
      </p>
    </AuthShell>
  );
}