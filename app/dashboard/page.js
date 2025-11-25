"use client";

import { useState, useEffect } from "react";
import { DollarSign, TrendingUp, TrendingDown, Plus, Bitcoin, Wallet } from "lucide-react";
import AddAssetModal from "@/components/AddAssetModal";

export default function Dashboard() {
    const [totalBalance, setTotalBalance] = useState(0);
    const [balanceChange, setBalanceChange] = useState(0);
    const [assets, setAssets] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [profitLoss, setProfitLoss] = useState(0);

    useEffect(() => {
        loadAssets();
    }, []);

    const loadAssets = () => {
        const savedAssets = localStorage.getItem('wealthJournalAssets');
        if (savedAssets) {
            const parsedAssets = JSON.parse(savedAssets);
            setAssets(parsedAssets);
            calculateMetrics(parsedAssets);
        }
    };

    const calculateMetrics = (assetList) => {
        const total = assetList.reduce((sum, asset) => sum + (asset.amount * asset.currentPrice), 0);
        const totalCost = assetList.reduce((sum, asset) => sum + (asset.amount * asset.avgBuyPrice), 0);
        const pl = total - totalCost;
        const plPercent = totalCost > 0 ? ((pl / totalCost) * 100) : 0;

        setTotalBalance(total);
        setProfitLoss(pl);
        setBalanceChange(plPercent);
    };

    const handleAddAsset = (newAsset) => {
        const updatedAssets = [...assets, newAsset];
        setAssets(updatedAssets);
        localStorage.setItem('wealthJournalAssets', JSON.stringify(updatedAssets));
        calculateMetrics(updatedAssets);
    };

    const assetsByType = assets.reduce((acc, asset) => {
        acc[asset.type] = (acc[asset.type] || 0) + (asset.amount * asset.currentPrice);
        return acc;
    }, {});

    return (
        <>
            <div className="container" style={{ paddingTop: '2rem' }}>
                <header style={{ marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Dashboard</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Welcome back! Here's your portfolio overview.</p>
                </header>

                {/* Stats Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                    {/* Total Balance */}
                    <div className="card">
                        <div className="card-header">
                            <div className="card-icon">
                                <DollarSign size={24} />
                            </div>
                            <div className="card-title">Total Balance</div>
                        </div>

                        <div className="stat-value">
                            ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>

                        <div className={`stat-change ${balanceChange >= 0 ? 'positive' : 'negative'}`}>
                            {balanceChange >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                            {balanceChange >= 0 ? '+' : ''}{balanceChange.toFixed(2)}%
                            <span style={{ color: 'var(--text-muted)', marginLeft: '0.5rem' }}>total return</span>
                        </div>
                    </div>

                    {/* Profit/Loss */}
                    <div className="card">
                        <div className="card-header">
                            <div className="card-icon" style={{ background: profitLoss >= 0 ? '#D1FAE5' : '#FEE2E2', color: profitLoss >= 0 ? 'var(--success)' : 'var(--danger)' }}>
                                {profitLoss >= 0 ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
                            </div>
                            <div className="card-title">Profit / Loss</div>
                        </div>

                        <div className="stat-value" style={{ color: profitLoss >= 0 ? 'var(--success)' : 'var(--danger)' }}>
                            {profitLoss >= 0 ? '+' : ''}${Math.abs(profitLoss).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>

                        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                            {assets.length} assets tracked
                        </div>
                    </div>

                    {/* Asset Allocation */}
                    <div className="card">
                        <div className="card-header">
                            <div className="card-icon">
                                <Wallet size={24} />
                            </div>
                            <div className="card-title">Asset Allocation</div>
                        </div>

                        <div style={{ marginTop: '1rem' }}>
                            {Object.entries(assetsByType).map(([type, value]) => (
                                <div key={type} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                    <span style={{ textTransform: 'capitalize', fontSize: '0.875rem' }}>{type}</span>
                                    <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>
                                        ${value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                    </span>
                                </div>
                            ))}
                            {Object.keys(assetsByType).length === 0 && (
                                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>No assets yet</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Assets Section */}
                <div style={{ marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h2 style={{ fontSize: '1.25rem' }}>Your Assets</h2>
                        <button onClick={() => setIsModalOpen(true)} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Plus size={18} />
                            Add Asset
                        </button>
                    </div>

                    {assets.length === 0 ? (
                        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
                            <Bitcoin size={48} style={{ margin: '0 auto 1rem', color: 'var(--text-muted)' }} />
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                No assets yet. Start by adding your first asset!
                            </p>
                            <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
                                Add Your First Asset
                            </button>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                            {assets.map((asset, index) => {
                                const assetValue = asset.amount * asset.currentPrice;
                                const assetCost = asset.amount * asset.avgBuyPrice;
                                const assetPL = assetValue - assetCost;
                                const assetPLPercent = (assetPL / assetCost) * 100;

                                return (
                                    <div key={index} className="card">
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                                            <div style={{
                                                width: 40,
                                                height: 40,
                                                borderRadius: '50%',
                                                background: 'var(--accent-light)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontWeight: 700,
                                                color: 'var(--accent-primary)',
                                                fontSize: '0.875rem'
                                            }}>
                                                {asset.symbol.substring(0, 3).toUpperCase()}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontWeight: 600 }}>{asset.name}</div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                                    {asset.symbol} · {asset.type}
                                                </div>
                                            </div>
                                            <span className={`badge ${assetPL >= 0 ? 'badge-green' : 'badge-red'}`}>
                                                {assetPL >= 0 ? '+' : ''}{assetPLPercent.toFixed(1)}%
                                            </span>
                                        </div>

                                        <div style={{ marginBottom: '0.75rem' }}>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                                                Holdings
                                            </div>
                                            <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>
                                                {asset.amount} {asset.symbol}
                                            </div>
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border)' }}>
                                            <div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Value</div>
                                                <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>
                                                    ${assetValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                                </div>
                                            </div>
                                            <div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>P/L</div>
                                                <div style={{ fontWeight: 600, fontSize: '0.875rem', color: assetPL >= 0 ? 'var(--success)' : 'var(--danger)' }}>
                                                    {assetPL >= 0 ? '+' : ''}${Math.abs(assetPL).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="card">
                    <h3 style={{ marginBottom: '1rem' }}>Quick Actions</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                        <button className="btn btn-secondary">View Trade Journal</button>
                        <button className="btn btn-secondary">Add Trade Entry</button>
                        <button className="btn btn-secondary">View Analytics</button>
                    </div>
                </div>
            </div>

            <AddAssetModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={handleAddAsset}
            />
        </>
    );
}
