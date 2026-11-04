"use client";

import { useState } from "react";
import {
  UserRound,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
} from "lucide-react";
import AuthShell from "@/components/auth/AuthShell";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }

    setError("");
    alert("Registration UI is ready. Backend registration will be connected later.");
  }

  return (
    <AuthShell
      title="Create your account"
      description="Set up your CampusMind account and organize your academic resources."
      footerText="Already have an account?"
      footerLink="Sign in"
      footerHref="/login"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Full name
          </label>

          <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-3.5 transition focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-50">
            <UserRound size={17} className="shrink-0 text-slate-400" />
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              placeholder="Enter your full name"
              className="h-12 w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Email address
          </label>

          <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-3.5 transition focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-50">
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
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Password
          </label>

          <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-3.5 transition focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-50">
            <LockKeyhole size={17} className="shrink-0 text-slate-400" />
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
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

        <div>
          <label
            htmlFor="confirmPassword"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Confirm password
          </label>

          <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-3.5 transition focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-50">
            <LockKeyhole size={17} className="shrink-0 text-slate-400" />
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              minLength={8}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              className="h-12 w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((value) => !value)}
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
              className="shrink-0 text-slate-400 transition hover:text-slate-700"
            >
              {showConfirmPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
        </div>

        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </p>
        )}

        <label className="flex items-start gap-3 pt-1 text-xs leading-5 text-slate-500">
          <input
            type="checkbox"
            required
            className="mt-1 accent-slate-900"
          />
          <span>
            I agree to the terms of use and understand how CampusMind handles
            academic documents and account information.
          </span>
        </label>

        <button
          type="submit"
          className="w-full rounded-xl bg-slate-900 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200"
        >
          Create account
        </button>
      </form>

      <p className="mt-5 text-center text-xs leading-5 text-slate-400">
        Create an account to upload, save, and manage your academic resources.
      </p>
    </AuthShell>
  );
}