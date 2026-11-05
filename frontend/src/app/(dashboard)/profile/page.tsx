"use client";

import { useState } from "react";
import {
  UserRound, Mail, GraduationCap, BookOpen,
  CalendarDays, Pencil, Save, X, ShieldCheck,
} from "lucide-react";

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("Student User");
  const [email, setEmail] = useState("student@example.com");
  const [department, setDepartment] = useState("Computer Science & Engineering");
  const [semester, setSemester] = useState("6th Semester");

  const handleSave = () => setEditing(false);

  return (
    <div className="mx-auto max-w-6xl space-y-7">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-indigo-600">Account</p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">My Profile</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage your personal and academic information.
          </p>
        </div>

        <button
          onClick={() => editing ? setEditing(false) : setEditing(true)}
          className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-indigo-200 hover:text-indigo-600"
        >
          {editing ? <X size={16} /> : <Pencil size={16} />}
          {editing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
              <UserRound size={42} />
            </div>
            <h2 className="mt-4 text-lg font-bold text-slate-900">{name}</h2>
            <p className="mt-1 text-sm text-slate-500">Student Account</p>

            <div className="mt-4 flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
              <ShieldCheck size={14} />
              Active Account
            </div>
          </div>

          <div className="my-6 border-t border-slate-100" />

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm text-slate-500">
              <GraduationCap size={18} className="text-indigo-500" />
              B.Tech Student
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-500">
              <BookOpen size={18} className="text-indigo-500" />
              CampusMind Member
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-500">
              <CalendarDays size={18} className="text-indigo-500" />
              Joined November 2026
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-base font-bold text-slate-900">Personal Information</h2>
          <p className="mt-1 text-sm text-slate-500">
            Your basic account and academic details.
          </p>

          <div className="mt-7 grid gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-600">
                Full Name
              </label>
              <input
                value={name}
                disabled={!editing}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-400 disabled:opacity-80"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-600">
                Email Address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={email}
                  disabled={!editing}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-800 outline-none focus:border-indigo-400 disabled:opacity-80"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-600">
                Department
              </label>
              <input
                value={department}
                disabled={!editing}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none focus:border-indigo-400 disabled:opacity-80"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-600">
                Current Semester
              </label>
              <input
                value={semester}
                disabled={!editing}
                onChange={(e) => setSemester(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none focus:border-indigo-400 disabled:opacity-80"
              />
            </div>
          </div>

          {editing && (
            <div className="mt-8 flex justify-end">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                <Save size={16} />
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-5">
        <div className="flex items-start gap-3">
          <ShieldCheck size={20} className="mt-0.5 text-indigo-600" />
          <div>
            <h3 className="text-sm font-bold text-slate-800">Your information is important</h3>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              Your profile details help CampusMind organize your academic workspace.
              Account information will be securely managed through the backend.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}