"use client";

import { useStore } from "@/store/useStore";

export function TopNav() {
  const { role } = useStore();

  return (
    <header className="fixed top-0 right-0 w-full md:w-[calc(100%-16rem)] h-16 border-b border-outline-variant/15 z-40 bg-[#131313]/90 backdrop-blur-xl flex justify-between items-center px-4 md:px-8 md:ml-64">
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative w-full group">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">
            search
          </span>
          <input
            type="text"
            className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-lg py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-white/20 transition-all placeholder:text-on-surface-variant"
            placeholder="Search accounts or data..."
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-[#353534]/50 rounded-lg transition-colors text-on-surface-variant hover:text-white">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <div className="h-8 w-[1px] bg-outline-variant/20 mx-2"></div>

        {/* Action button conditional based on role */}
        {role === "admin" && (
          <button className="bg-primary text-on-primary px-4 py-1.5 rounded-lg text-sm font-semibold hover:shadow-[0_0_8px_rgba(255,255,255,0.15)] transition-all">
            Export Data
          </button>
        )}
      </div>
    </header>
  );
}
