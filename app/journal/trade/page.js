"use client";

import { useState, useEffect } from "react";
import { Plus, TrendingUp, TrendingDown, BookOpen, Target, AlertCircle } from "lucide-react";

export default function TradeJournalPage() {
  const [trades, setTrades] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    symbol: "",
    type: "long",
    entry: "",
    stopLoss: "",
    takeProfit: "",
    position: "",
    notes: "",
    status: "open"
  });

  useEffect(() => {
    const savedTrades = localStorage.getItem('wealthJournalTrades');
    if (savedTrades) {
      setTrades(JSON.parse(savedTrades));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTrade = {
      ...formData,
      entry: parseFloat(formData.entry),
      stopLoss: parseFloat(formData.stopLoss),
      takeProfit: parseFloat(formData.takeProfit),
      position: parseFloat(formData.position),
      createdAt: new Date().toISOString(),
      id: Date.now()
    };

    const updatedTrades = [newTrade, ...trades];
    setTrades(updatedTrades);
    localStorage.setItem('wealthJournalTrades', JSON.stringify(updatedTrades));

    setFormData({
      symbol: "",
      type: "long",
      entry: "",
      stopLoss: "",
      takeProfit: "",
      position: "",
      notes: "",
      status: "open"
    });
    setIsFormOpen(false);
  };

  const stats = trades.reduce((acc, trade) => {
    if (trade.status === 'win') acc.wins++;
    if (trade.status === 'loss') acc.losses++;
    if (trade.status === 'open') acc.open++;
    return acc;
  }, { wins: 0, losses: 0, open: 0 });

  const winRate = stats.wins + stats.losses > 0
    ? ((stats.wins / (stats.wins + stats.losses)) * 100).toFixed(1)
    : 0;

  return (
    <div className="container" style={{ paddingTop: '2rem' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Trade Journal</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Track your trades, analyze performance, and improve your strategy</p>
      </header>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div className="card">
          <div className="card-title" style={{ marginBottom: '0.5rem' }}>Win Rate</div>
          <div className="stat-value" style={{ fontSize: '2rem', color: 'var(--success)' }}>{winRate}%</div>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            {stats.wins}W / {stats.losses}L
          </div>
        </div>

        <div className="card">
          <div className="card-title" style={{ marginBottom: '0.5rem' }}>Open Trades</div>
          <div className="stat-value" style={{ fontSize: '2rem' }}>{stats.open}</div>
        </div>

        <div className="card">
          <div className="card-title" style={{ marginBottom: '0.5rem' }}>Total Trades</div>
          <div className="stat-value" style={{ fontSize: '2rem' }}>{trades.length}</div>
        </div>
      </div>

      {/* Add Trade Button */}
      <div style={{ marginBottom: '1.5rem' }}>
        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <Plus size={18} />
          {isFormOpen ? 'Cancel' : 'New Trade Plan'}
        </button>
      </div>

      {/* Trade Form */}
      {isFormOpen && (
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Create Trade Plan</h3>

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.875rem' }}>
                  Symbol
                </label>
                <input
                  type="text"
                  required
                  value={formData.symbol}
                  onChange={(e) => setFormData({ ...formData, symbol: e.target.value.toUpperCase() })}
                  placeholder="BTC/USDT"
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.875rem' }}>
                  Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                >
                  <option value="long">Long</option>
                  <option value="short">Short</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.875rem' }}>
                  Entry Price
                </label>
                <input
                  type="number"
                  step="any"
                  required
                  value={formData.entry}
                  onChange={(e) => setFormData({ ...formData, entry: e.target.value })}
                  placeholder="50000"
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.875rem' }}>
                  Stop Loss
                </label>
                <input
                  type="number"
                  step="any"
                  required
                  value={formData.stopLoss}
                  onChange={(e) => setFormData({ ...formData, stopLoss: e.target.value })}
                  placeholder="48000"
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.875rem' }}>
                  Take Profit
                </label>
                <input
                  type="number"
                  step="any"
                  required
                  value={formData.takeProfit}
                  onChange={(e) => setFormData({ ...formData, takeProfit: e.target.value })}
                  placeholder="55000"
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.875rem' }}>
                  Position Size ($)
                </label>
                <input
                  type="number"
                  step="any"
                  required
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  placeholder="1000"
                />
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.875rem' }}>
                Trade Notes / Strategy
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Why are you taking this trade? What's your analysis?"
                rows={4}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Save Trade Plan
            </button>
          </form>
        </div>
      )}

      {/* Trades List */}
      <div>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Trade History</h2>

        {trades.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
            <BookOpen size={48} style={{ margin: '0 auto 1rem', color: 'var(--text-muted)' }} />
            <p style={{ color: 'var(--text-secondary)' }}>
              No trades yet. Start documenting your trading journey!
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {trades.map((trade) => {
              const riskReward = Math.abs((trade.takeProfit - trade.entry) / (trade.entry - trade.stopLoss)).toFixed(2);

              return (
                <div key={trade.id} className="card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{trade.symbol}</h3>
                        <span className={`badge ${trade.type === 'long' ? 'badge-green' : 'badge-red'}`}>
                          {trade.type.toUpperCase()}
                        </span>
                        <span className={`badge badge-blue`}>
                          {trade.status.toUpperCase()}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        {new Date(trade.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                        Entry
                      </div>
                      <div style={{ fontWeight: 600 }}>${trade.entry.toLocaleString()}</div>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                        Stop Loss
                      </div>
                      <div style={{ fontWeight: 600, color: 'var(--danger)' }}>${trade.stopLoss.toLocaleString()}</div>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                        Take Profit
                      </div>
                      <div style={{ fontWeight: 600, color: 'var(--success)' }}>${trade.takeProfit.toLocaleString()}</div>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                        Position
                      </div>
                      <div style={{ fontWeight: 600 }}>${trade.position.toLocaleString()}</div>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                        R:R Ratio
                      </div>
                      <div style={{ fontWeight: 600 }}>1:{riskReward}</div>
                    </div>
                  </div>

                  {trade.notes && (
                    <div style={{ padding: '1rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', marginTop: '1rem' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: 600 }}>
                        NOTES
                      </div>
                      <div style={{ fontSize: '0.875rem' }}>{trade.notes}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
