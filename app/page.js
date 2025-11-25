"use client";

import { useState } from "react";
import Link from "next/link";
import { LayoutGrid, Calendar, FileText, StickyNote, ChevronLeft, ChevronRight, Globe } from "lucide-react";
import { translations } from "@/lib/translations";

export default function LandingPage() {
  const [lang, setLang] = useState('en'); // 'en' or 'id'
  const t = translations[lang];

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'id' : 'en');
  };

  return (
    <div className="landing-page">
      {/* Header */}
      <header className="container" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="flex-center" style={{ gap: '0.5rem', fontWeight: 700, fontSize: '1.25rem' }}>
          <div style={{ width: 24, height: 24, background: '#0f172a', borderRadius: 6, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, padding: 4 }}>
            <div style={{ background: 'white', borderRadius: 1 }}></div>
            <div style={{ background: 'white', borderRadius: 1, opacity: 0.5 }}></div>
            <div style={{ background: 'white', borderRadius: 1, opacity: 0.5 }}></div>
            <div style={{ background: 'white', borderRadius: 1 }}></div>
          </div>
          Journey
        </div>

        <nav style={{ background: '#f8fafc', padding: '0.25rem', borderRadius: '9999px', display: 'flex' }}>
          <Link href="#" className="landing-nav-pill" style={{ background: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', color: '#0f172a' }}>{t.nav.home}</Link>
          <Link href="#" className="landing-nav-pill">{t.nav.about}</Link>
          <Link href="#" className="landing-nav-pill">{t.nav.pricing}</Link>
        </nav>

        <div className="flex-center" style={{ gap: '1rem' }}>
          <button
            onClick={toggleLang}
            className="flex-center"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#64748b',
              gap: '0.25rem',
              fontSize: '0.9rem',
              fontWeight: 500
            }}
          >
            <Globe size={16} />
            {lang.toUpperCase()}
          </button>
          <Link href="/auth/signup" style={{ fontWeight: 600, color: '#64748b' }}>{t.nav.signup}</Link>
          <Link href="/dashboard" className="landing-btn-primary">{t.nav.login}</Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container" style={{ textAlign: 'center', paddingTop: '4rem', paddingBottom: '4rem' }}>
        <h1 style={{ fontSize: '4rem', lineHeight: 1.1, marginBottom: '1.5rem', color: '#0f172a', letterSpacing: '-0.04em' }}>
          {t.hero.title}
        </h1>
        <p style={{ fontSize: '1.25rem', color: '#64748b', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
          {t.hero.subtitle}
        </p>

        <div className="flex-center" style={{ flexDirection: 'column', gap: '1rem' }}>
          <button className="landing-btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
            {t.hero.cta}
          </button>
          <span style={{ fontSize: '0.875rem', color: '#94a3b8' }}>{t.hero.users}</span>
        </div>

        {/* Mockup Graphic */}
        <div style={{ marginTop: '5rem', position: 'relative' }}>
          {/* Background decoration */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '120%',
            height: '120%',
            background: 'radial-gradient(circle, rgba(0,0,0,0.03) 0%, transparent 70%)',
            zIndex: 0
          }}></div>

          <div className="mockup-card" style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1, display: 'flex', height: '600px' }}>
            {/* Sidebar */}
            <div style={{ width: '240px', background: '#f8fafc', padding: '1.5rem', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', fontWeight: 700 }}>
                <div style={{ width: 16, height: 16, background: '#0f172a', borderRadius: 4 }}></div>
                Journey
              </div>

              <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.75rem', padding: '0.75rem', background: 'white', borderRadius: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', color: '#0f172a', fontWeight: 500 }}>
                <Calendar size={18} /> {t.mockup.calendar}
              </div>
              <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.75rem', padding: '0.75rem', color: '#64748b' }}>
                <LayoutGrid size={18} /> {t.mockup.models}
              </div>
              <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.75rem', padding: '0.75rem', color: '#64748b' }}>
                <FileText size={18} /> {t.mockup.tradelog}
              </div>
              <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.75rem', padding: '0.75rem', color: '#64748b' }}>
                <StickyNote size={18} /> {t.mockup.notes}
              </div>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, padding: '2rem', background: 'white' }}>
              <div className="flex-between" style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', color: '#0f172a' }}>{t.mockup.tradingCalendar}</h3>
                <div className="flex-center" style={{ gap: '1rem' }}>
                  <div style={{ background: '#f1f5f9', padding: '0.25rem', borderRadius: '6px', display: 'flex', fontSize: '0.875rem' }}>
                    <span style={{ padding: '0.25rem 0.75rem', background: 'white', borderRadius: '4px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>{t.mockup.plan}</span>
                    <span style={{ padding: '0.25rem 0.75rem', color: '#64748b' }}>{t.mockup.pnl}</span>
                  </div>
                  <div className="flex-center" style={{ gap: '0.5rem', color: '#64748b', fontSize: '0.875rem' }}>
                    <ChevronLeft size={16} /> May 2025 <ChevronRight size={16} />
                  </div>
                </div>
              </div>

              {/* Calendar Header */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.5rem', marginBottom: '0.5rem', color: '#94a3b8', fontSize: '0.75rem', textAlign: 'left', paddingLeft: '0.5rem' }}>
                <div>{t.mockup.mon}</div>
                <div>{t.mockup.tue}</div>
                <div>{t.mockup.wed}</div>
                <div>{t.mockup.thu}</div>
                <div>{t.mockup.fri}</div>
              </div>

              {/* Calendar Grid */}
              <div className="calendar-grid">
                {/* Week 1 */}
                <div className="calendar-day" style={{ opacity: 0.5 }}>27</div>
                <div className="calendar-day" style={{ opacity: 0.5 }}>28</div>
                <div className="calendar-day" style={{ opacity: 0.5 }}>29</div>
                <div className="calendar-day" style={{ opacity: 0.5 }}>30</div>
                <div className="calendar-day">
                  <span>1</span>
                  <div className="tag-success" style={{ padding: '2px 6px', borderRadius: '4px', fontSize: '0.65rem' }}>100% {t.mockup.followed}</div>
                </div>

                {/* Week 2 */}
                <div className="calendar-day">
                  <span>4</span>
                  <div className="tag-warning" style={{ padding: '2px 6px', borderRadius: '4px', fontSize: '0.65rem' }}>57% {t.mockup.followed}</div>
                </div>
                <div className="calendar-day">
                  <span>5</span>
                  <div className="tag-success" style={{ padding: '2px 6px', borderRadius: '4px', fontSize: '0.65rem' }}>100% {t.mockup.followed}</div>
                </div>
                <div className="calendar-day">
                  <span>6</span>
                  <div className="tag-danger" style={{ padding: '2px 6px', borderRadius: '4px', fontSize: '0.65rem' }}>30% {t.mockup.followed}</div>
                </div>
                <div className="calendar-day">
                  <span>7</span>
                  <div className="tag-warning" style={{ padding: '2px 6px', borderRadius: '4px', fontSize: '0.65rem' }}>67% {t.mockup.followed}</div>
                </div>
                <div className="calendar-day">
                  <span>8</span>
                  <div className="tag-neutral" style={{ padding: '2px 6px', borderRadius: '4px', fontSize: '0.65rem' }}>0% {t.mockup.followed}</div>
                </div>

                {/* Week 3 */}
                <div className="calendar-day">
                  <span>11</span>
                </div>
                <div className="calendar-day">
                  <span>12</span>
                  <div className="tag-warning" style={{ padding: '2px 6px', borderRadius: '4px', fontSize: '0.65rem' }}>57% {t.mockup.followed}</div>
                </div>
                <div className="calendar-day">
                  <span>13</span>
                  <div className="tag-neutral" style={{ padding: '2px 6px', borderRadius: '4px', fontSize: '0.65rem' }}>0% {t.mockup.followed}</div>
                </div>
                <div className="calendar-day">
                  <span>14</span>
                </div>
                <div className="calendar-day">
                  <span>15</span>
                  <div className="tag-success" style={{ padding: '2px 6px', borderRadius: '4px', fontSize: '0.65rem' }}>100% {t.mockup.followed}</div>
                </div>

                {/* Week 4 */}
                <div className="calendar-day">
                  <span>18</span>
                  <div className="tag-success" style={{ padding: '2px 6px', borderRadius: '4px', fontSize: '0.65rem' }}>100% {t.mockup.followed}</div>
                </div>
                <div className="calendar-day">
                  <span>19</span>
                </div>
                <div className="calendar-day">
                  <span>20</span>
                  <div className="tag-success" style={{ padding: '2px 6px', borderRadius: '4px', fontSize: '0.65rem' }}>100% {t.mockup.followed}</div>
                </div>
                <div className="calendar-day">
                  <span>21</span>
                  <div className="tag-success" style={{ padding: '2px 6px', borderRadius: '4px', fontSize: '0.65rem' }}>100% {t.mockup.followed}</div>
                </div>
                <div className="calendar-day">
                  <span>22</span>
                  <div className="tag-danger" style={{ padding: '2px 6px', borderRadius: '4px', fontSize: '0.65rem' }}>10% {t.mockup.followed}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
