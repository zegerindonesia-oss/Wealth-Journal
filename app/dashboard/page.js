"use client";

import StatCard from "@/components/StatCard";
import RecentActivity from "@/components/RecentActivity";
import HabitTracker from "@/components/HabitTracker";
import { Wallet, TrendingUp, PiggyBank } from "lucide-react";

export default function Dashboard() {
    return (
        <div className="container">
            <header style={{ padding: '2rem 0', marginBottom: '1rem' }}>
                <h1 style={{ fontSize: '2.5rem', background: 'linear-gradient(to right, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Dashboard
                </h1>
                <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                    Welcome back, Trader.
                </p>
            </header>

            <div className="grid-dashboard">
                <StatCard
                    title="Net Worth"
                    value="$124,500"
                    change="12.5%"
                    trend="up"
                    icon={Wallet}
                />
                <StatCard
                    title="Total Profit"
                    value="$8,240"
                    change="5.2%"
                    trend="up"
                    icon={TrendingUp}
                />
                <StatCard
                    title="Savings Goal"
                    value="$15,000"
                    change="2.1%"
                    trend="down"
                    icon={PiggyBank}
                />

                <RecentActivity />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <HabitTracker />

                    <div className="glass-card">
                        <h3>Quick Actions</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
                            <button className="btn btn-primary" style={{ width: '100%' }}>New Trade Entry</button>
                            <button className="btn btn-ghost" style={{ width: '100%', border: '1px solid var(--glass-border)' }}>Add Investment</button>
                            <button className="btn btn-ghost" style={{ width: '100%', border: '1px solid var(--glass-border)' }}>Update Budget</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
