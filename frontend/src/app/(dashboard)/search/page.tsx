"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  FileText,
  SlidersHorizontal,
  Bookmark,
  ArrowUpRight,
  BookOpen,
} from "lucide-react";

const documents = [
  {
    id: "1",
    title: "Data Structures and Algorithms",
    subject: "Computer Science",
    type: "Lecture Notes",
    semester: "Semester 3",
    pages: 42,
    year: 2025,
    description:
      "Arrays, linked lists, stacks, queues, trees and fundamental algorithms.",
  },
  {
    id: "2",
    title: "Database Management Systems",
    subject: "Database",
    type: "Study Material",
    semester: "Semester 4",
    pages: 68,
    year: 2025,
    description:
      "Database normalization, SQL queries, transactions and relational models.",
  },
  {
    id: "3",
    title: "Computer Networks Question Bank",
    subject: "Networking",
    type: "Question Paper",
    semester: "Semester 4",
    pages: 12,
    year: 2024,
    description:
      "Important networking questions covering TCP/IP, routing and protocols.",
  },
  {
    id: "4",
    title: "Operating Systems Notes",
    subject: "Computer Science",
    type: "Lecture Notes",
    semester: "Semester 5",
    pages: 55,
    year: 2025,
    description:
      "Processes, threads, CPU scheduling, memory management and deadlocks.",
  },
  {
    id: "5",
    title: "Introduction to Machine Learning",
    subject: "Artificial Intelligence",
    type: "Research Paper",
    semester: "Semester 6",
    pages: 34,
    year: 2024,
    description:
      "An introduction to supervised learning, classification and regression.",
  },
];

const categories = [
  "All documents",
  "Lecture Notes",
  "Study Material",
  "Question Paper",
  "Research Paper",
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All documents");
  const [sort, setSort] = useState("relevance");

  const results = useMemo(() => {
    let filtered = documents.filter((doc) => {
      const matchesQuery =
        !query ||
        `${doc.title} ${doc.subject} ${doc.description}`
          .toLowerCase()
          .includes(query.toLowerCase());

      const matchesCategory =
        category === "All documents" || doc.type === category;

      return matchesQuery && matchesCategory;
    });

    if (sort === "newest") {
      filtered = [...filtered].sort((a, b) => b.year - a.year);
    }

    if (sort === "oldest") {
      filtered = [...filtered].sort((a, b) => a.year - b.year);
    }

    return filtered;
  }, [query, category, sort]);

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-5 py-8 sm:px-8">
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">
          Discover knowledge
        </p>
        <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
          Search academic documents
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Find relevant information across lecture notes, PDFs and research
          papers.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <div className="flex flex-1 items-center gap-3 rounded-xl border border-slate-200 px-4">
            <Search size={19} className="shrink-0 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search topics, concepts or documents..."
              className="h-12 w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
            />
          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
          >
            <Search size={17} />
            Search
          </button>
        </form>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <SlidersHorizontal size={16} className="mr-1 text-slate-400" />
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-full border px-3 py-2 text-xs font-medium transition ${
                category === item
                  ? "border-slate-950 bg-slate-950 text-white"
                  : "border-slate-200 text-slate-600 hover:border-slate-400"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">
            Search results
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {results.length} documents found
          </p>
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none"
        >
          <option value="relevance">Sort by relevance</option>
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
      </div>

      <div className="space-y-3">
        {results.map((doc) => (
          <div
            key={doc.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-slate-300 hover:shadow-sm"
          >
            <div className="flex flex-col justify-between gap-4 sm:flex-row">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <FileText size={23} />
                </div>

                <div>
                  <Link
                    href={`/documents/${doc.id}`}
                    className="font-semibold text-slate-900 hover:text-violet-700"
                  >
                    {doc.title}
                  </Link>

                  <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-500">
                    <span>{doc.type}</span>
                    <span>·</span>
                    <span>{doc.subject}</span>
                    <span>·</span>
                    <span>{doc.pages} pages</span>
                  </div>

                  <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                    {doc.description}
                  </p>

                  <p className="mt-3 text-xs text-slate-400">
                    {doc.semester} · {doc.year}
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2 sm:self-start">
                <button
                  title="Save document"
                  onClick={() =>
                    alert("Saving documents will be enabled after login integration.")
                  }
                  className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-50"
                >
                  <Bookmark size={17} />
                </button>

                <Link
                  href={`/documents/${doc.id}`}
                  className="flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-2.5 text-xs font-semibold text-white hover:bg-violet-700"
                >
                  View
                  <ArrowUpRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        ))}

        {results.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center">
            <BookOpen className="mx-auto text-slate-400" size={30} />
            <h3 className="mt-4 font-semibold text-slate-900">
              No documents found
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Try another keyword or select a different category.
            </p>
          </div>
        )}
      </div>

      <p className="text-center text-xs text-slate-400">
        You can explore public documents without creating an account.
      </p>
    </div>
  );
}