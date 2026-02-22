import React, { useState, useMemo } from 'react';
import { formatViews, formatMAD, getPlatformColor } from '../utils/formatters';

const s = {
  section: { background: '#E8F5C8', padding: '5rem 2rem' },
  inner: { maxWidth: '1200px', margin: '0 auto' },
  topRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' },
  title: { fontSize: '1.8rem', fontWeight: 900, color: '#0D2E0D', textTransform: 'uppercase', letterSpacing: '-0.02em' },
  filters: { display: 'flex', gap: '0.5rem', flexWrap: 'wrap' },
  filterBtn: (active) => ({
    padding: '0.4rem 1.2rem',
    borderRadius: '9999px',
    fontWeight: 700,
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    cursor: 'pointer',
    border: active ? '1.5px solid #0D2E0D' : '1.5px solid rgba(13,46,13,0.3)',
    background: active ? '#aaff00' : 'transparent',
    color: '#0D2E0D',
    transition: 'all 0.2s',
  }),
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.2rem' },
  card: {
    background: '#fff',
    borderRadius: '1rem',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
    transition: 'transform 0.2s',
  },
  cardTop: (platform) => ({
    background: '#0D2E0D',
    padding: '1.2rem 1.5rem',
    borderBottom: `3px solid ${getPlatformColor(platform)}`,
  }),
  cardBody: { padding: '1.2rem 1.5rem' },
  campaignName: { color: '#fff', fontSize: '1rem', fontWeight: 900, marginBottom: '0.5rem' },
  badges: { display: 'flex', gap: '0.5rem' },
  badge: (color) => ({
    background: `${color}22`,
    color: color,
    border: `1px solid ${color}44`,
    padding: '0.2rem 0.7rem',
    borderRadius: '9999px',
    fontSize: '0.65rem',
    fontWeight: 700,
    textTransform: 'uppercase',
  }),
  statsRow: { display: 'flex', gap: '1.5rem', marginBottom: '1rem', flexWrap: 'wrap' },
  stat: { display: 'flex', flexDirection: 'column' },
  statNum: { fontSize: '1.2rem', fontWeight: 900, color: '#0D2E0D', letterSpacing: '-0.03em' },
  statLabel: { fontSize: '0.65rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase' },
  statusBadge: (active) => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.3rem',
    background: active ? 'rgba(170,255,0,0.15)' : 'rgba(107,114,128,0.1)',
    color: active ? '#2d7a00' : '#6b7280',
    padding: '0.25rem 0.8rem',
    borderRadius: '9999px',
    fontSize: '0.65rem',
    fontWeight: 700,
    textTransform: 'uppercase',
  }),
  empty: { textAlign: 'center', padding: '3rem', color: '#6b7280', fontSize: '1rem' },
};

export default function CampaignHistory({ campaigns, submissions }) {
  const [activeFilter, setActiveFilter] = useState('All');

  // Derive platforms from campaigns
  const platforms = useMemo(() => {
    const set = new Set(campaigns.map((c) => c.platform));
    return ['All', ...set];
  }, [campaigns]);

  // Filter campaigns
  const filtered = useMemo(() => {
    if (activeFilter === 'All') return campaigns;
    return campaigns.filter((c) => c.platform === activeFilter);
  }, [campaigns, activeFilter]);

  // Derive submission stats per campaign
  const submissionsByCampaign = useMemo(() => {
    return submissions.reduce((acc, s) => {
      if (!acc[s.campaignId]) acc[s.campaignId] = { count: 0, views: 0, earnings: 0 };
      acc[s.campaignId].count += 1;
      acc[s.campaignId].views += s.views;
      acc[s.campaignId].earnings += s.earnings;
      return acc;
    }, {});
  }, [submissions]);

  return (
    <section style={s.section}>
      <div style={s.inner}>
        <div style={s.topRow}>
          <h2 style={s.title}>Campaign History</h2>
          <div style={s.filters}>
            {platforms.map((p) => (
              <button key={p} style={s.filterBtn(activeFilter === p)} onClick={() => setActiveFilter(p)}>
                {p}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div style={s.empty}>No campaigns found for this filter.</div>
        ) : (
          <div style={s.grid}>
            {filtered.map((campaign) => {
              const cStats = submissionsByCampaign[campaign.id] || { count: 0, views: 0, earnings: 0 };
              const isActive = campaign.status === 'active';
              return (
                <div key={campaign.id} style={s.card} className="hover-scale">
                  <div style={s.cardTop(campaign.platform)}>
                    <p style={s.campaignName}>{campaign.name}</p>
                    <div style={s.badges}>
                      <span style={s.badge(getPlatformColor(campaign.platform))}>{campaign.platform}</span>
                      <span style={s.badge('#aaff00')}>{campaign.type}</span>
                    </div>
                  </div>
                  <div style={s.cardBody}>
                    <div style={s.statsRow}>
                      <div style={s.stat}>
                        <span style={s.statNum}>{cStats.count}</span>
                        <span style={s.statLabel}>Submissions</span>
                      </div>
                      <div style={s.stat}>
                        <span style={s.statNum}>{formatViews(cStats.views)}</span>
                        <span style={s.statLabel}>Views</span>
                      </div>
                      <div style={s.stat}>
                        <span style={s.statNum}>{formatMAD(cStats.earnings)}</span>
                        <span style={s.statLabel}>Earned</span>
                      </div>
                    </div>
                    <span style={s.statusBadge(isActive)}>
                      {isActive ? '🟢 Active' : '✅ Completed'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
