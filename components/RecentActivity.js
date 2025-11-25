"use client";

import { TrendingUp, TrendingDown } from "lucide-react";

const mockTrades = [
    { id: 1, symbol: "AAPL", type: "Long", entry: 150.5, exit: 155.2, pnl: 470, date: "2023-10-24" },
    { id: 2, symbol: "TSLA", type: "Short", entry: 240.0, exit: 235.5, pnl: 450, date: "2023-10-23" },
    { id: 3, symbol: "BTC", type: "Long", entry: 34000, exit: 33500, pnl: -500, date: "2023-10-22" },
];

export default function RecentActivity() {
    return (
        <div className="glass-card activity-card">
            <div className="card-header">
                <h3>Recent Activity</h3>
                <button className="btn btn-ghost btn-sm">View All</button>
            </div>

            <div className="activity-list">
                {mockTrades.map((trade) => {
                    const isWin = trade.pnl > 0;

                    return (
                        <div key={trade.id} className="activity-item">
                            <div className="activity-icon" style={{ background: isWin ? 'rgba(74, 222, 128, 0.1)' : 'rgba(248, 113, 113, 0.1)', color: isWin ? 'var(--success)' : 'var(--danger)' }}>
                                {isWin ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
                            </div>

                            <div className="activity-details">
                                <div className="activity-title">
                                    <span className="symbol">{trade.symbol}</span>
                                    <span className={`type ${trade.type.toLowerCase()}`}>{trade.type}</span>
                                </div>
                                <span className="date">{trade.date}</span>
                            </div>

                            <div className={`activity-pnl ${isWin ? 'positive' : 'negative'}`}>
                                {isWin ? '+' : ''}${Math.abs(trade.pnl)}
                            </div>
                        </div>
                    );
                })}
            </div>

            <style jsx>{`
        .activity-card {
          grid-column: span 2;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .btn-sm {
          padding: 0.25rem 0.75rem;
          font-size: 0.85rem;
        }

        .activity-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .activity-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem;
          border-radius: var(--radius-sm);
          background: rgba(255, 255, 255, 0.02);
          transition: background 0.2s;
        }

        .activity-item:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .activity-icon {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .activity-details {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .activity-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
        }

        .type {
          font-size: 0.75rem;
          padding: 2px 6px;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.1);
          font-weight: 500;
        }

        .type.long { color: var(--success); background: rgba(74, 222, 128, 0.1); }
        .type.short { color: var(--danger); background: rgba(248, 113, 113, 0.1); }

        .date {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .activity-pnl {
          font-weight: 700;
        }

        .activity-pnl.positive { color: var(--success); }
        .activity-pnl.negative { color: var(--danger); }

        @media (max-width: 768px) {
          .activity-card {
            grid-column: span 1;
          }
        }
      `}</style>
        </div>
    );
}
