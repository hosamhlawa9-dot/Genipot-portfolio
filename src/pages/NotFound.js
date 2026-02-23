import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: '100vh', background: '#0D2E0D', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
      <span style={{ fontSize: '5rem', fontWeight: 900, color: '#aaff00' }}>404</span>
      <h1 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 900 }}>Page Not Found</h1>
      <p style={{ color: '#6b7280' }}>This creator page doesn't exist.</p>
      <button onClick={() => navigate('/creators/creator_001')} style={{ background: '#aaff00', color: '#0D2E0D', padding: '0.8rem 2rem', borderRadius: '9999px', fontWeight: 900, border: 'none', cursor: 'pointer', marginTop: '1rem' }}>
        Go to Portfolio
      </button>
    </div>
  );
}
