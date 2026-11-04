"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, CheckCircle2 } from "lucide-react";
import AuthShell from "@/components/auth/AuthShell";

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <AuthShell
      title="Forgot your password?"
      description="Enter your registered email address to start recovering your account."
      footerText="Remember your password?"
      footerLink="Sign in"
      footerHref="/login"
    >
      {submitted ? (
        <div className="py-3 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <CheckCircle2 size={25} />
          </div>

          <h2 className="text-lg font-semibold text-slate-900">
            Request submitted
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            The password recovery interface is ready. Email delivery will be
            connected when the backend is implemented.
          </p>

          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-5 text-sm font-semibold text-indigo-600 transition hover:text-indigo-700"
          >
            Try another email
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Registered email address
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

          <button
            type="submit"
            className="w-full rounded-xl bg-slate-900 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200"
          >
            Send recovery request
          </button>
        </form>
      )}

      <Link
        href="/login"
        className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
      >
        <ArrowLeft size={15} />
        Back to login
      </Link>
    </AuthShell>
  );
}