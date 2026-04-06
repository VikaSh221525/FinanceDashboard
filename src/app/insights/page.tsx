"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from "recharts";
import { useStore } from "@/store/useStore";

const pieData = [
  { name: "Cloud Infrastructure", value: 5241 },
  { name: "Other", value: 7241 }, // Mocked value to make it 42%
];
const COLORS = ["#ffffff", "#d4d4d4"];

const barData = [
  { name: "NOV", previous: 3000, current: 4000 },
  { name: "DEC", previous: 2200, current: 1500 },
  { name: "JAN", previous: 3500, current: 4800 },
  { name: "FEB", previous: 2800, current: 3200 },
  { name: "MAR*", previous: 2000, current: 2500 },
];

const insights = [
  {
    title: "Automated Observation",
    icon: "auto_awesome",
    color: "text-tertiary-container",
    borderColor: "border-tertiary-container",
    description: (
      <>
        Your <span className="text-tertiary-container font-bold">SaaS spending is up 12%</span> compared to the Q1 benchmark. Three redundant workspace licenses detected.
      </>
    ),
    action: "Take Action",
    time: "Generated 2h ago"
  },
  {
    title: "Efficiency Benchmark",
    icon: "insights",
    color: "text-white",
    borderColor: "border-primary",
    description: (
      <>
        Total operational efficiency has <span className="text-white font-bold">improved by 8.4%</span>. Your unit cost per transaction is now at an all-time low.
      </>
    ),
    action: "View Breakdown",
    time: "Generated 5h ago"
  },
  {
    title: "Anomalous Activity",
    icon: "warning",
    color: "text-error",
    borderColor: "border-error",
    description: (
      <>
        A <span className="text-error font-bold">unusual spike of $2,400</span> was recorded in 'Marketing - Miscellaneous' on Tuesday. Flagged for review.
      </>
    ),
    action: "Audit Entry",
    time: "Generated 10m ago"
  }
];

