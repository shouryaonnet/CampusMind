"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Bookmark,
  CalendarDays,
  Download,
  FileText,
  MoreHorizontal,
} from "lucide-react";

export interface Document {
  id: string;
  title: string;
  subject: string;
  type: string;
  pages: number;
  date: string;
  description: string;
}

interface DocumentCardProps {
  document: Document;
}

export default function DocumentCard({ document }: DocumentCardProps) {
  const [saved, setSaved] = useState(false);

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500">
          <FileText size={24} />
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setSaved((current) => !current)}
            aria-label={saved ? "Remove bookmark" : "Bookmark document"}
            className={`rounded-lg p-2 transition ${
              saved
                ? "bg-blue-50 text-blue-600"
                : "text-slate-400 hover:bg-slate-100 hover:text-blue-600"
            }`}
          >
            <Bookmark size={18} fill={saved ? "currentColor" : "none"} />
          </button>

          <button
            type="button"
            aria-label="More document options"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100"
          >
            <MoreHorizontal size={19} />
          </button>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-700">
          {document.subject}
        </span>

        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">
          {document.type}
        </span>
      </div>

      <h3 className="mt-3 line-clamp-2 text-base font-bold leading-6 text-slate-900 transition group-hover:text-blue-700">
        {document.title}
      </h3>

      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-slate-500">
        {document.description}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-slate-100 pt-4 text-xs text-slate-400">
        <span>{document.pages} pages</span>

        <span className="flex items-center gap-1">
          <CalendarDays size={13} />
          {document.date}
        </span>
      </div>

      <div className="mt-4 flex gap-2">
        <Link
          href={`/documents/${document.id}`}
          className="flex flex-1 items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Open document
        </Link>

        <button
          type="button"
          aria-label="Download document"
          title="Download will be enabled after backend integration"
          className="flex h-10 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
        >
          <Download size={17} />
        </button>
      </div>
    </article>
  );
}