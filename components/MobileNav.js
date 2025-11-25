"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BookOpen, TrendingUp, Calculator, PieChart } from "lucide-react";
import clsx from "clsx";

const navItems = [
    { name: "Home", href: "/", icon: LayoutDashboard },
    { name: "Trade", href: "/journal/trade", icon: BookOpen },
    { name: "Invest", href: "/journal/investment", icon: TrendingUp },
    { name: "Tools", href: "/tools/compound", icon: Calculator },
    { name: "Goals", href: "/budget", icon: PieChart },
];

export default function MobileNav() {
    const pathname = usePathname();

    return (
        <nav className="mobile-nav glass-panel">
            {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={clsx("mobile-nav-item", isActive && "active")}
                    >
                        <Icon size={24} />
                        <span className="label">{item.name}</span>
                    </Link>
                );
            })}

            <style jsx>{`
        .mobile-nav {
          display: none;
          position: fixed;
          bottom: 1rem;
          left: 1rem;
          right: 1rem;
          height: 70px;
          justify-content: space-around;
          align-items: center;
          z-index: 50;
          padding: 0 0.5rem;
        }

        .mobile-nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          color: var(--text-secondary);
          padding: 0.5rem;
          border-radius: var(--radius-sm);
          flex: 1;
        }

        .mobile-nav-item.active {
          color: var(--accent-primary);
        }

        .label {
          font-size: 0.7rem;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .mobile-nav {
            display: flex;
          }
        }
      `}</style>
        </nav>
    );
}
