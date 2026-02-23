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
    `${stats.validated} Validated`,
    `Avg ${formatViews(stats.avgViews)} Views/Post`,
  ];

  const doubled = [...items, ...items];

  return (
    <div className="ticker-wrap" style={{
      background: '#aaff00', padding: '1.2rem 0',
      borderTop: '4px solid #0D2E0D', borderBottom: '4px solid #0D2E0D',
    }}>
      <div className="ticker-content" style={{ display: 'inline-flex', gap: '3rem', alignItems: 'center' }}>
        {doubled.map((item, i) => (
          <React.Fragment key={i}>
            <span style={{
              color: '#0D2E0D', fontSize: '1.4rem', fontWeight: 900,
              textTransform: 'uppercase', fontStyle: 'italic',
              letterSpacing: '-0.02em', whiteSpace: 'nowrap',
            }}>{item}</span>
            {/* Teapot separator SVG */}
            <svg width="24" height="24" viewBox="0 0 36 36" fill="none">
              <ellipse cx="19" cy="22" rx="11" ry="9" fill="#0D2E0D"/>
              <path d="M8 19 Q2 16 3 22 Q4 27 9 25" fill="#0D2E0D"/>
              <ellipse cx="19" cy="13" rx="7" ry="2.5" fill="#0D2E0D"/>
              <ellipse cx="19" cy="11" rx="3" ry="2" fill="#0D2E0D"/>
            </svg>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
