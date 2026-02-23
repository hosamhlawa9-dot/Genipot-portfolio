import React from 'react';

export default function Navbar({ onWorkWithMe, onLogin }) {
  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: '#0D2E0D', borderBottom: '1px solid rgba(255,255,255,0.08)',
      padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      {/* Logo — real PNG transparent */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src="/logo.png" alt="Geniepot" style={{ height: '36px', width: 'auto' }} />
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <button onClick={onLogin} style={{
          color: '#fff', fontSize: '0.8rem', fontWeight: 700,
          textTransform: 'uppercase', letterSpacing: '0.1em',
          background: 'none', border: 'none', cursor: 'pointer',
        }}>
          New portfolio
          
        </button>
        <button
          onClick={onWorkWithMe}
          style={{
            background: '#aaff00', color: '#0D2E0D',
            padding: '0.6rem 1.5rem', borderRadius: '9999px',
            fontWeight: 900, fontSize: '0.8rem',
            textTransform: 'uppercase', letterSpacing: '0.1em',
            border: 'none', cursor: 'pointer',
          }}>
          Work With Me
        </button>
      </div>
    </nav>
  );
}
