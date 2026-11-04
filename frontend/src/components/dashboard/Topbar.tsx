"use client";

import Link from "next/link";
import {
  Bell,
  ChevronDown,
  Search,
  Menu,
  UserRound,
  Settings,
  LogOut,
} from "lucide-react";
import { useState } from "react";

export default function Topbar() {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-slate-200 bg-white/90 px-5 backdrop-blur-xl sm:px-8">

      <div className="flex items-center gap-4">
        <button className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden">
          <Menu size={21} />
        </button>

        <div className="hidden items-center gap-2 text-sm text-slate-400 sm:flex">
          <span>Workspace</span>
          <span>/</span>
          <span className="font-semibold text-slate-800">Overview</span>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <span className="font-bold text-slate-900">
            Campus<span className="text-indigo-600">Mind</span>
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-5">

        <Link
          href="/search"
          className="hidden items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-400 transition hover:border-indigo-200 sm:flex"
        >
          <Search size={16} />
          Search documents...
          <span className="ml-8 rounded border border-slate-200 bg-white px-2 py-1 text-[10px]">
            /
          </span>
        </Link>

        <button
          aria-label="Notifications"
          className="relative rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100"
        >
          <Bell size={19} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-indigo-600 ring-2 ring-white" />
        </button>

        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-slate-50"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-indigo-700">
              <UserRound size={18} />
            </div>

            <div className="hidden text-left sm:block">
              <p className="text-xs font-bold text-slate-800">
                Student User
              </p>
              <p className="text-[10px] text-slate-400">
                Student account
              </p>
            </div>

            <ChevronDown size={15} className="hidden text-slate-400 sm:block" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-14 w-48 rounded-xl border border-slate-100 bg-white p-2 shadow-xl">
              <Link
                href="/profile"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs text-slate-600 hover:bg-slate-50"
              >
                <UserRound size={16} />
                My Profile
              </Link>

              <Link
                href="/settings"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs text-slate-600 hover:bg-slate-50"
              >
                <Settings size={16} />
                Settings
              </Link>

              <div className="my-1 border-t border-slate-100" />

              <Link
                href="/login"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs text-red-500 hover:bg-red-50"
              >
                <LogOut size={16} />
                Log out
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}