export default function InsightsPage() {
  const { role } = useStore();

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 md:space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div className="space-y-1">
          <h2 className="text-3xl font-extrabold tracking-tight text-white font-headline">
            Insights Engine
          </h2>
          <p className="text-on-surface-variant text-sm">
            Real-time behavior analysis and financial forecasting.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-surface-container-high border border-outline-variant/15 rounded-xl text-xs font-semibold text-white hover:bg-surface-container-highest transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">calendar_today</span>
            Last 30 Days
          </button>
          {role === 'admin' && (
            <button className="px-4 py-2 bg-primary text-on-primary rounded-xl text-xs font-bold hover:opacity-90 transition-opacity flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">download</span>
              Export Report
            </button>
          )}
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Highest Spending Category */}
        <div className="col-span-12 lg:col-span-5 bg-surface-container p-6 rounded-xl border border-outline-variant/10 flex flex-col">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="text-lg font-bold text-white leading-tight">
                Highest Spending Category
              </h3>
              <p className="text-xs text-on-surface-variant">
                Cloud Infrastructure accounts for 42% of total burn
              </p>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant">
              analytics
            </span>
          </div>
          <div className="relative flex-1 flex flex-col items-center justify-center py-4 min-h-[250px]">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={75}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-black text-white tracking-tighter">
                $5,241
              </span>
              <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-semibold">
                Cloud Infrastructure
              </span>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-outline-variant/10">
            <div className="flex items-center justify-between text-xs">
              <span className="text-on-surface-variant">Category Growth</span>
              <span className="text-white font-bold">+12.4% vs prev month</span>
            </div>
          </div>
        </div>

        {/* Monthly Comparison */}
        <div className="col-span-12 lg:col-span-7 bg-surface-container p-6 rounded-xl border border-outline-variant/10">
          <div className="flex justify-between items-start mb-12">
            <div>
              <h3 className="text-lg font-bold text-white leading-tight">
                Monthly Burn Comparison
              </h3>
              <p className="text-xs text-on-surface-variant">
                Aggregated spending trend vs previous cycle
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-surface-container-highest rounded-sm"></div>
                <span className="text-[10px] text-on-surface-variant uppercase font-bold">
                  Previous
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-white rounded-sm"></div>
                <span className="text-[10px] text-on-surface-variant uppercase font-bold">
                  Current
                </span>
              </div>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between px-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} barGap={4}>
                <XAxis 
                   dataKey="name" 
                   axisLine={false} 
                   tickLine={false} 
                   tick={{ fill: '#c6c6c6', fontSize: 10, fontWeight: 700 }}
                   dy={10} 
                />
                <Tooltip 
                   cursor={{ fill: '#ffffff10' }}
                   contentStyle={{ backgroundColor: '#2a2a2a', border: '1px solid #474747', borderRadius: '8px', color: '#fff' }}
                />
                <Bar dataKey="previous" fill="#353534" radius={[2, 2, 0, 0]} barSize={16} />
                <Bar dataKey="current" fill="#ffffff" radius={[2, 2, 0, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Automated Observations */}
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {insights.map((insight, idx) => (
            <div key={idx} className={`bg-surface-container-lowest p-6 rounded-xl border-t-2 ${insight.borderColor} shadow-xl flex flex-col`}>
              <div className="flex items-center gap-3 mb-4">
                <span className={`material-symbols-outlined ${insight.color} text-xl`}>
                  {insight.icon}
                </span>
                <h4 className="font-bold text-white text-xs uppercase tracking-widest">
                  {insight.title}
                </h4>
              </div>
              <p className="text-sm text-on-surface leading-relaxed mb-4 flex-1">
                {insight.description}
              </p>
              <div className="flex items-center justify-between mt-auto pt-2">
                <button className={`text-[10px] font-black uppercase tracking-widest ${insight.color} hover:underline`}>
                  {insight.action}
                </button>
                <span className="text-[10px] text-on-surface-variant">
                  {insight.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Regional & Stats */}
        <div className="col-span-12 lg:col-span-8 bg-surface-container p-6 rounded-xl border border-outline-variant/10">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-black uppercase tracking-widest text-white">
              Global Operational Reach
            </h3>
            <div className="flex gap-2">
              <span className="text-[10px] text-on-surface-variant font-bold uppercase">
                Live Metrics
              </span>
            </div>
          </div>
          <div className="aspect-[21/9] rounded-lg overflow-hidden bg-surface-container-lowest relative border border-outline-variant/5">
            <div className="absolute inset-0 opacity-20 grayscale" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDy-BzTzuYoeTGv4lRi9PowJ7lli_Wz_JkBCuxk9d2cmADUIJ-dEGqrKzDMRxYs0ujuu_H1gx7D5BliWBUbT8v6yhl7OhsLo-VjwUY_NbUJc8FHFidSpCp_b0XQh0j95rkZKDDmWV_PfMA8Oooh3BkBrvOhk7NYZUJVvaN2sxQpX_PXo-x2TxNMgXx-5mr-GAMfJcxSOvumdpvtmW37PbSVkuJvt9k3TNnO5nFmkC8Yap_NDsKTVywQs3FMV4VH003FQ-gxc01-llIZ')", backgroundSize: 'cover'}}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="p-6 bg-[#131313]/90 backdrop-blur-md rounded-xl border border-white/10 text-center shadow-2xl">
                <p className="text-[10px] uppercase tracking-widest text-on-surface-variant mb-1 font-bold">
                  Dominant Market
                </p>
                <p className="text-xl font-black text-white">North America</p>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <span className="text-2xl font-black text-tertiary-container">
                    $8.2M
                  </span>
                  <span className="text-[10px] text-on-surface-variant font-bold">
                    ANNUALIZED
                  </span>
                </div>
              </div>
            </div>
            <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-tertiary-container rounded-full animate-pulse shadow-[0_0_15px_#618bff]"></div>
            <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-white rounded-full animate-pulse shadow-[0_0_15px_#ffffff]"></div>
          </div>
        </div>

        {/* Optimization & Action Card */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <div className="flex-1 bg-surface-container-highest/30 p-6 rounded-xl border border-outline-variant/10 relative overflow-hidden flex flex-col justify-center">
            <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-black mb-4">
              Health Index
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-6xl font-black text-white">94</span>
              <span className="text-xl font-bold text-on-surface-variant">
                / 100
              </span>
            </div>
            <p className="text-xs text-on-surface-variant mt-4 leading-relaxed font-medium">
              Your financial architecture is performing in the top 2% of peers
              in the technology sector.
            </p>
            <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-9xl opacity-5 transform rotate-12">
              verified
            </span>
          </div>
          <div className="bg-primary p-6 rounded-xl flex items-center justify-between group cursor-pointer hover:bg-white transition-all">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-on-primary">
                Upgrade Engine
              </p>
              <p className="text-sm font-bold text-on-primary mt-1">
                Unlock AI Predictive Models
              </p>
            </div>
            <span className="material-symbols-outlined text-on-primary transform group-hover:translate-x-2 transition-transform">
              arrow_forward_ios
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
