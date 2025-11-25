"use client";

import { useState } from "react";
import { Check, Plus } from "lucide-react";

const initialHabits = [
    { id: 1, name: "Review Trade Log", streak: 5, completedToday: false },
    { id: 2, name: "Read Market News", streak: 12, completedToday: true },
    { id: 3, name: "No Impulse Trades", streak: 3, completedToday: false },
];

export default function HabitTracker() {
    const [habits, setHabits] = useState(initialHabits);

    const toggleHabit = (id) => {
        setHabits(habits.map(habit => {
            if (habit.id === id) {
                return {
                    ...habit,
                    completedToday: !habit.completedToday,
                    streak: !habit.completedToday ? habit.streak + 1 : habit.streak - 1
                };
            }
            return habit;
        }));
    };

    return (
        <div className="glass-card habit-card">
            <div className="card-header">
                <h3>Daily Habits</h3>
                <button className="btn-icon-small">
                    <Plus size={16} />
                </button>
            </div>

            <div className="habit-list">
                {habits.map(habit => (
                    <div key={habit.id} className="habit-item">
                        <button
                            className={`check-btn ${habit.completedToday ? 'completed' : ''}`}
                            onClick={() => toggleHabit(habit.id)}
                        >
                            {habit.completedToday && <Check size={14} strokeWidth={3} />}
                        </button>

                        <div className="habit-info">
                            <span className={`habit-name ${habit.completedToday ? 'dimmed' : ''}`}>
                                {habit.name}
                            </span>
                            <span className="habit-streak">
                                🔥 {habit.streak} day streak
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <style jsx>{`
        .habit-card {
          display: flex;
          flex-direction: column;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .btn-icon-small {
          background: rgba(255, 255, 255, 0.05);
          border: none;
          color: var(--text-secondary);
          width: 28px;
          height: 28px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-icon-small:hover {
          background: rgba(255, 255, 255, 0.1);
          color: var(--text-primary);
        }

        .habit-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .habit-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .check-btn {
          width: 24px;
          height: 24px;
          border-radius: 6px;
          border: 2px solid var(--text-secondary);
          background: transparent;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0f172a; /* Dark text for checkmark on light bg */
          transition: all 0.2s;
        }

        .check-btn:hover {
          border-color: var(--accent-primary);
        }

        .check-btn.completed {
          background: var(--accent-primary);
          border-color: var(--accent-primary);
        }

        .habit-info {
          display: flex;
          flex-direction: column;
        }

        .habit-name {
          font-size: 0.9rem;
          font-weight: 500;
          transition: color 0.2s;
        }

        .habit-name.dimmed {
          color: var(--text-secondary);
          text-decoration: line-through;
        }

        .habit-streak {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }
      `}</style>
        </div>
    );
}
