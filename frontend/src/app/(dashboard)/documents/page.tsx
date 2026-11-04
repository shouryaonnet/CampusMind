"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  FileText,
  Download,
  Bookmark,
  SlidersHorizontal,
  BookOpen,
  ChevronRight,
} from "lucide-react";

const documents = [
  {
    id: "1",
    title: "Data Structures and Algorithms",
    subject: "Computer Science",
    type: "Lecture Notes",
    pages: 42,
    year: "2025",
    description: "A complete collection of notes covering arrays, trees, graphs and algorithms.",
  },
  {
    id: "2",
    title: "Database Management Systems",
    subject: "Computer Science",
    type: "Study Material",
    pages: 68,
    year: "2025",
    description: "Database concepts, normalization, SQL queries and transaction management.",
  },
  {
    id: "3",
    title: "Computer Networks",
    subject: "Computer Science",
    type: "Question Paper",
    pages: 12,
    year: "2024",
    description: "Previous examination questions covering networking fundamentals.",
  },
  {
    id: "4",
    title: "Operating Systems",
    subject: "Computer Science",
    type: "Lecture Notes",
    pages: 54,
    year: "2025",
    description: "Processes, threads, scheduling, memory management and deadlocks.",
  },
  {
    id: "5",
    title: "Software Engineering",
    subject: "Computer Science",
    type: "Research Paper",
    pages: 26,
    year: "2024",
    description: "Software development methodologies, testing and project management.",
  },
  {
    id: "6",
    title: "Engineering Mathematics",
    subject: "Mathematics",
    type: "Study Material",
    pages: 75,
    year: "2025",
    description: "Important mathematical concepts and solved examples.",
  },
];

const types = ["All documents", "Lecture Notes", "Study Material", "Question Paper", "Research Paper"];

export default function DocumentsPage() {
  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState("All documents");

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const matchesSearch =
        doc.title.toLowerCase().includes(search.toLowerCase()) ||
        doc.subject.toLowerCase().includes(search.toLowerCase()) ||
        doc.description.toLowerCase().includes(search.toLowerCase());

      const matchesType =
        activeType === "All documents" || doc.type === activeType;

      return matchesSearch && matchesType;
    });
  }, [search, activeType]);

  return (
    <div className="mx-auto max-w-7xl space-y-7">
      <div>
        <p className="text-sm font-medium text-violet-600">Workspace</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
          My Library
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Browse academic documents and discover useful study material.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search documents, subjects or topics..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-violet-400 focus:bg-white"
            />
          </div>

          <Link
            href="/upload"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            <FileText size={16} />
            Upload document
          </Link>
        </div>

        <div className="mt-5 flex items-center gap-2 overflow-x-auto pb-1">
          <SlidersHorizontal size={16} className="shrink-0 text-slate-400" />
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium transition ${
                activeType === type
                  ? "bg-violet-100 text-violet-700"
                  : "border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Available documents
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Showing {filteredDocuments.length} sample documents
          </p>
        </div>
        <span className="rounded-lg bg-slate-100 px-3 py-2 text-xs text-slate-600">
          Public collection
        </span>
      </div>

      {filteredDocuments.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredDocuments.map((doc) => (
            <div
              key={doc.id}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="rounded-xl bg-violet-50 p-3 text-violet-600">
                  <FileText size={21} />
                </div>
                <button
                  title="Sign in to save documents"
                  onClick={() => alert("Saving documents will be available after account authentication is connected.")}
                  className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-violet-600"
                >
                  <Bookmark size={17} />
                </button>
              </div>

              <p className="mt-4 text-xs font-medium text-violet-600">
                {doc.subject}
              </p>
              <h3 className="mt-1 text-base font-semibold text-slate-900">
                {doc.title}
              </h3>
              <p className="mt-2 min-h-10 text-xs leading-5 text-slate-500">
                {doc.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500">
                <span className="rounded-md bg-slate-100 px-2.5 py-1">
                  {doc.type}
                </span>
                <span className="rounded-md bg-slate-100 px-2.5 py-1">
                  {doc.pages} pages
                </span>
                <span className="rounded-md bg-slate-100 px-2.5 py-1">
                  {doc.year}
                </span>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                <Link
                  href={`/documents/${doc.id}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 transition hover:text-violet-700"
                >
                  View document <ChevronRight size={15} />
                </Link>
                <button
                  title="Download will be connected to the backend"
                  onClick={() => alert("PDF downloads will work once the document API is connected.")}
                  className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                >
                  <Download size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
          <BookOpen className="mx-auto text-slate-300" size={30} />
          <h3 className="mt-3 text-sm font-semibold text-slate-800">
            No documents found
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            Try another search term or choose a different category.
          </p>
        </div>
      )}
    </div>
  );
}