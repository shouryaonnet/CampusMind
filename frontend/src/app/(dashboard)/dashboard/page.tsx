"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Clock3,
  FileText,
  FolderOpen,
  Search,
  Sparkles,
  Upload,
} from "lucide-react";
import SearchBar from "@/components/dashboard/SearchBar";
import DocumentCard from "@/components/documents/DocumentCard";

const stats = [
  {
    title: "Documents available",
    value: "1,248",
    description: "Across all subjects",
    icon: FileText,
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Your saved documents",
    value: "36",
    description: "In your personal library",
    icon: BookOpen,
    color: "bg-violet-50 text-violet-600",
  },
  {
    title: "Recent searches",
    value: "18",
    description: "Your search activity",
    icon: Search,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "Recently viewed",
    value: "12",
    description: "Documents you opened",
    icon: Clock3,
    color: "bg-orange-50 text-orange-600",
  },
];

const recentDocuments = [
  {
    id: "1",
    title: "Introduction to Database Management Systems",
    subject: "Database Management",
    type: "Lecture Notes",
    pages: 42,
    date: "Nov 3, 2026",
    description:
      "An overview of relational databases, normalization, SQL queries and transaction management.",
  },
  {
    id: "2",
    title: "Operating Systems - Process Management",
    subject: "Operating Systems",
    type: "Study Material",
    pages: 28,
    date: "Nov 2, 2026",
    description:
      "Process scheduling, threads, synchronization and CPU scheduling algorithms.",
  },
  {
    id: "3",
    title: "Computer Networks - Unit 3",
    subject: "Computer Networks",
    type: "Previous Year Paper",
    pages: 16,
    date: "Oct 30, 2026",
    description:
      "Important questions and concepts covering network layer and transport layer protocols.",
  },
];

const quickActions = [
  {
    title: "Search documents",
    description: "Find information inside PDFs",
    href: "/search",
    icon: Search,
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Upload a document",
    description: "Add academic PDFs to CampusMind",
    href: "/upload",
    icon: Upload,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "My library",
    description: "Explore your saved documents",
    href: "/documents",
    icon: FolderOpen,
    color: "bg-violet-50 text-violet-600",
  },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-[1500px] space-y-8">
      <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-blue-600">
            <Sparkles size={16} />
            Your academic workspace
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Welcome back, Student!
          </h1>

          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            Find the right study material. Learn smarter with CampusMind.
          </p>
        </div>

        <Link
          href="/upload"
          className="inline-flex w-fit items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          <Upload size={17} />
          Upload document
        </Link>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-slate-900">
            What are you looking for today?
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Search through academic documents and find relevant information.
          </p>
        </div>

        <SearchBar />
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Your overview
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              A quick look at your CampusMind activity.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.color}`}
                  >
                    <Icon size={21} />
                  </div>
                  <span className="text-xs font-medium text-slate-400">
                    Overview
                  </span>
                </div>

                <p className="mt-5 text-2xl font-bold text-slate-900">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm font-medium text-slate-700">
                  {stat.title}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Quick access
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Jump straight into your workspace.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {quickActions.map((action) => {
            const Icon = action.icon;

            return (
              <Link
                key={action.title}
                href={action.href}
                className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:shadow-md"
              >
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${action.color}`}
                >
                  <Icon size={22} />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-slate-900">
                    {action.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    {action.description}
                  </p>
                </div>

                <ArrowRight
                  size={18}
                  className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-600"
                />
              </Link>
            );
          })}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Recently added documents
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Continue exploring your academic resources.
            </p>
          </div>

          <Link
            href="/documents"
            className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            View all <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {recentDocuments.map((document) => (
            <DocumentCard key={document.id} document={document} />
          ))}
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white sm:p-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-blue-100">
              <Sparkles size={16} />
              Smarter document discovery
            </div>

            <h2 className="text-xl font-bold sm:text-2xl">
              Don&apos;t just search titles. Search knowledge.
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-blue-100">
              Find relevant information across academic PDFs using CampusMind&apos;s
document retrieval system.
            </p>
          </div>

          <Link
            href="/search"
            className="inline-flex w-fit shrink-0 items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
          >
            Explore documents <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </div>
  );
}