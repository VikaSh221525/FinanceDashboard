"use client";

import { useStore } from "@/store/useStore";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

const balanceData = [
  { month: "JAN", balance: 1800000 },
  { month: "FEB", balance: 2100000 },
  { month: "MAR", balance: 2300000 },
  { month: "APR", balance: 2600000 },
  { month: "MAY", balance: 2750000 },
  { month: "JUN", balance: 2840122 },
];

export default function DashboardOverview() {
  const { transactions } = useStore();

  const totalIncome = transactions
    .filter((tx) => tx.type === "income" && (tx.status === "Completed" || !tx.status))
    .reduce((acc, tx) => acc + tx.amount, 0);

  const totalExpense = transactions
    .filter((tx) => tx.type === "expense" && (tx.status === "Completed" || !tx.status))
    .reduce((acc, tx) => acc + tx.amount, 0);

  const baseBalance = 2700000;
  const totalBalance = baseBalance + totalIncome - totalExpense;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-6 md:space-y-8">
      {/* Hero Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white">
            Dashboard Overview
          </h2>
          <p className="text-on-surface-variant mt-1">
            Real-time financial synthesis for Zorvyn Wealth.
          </p>
        </div>
        <div className="flex gap-2">
          <span className="bg-surface-container-highest px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5 border border-outline-variant/10">
            <span className="w-2 h-2 rounded-full bg-tertiary shadow-[0_0_5px_#618bff]"></span>
            Live Sync Active
          </span>
        </div>
      </section>

      {/* Summary Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Balance */}
        <div className="bg-surface-container rounded-xl p-6 border border-outline-variant/10 flex flex-col justify-between hover:bg-surface-container-high transition-colors group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-bold tracking-widest text-on-surface-variant uppercase">
                Total Balance
              </p>
              <h3 className="text-2xl font-bold text-white mt-1">
                ${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h3>
            </div>
            <span className="text-tertiary-container bg-tertiary-container/10 p-2 rounded-lg">
              <span className="material-symbols-outlined">
                account_balance_wallet
              </span>
            </span>
          </div>
          <div className="mt-6 flex items-end justify-between">
            <span className="text-xs text-green-400 font-medium flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">
                trending_up
              </span>{" "}
              +12.4%
            </span>
            <div className="flex items-end gap-[2px] h-8">
              <div className="w-1 bg-white/10 h-3 rounded-full"></div>
              <div className="w-1 bg-white/10 h-5 rounded-full"></div>
              <div className="w-1 bg-white/30 h-8 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Income */}
        <div className="bg-surface-container rounded-xl p-6 border border-outline-variant/10 flex flex-col justify-between hover:bg-surface-container-high transition-colors group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-bold tracking-widest text-on-surface-variant uppercase">
                Income
              </p>
              <h3 className="text-2xl font-bold text-white mt-1">
                ${totalIncome.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h3>
            </div>
            <span className="text-white bg-white/10 p-2 rounded-lg">
              <span className="material-symbols-outlined">add_chart</span>
            </span>
          </div>
          <div className="mt-6 flex items-end justify-between">
            <span className="text-xs text-on-surface-variant font-medium">
              This Month
            </span>
            <div className="flex items-end gap-[2px] h-8">
              <div className="w-1 bg-white/10 h-6 rounded-full"></div>
              <div className="w-1 bg-white/30 h-7 rounded-full"></div>
              <div className="w-1 bg-white/10 h-4 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Expenses */}
        <div className="bg-surface-container rounded-xl p-6 border border-outline-variant/10 flex flex-col justify-between hover:bg-surface-container-high transition-colors group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-bold tracking-widest text-on-surface-variant uppercase">
                Expenses
              </p>
              <h3 className="text-2xl font-bold text-white mt-1">
                ${totalExpense.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h3>
            </div>
            <span className="text-error bg-error/10 p-2 rounded-lg">
              <span className="material-symbols-outlined">shopping_cart</span>
            </span>
          </div>
          <div className="mt-6 flex items-end justify-between">
            <span className="text-xs text-error font-medium flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">
                trending_down
              </span>{" "}
              -2.1%
            </span>
            <div className="flex items-end gap-[2px] h-8">
              <div className="w-1 bg-error/20 h-4 rounded-full"></div>
              <div className="w-1 bg-error/40 h-5 rounded-full"></div>
              <div className="w-1 bg-error/20 h-2 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Visualizations Area */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Balance Trend (Time-based) */}
        <div className="lg:col-span-2 bg-surface-container rounded-xl border border-outline-variant/10 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-outline-variant/10 flex justify-between items-center">
            <div>
              <h4 className="text-lg font-bold text-white">Balance Trend</h4>
              <p className="text-xs text-on-surface-variant">
                Time-based asset growth
              </p>
            </div>
            <div className="flex gap-2">
              <button className="bg-surface-container-lowest text-[10px] font-bold text-on-surface px-3 py-1.5 rounded border border-outline-variant/20">
                6M
              </button>
              <button className="hover:bg-surface-container-lowest text-[10px] font-bold text-on-surface-variant px-3 py-1.5 rounded transition-colors">
                1Y
              </button>
            </div>
          </div>
          <div className="p-6 flex-1 min-h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={balanceData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ffffff" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ffffff" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#c6c6c6', fontSize: 10, fontWeight: 700 }}
                    dy={10}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#2a2a2a', border: '1px solid #474747', borderRadius: '8px', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                    formatter={(value: any) => [`$${Number(value || 0).toLocaleString()}`, "Balance"]}
                  />
                  <Area type="monotone" dataKey="balance" stroke="#ffffff" strokeWidth={2} fillOpacity={1} fill="url(#colorBalance)" />
                </AreaChart>
             </ResponsiveContainer>
          </div>
        </div>

        {/* Spending Breakdown (Categorical) */}
        <div className="bg-surface-container rounded-xl border border-outline-variant/10 flex flex-col h-full">
          <div className="p-6 border-b border-outline-variant/10">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest">
              Spending Breakdown
            </h4>
          </div>
          <div className="p-6 flex-1 space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-on-surface-variant">Fixed Costs</span>
                <span className="text-white">45%</span>
              </div>
              <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
                <div className="bg-white h-full" style={{ width: "45%" }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-on-surface-variant">Investments</span>
                <span className="text-white">30%</span>
              </div>
              <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
                <div className="bg-tertiary h-full" style={{ width: "30%" }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-on-surface-variant">Lifestyle</span>
                <span className="text-white">15%</span>
              </div>
              <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
                <div className="bg-outline h-full" style={{ width: "15%" }}></div>
              </div>
            </div>
            <div className="pt-4 border-t border-outline-variant/5">
              <p className="text-[10px] text-on-surface-variant italic">
                No discretionary spending recorded this week.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Transactions Section with Empty State Handling */}
      <section className="bg-surface-container rounded-xl border border-outline-variant/10 overflow-hidden">
        <div className="p-6 border-b border-outline-variant/10 flex justify-between items-center">
          <h4 className="text-sm font-bold text-white uppercase tracking-widest">
            Recent Activity
          </h4>
        </div>
        
        {transactions.length > 0 ? (
          <div className="divide-y divide-outline-variant/5">
            {transactions.slice(0, 5).map((tx) => (
              <div
                key={tx.id}
                className="p-4 flex items-center justify-between hover:bg-surface-container-high transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded bg-surface-container-highest flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm">
                      {tx.category === "saas" ? "cloud" : tx.category === "travel" ? "flight" : tx.category === "internal" ? "account_balance" : "payments"}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {tx.description}
                    </p>
                    <p className="text-[10px] text-on-surface-variant uppercase">
                      {tx.category}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`text-sm font-bold ${
                      tx.type === "income" ? "text-green-400" : "text-error"
                    }`}
                  >
                    {tx.type === "income" ? "+" : "-"}${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                  <p className="text-[10px] text-on-surface-variant">
                    {tx.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <span className="material-symbols-outlined text-4xl text-outline-variant/30 mb-4">
              inbox
            </span>
            <p className="text-sm font-medium text-on-surface-variant">
              No transactions found
            </p>
            <p className="text-xs text-outline-variant">
              Adjust filters or check back later
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
