import React from 'react';
import { formatViews } from '../utils/formatters';

const s = {
  section: {
    background: '#0D2E0D',
    padding: '4rem 2rem 6rem',
    overflow: 'hidden',
  },
  inner: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '4rem',
    alignItems: 'center',
  },
  pill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    background: 'rgba(170,255,0,0.15)',
    color: '#aaff00',
    border: '1px solid rgba(170,255,0,0.3)',
    padding: '0.4rem 1rem',
    borderRadius: '9999px',
    fontSize: '0.7rem',
    fontWeight: 900,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginBottom: '1.5rem',
  },
  name: {
    fontSize: 'clamp(3rem, 6vw, 5rem)',
    fontWeight: 900,
    color: '#fff',
    lineHeight: 0.9,
    letterSpacing: '-0.04em',
    marginBottom: '0.5rem',
  },
  nameAccent: { color: '#aaff00', fontStyle: 'italic' },
  handle: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    color: 'rgba(170,255,0,0.8)',
    fontWeight: 700,
    fontSize: '1rem',
    marginBottom: '1rem',
  },
  bio: {
    color: '#cbd5e1',
    fontSize: '1.1rem',
    lineHeight: 1.6,
    maxWidth: '480px',
    marginBottom: '1.5rem',
  },
  platforms: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.75rem',
    marginBottom: '2rem',
  },
  platformBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)',
    padding: '0.4rem 1rem',
    borderRadius: '9999px',
    fontSize: '0.8rem',
    fontWeight: 700,
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  btns: { display: 'flex', gap: '1rem', flexWrap: 'wrap' },
  btnPrimary: {
    background: '#aaff00',
    color: '#0D2E0D',
    padding: '1rem 2.5rem',
    borderRadius: '9999px',
    fontWeight: 900,
    fontSize: '1rem',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    border: 'none',
    cursor: 'pointer',
    transition: 'transform 0.2s',
  },
  btnSecondary: {
    background: 'rgba(255,255,255,0.08)',
    color: '#fff',
    border: '1px solid rgba(255,255,255,0.2)',
    padding: '1rem 2.5rem',
    borderRadius: '9999px',
    fontWeight: 900,
    fontSize: '1rem',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    cursor: 'pointer',
  },
  visual: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoWrap: {
    position: 'relative',
    width: '100%',
    maxWidth: '380px',
    aspectRatio: '4/5',
    borderRadius: '1.2rem',
    overflow: 'hidden',
    transform: 'rotate(-3deg)',
    border: '6px solid rgba(255,255,255,0.06)',
    boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
  },
  photo: { width: '100%', height: '100%', objectFit: 'cover' },
  floatCard1: {
    position: 'absolute',
    top: '-1rem',
    right: '0',
    background: '#aaff00',
    color: '#0D2E0D',
    padding: '1rem 1.2rem',
    borderRadius: '1rem',
    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.2rem',
    animation: 'bounce 2s infinite',
  },
  floatCard2: {
    position: 'absolute',
    bottom: '-2rem',
    left: '0',
    background: '#E8F5C8',
    color: '#0D2E0D',
    padding: '1rem 1.5rem',
    borderRadius: '1rem',
    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
  },
};

export default function HeroSection({ creator, onWorkWithMe }) {
  if (!creator) return null;

  return (
    <section style={s.section}>
      <style>{`
        @keyframes bounce {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
      <div style={s.inner}>
        {/* Left content */}
        <div>
          <div style={s.pill}>
            <span className="material-symbols-outlined" style={{ fontSize: '0.9rem' }}>auto_awesome</span>
            Creator Profile
          </div>
          <h1 style={s.name}>
            {creator.name.split(' ')[0]} <br />
            <span style={s.nameAccent}>{creator.name.split(' ').slice(1).join(' ')}</span>
          </h1>
          <div style={s.handle}>
            <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>location_on</span>
            @{creator.handle} • {creator.location}
          </div>
          <p style={s.bio}>{creator.bio}</p>
          <div style={s.platforms}>
            {creator.platforms?.map((p) => (
              <div key={p.name} style={s.platformBadge}>
                <span className="material-symbols-outlined" style={{ fontSize: '0.9rem', color: '#aaff00' }}>trending_up</span>
                {p.name} {formatViews(p.followers)}+
              </div>
            ))}
          </div>
          <div style={s.btns}>
            <button style={s.btnPrimary} onClick={onWorkWithMe}>Book Now</button>
            <button style={s.btnSecondary}>Media Kit</button>
          </div>
        </div>

        {/* Right visual */}
        <div style={s.visual}>
          <div style={s.photoWrap}>
            <img src={creator.avatar} alt={creator.name} style={s.photo} />
          </div>
          {/* Floating badges */}
          <div style={s.floatCard1}>
            <span className="material-symbols-outlined" style={{ fontSize: '1.8rem', fontWeight: 700 }}>verified</span>
            <span style={{ fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase' }}>Top Rated</span>
          </div>
          <div style={s.floatCard2}>
            <p style={{ fontSize: '2.5rem', fontWeight: 900, fontStyle: 'italic', lineHeight: 1 }}>50+</p>
            <p style={{ fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', opacity: 0.7 }}>Campaigns</p>
          </div>
        </div>
      </div>
    </section>
  );
}
