import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Role = 'viewer' | 'admin';
export type TransactionType = 'income' | 'expense';
export type TransactionCategory = 'saas' | 'travel' | 'service' | 'internal' | 'misc';

export type TransactionStatus = 'Completed' | 'Pending';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: TransactionCategory;
  type: TransactionType;
  status: TransactionStatus;
  amount: number;
}

interface AppState {
  role: Role;
  setRole: (role: Role) => void;
  transactions: Transaction[];
  addTransaction: (tx: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  removeTransaction: (id: string) => void;
  
  // Filters for transactions page
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterType: 'all' | TransactionType;
  setFilterType: (type: 'all' | TransactionType) => void;
  filterCategory: 'all' | TransactionCategory;
  setFilterCategory: (category: 'all' | TransactionCategory) => void;
  sortBy: 'newest' | 'amount-desc' | 'amount-asc';
  setSortBy: (sort: 'newest' | 'amount-desc' | 'amount-asc') => void;
  resetFilters: () => void;
}

const initialTransactions: Transaction[] = [
  { id: '1', date: '2023-10-24', description: 'Amazon Web Services', category: 'saas', type: 'expense', status: 'Completed', amount: 1240.00 },
  { id: '2', date: '2023-10-23', description: 'Lufthansa Group', category: 'travel', type: 'expense', status: 'Completed', amount: 3450.20 },
  { id: '3', date: '2023-10-22', description: 'Invoiced: Aris Corp', category: 'service', type: 'income', status: 'Pending', amount: 12000.00 },
  { id: '4', date: '2023-10-20', description: 'The Obsidian Lounge', category: 'misc', type: 'expense', status: 'Completed', amount: 184.50 },
  { id: '5', date: '2023-10-18', description: 'Tax Reserve Transfer', category: 'internal', type: 'expense', status: 'Completed', amount: 5000.00 },
  { id: '6', date: '2023-10-15', description: 'GitHub Enterprise', category: 'saas', type: 'expense', status: 'Completed', amount: 450.00 },
  { id: '7', date: '2023-10-14', description: 'Apple Store Purchase', category: 'misc', type: 'expense', status: 'Completed', amount: 1299.00 },
  { id: '8', date: '2023-10-13', description: 'Salary Deposit', category: 'internal', type: 'income', status: 'Completed', amount: 8500.00 },
];

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      role: 'admin',
      setRole: (role) => set({ role }),
      transactions: initialTransactions,
      addTransaction: (tx) => set((state) => ({
        transactions: [{ ...tx, id: Date.now().toString() }, ...state.transactions],
      })),
      updateTransaction: (id, updates) => set((state) => ({
        transactions: state.transactions.map((t) => t.id === id ? { ...t, ...updates } : t)
      })),
      removeTransaction: (id) => set((state) => ({
        transactions: state.transactions.filter(t => t.id !== id),
      })),
      
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),
      filterType: 'all',
      setFilterType: (type) => set({ filterType: type }),
      filterCategory: 'all',
      setFilterCategory: (category) => set({ filterCategory: category }),
      sortBy: 'newest',
      setSortBy: (sort) => set({ sortBy: sort }),
      resetFilters: () => set({
        searchQuery: '',
        filterType: 'all',
        filterCategory: 'all',
        sortBy: 'newest',
      }),
    }),
    {
      name: 'obsidian-finance-storage',
    }
  )
);
