import React from 'react';
import { formatViews, formatMAD, getPlatformColor } from '../utils/formatters';

const CARD = {
  background: '#fff',
  border: '4px solid #0D2E0D',
  borderRadius: '1rem',
  padding: '2rem',
  boxShadow: '8px 8px 0px 0px #0D2E0D',
};

const LABEL = {
  fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase',
  letterSpacing: '0.1em', color: '#0D2E0D', marginBottom: '0.5rem',
};

const NUM = {
  fontSize: '3rem', fontWeight: 900, color: '#0D2E0D',
  lineHeight: 1, letterSpacing: '-0.04em',
};

const NUM_LIME = {
  ...NUM, color: '#aaff00', WebkitTextStroke: '1px #0D2E0D',
};

export default function PerformanceStats({ stats }) {
  if (!stats) return null;

  const maxViews = Math.max(...Object.values(stats.platformBreakdown), 1);
  const totalEngagement = stats.totalLikes + stats.totalComments + stats.totalShares;

  return (
    <section style={{ background: '#f7f8f5', padding: '5rem 2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#0D2E0D', textTransform: 'uppercase', letterSpacing: '-0.03em' }}>
              Performance Dashboard
            </h2>
            <p style={{ color: '#0D2E0D', fontWeight: 700, fontSize: '0.9rem', marginTop: '0.3rem' }}>
              Updated data for Yassine El Idrissi
            </p>
          </div>
          <div style={{ background: '#E8F5C8', color: '#0D2E0D', padding: '0.4rem 1rem', borderRadius: '9999px', fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
             Live Data
          </div>
        </div>

        {/* 4 main stat cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.2rem', marginBottom: '1.2rem' }}>
          <div style={CARD}>
            <p style={LABEL}>Total Submissions</p>
            <p style={NUM}>{stats.totalSubmissions}</p>
          </div>
          <div style={CARD}>
            <p style={LABEL}>Earnings (MAD)</p>
            <p style={NUM}>{formatMAD(stats.totalEarnings)}</p>
          </div>
          <div style={CARD}>
            <p style={LABEL}>Validated vs Pending</p>
            <p style={NUM}>
              {stats.validated}
              <span style={{ fontSize: '1.5rem', color: '#6b7280', marginLeft: '0.3rem' }}>/ {stats.pending}</span>
            </p>
          </div>
          <div style={CARD}>
            <p style={LABEL}>Total Engagement</p>
            <p style={NUM}>{formatViews(totalEngagement)}</p>
          </div>
        </div>

        {/* Bottom 2 cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>

          {/* Submission Status Breakdown */}
          <div style={CARD}>
            <h4 style={{ ...LABEL, fontSize: '1rem', marginBottom: '1.5rem' }}>Submission Status Breakdown</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {/* Validated bar */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', color: '#0D2E0D' }}>Validated</span>
                  <span style={{ fontWeight: 900, color: '#0D2E0D' }}>{stats.validated} Submissions</span>
                </div>
                <div style={{ height: '12px', background: '#E8F5C8', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', borderRadius: '9999px', background: '#aaff00',
                    border: '2px solid #0D2E0D',
                    width: `${(stats.validated / stats.totalSubmissions) * 100}%`,
                    transition: 'width 1s ease',
                  }} />
                </div>
              </div>
              {/* Pending bar */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', color: '#0D2E0D' }}>Pending Review</span>
                  <span style={{ fontWeight: 900, color: '#0D2E0D' }}>{stats.pending} Submissions</span>
                </div>
                <div style={{ height: '12px', background: '#E8F5C8', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', borderRadius: '9999px', background: '#E8F5C8',
                    border: '2px solid #0D2E0D',
                    width: `${(stats.pending / stats.totalSubmissions) * 100}%`,
                    transition: 'width 1s ease',
                  }} />
                </div>
              </div>
              {/* Platform breakdown bars */}
              <div style={{ marginTop: '0.5rem' }}>
                <p style={{ ...LABEL, marginBottom: '1rem' }}>Platform Breakdown (Views)</p>
                {Object.entries(stats.platformBreakdown).map(([platform, views]) => (
                  <div key={platform} style={{ marginBottom: '0.8rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.8rem', color: '#0D2E0D' }}>{platform}</span>
                      <span style={{ fontWeight: 900, fontSize: '0.8rem', color: '#0D2E0D' }}>{formatViews(views)}</span>
                    </div>
                    <div style={{ height: '8px', background: '#E8F5C8', borderRadius: '9999px', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%', borderRadius: '9999px',
                        background: getPlatformColor(platform),
                        width: `${(views / maxViews) * 100}%`,
                        transition: 'width 1s ease',
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Engagement Metrics */}
          <div style={{ ...CARD, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ maxWidth: '180px' }}>
              <h4 style={{ ...LABEL, fontSize: '1rem', marginBottom: '0.75rem' }}>Engagement Metrics</h4>
              <p style={{ fontSize: '0.85rem', color: '#0D2E0D', fontWeight: 600, lineHeight: 1.5 }}>
                Combined likes, comments, and shares across all platforms.
              </p>
              <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0D2E0D' }}>Likes</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#0D2E0D' }}>{formatViews(stats.totalLikes)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0D2E0D' }}> Comments</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#0D2E0D' }}>{formatViews(stats.totalComments)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0D2E0D' }}>Shares</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#0D2E0D' }}>{formatViews(stats.totalShares)}</span>
                </div>
              </div>
            </div>
            {/* Donut chart SVG */}
            <div style={{ position: 'relative', width: '130px', height: '130px', flexShrink: 0 }}>
              <svg style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }} viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="50" fill="transparent" stroke="#E8F5C8" strokeWidth="18"/>
                <circle cx="60" cy="60" r="50" fill="transparent" stroke="#aaff00" strokeWidth="18"
                  strokeDasharray="314" strokeDashoffset="50" strokeLinecap="round"/>
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontWeight: 900, fontSize: '1.3rem', color: '#0D2E0D' }}>{formatViews(totalEngagement)}</span>
                <span style={{ fontSize: '0.6rem', fontWeight: 700, color: '#0D2E0D', textTransform: 'uppercase' }}>Total</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
