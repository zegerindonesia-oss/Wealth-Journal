"use client";

import { useState } from "react";
import GoalCard from "@/components/GoalCard";
import { Plus, Wallet, AlertCircle } from "lucide-react";

const mockGoals = [
    { id: 1, name: "Emergency Fund", current: 8500, target: 15000, deadline: "Dec 2024" },
    { id: 2, name: "New Laptop", current: 1200, target: 2500, deadline: "Mar 2024" },
    { id: 3, name: "Dream Vacation", current: 500, target: 5000, deadline: "Aug 2024" },
];

const mockBudget = [
    { category: "Housing", spent: 1200, limit: 1500, color: "#38bdf8" },
    { category: "Food", spent: 450, limit: 600, color: "#818cf8" },
    { category: "Transport", spent: 180, limit: 200, color: "#c084fc" },
    { category: "Entertainment", spent: 320, limit: 300, color: "#f472b6" }, // Over budget
];

export default function BudgetPage() {
    const [goals] = useState(mockGoals);
    const [budget] = useState(mockBudget);

    const totalSpent = budget.reduce((acc, item) => acc + item.spent, 0);
    const totalLimit = budget.reduce((acc, item) => acc + item.limit, 0);
    const remainingBudget = totalLimit - totalSpent;

    return (
        <div className="container">
            <header className="page-header">
                <div>
                    <h1>Budget & Goals</h1>
                    <p className="subtitle">Plan your spending and achieve your dreams.</p>
                </div>
                <button className="btn btn-primary">
                    <Plus size={18} style={{ marginRight: '8px' }} />
                    New Goal
                </button>
            </header>

            <div className="budget-overview">
                <div className="glass-panel overview-card">
                    <div className="overview-header">
                        <h3>Monthly Budget</h3>
                        <span className="month-badge">November</span>
                    </div>

                    <div className="budget-stats">
                        <div className="stat">
                            <span className="label">Total Budget</span>
                            <span className="value">${totalLimit.toLocaleString()}</span>
                        </div>
                        <div className="stat">
                            <span className="label">Spent</span>
                            <span className="value">${totalSpent.toLocaleString()}</span>
                        </div>
                        <div className="stat">
                            <span className="label">Remaining</span>
                            <span className={`value ${remainingBudget < 0 ? 'negative' : 'positive'}`}>
                                ${remainingBudget.toLocaleString()}
                            </span>
                        </div>
                    </div>

                    <div className="budget-bars">
                        {budget.map((item, index) => {
                            const percent = Math.min(100, (item.spent / item.limit) * 100);
                            const isOver = item.spent > item.limit;

                            return (
                                <div key={index} className="budget-item">
                                    <div className="item-header">
                                        <span className="cat-name">{item.category}</span>
                                        <span className="cat-val">
                                            ${item.spent} <span className="cat-limit">/ ${item.limit}</span>
                                            {isOver && <AlertCircle size={14} className="alert-icon" />}
                                        </span>
                                    </div>
                                    <div className="cat-progress-bg">
                                        <div
                                            className="cat-progress-fill"
                                            style={{
                                                width: `${percent}%`,
                                                background: isOver ? 'var(--danger)' : item.color
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="goals-section">
                    <h3>Financial Goals</h3>
                    <div className="goals-grid">
                        {goals.map(goal => (
                            <GoalCard key={goal.id} goal={goal} />
                        ))}
                    </div>
                </div>
            </div>

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

        .budget-overview {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        .overview-card {
          padding: 1.5rem;
          height: fit-content;
        }

        .overview-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .month-badge {
          background: rgba(255, 255, 255, 0.1);
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.85rem;
          color: var(--text-primary);
        }

        .budget-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--glass-border);
        }

        .stat {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .stat .label {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .stat .value {
          font-size: 1.1rem;
          font-weight: 600;
        }

        .value.positive { color: var(--success); }
        .value.negative { color: var(--danger); }

        .budget-bars {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .item-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
        }

        .cat-limit {
          color: var(--text-secondary);
          font-size: 0.8rem;
        }

        .alert-icon {
          color: var(--danger);
          margin-left: 6px;
          vertical-align: middle;
        }

        .cat-progress-bg {
          width: 100%;
          height: 6px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
          overflow: hidden;
        }

        .cat-progress-fill {
          height: 100%;
          border-radius: 3px;
        }

        .goals-section h3 {
          margin-bottom: 1.5rem;
        }

        .goals-grid {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        @media (max-width: 900px) {
          .budget-overview {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
        </div>
    );
}
