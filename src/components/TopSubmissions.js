import React, { useState, useMemo } from 'react';
import { formatViews, formatMAD, getPlatformColor } from '../utils/formatters';

const s = {
  section: { background: '#0D2E0D', padding: '5rem 2rem' },
  inner: { maxWidth: '1200px', margin: '0 auto' },
  topRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' },
  titleWrap: {},
  title: { fontSize: '1.8rem', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.02em' },
  subtitle: { color: '#6b7280', fontSize: '0.85rem', marginTop: '0.3rem' },
  sortBtns: { display: 'flex', gap: '0.5rem' },
  sortBtn: (active) => ({
    padding: '0.4rem 1rem',
    borderRadius: '9999px',
    fontWeight: 700,
    fontSize: '0.7rem',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    cursor: 'pointer',
    border: '1.5px solid rgba(170,255,0,0.3)',
    background: active ? '#aaff00' : 'transparent',
    color: active ? '#0D2E0D' : '#aaff00',
    transition: 'all 0.2s',
  }),
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.2rem' },
  card: {
    background: '#1a3a1a',
    borderRadius: '1rem',
    overflow: 'hidden',
    border: '1.5px solid rgba(255,255,255,0.06)',
    transition: 'border-color 0.2s, transform 0.2s',
    cursor: 'pointer',
  },
  thumb: { position: 'relative', aspectRatio: '16/9', overflow: 'hidden', background: '#111' },
  thumbImg: { width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 },
  playBtn: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(0,0,0,0.3)',
  },
  platformBadge: (platform) => ({
    position: 'absolute',
    top: '0.75rem',
    left: '0.75rem',
    background: getPlatformColor(platform),
    color: '#fff',
    fontSize: '0.6rem',
    fontWeight: 900,
    padding: '0.2rem 0.6rem',
    borderRadius: '9999px',
    textTransform: 'uppercase',
  }),
  cardBody: { padding: '1.2rem' },
  campaignLabel: { color: '#6b7280', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.3rem' },
  videoTitle: { color: '#fff', fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem' },
  statsRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  viewStat: { display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#aaff00', fontWeight: 900, fontSize: '1rem' },
  earnStat: { display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#fff', fontSize: '0.85rem', fontWeight: 700 },
  progressWrap: { marginTop: '0.75rem' },
  progressTrack: { height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '9999px', overflow: 'hidden' },
};

export default function TopSubmissions({ submissions }) {
  const [sortBy, setSortBy] = useState('views');

  const sorted = useMemo(() => {
    return [...submissions].sort((a, b) => b[sortBy] - a[sortBy]).slice(0, 6);
  }, [submissions, sortBy]);

  const maxViews = sorted[0]?.views || 1;

  return (
    <section style={s.section}>
      <div style={s.inner}>
        <div style={s.topRow}>
          <div style={s.titleWrap}>
            <h2 style={s.title}>Top Submissions</h2>
            <p style={s.subtitle}>Highest performing content across all campaigns</p>
          </div>
          <div style={s.sortBtns}>
            <button style={s.sortBtn(sortBy === 'views')} onClick={() => setSortBy('views')}>By Views</button>
            <button style={s.sortBtn(sortBy === 'earnings')} onClick={() => setSortBy('earnings')}>By Earnings</button>
          </div>
        </div>

        <div style={s.grid}>
          {sorted.map((sub, i) => (
            <div
              key={sub.id}
              style={s.card}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#aaff00';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={s.thumb}>
                <img src={sub.thumbnail} alt={sub.title} style={s.thumbImg} />
                <div style={s.playBtn}>
                  <span className="material-symbols-outlined" style={{ color: '#fff', fontSize: '2.5rem', opacity: 0.9 }}>play_circle</span>
                </div>
                <span style={s.platformBadge(sub.platform)}>{sub.platform}</span>
              </div>
              <div style={s.cardBody}>
                <p style={s.campaignLabel}>{sub.campaignName}</p>
                <p style={s.videoTitle}>{sub.title}</p>
                <div style={s.statsRow}>
                  <div style={s.viewStat}>
                    <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>visibility</span>
                    {formatViews(sub.views)}
                  </div>
                  <div style={s.earnStat}>
                    💰 {formatMAD(sub.earnings)}
                  </div>
                </div>
                <div style={s.progressWrap}>
                  <div style={s.progressTrack}>
                    <div style={{
                      height: '100%',
                      width: `${(sub.views / maxViews) * 100}%`,
                      background: i === 0 ? '#aaff00' : 'rgba(170,255,0,0.4)',
                      borderRadius: '9999px',
                    }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
