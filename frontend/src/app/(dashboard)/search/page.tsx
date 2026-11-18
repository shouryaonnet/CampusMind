
"use client";

import { useEffect, useState } from "react";
import {
  Search,
  FileText,
  SlidersHorizontal,
  BookOpen,
  Loader2,
} from "lucide-react";
import {
  getPublicDocuments,
  DocumentResponse,
} from "@/lib/api";

const categories = [
  "All documents",
  "NOTES",
  "QUESTION_PAPER",
  "ASSIGNMENT",
  "SYLLABUS",
  "BOOK",
  "OTHER",
];

function formatType(type: string) {
  return type.replaceAll("_", " ").toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [category, setCategory] = useState("All documents");
  const [documents, setDocuments] = useState<DocumentResponse[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadDocuments() {
      setLoading(true);
      setError("");

      try {
        const response = await getPublicDocuments(
          0,
          100,
          submittedQuery
        );

        if (!active) return;

        setDocuments(response.content);
        setTotal(response.totalElements);
      } catch (err) {
        if (!active) return;
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load documents."
        );
      } finally {
        if (active) setLoading(false);
      }
    }

    loadDocuments();

    return () => {
      active = false;
    };
  }, [submittedQuery]);

  const filteredDocuments = documents.filter((doc) =>
    category === "All documents" || doc.documentType === category
  );

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmittedQuery(query.trim());
  }

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
          Find public academic PDFs by title, subject or description.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <form onSubmit={handleSearch} className="flex flex-col gap-3 sm:flex-row">
          <div className="flex flex-1 items-center gap-3 rounded-xl border border-slate-200 px-4">
            <Search size={19} className="shrink-0 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search topics, subjects or documents..."
              className="h-12 w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:opacity-60"
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
              {item === "All documents" ? item : formatType(item)}
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
            {loading ? "Searching..." : `${filteredDocuments.length} of ${total} documents`}
          </p>
        </div>
      </div>

      {error && (
        <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center rounded-2xl border border-slate-200 bg-white p-12">
          <Loader2 className="animate-spin text-violet-600" size={28} />
        </div>
      ) : filteredDocuments.length > 0 ? (
        <div className="space-y-3">
          {filteredDocuments.map((doc) => (
            <div
              key={doc.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-slate-300 hover:shadow-sm"
            >
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <FileText size={23} />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-slate-900">
                    {doc.title}
                  </h3>

                  <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-500">
                    <span>{formatType(doc.documentType)}</span>
                    <span>·</span>
                    <span>{doc.subject}</span>
                    <span>·</span>
                    <span>Semester {doc.semester}</span>
                    <span>·</span>
                    <span>{doc.academicYear}</span>
                  </div>

                  <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                    {doc.description || "No description provided."}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                    <span>Uploaded by {doc.uploadedBy}</span>
                    <span>{formatDate(doc.createdAt)}</span>
                    <span>{doc.fileSizeInMB.toFixed(2)} MB</span>
                  </div>

                  <a
                    href={`${process.env.NEXT_PUBLIC_API_URL}/api/documents/${doc.id}/preview`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-2.5 text-xs font-semibold text-white hover:bg-violet-700"
                  >
                    Preview PDF
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center">
          <BookOpen className="mx-auto text-slate-400" size={30} />
          <h3 className="mt-4 font-semibold text-slate-900">
            No documents found
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            {error
              ? "Check your backend connection and try again."
              : "Try another keyword or upload a public PDF."}
          </p>
        </div>
      )}

      <p className="text-center text-xs text-slate-400">
        Public documents can be explored without creating an account.
      </p>
    </div>
  );
}
