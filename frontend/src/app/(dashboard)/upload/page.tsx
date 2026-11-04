"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  Upload,
  FileText,
  X,
  CheckCircle2,
  LockKeyhole,
  ArrowLeft,
} from "lucide-react";

export default function UploadPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);

  const addFiles = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const pdfFiles = Array.from(selectedFiles).filter(
      (file) => file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")
    );

    setFiles((current) => {
      const combined = [...current, ...pdfFiles];
      return combined.filter(
        (file, index) =>
          combined.findIndex(
            (item) => item.name === file.name && item.size === file.size
          ) === index
      );
    });
  };

  const removeFile = (index: number) => {
    setFiles((current) => current.filter((_, i) => i !== index));
  };

  const formatSize = (bytes: number) => {
    return bytes < 1024 * 1024
      ? `${(bytes / 1024).toFixed(0)} KB`
      : `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const handleUpload = () => {
    alert("Your files are selected. Actual uploading will be enabled when we connect the backend and authentication.");
  };

  return (
    <div className="mx-auto max-w-4xl space-y-7">
      <div>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-slate-900"
        >
          <ArrowLeft size={14} /> Back to overview
        </Link>
        <p className="mt-5 text-sm font-medium text-violet-600">Your workspace</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
          Upload documents
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Add academic PDFs to make them searchable in CampusMind.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            addFiles(e.dataTransfer.files);
          }}
          onClick={() => inputRef.current?.click()}
          className={`cursor-pointer rounded-2xl border-2 border-dashed px-5 py-14 text-center transition ${
            dragging
              ? "border-violet-500 bg-violet-50"
              : "border-slate-300 bg-slate-50 hover:border-violet-400 hover:bg-violet-50/40"
          }`}
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-violet-600 shadow-sm">
            <Upload size={25} />
          </div>
          <h2 className="mt-5 text-sm font-semibold text-slate-900">
            Drop your PDF files here
          </h2>
          <p className="mt-2 text-xs text-slate-500">
            Or click to browse files from your device
          </p>
          <span className="mt-5 inline-flex rounded-lg bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white">
            Choose PDF files
          </span>
          <p className="mt-4 text-[11px] text-slate-400">
            PDF files only · Maximum file size will be configured on the server
          </p>

          <input
            ref={inputRef}
            type="file"
            accept=".pdf,application/pdf"
            multiple
            className="hidden"
            onChange={(e) => {
              addFiles(e.target.files);
              e.target.value = "";
            }}
          />
        </div>

        {files.length > 0 && (
          <div className="mt-7">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-900">
                Selected files ({files.length})
              </h3>
              <button
                onClick={() => setFiles([])}
                className="text-xs text-slate-500 hover:text-red-600"
              >
                Clear all
              </button>
            </div>

            <div className="space-y-3">
              {files.map((file, index) => (
                <div
                  key={`${file.name}-${file.size}`}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 p-3"
                >
                  <div className="rounded-lg bg-violet-50 p-2.5 text-violet-600">
                    <FileText size={19} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-slate-800">
                      {file.name}
                    </p>
                    <p className="mt-1 text-[11px] text-slate-400">
                      {formatSize(file.size)}
                    </p>
                  </div>
                  <CheckCircle2 size={17} className="text-emerald-500" />
                  <button
                    onClick={() => removeFile(index)}
                    className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-500"
                    aria-label={`Remove ${file.name}`}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={handleUpload}
              className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-900 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              <Upload size={16} />
              Continue with {files.length} file{files.length > 1 ? "s" : ""}
            </button>
          </div>
        )}
      </div>

      <div className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
        <LockKeyhole className="mt-0.5 shrink-0 text-amber-700" size={17} />
        <div>
          <p className="text-xs font-semibold text-amber-900">
            Account required for uploading
          </p>
          <p className="mt-1 text-xs leading-5 text-amber-800">
            Public users can search and read available documents. You will need
            an account to upload and manage your own documents. Authentication
            will be connected in the next stage.
          </p>
          <Link
            href="/login"
            className="mt-2 inline-block text-xs font-semibold text-amber-900 underline underline-offset-2"
          >
            Sign in to your account
          </Link>
        </div>
      </div>
    </div>
  );
}