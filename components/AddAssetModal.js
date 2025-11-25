"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function AddAssetModal({ isOpen, onClose, onAdd }) {
    const [formData, setFormData] = useState({
        name: "",
        symbol: "",
        type: "crypto",
        amount: "",
        avgBuyPrice: "",
        currentPrice: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const asset = {
            ...formData,
            amount: parseFloat(formData.amount),
            avgBuyPrice: parseFloat(formData.avgBuyPrice),
            currentPrice: parseFloat(formData.currentPrice),
            addedAt: new Date().toISOString()
        };

        onAdd(asset);
        setFormData({
            name: "",
            symbol: "",
            type: "crypto",
            amount: "",
            avgBuyPrice: "",
            currentPrice: ""
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
        }}>
            <div className="card" style={{ width: '100%', maxWidth: '500px', position: 'relative' }}>
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'var(--text-secondary)'
                    }}
                >
                    <X size={24} />
                </button>

                <h2 style={{ marginBottom: '1.5rem' }}>Add New Asset</h2>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.875rem' }}>
                            Asset Type
                        </label>
                        <select
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            required
                        >
                            <option value="crypto">Cryptocurrency</option>
                            <option value="stock">Stock</option>
                            <option value="etf">ETF</option>
                            <option value="cash">Cash</option>
                        </select>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.875rem' }}>
                                Name
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Bitcoin"
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.875rem' }}>
                                Symbol
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.symbol}
                                onChange={(e) => setFormData({ ...formData, symbol: e.target.value.toUpperCase() })}
                                placeholder="BTC"
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.875rem' }}>
                            Amount
                        </label>
                        <input
                            type="number"
                            step="any"
                            required
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                            placeholder="0.5"
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.875rem' }}>
                                Avg Buy Price ($)
                            </label>
                            <input
                                type="number"
                                step="any"
                                required
                                value={formData.avgBuyPrice}
                                onChange={(e) => setFormData({ ...formData, avgBuyPrice: e.target.value })}
                                placeholder="50000"
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.875rem' }}>
                                Current Price ($)
                            </label>
                            <input
                                type="number"
                                step="any"
                                required
                                value={formData.currentPrice}
                                onChange={(e) => setFormData({ ...formData, currentPrice: e.target.value })}
                                placeholder="55000"
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button type="button" onClick={onClose} className="btn btn-secondary" style={{ flex: 1 }}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                            Add Asset
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
