"use client";

import { useStore, Transaction, TransactionCategory, TransactionType, TransactionStatus } from "@/store/useStore";
import { useMemo, useState, useEffect } from "react";
import clsx from "clsx";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

export default function TransactionLedger() {
  const {
    role,
    transactions,
    addTransaction,
    updateTransaction,
    removeTransaction,
    searchQuery,
    setSearchQuery,
    filterType,
    setFilterType,
    filterCategory,
    setFilterCategory,
    sortBy,
    setSortBy,
    resetFilters,
  } = useStore();

  const [open, setOpen] = useState(false);
  const [editingTx, setEditingTx] = useState<Transaction | null>(null);
  const [desc, setDesc] = useState("");
  const [amt, setAmt] = useState("");
  const [cat, setCat] = useState<TransactionCategory>("saas");
  const [type, setType] = useState<TransactionType>("expense");
  const [status, setStatus] = useState<TransactionStatus>("Completed");
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handleOpenNew = () => {
    setEditingTx(null);
    setDesc("");
    setAmt("");
    setCat("saas");
    setType("expense");
    setStatus("Completed");
  };

  const handleEditClick = (tx: Transaction, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingTx(tx);
    setDesc(tx.description);
    setAmt(tx.amount.toString());
    setCat(tx.category);
    setType(tx.type);
    setStatus(tx.status || "Completed");
    setOpen(true);
  };

  const handleDeleteClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to permanently delete this transaction?")) {
      removeTransaction(id);
    }
  };

  const handleSave = () => {
    if (!desc || !amt) return;
    if (editingTx) {
      updateTransaction(editingTx.id, {
        description: desc,
        amount: parseFloat(amt),
        category: cat,
        type: type,
        status: status,
      });
    } else {
      addTransaction({
        description: desc,
        amount: parseFloat(amt),
        category: cat,
        type: type,
        status: status,
        date: new Date().toISOString(),
      });
    }
    setOpen(false);
  };

  const handleExport = () => {
    const headers = "Date,Description,Category,Status,Amount\n";
    const csv = filteredTransactions
      .map((tx) => `${tx.date},"${tx.description}",${tx.category},${tx.status},${tx.amount}`)
      .join("\n");
    const blob = new Blob([headers + csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((tx) => {
        const matchesSearch = tx.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const matchesType = filterType === "all" || tx.type === filterType;
        const matchesCategory =
          filterCategory === "all" || tx.category === filterCategory;
        return matchesSearch && matchesType && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === "newest") return new Date(b.date).getTime() - new Date(a.date).getTime();
        if (sortBy === "amount-desc") return b.amount - a.amount;
        if (sortBy === "amount-asc") return a.amount - b.amount;
        return 0;
      });
  }, [transactions, searchQuery, filterType, filterCategory, sortBy]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterType, filterCategory, sortBy]);

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-6 md:space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-1">
            Transaction Ledger
          </h2>
          <p className="text-on-surface-variant text-sm">
            Institutional capital flows and resource allocation.
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-surface-container-high text-white border border-outline-variant/20 rounded-xl text-sm font-medium hover:bg-surface-container-highest transition-all group active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[18px] group-hover:translate-y-0.5 transition-transform">
              download
            </span>
            Export
          </button>
          
          {role === "admin" && (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <button onClick={handleOpenNew} className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-xl text-sm font-semibold shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:bg-primary-container transition-all active:scale-[0.98]">
                  <span className="material-symbols-outlined text-[18px]">add</span>
                  New Entry
                </button>
              </DialogTrigger>
              <DialogContent className="bg-surface border-outline-variant/10 text-white sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{editingTx ? "Edit Transaction" : "Add Transaction"}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Description</label>
                    <input
                      className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-white/20 transition-all text-white"
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                      placeholder="e.g. Server Hosting"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Amount</label>
                      <input
                        type="number"
                        className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-white/20 transition-all text-white"
                        value={amt}
                        onChange={(e) => setAmt(e.target.value)}
                        placeholder="0.00"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Type</label>
                      <select
                        value={type}
                        onChange={(e) => setType(e.target.value as TransactionType)}
                        className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-white/20 transition-all text-white appearance-none"
                      >
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Status</label>
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value as TransactionStatus)}
                        className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-white/20 transition-all text-white appearance-none"
                      >
                        <option value="Completed">Completed</option>
                        <option value="Pending">Pending</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Category</label>
                      <select
                        value={cat}
                        onChange={(e) => setCat(e.target.value as TransactionCategory)}
                        className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-white/20 transition-all text-white appearance-none"
                      >
                        <option value="saas">SaaS & Infra</option>
                        <option value="travel">Travel</option>
                        <option value="service">Services</option>
                        <option value="internal">Internal</option>
                        <option value="misc">Misc</option>
                      </select>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-primary text-on-primary rounded-xl text-sm font-semibold hover:opacity-90 transition-all"
                  >
                    {editingTx ? "Update Entry" : "Save Entry"}
                  </button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-surface-container-low border border-outline-variant/15 rounded-xl p-4 flex flex-col md:flex-row flex-wrap items-stretch md:items-end gap-4">
        <div className="flex-1 min-w-0 md:min-w-[220px]">
           <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1.5 ml-1">Search</label>
           <input
             type="text"
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             placeholder="Search by description..."
             className="w-full bg-surface-container-lowest border border-outline-variant/15 rounded-lg py-2 pl-3 pr-4 text-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-white/20 transition-all placeholder:text-on-surface-variant/50"
           />
        </div>
        <div className="flex-1 min-w-[150px]">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1.5 ml-1">
            Type
          </label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="w-full bg-surface-container-lowest border border-outline-variant/15 rounded-lg py-2 px-3 text-sm appearance-none focus:ring-1 focus:ring-primary/20 cursor-pointer"
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div className="flex-1 min-w-[150px]">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1.5 ml-1">
            Category
          </label>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value as any)}
            className="w-full bg-surface-container-lowest border border-outline-variant/15 rounded-lg py-2 px-3 text-sm appearance-none focus:ring-1 focus:ring-primary/20 cursor-pointer"
          >
            <option value="all">All Categories</option>
            <option value="saas">SaaS & Infra</option>
            <option value="travel">Travel</option>
            <option value="service">Services</option>
            <option value="internal">Internal</option>
            <option value="misc">Misc</option>
          </select>
        </div>
        <div className="flex-1 min-w-[150px]">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1.5 ml-1">
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="w-full bg-surface-container-lowest border border-outline-variant/15 rounded-lg py-2 px-3 text-sm appearance-none focus:ring-1 focus:ring-primary/20 cursor-pointer"
          >
            <option value="newest">Newest First</option>
            <option value="amount-desc">Amount: High to Low</option>
            <option value="amount-asc">Amount: Low to High</option>
          </select>
        </div>
        <div className="h-[38px] mt-2 md:mt-0">
          <button
            onClick={resetFilters}
            className="px-4 py-2 text-on-surface-variant hover:text-white transition-colors text-sm font-medium h-full"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Data Table Card */}
      <div className="bg-surface-container rounded-xl overflow-hidden shadow-2xl border border-outline-variant/5">
        <div className="overflow-x-auto">
          {filteredTransactions.length > 0 ? (
            <>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-highest/30">
                  <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-on-surface-variant border-b border-outline-variant/10">
                    Date
                  </th>
                  <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-on-surface-variant border-b border-outline-variant/10">
                    Description
                  </th>
                  <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-on-surface-variant border-b border-outline-variant/10">
                    Category
                  </th>
                  <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-on-surface-variant border-b border-outline-variant/10">
                    Status
                  </th>
                  <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-on-surface-variant border-b border-outline-variant/10 text-right">
                    Amount
                  </th>
                  {role === 'admin' && (
                    <th className="px-6 py-4 border-b border-outline-variant/10 w-16"></th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {paginatedTransactions.map((tx) => (
                  <tr
                    key={tx.id}
                    className="hover:bg-surface-container-high transition-all group cursor-pointer"
                  >
                    <td className="px-6 py-5 text-sm text-on-surface-variant">
                      {new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-surface-container-highest flex items-center justify-center">
                          <span className="material-symbols-outlined text-[18px]">
                            {tx.category === "saas"
                              ? "cloud"
                              : tx.category === "travel"
                              ? "flight"
                              : tx.category === "service"
                              ? "payments"
                              : "account_balance"}
                          </span>
                        </div>
                        <span className="text-sm font-semibold text-white">
                          {tx.description}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="px-2.5 py-1 rounded-full bg-surface-container-highest text-[10px] font-bold uppercase tracking-wider text-tertiary shadow-[inset_0_0_2px_rgba(255,255,255,0.1)]">
                        {tx.category}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <span 
                          className={clsx(
                            "w-1.5 h-1.5 rounded-full",
                            (tx.status || "Completed") === "Completed" ? "bg-emerald-500" : "bg-amber-500"
                          )}
                        ></span>
                        <span className="text-sm font-medium text-on-surface-variant">{(tx.status || "Completed")}</span>
                      </div>
                    </td>
                    <td
                      className={clsx(
                        "px-6 py-5 text-right font-mono text-sm font-medium",
                        tx.type === "income"
                          ? "text-tertiary-container"
                          : "text-white"
                      )}
                    >
                      {tx.type === "income" ? "+" : "-"}$
                      {tx.amount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    {role === 'admin' && (
                      <td className="px-6 py-5 text-right">
                        <div className="flex items-center justify-end gap-1.5 pt-0.5">
                          <button onClick={(e) => handleEditClick(tx, e)} className="text-on-surface-variant hover:text-white transition-colors p-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest" title="Edit">
                            <span className="material-symbols-outlined text-[16px] block">edit</span>
                          </button>
                          <button onClick={(e) => handleDeleteClick(tx.id, e)} className="text-error hover:text-red-400 transition-colors p-1.5 rounded-lg bg-error/10 hover:bg-error/20" title="Delete">
                            <span className="material-symbols-outlined text-[16px] block">delete</span>
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="px-6 py-4 border-t border-outline-variant/10 flex flex-col sm:flex-row items-center gap-4 justify-between bg-surface-container-low/50">
              <p className="text-sm text-on-surface-variant">
                Showing <span className="font-bold text-white">{(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredTransactions.length)}</span> of <span className="text-white">{filteredTransactions.length}</span> transactions
              </p>
              <div className="flex gap-1">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface-variant disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-sm">chevron_left</span>
                </button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={clsx(
                      "w-8 h-8 flex items-center justify-center rounded-lg transition-colors text-sm font-medium",
                      currentPage === i + 1 ? "bg-white text-black" : "bg-surface-container hover:bg-surface-container-high text-on-surface-variant"
                    )}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface-variant disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>
            </div>
            </>
          ) : (
             <div className="p-16 flex flex-col items-center justify-center text-center">
                <span className="material-symbols-outlined text-4xl text-outline-variant/30 mb-4">
                  inbox
                </span>
                <p className="text-sm font-medium text-on-surface-variant">
                  No transactions match your current filters.
                </p>
                <div className="mt-4">
                  <button onClick={resetFilters} className="px-4 py-2 bg-white text-black text-xs font-bold rounded-lg shadow hover:bg-outline">Clear Filters</button>
                </div>
              </div>
          )}
        </div>
      </div>
      
      {/* Summary Section Grid */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 md:col-span-2 bg-surface-container-low border border-outline-variant/15 rounded-xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <span
              className="material-symbols-outlined text-[120px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              analytics
            </span>
          </div>
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-6">
            Net Cash Flow
          </h4>
          <div className="flex items-end gap-6">
            <div>
              <p className="text-3xl font-bold text-white">+$42,850.00</p>
              <p className="text-xs text-emerald-500 mt-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">
                  trending_up
                </span>
                12.4% vs last month
              </p>
            </div>
          </div>
        </div>
        <div className="bg-surface-container-low border border-outline-variant/15 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-4">
              Largest Category
            </h4>
            <p className="text-xl font-semibold text-white">
              SaaS Infrastructure
            </p>
            <p className="text-xs text-on-surface-variant mt-1">
              32% of total spend
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-outline-variant/10">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[10px] text-on-surface-variant">
                Budget Utilization
              </span>
              <span className="text-[10px] text-white">78%</span>
            </div>
            <div className="w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
              <div className="bg-primary h-full w-[78%]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
