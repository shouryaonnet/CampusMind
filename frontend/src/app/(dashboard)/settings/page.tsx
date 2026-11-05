"use client";

import { useState } from "react";
import {
  Bell, LockKeyhole, ShieldCheck, Eye,
  Mail, Smartphone, Globe, Save,
} from "lucide-react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    documentUpdates: true,
    searchRecommendations: false,
    publicProfile: true,
    activityStatus: false,
  });

  const [saved, setSaved] = useState(false);

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));
    setSaved(false);
  };

  const Toggle = ({
    label,
    description,
    setting,
  }: {
    label: string;
    description: string;
    setting: keyof typeof settings;
  }) => (
    <div className="flex items-center justify-between gap-4 py-4">
      <div>
        <p className="text-sm font-semibold text-slate-800">{label}</p>
        <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={settings[setting]}
        onClick={() => toggleSetting(setting)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          settings[setting] ? "bg-indigo-600" : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${
            settings[setting] ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="mx-auto max-w-5xl space-y-7">
      <div>
        <p className="text-sm font-medium text-indigo-600">Account</p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900">Settings</h1>
        <p className="mt-1 text-sm text-slate-500">
          Customize your CampusMind experience and preferences.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <div className="h-fit rounded-2xl border border-slate-200 bg-white p-3">
          {[
            { name: "Notifications", icon: Bell },
            { name: "Privacy", icon: Eye },
            { name: "Security", icon: LockKeyhole },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.name}
                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium ${
                  index === 0
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-500"
                }`}
              >
                <Icon size={17} />
                {item.name}
              </div>
            );
          })}
        </div>

        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-indigo-50 p-2.5 text-indigo-600">
                <Bell size={19} />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">Notifications</h2>
                <p className="text-xs text-slate-500">Choose what updates you receive.</p>
              </div>
            </div>

            <div className="mt-4 divide-y divide-slate-100">
              <Toggle
                label="Email Notifications"
                description="Receive important account updates through email."
                setting="emailNotifications"
              />
              <Toggle
                label="Document Updates"
                description="Get notified about new academic documents."
                setting="documentUpdates"
              />
              <Toggle
                label="Search Recommendations"
                description="Receive recommendations based on your searches."
                setting="searchRecommendations"
              />
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-violet-50 p-2.5 text-violet-600">
                <ShieldCheck size={19} />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">Privacy</h2>
                <p className="text-xs text-slate-500">Control your profile visibility.</p>
              </div>
            </div>

            <div className="mt-4 divide-y divide-slate-100">
              <Toggle
                label="Public Profile"
                description="Allow other users to view your basic profile."
                setting="publicProfile"
              />
              <Toggle
                label="Activity Status"
                description="Show your activity status to other users."
                setting="activityStatus"
              />
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-600">
                <LockKeyhole size={19} />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">Security</h2>
                <p className="text-xs text-slate-500">Manage your account security.</p>
              </div>
            </div>

            <div className="mt-5 flex flex-col justify-between gap-4 rounded-xl border border-slate-100 p-4 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm font-semibold text-slate-800">Password</p>
                <p className="mt-1 text-xs text-slate-500">
                  Keep your account secure with a strong password.
                </p>
              </div>
              <button
                onClick={() => alert("Password change will be connected to the backend.")}
                className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:border-indigo-300 hover:text-indigo-600"
              >
                Change Password
              </button>
            </div>
          </section>

          <div className="flex flex-col items-end gap-2">
            {saved && (
              <p className="text-xs font-medium text-emerald-600">
                Preferences saved for this session.
              </p>
            )}
            <button
              onClick={() => setSaved(true)}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              <Save size={16} />
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}