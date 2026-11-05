"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Clock3, Search, ArrowUpRight, Trash2,
  FileText, CalendarDays, History,
} from "lucide-react";

const initialHistory = [
  {
    id: 1,
    query: "Operating System notes",
    date: "November 5, 2026",
    time: "10:45 AM",
    results: 18,
    category: "Computer Science",
  },
  {
    id: 2,
    query: "Data Structures previous year questions",
    date: "November 4, 2026",
    time: "04:20 PM",
    results: 12,
    category: "Computer Science",
  },
  {
    id: 3,
    query: "Database Management System syllabus",
    date: "November 3, 2026",
    time: "11:10 AM",
    results: 8,
    category: "Syllabus",
  },
  {
    id: 4,
    query: "Computer Networks lecture notes",
    date: "November 2, 2026",
    time: "02:30 PM",
    results: 24,
    category: "Lecture Notes",
  },
  {
    id: 5,
    query: "Java programming assignments",
    date: "November 1, 2026",
    time: "09:15 AM",
    results: 15,
    category: "Assignments",
  },
];

export default function HistoryPage() {
  const [history, setHistory] = useState(initialHistory);
  const [search, setSearch] = useState("");

  const filteredHistory = history.filter((item) =>
    item.query.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-6xl space-y-7">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-indigo-600">Personal Workspace</p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">Search History</h1>
          <p className="mt-1 text-sm text-slate-500">
            Revisit your previous academic searches.
          </p>
        </div>

        <button
          onClick={() => {
            if (history.length === 0) return;
            if (window.confirm("Are you sure you want to clear your search history?")) {
              setHistory([]);
            }
          }}
          disabled={history.length === 0}
          className="flex items-center justify-center gap-2 rounded-xl border border-red-100 bg-white px-4 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Trash2 size={16} />
          Clear History
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-slate-500">Total Searches</p>
            <History size={18} className="text-indigo-500" />
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-900">{history.length}</p>
          <p className="mt-1 text-xs text-slate-400">Recorded searches</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-slate-500">Documents Found</p>
            <FileText size={18} className="text-violet-500" />
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-900">
            {history.reduce((total, item) => total + item.results, 0)}
          </p>
          <p className="mt-1 text-xs text-slate-400">Across recorded searches</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-slate-500">Latest Activity</p>
            <CalendarDays size={18} className="text-emerald-500" />
          </div>
          <p className="mt-3 text-lg font-bold text-slate-900">
            {history.length > 0 ? "Recent" : "No activity"}
          </p>
          <p className="mt-1 text-xs text-slate-400">Your search activity</p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white">
        <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-bold text-slate-900">Recent Searches</h2>
            <p className="mt-1 text-xs text-slate-500">
              Your previously searched topics and documents.
            </p>
          </div>

          <div className="relative w-full sm:max-w-xs">
            <Search
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Find a previous search..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-xs outline-none transition focus:border-indigo-400"
            />
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredHistory.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between gap-4 p-5 transition hover:bg-slate-50/70 sm:flex-row sm:items-center"
            >
              <div className="flex min-w-0 items-start gap-4">
                <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
                  <Clock3 size={19} />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-800">
                    {item.query}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                    <span>{item.date}</span>
                    <span>•</span>
                    <span>{item.time}</span>
                    <span>•</span>
                    <span>{item.category}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 sm:justify-end">
                <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
                  {item.results} results
                </span>

                <Link
                  href={`/search?q=${encodeURIComponent(item.query)}`}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-50"
                >
                  Search again
                  <ArrowUpRight size={15} />
                </Link>
              </div>
            </div>
          ))}

          {filteredHistory.length === 0 && (
            <div className="px-5 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <Search size={24} />
              </div>
              <h3 className="mt-4 text-sm font-bold text-slate-800">
                {history.length === 0 ? "No search history yet" : "No matching searches"}
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                {history.length === 0
                  ? "Your future searches will appear here."
                  : "Try searching with a different keyword."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}