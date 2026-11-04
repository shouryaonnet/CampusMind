"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Search,
  Library,
  Upload,
  GitCompareArrows,
  Bookmark,
  Clock3,
  Settings,
  UserRound,
  BookOpen,
  ShieldCheck,
} from "lucide-react";

const mainLinks = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Search", href: "/search", icon: Search },
  { name: "My Library", href: "/documents", icon: Library },
  { name: "Upload Document", href: "/upload", icon: Upload },
  { name: "Similar Documents", href: "/similar", icon: GitCompareArrows },
];

const personalLinks = [
  { name: "Saved Documents", href: "/saved", icon: Bookmark },
  { name: "Search History", href: "/history", icon: Clock3 },
];

export default function Sidebar() {
  const pathname = usePathname();

  const renderLinks = (
    items: typeof mainLinks
  ) =>
    items.map((item) => {
      const Icon = item.icon;

      const active =
        pathname === item.href ||
        (item.href !== "/dashboard" &&
          pathname.startsWith(item.href + "/"));

      return (
        <Link
          key={item.name}
          href={item.href}
          className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-[13px] font-medium transition ${
            active
              ? "bg-indigo-50 text-indigo-700"
              : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <Icon
            size={18}
            className={active ? "text-indigo-600" : "text-slate-400"}
          />
          {item.name}

          {active && (
            <span className="ml-auto h-2 w-2 rounded-full bg-indigo-600" />
          )}
        </Link>
      );
    });

  return (
    <aside className="fixed bottom-0 left-0 top-0 z-40 hidden w-[260px] flex-col border-r border-slate-200 bg-white lg:flex">

      {/* BRAND */}
      <Link href="/dashboard" className="flex h-[76px] items-center gap-3 border-b border-slate-100 px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
          <BookOpen size={21} />
        </div>

        <div>
          <p className="text-lg font-bold text-slate-900">
            Campus<span className="text-indigo-600">Mind</span>
          </p>
          <p className="text-[9px] tracking-[0.2em] text-slate-400">
            STUDENT WORKSPACE
          </p>
        </div>
      </Link>

      {/* NAVIGATION */}
      <div className="flex-1 overflow-y-auto px-4 py-7">
        <p className="mb-3 px-4 text-[10px] font-bold tracking-[0.18em] text-slate-400">
          WORKSPACE
        </p>

        <nav className="space-y-1">
          {renderLinks(mainLinks)}
        </nav>

        <p className="mb-3 mt-9 px-4 text-[10px] font-bold tracking-[0.18em] text-slate-400">
          PERSONAL
        </p>

        <nav className="space-y-1">
          {renderLinks(personalLinks)}
        </nav>

        <p className="mb-3 mt-9 px-4 text-[10px] font-bold tracking-[0.18em] text-slate-400">
          ACCOUNT
        </p>

        <nav className="space-y-1">
          {renderLinks([
            { name: "Profile", href: "/profile", icon: UserRound },
            { name: "Settings", href: "/settings", icon: Settings },
          ])}
        </nav>
      </div>

      {/* BOTTOM CARD */}
      <div className="border-t border-slate-100 p-4">
        <div className="rounded-2xl bg-slate-50 p-4">
          <div className="flex items-center gap-2 text-indigo-600">
            <ShieldCheck size={17} />
            <span className="text-xs font-bold">Your academic space</span>
          </div>
          <p className="mt-2 text-[11px] leading-5 text-slate-500">
            Discover, organize and access your learning resources.
          </p>
        </div>
      </div>
    </aside>
  );
}