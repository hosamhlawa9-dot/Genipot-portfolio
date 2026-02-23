import React, { useState, useMemo } from 'react';
import { formatViews, formatMAD, getPlatformColor } from '../utils/formatters';

export default function CampaignHistory({ campaigns, submissions }) {
  const [activeFilter, setActiveFilter] = useState('All');

  const platforms = useMemo(() => {
    const set = new Set(campaigns.map(c => c.platform));
    return ['All', ...set];
  }, [campaigns]);

  const filtered = useMemo(() => {
    if (activeFilter === 'All') return campaigns;
    return campaigns.filter(c => c.platform === activeFilter);
  }, [campaigns, activeFilter]);

  // Derived stats per campaign from submissions — using real field names
  const statsByCampaign = useMemo(() => {
    return submissions.reduce((acc, s) => {
      const key = s.campaign_id; // real JSON field
      if (!acc[key]) acc[key] = { count: 0, views: 0, earnings: 0, engagement: 0 };
      acc[key].count += 1;
      acc[key].views += s.views;
      acc[key].earnings += s.earning_mad; // real JSON field
      acc[key].engagement += s.likes + s.comments + s.shares;
      return acc;
    }, {});
  }, [submissions]);

  return (
    <section style={{ background: '#E8F5C8', padding: '5rem 2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header + filters */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#0D2E0D', textTransform: 'uppercase', letterSpacing: '-0.03em' }}>
            Campaign History
          </h2>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {platforms.map(p => (
              <button key={p} onClick={() => setActiveFilter(p)} style={{
                padding: '0.4rem 1.2rem', borderRadius: '9999px', fontWeight: 700,
                fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em',
                cursor: 'pointer', transition: 'all 0.2s',
                border: activeFilter === p ? '1.5px solid #0D2E0D' : '1.5px solid rgba(13,46,13,0.3)',
                background: activeFilter === p ? '#aaff00' : 'transparent',
                color: '#0D2E0D',
              }}>{p}</button>
            ))}
          </div>
        </div>

        {/* Campaign cards grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.2rem' }}>
          {filtered.map(campaign => {
            const cStats = statsByCampaign[campaign.id] || { count: 0, views: 0, earnings: 0, engagement: 0 };
            const platformColor = getPlatformColor(campaign.platform);
            return (
              <div key={campaign.id} style={{
                background: '#fff', borderRadius: '1rem', overflow: 'hidden',
                border: '2px solid #0D2E0D', transition: 'transform 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                {/* Card top — dark with platform color accent */}
                <div style={{ background: '#0D2E0D', padding: '1.2rem 1.5rem', borderBottom: `3px solid ${platformColor}` }}>
                  {/* Campaign title — real JSON field: title */}
                  <p style={{ color: '#fff', fontWeight: 900, fontSize: '1rem', marginBottom: '0.5rem' }}>{campaign.title}</p>
                  {/* Brand + platform — real JSON fields: brand, platform */}
                  <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
                    {campaign.brand} • {campaign.platform}
                  </p>
                </div>
                {/* Card body — derived stats */}
                <div style={{ padding: '1.2rem 1.5rem' }}>
                  <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                    <div>
                      <p style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0D2E0D' }}>{cStats.count}</p>
                      <p style={{ fontSize: '0.6rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase' }}>Submissions</p>
                    </div>
                    <div>
                      <p style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0D2E0D' }}>{formatViews(cStats.views)}</p>
                      <p style={{ fontSize: '0.6rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase' }}>Views</p>
                    </div>
                    <div>
                      <p style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0D2E0D' }}>{formatMAD(cStats.earnings)}</p>
                      <p style={{ fontSize: '0.6rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase' }}>Earned</p>
                    </div>
                  </div>
                  {/* Platform badge */}
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                    background: `${platformColor}18`, color: platformColor,
                    border: `1px solid ${platformColor}44`,
                    padding: '0.25rem 0.8rem', borderRadius: '9999px',
                    fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase',
                  }}>
                    {campaign.platform}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
