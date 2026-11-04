"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, ArrowUpRight, Menu, X } from "lucide-react";

const links = [
  { name: "Features", href: "/#features" },
  { name: "How it works", href: "/#how-it-works" },
  { name: "About", href: "/#about" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
      <nav className="flex h-[72px] w-full items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white">
            <BookOpen size={21} />
          </div>

          <div>
            <p className="text-xl font-bold tracking-tight text-slate-950">
              Campus<span className="text-violet-700">Mind</span>
            </p>
            <p className="text-[9px] font-medium tracking-[0.18em] text-slate-400">
              KNOWLEDGE DISCOVERY
            </p>
          </div>
        </Link>

        <div className="ml-auto hidden items-center gap-9 sm:flex">
          <div className="flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-600 transition hover:text-violet-700"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-800"
          >
            Get started
            <ArrowUpRight size={16} />
          </Link>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          className="ml-auto rounded-lg border border-slate-200 p-2 text-slate-700 sm:hidden"
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-slate-200 bg-white px-6 py-5 sm:hidden">
          <div className="flex flex-col gap-5">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-slate-700"
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/register"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl bg-slate-950 px-5 py-3 text-center text-sm font-semibold text-white"
            >
              Get started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}