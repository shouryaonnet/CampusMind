"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  FileText,
  Sparkles,
  ArrowRight,
  BookOpen,
  Info,
} from "lucide-react";

const sampleResults = [
  {
    id: "1",
    title: "Database Management Systems",
    type: "Lecture Notes",
    pages: 68,
    reason: "Contains database normalization, relational models and SQL concepts.",
    score: "92%",
  },
  {
    id: "2",
    title: "Advanced Database Concepts",
    type: "Study Material",
    pages: 34,
    reason: "Discusses relational database design and transaction processing.",
    score: "86%",
  },
  {
    id: "3",
    title: "DBMS Previous Year Questions",
    type: "Question Paper",
    pages: 15,
    reason: "Includes questions related to keys, normalization and SQL.",
    score: "79%",
  },
];

export default function SimilarDocumentsPage() {
  const [query, setQuery] = useState("Database normalization");
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;
    setSearched(true);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-7">
      <div>
        <p className="text-sm font-medium text-violet-600">Discovery tools</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
          Similar documents
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Discover academic resources related to a topic or document.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-violet-50 p-3 text-violet-600">
            <Sparkles size={21} />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              Find related academic material
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Start with a topic, keyword or document title.
            </p>
          </div>
        </div>

        <form onSubmit={handleSearch} className="mt-6 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Example: Operating system scheduling..."
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition focus:border-violet-400 focus:bg-white"
            />
          </div>
          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Find similar <ArrowRight size={16} />
          </button>
        </form>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400">Try:</span>
          {["Operating systems", "Computer networks", "Data structures"].map((item) => (
            <button
              key={item}
              onClick={() => {
                setQuery(item);
                setSearched(false);
              }}
              className="rounded-full border border-slate-200 px-3 py-1.5 text-xs text-slate-600 transition hover:border-violet-300 hover:text-violet-700"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {searched ? (
        <section className="space-y-4">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Related documents
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Sample results for “{query}”
            </p>
          </div>

          {sampleResults.map((result) => (
            <div
              key={result.id}
              className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center"
            >
              <div className="rounded-xl bg-slate-100 p-3 text-slate-600">
                <FileText size={22} />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-semibold text-slate-900">
                  {result.title}
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  {result.type} · {result.pages} pages
                </p>
                <p className="mt-2 text-xs leading-5 text-slate-600">
                  {result.reason}
                </p>
              </div>
              <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                <span className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                  {result.score} match
                </span>
                <Link
                  href={`/documents/${result.id}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-violet-700"
                >
                  View <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </section>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
          <BookOpen className="mx-auto text-slate-300" size={30} />
          <h3 className="mt-3 text-sm font-semibold text-slate-800">
            Your related documents will appear here
          </h3>
          <p className="mx-auto mt-1 max-w-md text-xs leading-5 text-slate-500">
            Enter a topic above and select Find similar to preview related
            academic resources.
          </p>
        </div>
      )}

      <div className="flex gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4">
        <Info className="mt-0.5 shrink-0 text-blue-600" size={17} />
        <p className="text-xs leading-5 text-blue-800">
          These are frontend sample results. Later, we’ll connect this page to
          Apache Solr so CampusMind can find genuinely similar documents using
          document content and relevance ranking.
        </p>
      </div>
    </div>
  );
}