"use client";

import { Target, CheckCircle2 } from "lucide-react";

export default function GoalCard({ goal }) {
    const progress = Math.min(100, Math.round((goal.current / goal.target) * 100));
    const isCompleted = progress >= 100;

    return (
        <div className={`glass-card goal-card ${isCompleted ? 'completed' : ''}`}>
            <div className="goal-header">
                <div className="goal-icon">
                    {isCompleted ? <CheckCircle2 size={20} /> : <Target size={20} />}
                </div>
                <div className="goal-info">
                    <h4>{goal.name}</h4>
                    <span className="goal-date">Target: {goal.deadline}</span>
                </div>
                <div className="goal-percentage">{progress}%</div>
            </div>

            <div className="progress-section">
                <div className="progress-bar-bg">
                    <div
                        className="progress-bar-fill"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <div className="progress-values">
                    <span>${goal.current.toLocaleString()}</span>
                    <span className="target-value">of ${goal.target.toLocaleString()}</span>
                </div>
            </div>

            <style jsx>{`
        .goal-card {
          padding: 1.25rem;
          position: relative;
          overflow: hidden;
        }

        .goal-card.completed {
          border-color: var(--success);
        }

        .goal-card.completed .goal-icon {
          background: rgba(74, 222, 128, 0.2);
          color: var(--success);
        }

        .goal-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .goal-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-primary);
        }

        .goal-info {
          flex: 1;
        }

        .goal-info h4 {
          font-size: 1rem;
          margin-bottom: 2px;
        }

        .goal-date {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .goal-percentage {
          font-weight: 700;
          font-size: 1.1rem;
          color: var(--text-primary);
        }

        .progress-section {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .progress-bar-bg {
          width: 100%;
          height: 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          overflow: hidden;
        }

        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
          border-radius: 4px;
          transition: width 0.5s ease-out;
        }

        .goal-card.completed .progress-bar-fill {
          background: var(--success);
        }

        .progress-values {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .target-value {
          color: var(--text-secondary);
        }
      `}</style>
        </div>
    );
}
