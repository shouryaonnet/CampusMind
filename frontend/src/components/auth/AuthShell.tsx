"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import type { ReactNode } from "react";

interface AuthShellProps {
  title: string;
  description: string;
  footerText: string;
  footerLink: string;
  footerHref: string;
  children: ReactNode;
}

export default function AuthShell({
  title,
  description,
  footerText,
  footerLink,
  footerHref,
  children,
}: AuthShellProps) {
  return (
    <main className="min-h-screen bg-[#fafbfc] px-5 py-8 sm:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col">
        <header className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white">
              <BookOpen size={19} strokeWidth={2} />
            </div>
            <span className="text-lg font-semibold tracking-tight text-slate-900">
              CampusMind
            </span>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
          >
            <ArrowLeft size={15} />
            Back to home
          </Link>
        </header>

        <section className="flex flex-1 items-center justify-center py-12">
          <div className="w-full max-w-[440px]">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm">
                <BookOpen size={22} strokeWidth={1.8} />
              </div>

              <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-[28px]">
                {title}
              </h1>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                {description}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.04)] sm:p-8">
              {children}

              <div className="mt-7 border-t border-slate-100 pt-6 text-center">
                <p className="text-sm text-slate-500">
                  {footerText}{" "}
                  <Link
                    href={footerHref}
                    className="font-semibold text-indigo-600 transition hover:text-indigo-700"
                  >
                    {footerLink}
                  </Link>
                </p>
              </div>
            </div>

            <p className="mt-7 text-center text-xs text-slate-400">
  © 2026 CampusMind. Academic resources, made easier to find.
</p>
          </div>
        </section>
      </div>
    </main>
  );
}