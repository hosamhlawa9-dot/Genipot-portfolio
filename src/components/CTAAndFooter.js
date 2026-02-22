import React from 'react';

const s = {
  cta: {
    background: '#0D2E0D',
    padding: '6rem 2rem',
    textAlign: 'center',
  },
  pill: {
    display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
    background: 'rgba(170,255,0,0.1)', color: '#aaff00',
    border: '1px solid rgba(170,255,0,0.2)',
    padding: '0.4rem 1rem', borderRadius: '9999px',
    fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase',
    letterSpacing: '0.1em', marginBottom: '1.5rem',
  },
  title: {
    fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900,
    color: '#fff', letterSpacing: '-0.04em', lineHeight: 1.1,
    marginBottom: '1rem',
  },
  sub: { color: '#6b7280', fontSize: '1rem', maxWidth: '480px', margin: '0 auto 2rem', lineHeight: 1.6 },
  btns: { display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' },
  btnPrimary: {
    background: '#aaff00', color: '#0D2E0D', padding: '1rem 2.5rem',
    borderRadius: '9999px', fontWeight: 900, fontSize: '1rem',
    textTransform: 'uppercase', letterSpacing: '0.1em', border: 'none', cursor: 'pointer',
  },
  btnSecondary: {
    background: 'transparent', color: '#fff', padding: '1rem 2.5rem',
    borderRadius: '9999px', fontWeight: 900, fontSize: '1rem',
    textTransform: 'uppercase', letterSpacing: '0.1em',
    border: '1.5px solid rgba(255,255,255,0.2)', cursor: 'pointer',
  },
  contacts: { display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' },
  contact: { display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#aaff00', fontSize: '0.9rem', fontWeight: 600 },

  // Footer
  footer: {
    background: '#071407',
    borderTop: '1px solid rgba(255,255,255,0.06)',
    padding: '2rem',
  },
  footerInner: {
    maxWidth: '1200px', margin: '0 auto',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem',
  },
  footerLogo: { display: 'flex', alignItems: 'center', gap: '0.5rem' },
  footerLogoIcon: { background: '#aaff00', padding: '0.35rem', borderRadius: '0.4rem', display: 'flex' },
  footerCopy: { color: '#4b5563', fontSize: '0.8rem', marginTop: '0.3rem' },
  footerLinks: { display: 'flex', gap: '1.5rem', flexWrap: 'wrap' },
  footerLink: { color: '#6b7280', fontSize: '0.8rem', fontWeight: 600, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.06em', cursor: 'pointer' },
  footerSocials: { display: 'flex', gap: '1rem' },
  socialIcon: {
    width: '36px', height: '36px', borderRadius: '50%',
    background: 'rgba(255,255,255,0.06)', display: 'flex',
    alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
  },
};

export function CTASection({ creatorName, onWorkWithMe }) {
  return (
    <section style={s.cta}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={s.pill}>
          <span>✦</span> Let's Create Together
        </div>
      </div>
      <h2 style={s.title}>Ready to Work<br />With {creatorName?.split(' ')[0]}?</h2>
      <p style={s.sub}>Get a direct response and a tailored proposal for your brand campaign within 24 hours.</p>
      <div style={s.btns}>
        <button style={s.btnPrimary} onClick={onWorkWithMe}>Send a Brief</button>
        <button style={s.btnSecondary}>Download Media Kit</button>
      </div>
      <div style={s.contacts}>
        <div style={s.contact}>
          <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>chat</span>
          WhatsApp
        </div>
        <div style={s.contact}>
          <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>mail</span>
          support@geniepot.ma
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const links = ['Contact', 'Privacy Policy', 'Terms & Conditions', 'Blog', 'Status', 'Careers'];
  return (
    <footer style={s.footer}>
      <div style={s.footerInner}>
        <div>
          <div style={s.footerLogo}>
            <div style={s.footerLogoIcon}>
              <span className="material-symbols-outlined" style={{ color: '#0D2E0D', fontSize: '1rem' }}>coffee_maker</span>
            </div>
            <span style={{ color: '#fff', fontWeight: 900, fontSize: '1rem', textTransform: 'uppercase' }}>Geniepot</span>
          </div>
          <p style={s.footerCopy}>© 2024 Geniepot SARL. All rights reserved.</p>
        </div>
        <div style={s.footerLinks}>
          {links.map((l) => <span key={l} style={s.footerLink}>{l}</span>)}
        </div>
        <div style={s.footerSocials}>
          {['music_video', 'photo_camera', 'close', 'work', 'thumb_up'].map((icon, i) => (
            <div key={i} style={s.socialIcon}>
              <span className="material-symbols-outlined" style={{ color: '#fff', fontSize: '1rem' }}>{icon}</span>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
