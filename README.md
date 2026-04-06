# Zorvyn Finance Dashboard

A premium, interactive frontend financial management dashboard built with Next.js 15, React 19, and Tailwind CSS. The application simulates complex institutional fund tracking with features including complete CRUD data management, instantaneous global recalculation, analytical insights, and responsive layout scaling.

## Features Implemented

*   **Financial Overview:** Hero dashboard summarizing balance, total income, and total expenses dynamically aggregated from local transaction arrays.
*   **Time-Based Visualization:** Integrated `Recharts` to model interactive balance history trends utilizing smooth area curves and dense tooltips.
*   **Categorical Analytics:** Auto-calculated breakdown of spending distribution using intelligent pie-charts and CSS-rendered percentage bars.
*   **Transactions Engine:** A full-scale ledger permitting advanced queries (search, filter-by-category, filter-by-income-type). Features an isolated custom pagination layer (6 items per page) to manage data gracefully.
*   **CRUD Data Management:** Utilizing `lucide-react` triggers and interactive dialogs, users authenticated as the `Admin` role can dynamically Add, Edit, or permanently Delete entries.
*   **Simulated Export:** Click to automatically encode current data context into a downloaded `.csv` file.
*   **State Management Platform:** Constructed using `zustand` combined with `persist` local-storage middleware to create an instantaneous, zero-boilerplate state web that acts as a secure, reactive "pseudo-backend."
*   **Zero-Jank Aesthetics:** Bespoke custom Hex-oriented Tailwind mappings delivering a dark glassmorphism system independent of generic frameworks.

## Tech Stack Overview
- **Framework:** Next.js 15 App Router
- **Core Library:** React 19
- **Styling:** Tailwind CSS 4
- **State Engine:** Zustand (Data simulation + Local persistence)
- **Charts Engine:** Recharts
- **Components:** Radix primitives mapped securely into pure Tailwind.

## Getting Started

First, install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Assessment Notes
The design was architected strictly around maintaining responsive flexibility without rendering jank. The global layout is completely scalable, converting complex left-docking Sidebar navs into sticky bottom navigator components dynamically when dropping down to mobile viewport limits. State is intentionally decoupled from layout styling so that updates trigger clean re-renders only on impacted dashboard totals.
