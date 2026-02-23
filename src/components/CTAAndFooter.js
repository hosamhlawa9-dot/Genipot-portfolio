import React from 'react';

export function CTASection({ creatorName, onWorkWithMe }) {
  const firstName = creatorName?.split(' ')[0] || 'Yassine';
  return (
    <section style={{
      background: '#0D2E0D', padding: '6rem 2rem', textAlign: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Glow blobs */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '300px', height: '300px', background: 'rgba(170,255,0,0.06)', borderRadius: '50%', transform: 'translate(-50%,-50%)', filter: 'blur(60px)' }} />
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: '300px', height: '300px', background: 'rgba(170,255,0,0.06)', borderRadius: '50%', transform: 'translate(50%,50%)', filter: 'blur(60px)' }} />

      <div style={{ maxWidth: '700px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '1.5rem', textTransform: 'uppercase' }}>
          Ready to Work<br />With {firstName}?
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.1rem', marginBottom: '2.5rem', lineHeight: 1.6 }}>
          Get a direct response and a tailored proposal for your brand campaign within 24 hours.
        </p>
        <button onClick={onWorkWithMe} style={{
          background: '#aaff00', color: '#0D2E0D',
          padding: '1.2rem 4rem', borderRadius: '9999px',
          fontWeight: 900, fontSize: '1.1rem', textTransform: 'uppercase',
          letterSpacing: '0.1em', border: 'none', cursor: 'pointer',
          boxShadow: '0 20px 50px rgba(170,255,0,0.3)',
          transition: 'transform 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          Send a Brief
        </button>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer style={{ background: '#071407', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '2.5rem 2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
        {/* Logo */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.4rem' }}>
              <img src="/logo.png" alt="Geniepot" style={{ height: '28px', width: 'auto' }} />
            </div>
          <p style={{ color: '#374151', fontSize: '0.75rem', fontWeight: 600 }}>© 2024 Geniepot SARL. All rights reserved.</p>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <p style={{ color: '#aaff00', fontWeight: 900, fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Platform</p>
            {['Find Creators', 'Campaigns'].map(l => (
              <span key={l} style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>{l}</span>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <p style={{ color: '#aaff00', fontWeight: 900, fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Legal</p>
            {['Terms', 'Privacy'].map(l => (
              <span key={l} style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>{l}</span>
            ))}
          </div>
        </div>

        {/* Social icons */}
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {['share', 'mail'].map(icon => (
            <div key={icon} style={{
              width: '40px', height: '40px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#aaff00'; e.currentTarget.querySelector('span').style.color = '#0D2E0D'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.querySelector('span').style.color = '#fff'; }}
            >
              <span className="material-symbols-outlined" style={{ color: '#fff', fontSize: '1rem' }}>{icon}</span>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
