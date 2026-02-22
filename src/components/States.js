import React from 'react';

export function LoadingState() {
  return (
    <div style={{
      minHeight: '100vh', background: '#0D2E0D',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: '1.5rem',
    }}>
      <div style={{
        width: '60px', height: '60px', border: '4px solid rgba(170,255,0,0.2)',
        borderTop: '4px solid #aaff00', borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <p style={{ color: '#aaff00', fontWeight: 700, fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
        Loading Portfolio...
      </p>
    </div>
  );
}

export function ErrorState({ message }) {
  return (
    <div style={{
      minHeight: '100vh', background: '#0D2E0D',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: '1rem', padding: '2rem',
    }}>
      <span className="material-symbols-outlined" style={{ color: '#ef4444', fontSize: '3rem' }}>error</span>
      <h2 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 900 }}>Creator Not Found</h2>
      <p style={{ color: '#6b7280', textAlign: 'center', maxWidth: '400px' }}>{message}</p>
      <button
        onClick={() => window.history.back()}
        style={{ background: '#aaff00', color: '#0D2E0D', padding: '0.8rem 2rem', borderRadius: '9999px', fontWeight: 900, border: 'none', cursor: 'pointer', marginTop: '1rem' }}
      >
        Go Back
      </button>
    </div>
  );
}

export function EmptyState({ message }) {
  return (
    <div style={{ padding: '3rem', textAlign: 'center', color: '#4b5563' }}>
      <span className="material-symbols-outlined" style={{ fontSize: '2.5rem', marginBottom: '0.5rem', display: 'block' }}>inbox</span>
      <p style={{ fontSize: '0.95rem' }}>{message}</p>
    </div>
  );
}
