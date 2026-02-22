import React from 'react';

const styles = {
  nav: {
    position: 'sticky',
    top: 0,
    zIndex: 40,
    width: '100%',
    background: '#0D2E0D',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    padding: '1rem 2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  logoIcon: {
    background: '#aaff00',
    padding: '0.4rem',
    borderRadius: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: '#fff',
    fontSize: '1.3rem',
    fontWeight: 900,
    letterSpacing: '-0.05em',
    textTransform: 'uppercase',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
  },
  loginBtn: {
    color: '#fff',
    fontSize: '0.8rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'none',
  },
  ctaBtn: {
    background: '#aaff00',
    color: '#0D2E0D',
    padding: '0.6rem 1.5rem',
    borderRadius: '9999px',
    fontWeight: 900,
    fontSize: '0.8rem',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    border: 'none',
    cursor: 'pointer',
    transition: 'transform 0.2s',
  },
};

export default function Navbar({ onWorkWithMe }) {
  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        <div style={styles.logoIcon}>
          <span className="material-symbols-outlined" style={{ color: '#0D2E0D', fontSize: '1.2rem', fontWeight: 700 }}>
            coffee_maker
          </span>
        </div>
        <span style={styles.logoText}>Geniepot</span>
      </div>
      <div style={styles.actions}>
        <button style={styles.loginBtn}>Log in</button>
        <button style={styles.ctaBtn} onClick={onWorkWithMe}>
          Work With Me
        </button>
      </div>
    </nav>
  );
}
