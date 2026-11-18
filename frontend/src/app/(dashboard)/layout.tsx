"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import { getCurrentUser, getToken, removeToken } from "@/lib/api";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function verifyAuthentication() {
      const token = getToken();

      if (!token) {
        router.replace("/login");
        return;
      }

      try {
        await getCurrentUser();
        setChecking(false);
      } catch {
        removeToken();
        router.replace("/login");
      }
    }

    verifyAuthentication();
  }, [router]);

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f8fc]">
        <p className="text-sm font-medium text-slate-500">
          Verifying your CampusMind account...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f8fc]">
      <Sidebar />

      <div className="min-h-screen md:ml-[260px]">
        <Topbar />

        <main className="px-5 py-6 sm:px-8 lg:px-10">
          {children}
        </main>
      </div>
    </div>
  );
}