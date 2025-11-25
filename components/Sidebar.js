"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BookOpen, TrendingUp, Calculator, PieChart, Settings } from "lucide-react";
import clsx from "clsx";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Trade Journal", href: "/journal/trade", icon: BookOpen },
  { name: "Investments", href: "/journal/investment", icon: TrendingUp },
  { name: "Calculator", href: "/tools/compound", icon: Calculator },
  { name: "Budget & Goals", href: "/budget", icon: PieChart },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar glass-panel">
      <div className="logo-container">
        <div className="logo-icon">WJ</div>
        <span className="logo-text">Wealth Journal</span>
      </div>

      <nav className="nav-menu">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx("nav-item", isActive && "active")}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <Link href="/settings" className="nav-item">
          <Settings size={20} />
          <span>Settings</span>
        </Link>
      </div>

      <style jsx>{`
        .sidebar {
          width: 260px;
          height: calc(100vh - 2rem);
          position: fixed;
          left: 1rem;
          top: 1rem;
          display: flex;
          flex-direction: column;
          padding: 1.5rem;
          z-index: 50;
          background: var(--bg-card);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--border);
        }

        .logo-container {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 2.5rem;
          padding-left: 0.5rem;
        }

        .logo-icon {
          width: 36px;
          height: 36px;
          background: var(--accent-primary);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          color: white;
          font-size: 1.2rem;
        }

        .logo-text {
          font-size: 1.25rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--text-primary);
        }

        .nav-menu {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          flex: 1;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          transition: all 0.2s;
          font-weight: 500;
        }

        .nav-item:hover {
          background: var(--bg-secondary);
          color: var(--text-primary);
        }

        .nav-item.active {
          background: var(--accent-light);
          color: var(--accent-primary);
        }

        @media (max-width: 768px) {
          .sidebar {
            display: none;
          }
        }
      `}</style>
    </aside>
  );
}
