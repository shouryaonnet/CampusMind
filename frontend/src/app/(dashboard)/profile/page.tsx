
"use client";

import { useEffect, useState } from "react";
import {
  UserRound,
  Mail,
  GraduationCap,
  BookOpen,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import { getCurrentUser, UserResponse } from "@/lib/api";

export default function ProfilePage() {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .catch((err) => setError(err.message || "Unable to load profile."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="animate-spin text-indigo-600" size={28} />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="rounded-2xl border border-red-100 bg-white p-8 text-center">
        <p className="font-semibold text-red-600">
          {error || "Profile not found"}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white"
        >
          Try again
        </button>
      </div>
    );
  }

  const initials = user.fullName
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="mx-auto max-w-6xl space-y-7">
      <div>
        <p className="text-sm font-medium text-indigo-600">Account</p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900">
          My Profile
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Your registered CampusMind account information.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-indigo-100 text-2xl font-bold text-indigo-700">
              {initials}
            </div>

            <h2 className="mt-4 text-lg font-bold text-slate-900">
              {user.fullName}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {user.role.replaceAll("_", " ")}
            </p>

            <div className="mt-4 flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
              <ShieldCheck size={14} />
              Active Account
            </div>
          </div>

          <div className="my-6 border-t border-slate-100" />

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm text-slate-500">
              <GraduationCap size={18} className="text-indigo-500" />
              CampusMind Student
            </div>

            <div className="flex items-center gap-3 text-sm text-slate-500">
              <BookOpen size={18} className="text-indigo-500" />
              Academic Workspace
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-base font-bold text-slate-900">
            Personal Information
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Information retrieved directly from your account.
          </p>

          <div className="mt-7 grid gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-600">
                Full Name
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <UserRound size={17} className="text-slate-400" />
                <span className="text-sm text-slate-800">
                  {user.fullName}
                </span>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-600">
                Email Address
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <Mail size={17} className="text-slate-400" />
                <span className="break-all text-sm text-slate-800">
                  {user.email}
                </span>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-600">
                Account Role
              </label>

              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800">
                {user.role}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-600">
                Account ID
              </label>

              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
                {user.id}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-5">
        <div className="flex items-start gap-3">
          <ShieldCheck size={20} className="mt-0.5 text-indigo-600" />
          <div>
            <h3 className="text-sm font-bold text-slate-800">
              Your information is secure
            </h3>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              Your account information is retrieved from the authenticated
              CampusMind backend.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
