"use client";

import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function StatCard({ title, value, change, trend, icon: Icon }) {
    const isPositive = trend === "up";

    return (
        <div className="glass-card stat-card">
            <div className="stat-header">
                <span className="stat-title">{title}</span>
                {Icon && <div className="stat-icon"><Icon size={18} /></div>}
            </div>

            <div className="stat-value">{value}</div>

            <div className="stat-footer">
                <span className={`stat-change ${isPositive ? 'positive' : 'negative'}`}>
                    {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                    {change}
                </span>
                <span className="stat-period">vs last month</span>
            </div>

            <style jsx>{`
        .stat-card {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .stat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .stat-title {
          color: var(--text-secondary);
          font-size: 0.9rem;
          font-weight: 500;
        }

        .stat-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
        }

        .stat-value {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .stat-footer {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
        }

        .stat-change {
          display: flex;
          align-items: center;
          gap: 2px;
          font-weight: 600;
        }

        .stat-change.positive {
          color: var(--success);
        }

        .stat-change.negative {
          color: var(--danger);
        }

        .stat-period {
          color: var(--text-secondary);
        }
      `}</style>
        </div>
    );
}
