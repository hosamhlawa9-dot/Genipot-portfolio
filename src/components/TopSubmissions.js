import React, { useState, useMemo } from 'react';
import { formatViews, formatMAD, getPlatformColor } from '../utils/formatters';

export default function TopSubmissions({ submissions }) {
  const [sortBy, setSortBy] = useState('views');

  // Sort by views or earning_mad (real field name)
  const sorted = useMemo(() => {
    const field = sortBy === 'earnings' ? 'earning_mad' : 'views';
    return [...submissions].sort((a, b) => b[field] - a[field]).slice(0, 6);
  }, [submissions, sortBy]);

  const maxVal = sorted[0]?.[sortBy === 'earnings' ? 'earning_mad' : 'views'] || 1;

  return (
    <section style={{ background: '#0D2E0D', padding: '5rem 2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header + sort buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.03em' }}>
              Top Submissions
            </h2>
            <p style={{ color: '#6b7280', fontSize: '0.85rem', marginTop: '0.3rem' }}>
              Highest performing content across all campaigns
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {['views', 'earnings'].map(s => (
              <button key={s} onClick={() => setSortBy(s)} style={{
                padding: '0.4rem 1rem', borderRadius: '9999px', fontWeight: 700,
                fontSize: '0.7rem', textTransform: 'uppercase', cursor: 'pointer',
                border: '1.5px solid rgba(170,255,0,0.3)',
                background: sortBy === s ? '#aaff00' : 'transparent',
                color: sortBy === s ? '#0D2E0D' : '#aaff00',
                transition: 'all 0.2s',
              }}>By {s}</button>
            ))}
          </div>
        </div>

        {/* Submissions grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.2rem' }}>
          {sorted.map((sub, i) => {
            const platformColor = getPlatformColor(sub.platform);
            const isValidated = sub.status === 'validated'; // real JSON field
            const currentVal = sortBy === 'earnings' ? sub.earning_mad : sub.views;

            return (
              <div key={sub.id}
                style={{
                  background: '#1a3a1a', borderRadius: '1rem', overflow: 'hidden',
                  border: '1.5px solid rgba(255,255,255,0.06)',
                  transition: 'border-color 0.2s, transform 0.2s', cursor: 'pointer',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#aaff00';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Thumbnail area — colored by platform (no thumbnail in JSON) */}
                <div style={{
                  position: 'relative', aspectRatio: '16/9',
                  background: `${platformColor}25`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {/* Play button circle */}
                  <div style={{
                    width: '56px', height: '56px', borderRadius: '50%',
                    background: platformColor, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: `0 8px 24px ${platformColor}66`,
                  }}>
                    <span className="material-symbols-outlined" style={{ color: '#fff', fontSize: '2rem' }}>play_arrow</span>
                  </div>

                  {/* Platform badge */}
                  <span style={{
                    position: 'absolute', top: '0.75rem', left: '0.75rem',
                    background: platformColor, color: '#fff',
                    fontSize: '0.6rem', fontWeight: 900, padding: '0.2rem 0.6rem',
                    borderRadius: '9999px', textTransform: 'uppercase',
                  }}>{sub.platform}</span>

                  {/* Status badge — from real JSON: status */}
                  <span style={{
                    position: 'absolute', top: '0.75rem', right: '0.75rem',
                    background: isValidated ? '#aaff00' : '#fbbf24',
                    color: '#0D2E0D', fontSize: '0.6rem', fontWeight: 900,
                    padding: '0.2rem 0.6rem', borderRadius: '9999px', textTransform: 'uppercase',
                  }}>
                    {isValidated ? '✓ Validated' : '⏳ Pending'}
                  </span>

                  {/* Rank for top 3 */}
                  {i < 3 && (
                    <span style={{
                      position: 'absolute', bottom: '0.75rem', right: '0.75rem',
                      background: i === 0 ? '#aaff00' : 'rgba(255,255,255,0.15)',
                      color: i === 0 ? '#0D2E0D' : '#fff',
                      fontSize: '0.65rem', fontWeight: 900,
                      padding: '0.2rem 0.6rem', borderRadius: '9999px',
                    }}>#{i + 1}</span>
                  )}
                </div>

                {/* Card body */}
                <div style={{ padding: '1.2rem' }}>
                  {/* Campaign title — real JSON field: campaign_title */}
                  <p style={{ color: '#6b7280', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                    {sub.campaign_title}
                  </p>
                  <p style={{ color: '#9ca3af', fontSize: '0.8rem', marginBottom: '1rem' }}>
                    {sub.brand_name} {/* real JSON field */}
                  </p>

                  {/* Stats row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#aaff00', fontWeight: 900, fontSize: '1rem' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>visibility</span>
                      {formatViews(sub.views)}
                    </div>
                    <div style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 700 }}>
                      💰 {formatMAD(sub.earning_mad)} {/* real JSON field */}
                    </div>
                  </div>

                  {/* Engagement mini stats */}
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem' }}>
                    {[
                      { icon: 'favorite', val: sub.likes },
                      { icon: 'chat_bubble', val: sub.comments },
                      { icon: 'share', val: sub.shares },
                    ].map(({ icon, val }) => (
                      <div key={icon} style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '0.85rem' }}>{icon}</span>
                        {formatViews(val)}
                      </div>
                    ))}
                  </div>

                  {/* Progress bar */}
                  <div style={{ height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', borderRadius: '9999px',
                      background: i === 0 ? '#aaff00' : 'rgba(170,255,0,0.4)',
                      width: `${(currentVal / maxVal) * 100}%`,
                      transition: 'width 0.8s ease',
                    }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
