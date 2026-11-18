
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  Search,
  FileText,
  Download,
  SlidersHorizontal,
  BookOpen,
  Trash2,
  Eye,
  Loader2,
  Upload,
} from "lucide-react";
import {
  getMyDocuments,
  getDocumentFile,
  deleteDocument,
  DocumentResponse,
} from "@/lib/api";

const types = [
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

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<DocumentResponse[]>([]);
  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState("All documents");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionId, setActionId] = useState<string | null>(null);

  const loadDocuments = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getMyDocuments(0, 100);
      setDocuments(response.content);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load your documents.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDocuments();
  }, [loadDocuments]);

  const filteredDocuments = documents.filter((doc) => {
    const term = search.toLowerCase();

    const matchesSearch =
      doc.title.toLowerCase().includes(term) ||
      doc.subject.toLowerCase().includes(term) ||
      (doc.description || "").toLowerCase().includes(term);

    const matchesType =
      activeType === "All documents" || doc.documentType === activeType;

    return matchesSearch && matchesType;
  });

  async function handleFileAction(
    doc: DocumentResponse,
    action: "preview" | "download"
  ) {
    setActionId(doc.id);

    try {
      const blob = await getDocumentFile(doc.id, action);
      const url = URL.createObjectURL(blob);

      if (action === "preview") {
        window.open(url, "_blank", "noopener,noreferrer");
        setTimeout(() => URL.revokeObjectURL(url), 60000);
      } else {
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = doc.originalFileName;
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : "File action failed.");
    } finally {
      setActionId(null);
    }
  }

  async function handleDelete(doc: DocumentResponse) {
    const confirmed = window.confirm(
      `Delete "${doc.title}" permanently? This cannot be undone.`
    );

    if (!confirmed) return;

    setActionId(doc.id);

    try {
      await deleteDocument(doc.id);
      setDocuments((current) =>
        current.filter((item) => item.id !== doc.id)
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : "Unable to delete document.");
    } finally {
      setActionId(null);
    }
  }

  return (
    <div className="mx-auto max-w-7xl space-y-7">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-violet-600">Workspace</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
            My Library
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage the academic documents you have uploaded.
          </p>
        </div>

        <Link
          href="/upload"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          <Upload size={16} />
          Upload document
        </Link>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search your documents..."
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-violet-400 focus:bg-white"
          />
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
              {type === "All documents" ? type : formatType(type)}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Your uploaded documents
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            {loading ? "Loading..." : `${filteredDocuments.length} documents`}
          </p>
        </div>

        <span className="rounded-lg bg-violet-50 px-3 py-2 text-xs text-violet-700">
          Private library
        </span>
      </div>

      {error && (
        <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
          {error}
          <button onClick={loadDocuments} className="ml-2 font-semibold underline">
            Retry
          </button>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center rounded-2xl border border-slate-200 bg-white p-12">
          <Loader2 className="animate-spin text-violet-600" size={28} />
        </div>
      ) : filteredDocuments.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredDocuments.map((doc) => (
            <div
              key={doc.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="rounded-xl bg-violet-50 p-3 text-violet-600">
                  <FileText size={21} />
                </div>
                <span className={`rounded-lg px-2.5 py-1 text-xs font-medium ${
                  doc.visibility === "PUBLIC"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-slate-100 text-slate-600"
                }`}>
                  {doc.visibility}
                </span>
              </div>

              <p className="mt-4 text-xs font-medium text-violet-600">
                {doc.subject}
              </p>
              <h3 className="mt-1 line-clamp-2 text-base font-semibold text-slate-900">
                {doc.title}
              </h3>
              <p className="mt-2 line-clamp-2 min-h-10 text-xs leading-5 text-slate-500">
                {doc.description || "No description provided."}
              </p>

              <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500">
                <span className="rounded-md bg-slate-100 px-2.5 py-1">
                  {formatType(doc.documentType)}
                </span>
                <span className="rounded-md bg-slate-100 px-2.5 py-1">
                  Semester {doc.semester}
                </span>
                <span className="rounded-md bg-slate-100 px-2.5 py-1">
                  {doc.academicYear}
                </span>
              </div>

              <div className="mt-3 text-xs text-slate-400">
                {doc.fileSizeInMB.toFixed(2)} MB · {formatDate(doc.createdAt)}
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                <button
                  disabled={actionId === doc.id}
                  onClick={() => handleFileAction(doc, "preview")}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-violet-700 disabled:opacity-50"
                >
                  <Eye size={15} />
                  Preview
                </button>

                <div className="flex items-center gap-1">
                  <button
                    disabled={actionId === doc.id}
                    onClick={() => handleFileAction(doc, "download")}
                    title="Download PDF"
                    className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
                  >
                    {actionId === doc.id ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Download size={16} />
                    )}
                  </button>

                  <button
                    disabled={actionId === doc.id}
                    onClick={() => handleDelete(doc)}
                    title="Delete document"
                    className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
          <BookOpen className="mx-auto text-slate-300" size={30} />
          <h3 className="mt-3 text-sm font-semibold text-slate-800">
            {search || activeType !== "All documents"
              ? "No matching documents"
              : "Your library is empty"}
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            Upload a PDF to see it in your personal library.
          </p>
          <Link
            href="/upload"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white"
          >
            <Upload size={14} />
            Upload PDF
          </Link>
        </div>
      )}
    </div>
  );
}
