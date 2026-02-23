import React from 'react';

export default function HeroSection({ creator, onWorkWithMe }) {
  if (!creator) return null;

  // Real JSON fields: name, username, city, platforms (string[]), bio
  const firstName = creator.name.split(' ')[0];
  const lastName = creator.name.split(' ').slice(1).join(' ');
  const initials = creator.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <section style={{ background: '#0D2E0D', padding: '4rem 2rem 7rem', overflow: 'hidden' }}>
      <style>{`
        @keyframes float-bounce {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>

      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>

        {/* LEFT — text content */}
        <div>
          {/* Pill badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            background: 'rgba(170,255,0,0.15)', color: '#aaff00',
            border: '1px solid rgba(170,255,0,0.3)',
            padding: '0.4rem 1rem', borderRadius: '9999px',
            fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase',
            letterSpacing: '0.1em', marginBottom: '1.5rem',
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: '0.9rem' }}>auto_awesome</span>
            Creator Profile
          </div>

          {/* Name */}
          <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.04em', marginBottom: '1rem' }}>
            {firstName}<br />
            <span style={{ color: '#aaff00', fontStyle: 'italic' }}>{lastName}</span>
          </h1>

          {/* Handle + city — from real JSON: username, city */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(170,255,0,0.8)', fontWeight: 700, fontSize: '1rem', marginBottom: '1rem' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>location_on</span>
            {creator.username} • {creator.city}, Morocco
          </div>

          {/* Bio — from real JSON: bio */}
          <p style={{ color: '#cbd5e1', fontSize: '1.1rem', lineHeight: 1.6, maxWidth: '480px', marginBottom: '1.5rem' }}>
            {creator.bio}
          </p>

          {/* Platforms — from real JSON: platforms (string array) */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2rem' }}>
            {creator.platforms?.map(p => (
              <div key={p} style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                padding: '0.4rem 1rem', borderRadius: '9999px',
                fontSize: '0.8rem', fontWeight: 700, color: '#fff', textTransform: 'uppercase',
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: '0.85rem', color: '#aaff00' }}>trending_up</span>
                {p}
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button onClick={onWorkWithMe} style={{
              background: '#aaff00', color: '#0D2E0D', padding: '1rem 2.5rem',
              borderRadius: '9999px', fontWeight: 900, fontSize: '1rem',
              textTransform: 'uppercase', letterSpacing: '0.1em', border: 'none', cursor: 'pointer',
            }}>Book Now</button>
            <button style={{
              background: 'rgba(255,255,255,0.08)', color: '#fff',
              border: '1px solid rgba(255,255,255,0.2)', padding: '1rem 2.5rem',
              borderRadius: '9999px', fontWeight: 900, fontSize: '1rem',
              textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer',
            }}>Media Kit</button>
          </div>
        </div>

        {/* RIGHT — visual frame with initials (no avatar in JSON) */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

          {/* Rounded rectangle frame — stitch style */}
          <div style={{
            position: 'relative', width: '100%', maxWidth: '380px', aspectRatio: '4/5',
            background: '#0D2E0D', border: '8px solid rgba(255,255,255,0.06)',
            borderRadius: '1.5rem', overflow: 'hidden',
            boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
            transform: 'rotate(-3deg)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {/* YE initials — big bold lime */}
            <span style={{ color: '#aaff00', fontWeight: 900, fontSize: '8rem', letterSpacing: '-0.05em', lineHeight: 1, userSelect: 'none' }}>
              {initials}
            </span>
            {/* Subtle grid pattern overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'radial-gradient(circle, rgba(170,255,0,0.05) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }} />
          </div>

          {/* Floating card 1 — Top Rated (bounces) */}
          <div style={{
            position: 'absolute', top: '-1rem', right: '0',
            background: '#aaff00', color: '#0D2E0D',
            padding: '1rem 1.2rem', borderRadius: '1rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem',
            animation: 'float-bounce 2.5s ease-in-out infinite',
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: '1.8rem', fontWeight: 700 }}>verified</span>
            <span style={{ fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Top Rated</span>
          </div>

          {/* Floating card 2 — Platforms count */}
          <div style={{
            position: 'absolute', bottom: '-2rem', left: '0',
            background: '#E8F5C8', color: '#0D2E0D',
            padding: '1rem 1.5rem', borderRadius: '1rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
          }}>
            <p style={{ fontSize: '2.5rem', fontWeight: 900, fontStyle: 'italic', lineHeight: 1 }}>
              {creator.platforms?.length}
            </p>
            <p style={{ fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', opacity: 0.7 }}>
              Platforms Active
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
