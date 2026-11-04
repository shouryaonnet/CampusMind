"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  BrainCircuit,
  FileSearch,
  FileText,
  Filter,
  Search,
  ShieldCheck,
  Sparkles,
  Upload,
  Zap,
  GraduationCap,
  CheckCircle2,
  Library,
  Clock3,
  SearchCheck,
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";

const features = [
  {
    icon: FileSearch,
    title: "Full-text PDF Search",
    description:
      "Find information inside academic PDFs without opening every document individually.",
  },
  {
    icon: Zap,
    title: "Smart Relevance Ranking",
    description:
      "Relevant documents appear first using information retrieval and BM25 ranking.",
  },
  {
    icon: Filter,
    title: "Powerful Filters",
    description:
      "Filter resources by subject, semester, academic year and document type.",
  },
  {
    icon: BrainCircuit,
    title: "Similar Documents",
    description:
      "Discover other academic documents with content similar to your reference.",
  },
  {
    icon: Upload,
    title: "Easy Document Upload",
    description:
      "Contribute academic resources and make them searchable for students.",
  },
  {
    icon: ShieldCheck,
    title: "Organized Resources",
    description:
      "Access a structured academic library with document management and permissions.",
  },
];

const steps = [
  {
    number: "01",
    title: "Upload documents",
    description: "Academic PDFs are uploaded and prepared for processing.",
    icon: Upload,
  },
  {
    number: "02",
    title: "We index the content",
    description: "Text is extracted and organized into a searchable index.",
    icon: FileText,
  },
  {
    number: "03",
    title: "Search and discover",
    description: "Find relevant documents and useful information quickly.",
    icon: Search,
  },
];

const sampleDocuments = [
  {
    title: "Operating System - Unit 3 Notes",
    type: "Lecture Notes",
    pages: "42 pages",
    score: "98%",
  },
  {
    title: "CPU Scheduling Algorithms",
    type: "Study Material",
    pages: "28 pages",
    score: "94%",
  },
  {
    title: "OS Previous Year Questions",
    type: "Question Paper",
    pages: "12 pages",
    score: "87%",
  },
];

const libraryItems = [
  {
    icon: FileText,
    title: "Lecture notes",
    sub: "Organized by subject and semester",
  },
  {
    icon: BookOpen,
    title: "Study material",
    sub: "Useful concepts and explanations",
  },
  {
    icon: Library,
    title: "Previous year papers",
    sub: "Practice with academic question papers",
  },
];

