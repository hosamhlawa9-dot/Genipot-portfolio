import React from 'react';
import { formatViews, formatMAD } from '../utils/formatters';

export default function StatsTicker({ stats, campaigns }) {
  if (!stats) return null;

  const items = [
    `${stats.totalSubmissions} Submissions`,
    `${formatViews(stats.totalViews)} Total Views`,
    `${formatMAD(stats.totalEarnings)} Earned`,
    `${campaigns.length} Campaigns`,
    `Best on ${stats.bestPlatform}`,
    `Avg ${formatViews(stats.avgViewsPerSubmission)} Views/Post`,
  ];

  const doubled = [...items, ...items]; // seamless loop

  return (
    <div className="ticker-wrap" style={{ background: '#aaff00', padding: '1.2rem 0', borderTop: '4px solid #0D2E0D', borderBottom: '4px solid #0D2E0D' }}>
      <div className="ticker-content" style={{ display: 'inline-flex', gap: '3rem', alignItems: 'center' }}>
        {doubled.map((item, i) => (
          <React.Fragment key={i}>
            <span style={{ color: '#0D2E0D', fontSize: '1.4rem', fontWeight: 900, textTransform: 'uppercase', fontStyle: 'italic', letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>
              {item}
            </span>
            <span className="material-symbols-outlined" style={{ color: '#0D2E0D', fontSize: '1.4rem' }}>coffee_maker</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
