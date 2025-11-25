"use client";

import { useState } from "react";
import TradeList from "@/components/TradeList";
import { Plus, Filter } from "lucide-react";

const mockTrades = [
    { id: 1, date: "2023-10-24", symbol: "AAPL", type: "Long", entry: 150.5, exit: 155.2, pnl: 470, status: "Closed" },
    { id: 2, date: "2023-10-23", symbol: "TSLA", type: "Short", entry: 240.0, exit: 235.5, pnl: 450, status: "Closed" },
    { id: 3, date: "2023-10-22", symbol: "BTC", type: "Long", entry: 34000, exit: null, pnl: null, status: "Open" },
    { id: 4, date: "2023-10-21", symbol: "NVDA", type: "Long", entry: 420.0, exit: 415.0, pnl: -500, status: "Closed" },
    { id: 5, date: "2023-10-20", symbol: "EURUSD", type: "Short", entry: 1.0500, exit: 1.0450, pnl: 500, status: "Closed" },
];

export default function TradeJournal() {
    const [trades] = useState(mockTrades);

    return (
        <div className="container">
            <header className="page-header">
                <div>
                    <h1>Trade Journal</h1>
                    <p className="subtitle">Review and analyze your trading performance.</p>
                </div>
                <button className="btn btn-primary">
                    <Plus size={18} style={{ marginRight: '8px' }} />
                    New Entry
                </button>
            </header>

            <div className="filters-bar">
                <div className="search-box">
                    <input type="text" placeholder="Search symbol..." className="input-field" />
                </div>
                <div className="filter-actions">
                    <button className="btn btn-ghost btn-sm">
                        <Filter size={16} style={{ marginRight: '6px' }} />
                        Filter
                    </button>
                </div>
            </div>

            <TradeList trades={trades} />

            <style jsx>{`
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 2rem 0;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .subtitle {
          color: var(--text-secondary);
          margin-top: 0.5rem;
        }

        .filters-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .input-field {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--glass-border);
          padding: 0.6rem 1rem;
          border-radius: var(--radius-sm);
          color: var(--text-primary);
          outline: none;
          min-width: 250px;
        }

        .input-field:focus {
          border-color: var(--accent-primary);
        }

        .btn-sm {
          padding: 0.5rem 1rem;
          font-size: 0.9rem;
        }
      `}</style>
        </div>
    );
}
