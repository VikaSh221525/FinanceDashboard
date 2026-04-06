"use client";

import { useStore } from "@/store/useStore";
import { useState } from "react";
import clsx from "clsx";

export default function SettingsPage() {
  const { role } = useStore();
  const [currency, setCurrency] = useState("USD");
  const [notifications, setNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 md:space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-4">
        <div className="space-y-1">
          <h2 className="text-3xl font-extrabold tracking-tight text-white font-headline">
            System Settings
          </h2>
          <p className="text-on-surface-variant text-sm">
            Manage your interface preferences and account security.
          </p>
        </div>
        <button className="px-4 py-2 bg-primary text-on-primary rounded-xl text-xs font-bold hover:opacity-90 transition-opacity">
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Profile Card */}
        <div className="col-span-1 lg:col-span-1 space-y-6">
          <div className="bg-surface-container p-6 rounded-xl border border-outline-variant/10 text-center flex flex-col items-center">
             <div className="w-24 h-24 rounded-full bg-surface-container-highest border-4 border-outline-variant/20 flex items-center justify-center text-white text-2xl font-bold mb-4">
               MT
             </div>
             <h3 className="text-xl font-bold text-white">Marcus Thorne</h3>
             <p className="text-[10px] text-tertiary-container font-black mt-1 uppercase tracking-widest px-3 py-1 bg-tertiary-container/10 rounded-full">{role}</p>
             <p className="text-xs text-on-surface-variant mt-3 max-w-[200px] leading-relaxed">
               Zorvyn Lead Architect and Principal Sandbox User.
             </p>
          </div>
          
          <div className="bg-surface-container p-6 rounded-xl border border-outline-variant/10 space-y-4">
            <h4 className="text-[10px] uppercase font-black tracking-widest text-on-surface-variant">Active Session</h4>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-emerald-500">desktop_windows</span>
              <div>
                <p className="text-sm font-bold text-white">Windows 11 • Chrome</p>
                <p className="text-[10px] text-on-surface-variant mt-0.5">Global, IP 192.168.1.1</p>
              </div>
            </div>
            <button className="w-full mt-4 py-2 border border-error/50 text-error rounded-lg text-xs font-bold hover:bg-error/10 transition-colors">
              Revoke All Sessions
            </button>
          </div>
        </div>

        {/* Preferences & Security */}
        <div className="col-span-1 lg:col-span-2 space-y-6">
          
          <div className="bg-surface-container p-6 rounded-xl border border-outline-variant/10">
            <div className="flex items-center gap-2 mb-6 border-b border-outline-variant/10 pb-4">
              <span className="material-symbols-outlined text-white">tune</span>
              <h3 className="text-lg font-bold text-white">Global Preferences</h3>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold ml-1">Base Currency</label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-lg py-3 px-4 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-white/20 transition-all text-white appearance-none"
                  >
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold ml-1">Timezone</label>
                  <select
                    className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-lg py-3 px-4 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-white/20 transition-all text-white appearance-none"
                  >
                    <option value="EST">Eastern Standard Time (EST)</option>
                    <option value="PST">Pacific Standard Time (PST)</option>
                    <option value="UTC">Coordinated Universal Time (UTC)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-surface-container p-6 rounded-xl border border-outline-variant/10">
            <div className="flex items-center gap-2 mb-6 border-b border-outline-variant/10 pb-4">
              <span className="material-symbols-outlined text-white">shield</span>
              <h3 className="text-lg font-bold text-white">Security Controls</h3>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Push Notifications</h4>
                  <p className="text-xs text-on-surface-variant mt-1">Receive alerts for anomalous transactions.</p>
                </div>
                <button 
                  onClick={() => setNotifications(!notifications)}
                  className={clsx(
                    "w-12 h-6 rounded-full relative transition-colors",
                    notifications ? "bg-primary" : "bg-surface-container-highest"
                  )}
                >
                  <div className={clsx(
                    "w-4 h-4 rounded-full bg-white absolute top-1 transition-transform",
                    notifications ? "right-1" : "left-1"
                  )}></div>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Two-Factor Authentication</h4>
                  <p className="text-xs text-on-surface-variant mt-1">Require an extra security step during login.</p>
                </div>
                <button 
                  onClick={() => setTwoFactor(!twoFactor)}
                  className={clsx(
                    "w-12 h-6 rounded-full relative transition-colors",
                    twoFactor ? "bg-primary" : "bg-surface-container-highest"
                  )}
                >
                  <div className={clsx(
                    "w-4 h-4 rounded-full bg-white absolute top-1 transition-transform",
                    twoFactor ? "right-1" : "left-1"
                  )}></div>
                </button>
              </div>
            </div>
          </div>

          {role === 'viewer' && (
            <div className="bg-error/10 p-4 rounded-xl border border-error/20 flex gap-3 text-error">
              <span className="material-symbols-outlined">lock</span>
              <div>
                 <p className="text-sm font-bold">Read-Only Mode</p>
                 <p className="text-xs mt-1">You are currently viewing these settings as a Viewer. You cannot persist any changes.</p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
