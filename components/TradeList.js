"use client";

import { MoreHorizontal } from "lucide-react";

export default function TradeList({ trades }) {
    return (
        <div className="glass-panel" style={{ overflow: 'hidden' }}>
            <div className="table-container">
                <table className="trade-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Symbol</th>
                            <th>Type</th>
                            <th>Entry</th>
                            <th>Exit</th>
                            <th>PnL</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trades.map((trade) => {
                            const isWin = trade.pnl > 0;
                            return (
                                <tr key={trade.id}>
                                    <td>{trade.date}</td>
                                    <td style={{ fontWeight: 600 }}>{trade.symbol}</td>
                                    <td>
                                        <span className={`badge ${trade.type.toLowerCase()}`}>{trade.type}</span>
                                    </td>
                                    <td>${trade.entry}</td>
                                    <td>${trade.exit || '-'}</td>
                                    <td className={isWin ? 'text-success' : 'text-danger'}>
                                        {trade.pnl ? (isWin ? '+' : '') + '$' + Math.abs(trade.pnl) : '-'}
                                    </td>
                                    <td>
                                        <span className={`status-dot ${trade.status.toLowerCase()}`}></span>
                                        {trade.status}
                                    </td>
                                    <td>
                                        <button className="btn-icon">
                                            <MoreHorizontal size={16} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <style jsx>{`
        .table-container {
          overflow-x: auto;
        }

        .trade-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.9rem;
        }

        th {
          padding: 1rem;
          background: rgba(255, 255, 255, 0.03);
          color: var(--text-secondary);
          font-weight: 500;
          border-bottom: 1px solid var(--glass-border);
        }

        td {
          padding: 1rem;
          border-bottom: 1px solid var(--glass-border);
          color: var(--text-primary);
        }

        tr:last-child td {
          border-bottom: none;
        }

        tr:hover td {
          background: rgba(255, 255, 255, 0.02);
        }

        .badge {
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .badge.long { background: rgba(74, 222, 128, 0.1); color: var(--success); }
        .badge.short { background: rgba(248, 113, 113, 0.1); color: var(--danger); }

        .text-success { color: var(--success); font-weight: 600; }
        .text-danger { color: var(--danger); font-weight: 600; }

        .status-dot {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          margin-right: 6px;
        }

        .status-dot.open { background: var(--accent-primary); }
        .status-dot.closed { background: var(--text-secondary); }

        .btn-icon {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
        }

        .btn-icon:hover {
          background: rgba(255, 255, 255, 0.1);
          color: var(--text-primary);
        }
      `}</style>
        </div>
    );
}
