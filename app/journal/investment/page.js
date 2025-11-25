"use client";

import { useState } from "react";
import PortfolioItem from "@/components/PortfolioItem";
import { Plus, PieChart } from "lucide-react";

const mockAssets = [
    { id: 1, symbol: "AAPL", name: "Apple Inc.", price: 175.50, change24h: 1.2, holdings: 50, avgBuy: 145.00, pnl: 1525, pnlPercent: 21.0 },
    { id: 2, symbol: "BTC", name: "Bitcoin", price: 34500, change24h: -0.5, holdings: 0.5, avgBuy: 28000, pnl: 3250, pnlPercent: 23.2 },
    { id: 3, symbol: "VOO", name: "Vanguard S&P 500", price: 410.20, change24h: 0.8, holdings: 20, avgBuy: 380.50, pnl: 594, pnlPercent: 7.8 },
    { id: 4, symbol: "TSLA", name: "Tesla Inc.", price: 215.00, change24h: -2.1, holdings: 30, avgBuy: 240.00, pnl: -750, pnlPercent: -10.4 },
];

export default function InvestmentJournal() {
    const [assets] = useState(mockAssets);

    const totalValue = assets.reduce((acc, asset) => acc + (asset.price * asset.holdings), 0);
    const totalPnL = assets.reduce((acc, asset) => acc + asset.pnl, 0);

    return (
        <div className="container">
            <header className="page-header">
                <div>
                    <h1>Investment Portfolio</h1>
                    <p className="subtitle">Track your long-term wealth accumulation.</p>
                </div>
                <button className="btn btn-primary">
                    <Plus size={18} style={{ marginRight: '8px' }} />
                    Add Asset
                </button>
            </header>

            <div className="portfolio-summary glass-panel">
                <div className="summary-item">
                    <span className="label">Total Portfolio Value</span>
                    <span className="value">${totalValue.toLocaleString()}</span>
                </div>
                <div className="summary-item">
                    <span className="label">Total Profit/Loss</span>
                    <span className={`value ${totalPnL >= 0 ? 'positive' : 'negative'}`}>
                        {totalPnL >= 0 ? '+' : ''}${totalPnL.toLocaleString()}
                    </span>
                </div>
                <div className="summary-chart">
                    <PieChart size={48} color="var(--accent-primary)" style={{ opacity: 0.5 }} />
                </div>
            </div>

            <div className="assets-grid">
                {assets.map(asset => (
                    <PortfolioItem key={asset.id} asset={asset} />
                ))}
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

        .portfolio-summary {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2rem;
          margin-bottom: 2rem;
          position: relative;
          overflow: hidden;
        }

        .summary-item {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          z-index: 1;
        }

        .label {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .value {
          font-size: 2rem;
          font-weight: 700;
        }

        .value.positive { color: var(--success); }
        .value.negative { color: var(--danger); }

        .summary-chart {
          position: absolute;
          right: 2rem;
          top: 50%;
          transform: translateY(-50%);
          opacity: 0.2;
        }

        .assets-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        @media (max-width: 600px) {
          .portfolio-summary {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.5rem;
          }
          
          .summary-chart {
            display: none;
          }
        }
      `}</style>
        </div>
    );
}
