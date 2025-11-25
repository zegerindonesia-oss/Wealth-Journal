"use client";

import { useState, useEffect } from "react";
import { Calculator, RefreshCw } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function CompoundCalculator() {
    const [principal, setPrincipal] = useState(10000);
    const [rate, setRate] = useState(7);
    const [years, setYears] = useState(10);
    const [contribution, setContribution] = useState(500);
    const [frequency, setFrequency] = useState(12); // 12 for monthly
    const [results, setResults] = useState([]);
    const [finalAmount, setFinalAmount] = useState(0);

    const calculate = () => {
        let balance = principal;
        const data = [];

        for (let i = 0; i <= years; i++) {
            data.push({
                year: i,
                amount: Math.round(balance),
                invested: principal + (contribution * frequency * i)
            });

            // Calculate for next year
            for (let j = 0; j < frequency; j++) {
                balance += contribution;
                balance += (balance * (rate / 100)) / frequency;
            }
        }

        setResults(data);
        setFinalAmount(data[data.length - 1].amount);
    };

    useEffect(() => {
        calculate();
    }, [principal, rate, years, contribution]);

    return (
        <div className="container">
            <header className="page-header">
                <div>
                    <h1>Compound Calculator</h1>
                    <p className="subtitle">Visualize the power of compound interest.</p>
                </div>
            </header>

            <div className="calculator-grid">
                <div className="glass-panel input-section">
                    <h3>Inputs</h3>

                    <div className="input-group">
                        <label>Initial Investment</label>
                        <div className="input-wrapper">
                            <span className="prefix">$</span>
                            <input
                                type="number"
                                value={principal}
                                onChange={(e) => setPrincipal(Number(e.target.value))}
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Monthly Contribution</label>
                        <div className="input-wrapper">
                            <span className="prefix">$</span>
                            <input
                                type="number"
                                value={contribution}
                                onChange={(e) => setContribution(Number(e.target.value))}
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Interest Rate (Annual %)</label>
                        <div className="input-wrapper">
                            <input
                                type="number"
                                value={rate}
                                onChange={(e) => setRate(Number(e.target.value))}
                            />
                            <span className="suffix">%</span>
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Time Period (Years)</label>
                        <div className="input-wrapper">
                            <input
                                type="number"
                                value={years}
                                onChange={(e) => setYears(Number(e.target.value))}
                            />
                            <span className="suffix">Yr</span>
                        </div>
                    </div>

                    <button className="btn btn-primary" onClick={calculate} style={{ marginTop: '1rem', width: '100%' }}>
                        <RefreshCw size={18} style={{ marginRight: '8px' }} />
                        Recalculate
                    </button>
                </div>

                <div className="glass-panel result-section">
                    <div className="result-header">
                        <span className="label">Future Value</span>
                        <span className="final-amount">${finalAmount.toLocaleString()}</span>
                    </div>

                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={results}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                <XAxis dataKey="year" stroke="var(--text-secondary)" />
                                <YAxis stroke="var(--text-secondary)" />
                                <Tooltip
                                    contentStyle={{ background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)' }}
                                    itemStyle={{ color: 'var(--text-primary)' }}
                                />
                                <Line type="monotone" dataKey="amount" stroke="var(--accent-primary)" strokeWidth={2} dot={false} name="Total Value" />
                                <Line type="monotone" dataKey="invested" stroke="var(--text-secondary)" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Total Invested" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .page-header {
          margin: 2rem 0;
        }

        .subtitle {
          color: var(--text-secondary);
          margin-top: 0.5rem;
        }

        .calculator-grid {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 1.5rem;
        }

        .input-section {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .input-group label {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-wrapper input {
          width: 100%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--glass-border);
          padding: 0.75rem;
          border-radius: var(--radius-sm);
          color: var(--text-primary);
          outline: none;
          font-size: 1rem;
        }

        .input-wrapper input:focus {
          border-color: var(--accent-primary);
        }

        .prefix, .suffix {
          position: absolute;
          color: var(--text-secondary);
          pointer-events: none;
        }

        .prefix { left: 1rem; }
        .suffix { right: 1rem; }

        .input-wrapper .prefix + input { padding-left: 2rem; }
        .input-wrapper input:has(+ .suffix) { padding-right: 2.5rem; }

        .result-section {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
        }

        .result-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 2rem;
        }

        .result-header .label {
          color: var(--text-secondary);
          font-size: 1rem;
          margin-bottom: 0.5rem;
        }

        .final-amount {
          font-size: 3rem;
          font-weight: 700;
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
          WebkitBackgroundClip: text;
          WebkitTextFillColor: transparent;
        }

        .chart-container {
          flex: 1;
          min-height: 300px;
        }

        @media (max-width: 900px) {
          .calculator-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
        </div>
    );
}
