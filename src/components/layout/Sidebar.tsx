"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "@/store/useStore";
import clsx from "clsx";

export function Sidebar() {
  const pathname = usePathname();
  const { role, setRole } = useStore();

  const links = [
    { href: "/", label: "Overview", icon: "dashboard" },
    { href: "/transactions", label: "Transactions", icon: "payments" },
    { href: "/insights", label: "Insights", icon: "analytics" },
  ];

  return (
    <>
      <aside className="hidden md:flex h-screen w-64 fixed left-0 top-0 border-r border-outline-variant/15 flex-col py-8 px-4 bg-[#131313] shadow-[20px_0_40px_rgba(0,0,0,0.2)] z-50">
      <div className="mb-10 px-4">
        <h1 className="text-2xl font-bold tracking-wide text-white">
          Zorvyn
        </h1>
        <p className="text-xs text-on-surface-variant tracking-widest uppercase mt-1">
          Wealth Management
        </p>
      </div>

      <nav className="flex-1 space-y-2">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                isActive
                  ? "text-white font-semibold border-r-2 border-white bg-[#201f1f] rounded-l-lg rounded-r-none"
                  : "text-[#c6c6c6] hover:text-white hover:bg-[#201f1f]"
              )}
            >
              <span className="material-symbols-outlined">{link.icon}</span>
              <span className="text-sm">{link.label}</span>
            </Link>
          );
        })}
        {/* Settings is unlinked for now */}
        <button className="flex items-center gap-3 w-full px-4 py-3 text-[#c6c6c6] hover:text-white hover:bg-[#201f1f] rounded-lg transition-all duration-200">
          <span className="material-symbols-outlined">settings</span>
          <span className="text-sm">Settings</span>
        </button>
      </nav>

      {/* Role Based UI Toggle */}
      <div className="mt-4 px-4 py-4 border-t border-outline-variant/10">
        <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-3">
          System Access
        </p>
        <div className="flex bg-surface-container-lowest p-1 rounded-lg border border-outline-variant/10">
          <button
            className={clsx(
              "flex-1 text-[10px] py-1.5 rounded font-bold uppercase transition-all",
              role === "admin"
                ? "bg-white text-black"
                : "text-on-surface-variant hover:text-white"
            )}
            onClick={() => setRole("admin")}
          >
            Admin
          </button>
          <button
            className={clsx(
              "flex-1 text-[10px] py-1.5 rounded font-bold uppercase transition-all",
              role === "viewer"
                ? "bg-white text-black"
                : "text-on-surface-variant hover:text-white"
            )}
            onClick={() => setRole("viewer")}
          >
            Viewer
          </button>
        </div>
      </div>

      <div className="mt-4 px-4 py-4 flex items-center gap-3 bg-surface-container-low rounded-xl border border-outline-variant/10 relative overflow-hidden group">
        {/* Avatar simulation */}
        <div className="w-10 h-10 rounded-full bg-surface-container-highest border border-outline-variant/20 flex items-center justify-center text-white shrink-0">
          MT
        </div>
        <div className="overflow-hidden">
          <p className="text-sm font-semibold text-white truncate">Marcus Thorne</p>
          <p className="text-xs text-on-surface-variant truncate">Lead Architect</p>
        </div>
      </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#131313]/90 backdrop-blur-xl border-t border-outline-variant/15 flex items-center justify-around z-50 px-2">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "flex flex-col items-center justify-center w-full h-full gap-1 transition-colors",
                isActive ? "text-white" : "text-on-surface-variant"
              )}
            >
              <span className="material-symbols-outlined text-[20px]">{link.icon}</span>
              <span className="text-[10px] font-medium">{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
