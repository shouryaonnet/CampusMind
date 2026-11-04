"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) return;

    router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
  }

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-blue-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-50">
          <Search size={20} className="shrink-0 text-slate-400" />

          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search inside PDFs, notes, research papers..."
            className="h-13 w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
          />

          <span className="hidden shrink-0 rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-400 md:inline">
            PDF search
          </span>
        </div>

        <button
          type="submit"
          disabled={!query.trim()}
          className="inline-flex h-13 items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Search size={17} />
          Search
        </button>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
        <SlidersHorizontal size={14} />
        <span>Try searching:</span>

        {["Database normalization", "Operating systems", "Computer networks"].map(
          (suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => setQuery(suggestion)}
              className="rounded-full border border-slate-200 bg-white px-3 py-1.5 transition hover:border-blue-300 hover:text-blue-600"
            >
              {suggestion}
            </button>
          ),
        )}
      </div>
    </form>
  );
}