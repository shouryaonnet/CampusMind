"use client";

import Link from "next/link";
import {
  Bookmark,
  FileText,
  Search,
  LockKeyhole,
  ArrowRight,
} from "lucide-react";

const savedDocuments = [
  {
    id: "1",
    title: "Data Structures and Algorithms",
    type: "Lecture Notes",
    subject: "Computer Science",
    pages: 42,
  },
  {
    id: "2",
    title: "Database Management Systems",
    type: "Study Material",
    subject: "Computer Science",
    pages: 68,
  },
];

export default function SavedDocumentsPage() {
  const isLoggedIn = false;

  return (
    <div className="mx-auto max-w-5xl space-y-7">
      <div>
        <p className="text-sm font-medium text-violet-600">Personal space</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
          Saved documents
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Keep useful academic resources together for quick access.
        </p>
      </div>

      {!isLoggedIn ? (
        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
            <LockKeyhole size={24} />
          </div>

          <h2 className="mt-5 text-lg font-semibold text-slate-900">
            Your personal library starts with an account
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            You can search and explore public documents without signing in.
            Create an account to save documents and access them whenever you
            return.
          </p>

          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Create account <ArrowRight size={16} />
            </Link>
            <Link
              href="/login"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Sign in
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {savedDocuments.map((doc) => (
            <div
              key={doc.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-violet-50 p-3 text-violet-600">
                  <FileText size={21} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    {doc.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    {doc.subject} · {doc.pages} pages
                  </p>
                </div>
              </div>
              <Link
                href={`/documents/${doc.id}`}
                className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-violet-700"
              >
                Open document <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      )}

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <div className="flex items-start gap-3">
          <Bookmark className="mt-0.5 text-slate-500" size={17} />
          <div>
            <p className="text-xs font-semibold text-slate-800">
              Found something useful?
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Browse the public library and discover material you may want to
              save later.
            </p>
            <Link
              href="/documents"
              className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-violet-700 hover:text-violet-900"
            >
              Explore documents <Search size={13} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}