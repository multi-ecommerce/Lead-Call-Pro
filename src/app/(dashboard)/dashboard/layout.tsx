"use client";
import DashboardSideNav from "@/components/DashboardSideNav";
import { cn } from "@/lib/utils";
import { ArrowDown, Menu } from "lucide-react";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <main className="flex flex-row h-screen overflow-hidden">
      <div
        className={cn(
          "bg-white w-full max-w-56 min-h-screen transition-transform duration-300 z-40",
          "fixed left-0 top-0",
          "lg:relative lg:translate-x-0",
          {
            "-translate-x-full": !sidebarOpen,
            "translate-x-0": sidebarOpen,
          }
        )}
      >
        <DashboardSideNav closeSidebar={() => setSidebarOpen(false)} />
      </div>

      <div className="flex flex-1 flex-col bg-[#f3f6f9]">
        <div className="bg-yellow-100 h-12 flex justify-between items-center p-6 border-b">
          <div className="lg:hidden flex items-center">
            <button onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu />
            </button>
          </div>
          <div className="text-lg font-bold font-sans text-blue-600">
            Lead Call Pro
          </div>
          <div>
            <ArrowDown size={18} />
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4">{children}</div>
      </div>
    </main>
  );
}