export default function Home() {
  return (
    <main className="overflow-hidden bg-white text-slate-900">
      <Navbar />

      {/* HERO */}
      <section className="relative bg-[#fbfbfd]">
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <div className="absolute left-1/2 top-0 h-[420px] w-[700px] -translate-x-1/2 rounded-full bg-violet-100/40 blur-[120px]" />
        </div>

        <div className="container-main relative grid items-center gap-12 py-14 sm:py-16 lg:min-h-[570px] lg:grid-cols-2 lg:gap-14 lg:py-16">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ y: 16 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="relative z-10"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-600 shadow-sm">
              <Sparkles size={14} className="text-violet-600" />
              A smarter way to discover knowledge
            </div>

            <h1 className="max-w-xl text-[38px] font-bold leading-[1.12] tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-[56px]">
              Your academic world.
              <span className="mt-1 block text-violet-700">
                One search away.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              Stop searching through endless folders and PDFs. Discover
              academic notes, lecture materials, syllabi and previous-year
              papers with CampusMind.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/search"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-violet-800"
              >
                Explore documents
                <ArrowRight size={17} />
              </Link>

              <Link
                href="#how-it-works"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                See how it works
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-xs font-medium text-slate-500">
              {[
                "Search inside PDFs",
                "Relevant results",
                "No login required",
              ].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-violet-600" />
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          {/* RIGHT SEARCH PREVIEW */}
          <motion.div
            initial={{ y: 18 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
            className="relative mx-auto w-full max-w-[510px] px-2 pb-5 pt-5 sm:px-4"
          >
            {/* Floating labels sit outside the card, not over its content */}
            <div className="absolute -top-1 right-5 z-20 flex animate-[float_5s_ease-in-out_infinite] items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-[11px] font-medium text-slate-600 shadow-md sm:right-0">
              <SearchCheck size={14} className="text-violet-600" />
              Content-based search
            </div>

            <div className="absolute -bottom-1 left-5 z-20 flex animate-[float_6s_ease-in-out_infinite] items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-[11px] font-medium text-slate-600 shadow-md sm:left-0">
              <Clock3 size={14} className="text-violet-600" />
              Find results faster
            </div>

            <div className="relative rounded-[26px] border border-slate-200 bg-white p-5 shadow-[0_20px_65px_rgba(15,23,42,0.07)] sm:p-7">
              <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Discover resources
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Academic document search
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-800">
                  <GraduationCap size={21} />
                </div>
              </div>

              <div className="mt-5 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5">
                <Search size={18} className="shrink-0 text-violet-600" />
                <span className="min-w-0 flex-1 truncate text-sm text-slate-600">
                  Operating System scheduling
                </span>
                <span className="rounded-md bg-white px-2 py-1 text-[9px] font-semibold tracking-wide text-slate-500">
                  QUERY
                </span>
              </div>

              <div className="mb-3 mt-6 flex items-center justify-between">
                <p className="text-xs font-semibold text-slate-700">
                  SAMPLE SEARCH RESULTS
                </p>
                <span className="text-[10px] font-medium text-violet-700">
                  Relevance ranked
                </span>
              </div>

              <div className="space-y-2.5">
                {sampleDocuments.map((doc) => (
                  <div
                    key={doc.title}
                    className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-3 transition hover:border-violet-200 hover:bg-slate-50/70"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                      <FileText size={19} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-semibold text-slate-800">
                        {doc.title}
                      </p>
                      <p className="mt-1 text-[10px] text-slate-400">
                        {doc.type} · {doc.pages}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs font-semibold text-violet-700">
                        {doc.score}
                      </p>
                      <p className="text-[9px] text-slate-400">Match</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-3 text-xs text-slate-600">
                <Sparkles size={14} className="shrink-0 text-violet-600" />
                Find knowledge, not just filenames.
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="bg-white py-16 sm:py-20">
        <div className="container-main">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-[11px] font-bold tracking-[0.2em] text-violet-700">
              WHAT CAMPUSMIND OFFERS
            </span>

            <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
              Everything you need to find academic knowledge.
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base">
              A centralized academic library designed to make document
              discovery faster, simpler and more relevant.
            </p>
          </div>

          <div className="mt-11 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  initial={false}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg hover:shadow-slate-200/50"
                >
                  <div className="mb-5 inline-flex rounded-xl bg-slate-100 p-3 text-slate-700 transition group-hover:bg-violet-50 group-hover:text-violet-700">
                    <Icon size={22} />
                  </div>

                  <h3 className="text-base font-semibold text-slate-900">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="bg-[#f8f9fc] py-16 sm:py-20">
        <div className="container-main">
          <div className="mx-auto max-w-xl text-center">
            <span className="text-[11px] font-bold tracking-[0.2em] text-violet-700">
              SIMPLE WORKFLOW
            </span>

            <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
              From documents to discovery.
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-500">
              CampusMind transforms scattered academic PDFs into an organized,
              searchable knowledge collection.
            </p>
          </div>

          <div className="mt-11 grid gap-4 md:grid-cols-3">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="rounded-2xl border border-slate-200 bg-white p-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="rounded-xl bg-slate-100 p-3 text-slate-800">
                      <Icon size={22} />
                    </div>

                    <span className="text-3xl font-bold text-slate-100">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-6 text-base font-semibold text-slate-900">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PUBLIC ACCESS */}
      <section id="about" className="bg-white py-16 sm:py-20">
        <div className="container-main grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="text-[11px] font-bold tracking-[0.2em] text-violet-700">
              OPEN KNOWLEDGE
            </span>

            <h2 className="mt-4 max-w-lg text-2xl font-bold leading-tight tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
              Great academic resources should be easy to find.
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
              CampusMind makes public academic resources accessible to
              everyone. Search documents, explore their contents and download
              available PDFs without signing in.
            </p>

            <div className="mt-7 space-y-4">
              {[
                "Search without creating an account",
                "Explore public academic documents",
                "Read and download available PDFs",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm font-medium text-slate-700"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-50 text-violet-700">
                    <CheckCircle2 size={15} />
                  </span>
                  {item}
                </div>
              ))}
            </div>

            <Link
              href="/search"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-violet-800"
            >
              Start searching
              <ArrowRight size={17} />
            </Link>
          </div>

          {/* LIBRARY PREVIEW */}
          <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-[0_18px_55px_rgba(15,23,42,0.06)] sm:p-7">
            <div className="flex items-center justify-between border-b border-slate-100 pb-5">
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  Your academic library
                </h3>
                <p className="mt-1 text-xs text-slate-400">
                  Discover resources from anywhere
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-800">
                <Library size={21} />
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {libraryItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex items-center gap-4 rounded-xl border border-slate-100 p-4 transition hover:bg-slate-50"
                  >
                    <div className="rounded-xl bg-slate-100 p-3 text-slate-700">
                      <Icon size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        {item.title}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        {item.sub}
                      </p>
                    </div>
                    <ArrowUpRight
                      size={16}
                      className="ml-auto text-slate-300"
                    />
                  </div>
                );
              })}
            </div>

            <div className="mt-5 rounded-xl bg-[#f8f9fc] p-4">
              <p className="text-xs leading-6 text-slate-600">
                Browse public resources freely. Create an account when you want
                to upload or save your own documents.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#f8f9fc] px-5 py-14 sm:py-16">
        <div className="container-main">
          <div className="relative overflow-hidden rounded-[26px] bg-slate-950 px-6 py-12 text-center sm:px-12 sm:py-14">
            <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-violet-700/15 blur-[90px]" />

            <div className="relative mx-auto max-w-2xl">
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-violet-300">
                <BookOpen size={24} />
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                Make every search count.
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
                Your next useful lecture note, important concept or previous
                year question paper could be just one search away.
              </p>

              <Link
                href="/search"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-slate-100"
              >
                Explore CampusMind
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white py-7">
        <div className="container-main flex flex-col items-center justify-between gap-4 sm:flex-row">
          <Link href="/" className="flex items-center gap-2">
            <BookOpen size={19} className="text-violet-700" />
            <span className="font-bold text-slate-900">
              Campus<span className="text-violet-700">Mind</span>
            </span>
          </Link>

          <p className="text-center text-xs text-slate-400">
            Find the knowledge inside your documents.
          </p>

          <p className="text-xs text-slate-400">
            © 2026 CampusMind. Academic Project.
          </p>
        </div>
      </footer>
    </main>
  );
}