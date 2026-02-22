import React from 'react';
import { formatViews, formatMAD, getPlatformColor } from '../utils/formatters';

const s = {
  section: { background: '#fff', padding: '5rem 2rem' },
  inner: { maxWidth: '1200px', margin: '0 auto' },
  header: { marginBottom: '2.5rem' },
  title: { fontSize: '1.8rem', fontWeight: 900, color: '#0D2E0D', textTransform: 'uppercase', letterSpacing: '-0.02em' },
  subtitle: { color: '#6b7280', fontSize: '0.9rem', marginTop: '0.3rem' },
  badge: { background: '#E8F5C8', color: '#0D2E0D', fontSize: '0.65rem', fontWeight: 700, padding: '0.3rem 0.8rem', borderRadius: '9999px', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'inline-block', marginBottom: '0.5rem' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.2rem', marginBottom: '1.2rem' },
  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' },
  card: {
    background: '#fff',
    border: '1.5px solid #E8F5C8',
    borderRadius: '1rem',
    padding: '1.5rem',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
  },
  statNum: { fontSize: '2.5rem', fontWeight: 900, color: '#aaff00', lineHeight: 1, letterSpacing: '-0.04em', WebkitTextStroke: '1px #0D2E0D' },
  statLabel: { fontSize: '0.75rem', fontWeight: 700, color: '#0D2E0D', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '0.5rem' },
  platformRow: { display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '1rem' },
  barWrap: { display: 'flex', flexDirection: 'column', gap: '0.3rem' },
  barLabel: { display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700, color: '#0D2E0D' },
  barTrack: { height: '8px', background: '#E8F5C8', borderRadius: '9999px', overflow: 'hidden' },
};

export default function PerformanceStats({ stats }) {
  if (!stats) return null;

  const maxViews = Math.max(...Object.values(stats.platformBreakdown));

  const statCards = [
    { label: 'Total Submissions', value: stats.totalSubmissions, format: (v) => v },
    { label: 'Total Views', value: stats.totalViews, format: formatViews },
    { label: 'Total Earnings', value: stats.totalEarnings, format: formatMAD },
    { label: 'Avg Views / Post', value: stats.avgViewsPerSubmission, format: formatViews },
  ];

  return (
    <section style={s.section}>
      <div style={s.inner}>
        <div style={s.header}>
          <span style={s.badge}>📊 Live Stats</span>
          <h2 style={s.title}>Performance Dashboard</h2>
          <p style={s.subtitle}>Lifetime Creator Performance Stats</p>
        </div>

        {/* 4 stat cards */}
        <div style={s.grid}>
          {statCards.map((c) => (
            <div key={c.label} style={s.card}>
              <div style={s.statNum}>{c.format(c.value)}</div>
              <div style={s.statLabel}>{c.label}</div>
            </div>
          ))}
        </div>

        {/* Platform breakdown + engagement */}
        <div style={s.grid2}>
          {/* Platform breakdown */}
          <div style={s.card}>
            <div style={s.statLabel}>Platform Breakdown (Views)</div>
            <div style={s.platformRow}>
              {Object.entries(stats.platformBreakdown).map(([platform, views]) => (
                <div key={platform} style={s.barWrap}>
                  <div style={s.barLabel}>
                    <span>{platform}</span>
                    <span>{formatViews(views)}</span>
                  </div>
                  <div style={s.barTrack}>
                    <div style={{
                      height: '100%',
                      width: `${(views / maxViews) * 100}%`,
                      background: getPlatformColor(platform),
                      borderRadius: '9999px',
                      transition: 'width 1s ease',
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Best platform highlight */}
          <div style={{ ...s.card, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', background: '#0D2E0D' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🏆</div>
            <div style={{ color: '#aaff00', fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Best Platform</div>
            <div style={{ color: '#fff', fontSize: '2rem', fontWeight: 900, letterSpacing: '-0.04em' }}>{stats.bestPlatform}</div>
            <div style={{ color: '#cbd5e1', fontSize: '0.8rem', marginTop: '0.5rem' }}>
              {formatViews(stats.platformBreakdown[stats.bestPlatform])} views generated
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
