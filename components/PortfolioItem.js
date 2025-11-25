"use client";

import { TrendingUp, TrendingDown } from "lucide-react";

export default function PortfolioItem({ asset }) {
    const isPositive = asset.pnlPercent >= 0;

    return (
        <div className="glass-card asset-card">
            <div className="asset-header">
                <div className="asset-icon">{asset.symbol.substring(0, 2)}</div>
                <div className="asset-info">
                    <h4>{asset.symbol}</h4>
                    <span className="asset-name">{asset.name}</span>
                </div>
                <div className="asset-price">
                    <span className="current-price">${asset.price.toLocaleString()}</span>
                    <span className={`price-change ${isPositive ? 'positive' : 'negative'}`}>
                        {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                        {Math.abs(asset.change24h)}%
                    </span>
                </div>
            </div>

            <div className="asset-details">
                <div className="detail-row">
                    <span>Holdings</span>
                    <span>{asset.holdings} {asset.symbol}</span>
                </div>
                <div className="detail-row">
                    <span>Avg. Buy</span>
                    <span>${asset.avgBuy.toLocaleString()}</span>
                </div>
                <div className="detail-row total-value">
                    <span>Value</span>
                    <span>${(asset.holdings * asset.price).toLocaleString()}</span>
                </div>
                <div className="detail-row pnl">
                    <span>Unrealized PnL</span>
                    <span className={isPositive ? 'positive' : 'negative'}>
                        {isPositive ? '+' : '-'}${Math.abs(asset.pnl).toLocaleString()} ({asset.pnlPercent}%)
                    </span>
                </div>
            </div>

            <style jsx>{`
        .asset-card {
          padding: 1.25rem;
        }

        .asset-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--glass-border);
        }

        .asset-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          color: white;
          font-size: 0.9rem;
        }

        .asset-info {
          flex: 1;
        }

        .asset-info h4 {
          font-size: 1rem;
          margin-bottom: 2px;
        }

        .asset-name {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .asset-price {
          text-align: right;
        }

        .current-price {
          display: block;
          font-weight: 600;
          font-size: 1rem;
        }

        .price-change {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 2px;
          font-size: 0.8rem;
        }

        .price-change.positive { color: var(--success); }
        .price-change.negative { color: var(--danger); }

        .asset-details {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .detail-row span:last-child {
          color: var(--text-primary);
          font-weight: 500;
        }

        .detail-row.total-value {
          margin-top: 0.5rem;
          padding-top: 0.75rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          font-weight: 600;
        }

        .detail-row.pnl span:last-child {
          font-weight: 600;
        }

        .detail-row.pnl span.positive { color: var(--success); }
        .detail-row.pnl span.negative { color: var(--danger); }
      `}</style>
        </div>
    );
}
