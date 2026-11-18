
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
  Loader2,
  AlertCircle,
} from "lucide-react";
import { uploadDocument } from "@/lib/api";

const MAX_FILE_SIZE = 25 * 1024 * 1024;

export default function UploadPage() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const [subject, setSubject] = useState("");
  const [semester, setSemester] = useState("");
  const [academicYear, setAcademicYear] = useState("2026");
  const [documentType, setDocumentType] = useState("NOTES");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("PUBLIC");

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const addFiles = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    setError("");
    setSuccess("");

    const selected = Array.from(selectedFiles);

    const invalidFiles = selected.filter(
      (file) =>
        file.type !== "application/pdf" &&
        !file.name.toLowerCase().endsWith(".pdf")
    );

    const oversizedFiles = selected.filter(
      (file) => file.size > MAX_FILE_SIZE
    );

    if (invalidFiles.length > 0) {
      setError("Only PDF files are allowed.");
    }

    if (oversizedFiles.length > 0) {
      setError("Each PDF must be smaller than 25 MB.");
    }

    const validFiles = selected.filter(
      (file) =>
        (file.type === "application/pdf" ||
          file.name.toLowerCase().endsWith(".pdf")) &&
        file.size <= MAX_FILE_SIZE
    );

    setFiles((current) => {
      const combined = [...current, ...validFiles];

      return combined.filter(
        (file, index) =>
          combined.findIndex(
            (item) =>
              item.name === file.name && item.size === file.size
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

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (files.length === 0) {
      setError("Please select at least one PDF.");
      return;
    }

    if (!subject.trim() || !semester || !academicYear.trim()) {
      setError("Please complete all required metadata fields.");
      return;
    }

    setUploading(true);
    setError("");
    setSuccess("");
    setProgress(0);

    let uploadedCount = 0;
    const failedFiles: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const title = file.name.replace(/\.pdf$/i, "").trim();

      try {
        await uploadDocument(file, {
          title,
          subject: subject.trim(),
          semester,
          academicYear: academicYear.trim(),
          documentType,
          description: description.trim(),
          visibility,
        });

        uploadedCount++;
      } catch (err) {
        failedFiles.push(
          `${file.name}: ${
            err instanceof Error ? err.message : "Upload failed"
          }`
        );
      }

      setProgress(Math.round(((i + 1) / files.length) * 100));
    }

    setUploading(false);

    if (uploadedCount > 0) {
      setSuccess(
        `${uploadedCount} document${uploadedCount > 1 ? "s" : ""} uploaded successfully.`
      );
    }

    if (failedFiles.length > 0) {
      setError(failedFiles.join("\n"));
    }

    if (failedFiles.length === 0) {
      setFiles([]);
      setDescription("");
      if (inputRef.current) inputRef.current.value = "";
    }
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

        <p className="mt-5 text-sm font-medium text-violet-600">
          Your workspace
        </p>

        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
          Upload documents
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Add academic PDFs to make them searchable in CampusMind.
        </p>
      </div>

      <form
        onSubmit={handleUpload}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
      >
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
          onClick={() => !uploading && inputRef.current?.click()}
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
            PDF files only · Maximum 25 MB per file
          </p>

          <input
            ref={inputRef}
            type="file"
            accept=".pdf,application/pdf"
            multiple
            className="hidden"
            disabled={uploading}
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
                type="button"
                onClick={() => setFiles([])}
                disabled={uploading}
                className="text-xs text-slate-500 hover:text-red-600 disabled:opacity-40"
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
                    type="button"
                    onClick={() => removeFile(index)}
                    disabled={uploading}
                    className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-500 disabled:opacity-40"
                    aria-label={`Remove ${file.name}`}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 space-y-5">
          <h3 className="text-sm font-semibold text-slate-900">
            Document information
          </h3>

          <div>
            <label className="mb-2 block text-xs font-medium text-slate-700">
              Subject *
            </label>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Data Structures and Algorithms"
              required
              disabled={uploading}
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-violet-400 focus:bg-white"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-medium text-slate-700">
                Semester *
              </label>
              <select
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                required
                disabled={uploading}
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-violet-400 focus:bg-white"
              >
                <option value="">Select semester</option>
                {Array.from({ length: 8 }, (_, i) => (
                  <option key={i + 1} value={String(i + 1)}>
                    Semester {i + 1}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium text-slate-700">
                Academic year *
              </label>
              <input
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                placeholder="e.g. 2026"
                required
                disabled={uploading}
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-violet-400 focus:bg-white"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-medium text-slate-700">
                Document type *
              </label>
              <select
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
                disabled={uploading}
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-violet-400 focus:bg-white"
              >
                <option value="NOTES">Notes</option>
                <option value="QUESTION_PAPER">Question Paper</option>
                <option value="ASSIGNMENT">Assignment</option>
                <option value="SYLLABUS">Syllabus</option>
                <option value="BOOK">Book</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium text-slate-700">
                Visibility *
              </label>
              <select
                value={visibility}
                onChange={(e) => setVisibility(e.target.value)}
                disabled={uploading}
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-violet-400 focus:bg-white"
              >
                <option value="PUBLIC">Public</option>
                <option value="PRIVATE">Private</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium text-slate-700">
              Description (optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Briefly describe this document..."
              rows={3}
              disabled={uploading}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-violet-400 focus:bg-white"
            />
          </div>
        </div>

        {error && (
          <div className="mt-5 flex gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-xs text-red-700">
            <AlertCircle size={17} className="shrink-0" />
            <p className="whitespace-pre-line">{error}</p>
          </div>
        )}

        {success && (
          <div className="mt-5 flex gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs text-emerald-700">
            <CheckCircle2 size={17} className="shrink-0" />
            {success}
          </div>
        )}

        {uploading && (
          <div className="mt-5">
            <div className="mb-2 flex justify-between text-xs text-slate-500">
              <span>Uploading documents...</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-violet-600 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={uploading || files.length === 0}
          className="mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-900 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {uploading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload size={16} />
              Upload {files.length > 0 ? `${files.length} ` : ""}
              document{files.length === 1 ? "" : "s"}
            </>
          )}
        </button>
      </form>

      <div className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
        <LockKeyhole
          className="mt-0.5 shrink-0 text-amber-700"
          size={17}
        />
        <div>
          <p className="text-xs font-semibold text-amber-900">
            Your documents, your control
          </p>
          <p className="mt-1 text-xs leading-5 text-amber-800">
            Private documents are accessible only to their owner and
            authorized administrators. Public documents can be discovered
            by other users.
          </p>
        </div>
      </div>
    </div>
  );
}
