import React, { useState } from 'react';

const NICHES = ['🌿 Lifestyle', '💄 Beauty', '🍔 Food & Drink', '👗 Fashion', '💻 Tech', '🎵 Music', '🏋️ Fitness', '✈️ Travel', '🎮 Gaming', '🏠 Home Decor'];
const PLATFORMS = [
  { name: 'TikTok', color: '#ff0050', icon: 'music_video' },
  { name: 'Instagram', color: '#c13584', icon: 'photo_camera' },
  { name: 'YouTube', color: '#ff0000', icon: 'play_circle' },
];
const AGES = ['Gen Z', 'Millennials', 'Gen X'];
const GENDERS = ['Mixed', 'Female', 'Male'];

const F = '#0D2E0D';
const LIME = '#aaff00';

const s = {
  overlay: {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.78)',
    backdropFilter: 'blur(6px)', zIndex: 999,
    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
  },
  modal: {
    background: '#1c1c1c', borderRadius: '1.2rem', width: '100%',
    maxWidth: '560px', overflow: 'hidden',
    boxShadow: '0 40px 80px rgba(0,0,0,0.6)',
    border: '1px solid rgba(255,255,255,0.08)',
    maxHeight: '92vh', overflowY: 'auto',
  },
  accentBar: { height: '5px', background: F, width: '100%' },
  body: { padding: '2rem 2.5rem 2.5rem' },
  headerPill: {
    display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
    background: F, color: LIME,
    padding: '0.35rem 1rem', borderRadius: '9999px',
    fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase',
    letterSpacing: '0.1em', marginBottom: '1rem',
  },
  modalTitle: { color: '#fff', fontSize: '1.8rem', fontWeight: 900, textAlign: 'center', marginBottom: '0.3rem' },
  modalSub: { color: '#6b7280', fontSize: '0.85rem', textAlign: 'center', marginBottom: '1.8rem' },
  stepper: { display: 'flex', alignItems: 'center', gap: '0', marginBottom: '2rem' },
  stepWrap: { flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' },
  stepBar: (active, done) => ({
    height: '5px', borderRadius: '9999px',
    background: active || done ? F : '#2a2a2a',
    transition: 'background 0.3s',
  }),
  stepLabel: (active) => ({
    fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase',
    letterSpacing: '0.1em', color: active ? '#fff' : '#4b5563',
    transition: 'color 0.3s',
  }),
  stepGap: { width: '0.8rem' },
  avatarWrap: { display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' },
  avatarCircle: {
    width: '90px', height: '90px', borderRadius: '50%',
    border: `2px dashed ${F}`, display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    background: 'rgba(13,46,13,0.1)', cursor: 'pointer',
    transition: 'background 0.2s',
  },
  formGroup: { display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.2rem' },
  label: { color: '#9ca3af', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', paddingLeft: '0.5rem' },
  input: {
    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '9999px', padding: '0.85rem 1.3rem',
    color: '#fff', fontSize: '0.9rem', outline: 'none', width: '100%',
    fontFamily: 'Inter, sans-serif',
  },
  textarea: {
    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '1rem', padding: '0.85rem 1.3rem',
    color: '#fff', fontSize: '0.9rem', outline: 'none', width: '100%',
    resize: 'none', fontFamily: 'Inter, sans-serif',
  },
  handleWrap: {
    display: 'flex', alignItems: 'center',
    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '9999px', overflow: 'hidden',
  },
  handlePrefix: { color: '#4b5563', fontSize: '0.85rem', padding: '0.85rem 0 0.85rem 1.3rem', whiteSpace: 'nowrap' },
  handleInput: {
    flex: 1, background: 'transparent', border: 'none', outline: 'none',
    color: '#fff', fontSize: '0.9rem', padding: '0.85rem 1.3rem 0.85rem 0.3rem',
    fontFamily: 'Inter, sans-serif',
  },
  footer: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    paddingTop: '1.5rem', marginTop: '0.5rem',
    borderTop: '1px solid rgba(255,255,255,0.06)',
  },
  draftBtn: { background: 'none', border: 'none', color: '#6b7280', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' },
  continueBtn: {
    background: F, color: '#fff', padding: '0.8rem 2rem',
    borderRadius: '9999px', fontWeight: 900, fontSize: '0.9rem',
    border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem',
    transition: 'transform 0.15s',
  },
  backBtn: { background: 'none', border: 'none', color: '#6b7280', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' },
  nicheGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6rem', marginBottom: '1.5rem' },
  nichePill: (active) => ({
    padding: '0.6rem 0.5rem', borderRadius: '9999px', textAlign: 'center',
    border: active ? `1.5px solid ${F}` : '1.5px solid rgba(255,255,255,0.1)',
    background: active ? LIME : 'transparent', color: active ? F : '#9ca3af',
    fontWeight: 700, fontSize: '0.75rem', cursor: 'pointer', transition: 'all 0.15s',
  }),
  toggleGroup: { display: 'flex', gap: '0.5rem', flexWrap: 'wrap' },
  togglePill: (active) => ({
    padding: '0.4rem 1rem', borderRadius: '9999px',
    border: active ? `1.5px solid ${F}` : '1.5px solid rgba(255,255,255,0.1)',
    background: active ? LIME : 'transparent', color: active ? F : '#9ca3af',
    fontWeight: 700, fontSize: '0.75rem', cursor: 'pointer', transition: 'all 0.15s',
  }),
  platformRow: {
    display: 'flex', alignItems: 'center', gap: '0.8rem',
    marginBottom: '0.8rem', padding: '0.8rem 1rem',
    background: 'rgba(255,255,255,0.03)', borderRadius: '1rem',
    border: '1px solid rgba(255,255,255,0.06)',
  },
  platformInputs: { flex: 1, display: 'flex', gap: '0.6rem' },
  smallInput: {
    flex: 1, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '9999px', padding: '0.55rem 1rem', color: '#fff', fontSize: '0.8rem',
    outline: 'none', fontFamily: 'Inter, sans-serif',
  },
  successWrap: { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '1rem 0' },
  checkCircle: {
    width: '80px', height: '80px', borderRadius: '50%', background: F,
    display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem',
  },
  urlCard: {
    background: 'rgba(255,255,255,0.05)', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.1)',
    padding: '0.8rem 1.2rem', display: 'flex', alignItems: 'center',
    justifyContent: 'space-between', width: '100%', marginBottom: '1.5rem',
  },
  closeBtn: {
    position: 'absolute', top: '1rem', right: '1rem',
    width: '32px', height: '32px', borderRadius: '50%',
    background: 'rgba(255,255,255,0.1)', border: 'none', cursor: 'pointer',
    color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
};

export default function PortfolioModal({ onClose }) {
  const [step, setStep] = useState(1);
  const [selectedNiches, setSelectedNiches] = useState([]);
  const [selectedAge, setSelectedAge] = useState('Gen Z');
  const [selectedGender, setSelectedGender] = useState('Mixed');

  const toggleNiche = (n) => setSelectedNiches((prev) =>
    prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]
  );

  const steps = ['Identity', 'Your Niche', 'Platforms'];

  return (
    <div style={s.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={{ ...s.modal, position: 'relative' }}>
        {/* Close btn */}
        <button style={s.closeBtn} onClick={onClose}>
          <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>close</span>
        </button>

        {/* Top accent bar */}
        <div style={s.accentBar} />

        <div style={s.body}>
          {/* Header */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.8rem' }}>
              <div style={s.headerPill}>
                <span className="material-symbols-outlined" style={{ fontSize: '0.9rem' }}>auto_awesome</span>
                Creator Profile Setup
              </div>
            </div>
            <h2 style={s.modalTitle}>Build Your Portfolio</h2>
            <p style={s.modalSub}>Let brands discover you — set up your public creator page in minutes.</p>
          </div>

          {/* Stepper — only show during steps 1-3 */}
          {step <= 3 && (
            <div style={s.stepper}>
              {steps.map((label, i) => (
                <React.Fragment key={label}>
                  <div style={s.stepWrap}>
                    <div style={s.stepBar(step === i + 1, step > i + 1)} />
                    <span style={s.stepLabel(step === i + 1)}>{i + 1}. {label}</span>
                  </div>
                  {i < steps.length - 1 && <div style={s.stepGap} />}
                </React.Fragment>
              ))}
            </div>
          )}

          {/* STEP 1: Identity */}
          {step === 1 && (
            <>
              <div style={s.avatarWrap}>
                <div style={s.avatarCircle}>
                  <span className="material-symbols-outlined" style={{ color: F, fontSize: '1.8rem' }}>add_a_photo</span>
                  <span style={{ color: F, fontSize: '0.6rem', fontWeight: 900, marginTop: '0.2rem' }}>UPLOAD</span>
                </div>
              </div>

              <div style={s.formGroup}>
                <label style={s.label}>Creator Name</label>
                <input style={s.input} type="text" placeholder="e.g. Yasmine El Idrissi" />
              </div>

              <div style={s.formGroup}>
                <label style={s.label}>Username / Handle</label>
                <div style={s.handleWrap}>
                  <span style={s.handlePrefix}>geniepot.ma/</span>
                  <input style={s.handleInput} type="text" placeholder="username" />
                </div>
              </div>

              <div style={s.formGroup}>
                <label style={s.label}>Location</label>
                <div style={{ position: 'relative' }}>
                  <span className="material-symbols-outlined" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#4b5563', fontSize: '1.1rem' }}>location_on</span>
                  <input style={{ ...s.input, paddingLeft: '2.8rem' }} type="text" placeholder="e.g. Casablanca, Morocco" />
                </div>
              </div>

              <div style={s.formGroup}>
                <label style={s.label}>Short Bio</label>
                <div style={{ position: 'relative' }}>
                  <textarea style={s.textarea} rows={3} placeholder="Tell brands about your niche and personality..." maxLength={160} />
                  <span style={{ position: 'absolute', bottom: '0.5rem', right: '1rem', fontSize: '0.65rem', color: '#4b5563' }}>0 / 160</span>
                </div>
              </div>

              <div style={s.footer}>
                <button style={s.draftBtn}>Save as Draft</button>
                <button style={s.continueBtn} onClick={() => setStep(2)}>
                  Continue <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>arrow_forward</span>
                </button>
              </div>
            </>
          )}

          {/* STEP 2: Niche */}
          {step === 2 && (
            <>
              <p style={{ color: '#fff', fontWeight: 700, fontSize: '1rem', marginBottom: '0.3rem' }}>What content do you create?</p>
              <p style={{ color: '#6b7280', fontSize: '0.8rem', marginBottom: '1.2rem' }}>Select all that apply</p>

              <div style={s.nicheGrid}>
                {NICHES.map((n) => (
                  <button key={n} style={s.nichePill(selectedNiches.includes(n))} onClick={() => toggleNiche(n)}>{n}</button>
                ))}
              </div>

              <div style={s.formGroup}>
                <label style={s.label}>Target Age Group</label>
                <div style={s.toggleGroup}>
                  {AGES.map((a) => (
                    <button key={a} style={s.togglePill(selectedAge === a)} onClick={() => setSelectedAge(a)}>{a}</button>
                  ))}
                </div>
              </div>

              <div style={s.formGroup}>
                <label style={s.label}>Gender Focus</label>
                <div style={s.toggleGroup}>
                  {GENDERS.map((g) => (
                    <button key={g} style={s.togglePill(selectedGender === g)} onClick={() => setSelectedGender(g)}>{g}</button>
                  ))}
                </div>
              </div>

              <div style={s.footer}>
                <button style={s.backBtn} onClick={() => setStep(1)}>← Back</button>
                <button style={s.continueBtn} onClick={() => setStep(3)}>
                  Continue <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>arrow_forward</span>
                </button>
              </div>
            </>
          )}

          {/* STEP 3: Platforms */}
          {step === 3 && (
            <>
              <p style={{ color: '#fff', fontWeight: 700, fontSize: '1rem', marginBottom: '0.3rem' }}>Where do you create?</p>
              <p style={{ color: '#6b7280', fontSize: '0.8rem', marginBottom: '1.2rem' }}>Add your social platforms and follower counts</p>

              {PLATFORMS.map((p) => (
                <div key={p.name} style={s.platformRow}>
                  <span className="material-symbols-outlined" style={{ color: p.color, fontSize: '1.5rem' }}>{p.icon}</span>
                  <div style={s.platformInputs}>
                    <input style={s.smallInput} type="text" placeholder={`@${p.name.toLowerCase()}_handle`} />
                    <input style={s.smallInput} type="text" placeholder="Followers" />
                  </div>
                </div>
              ))}

              <div style={{ ...s.platformRow, border: '1.5px dashed rgba(255,255,255,0.1)', justifyContent: 'center', cursor: 'pointer' }}>
                <span className="material-symbols-outlined" style={{ color: F, fontSize: '1.2rem' }}>add_circle</span>
                <span style={{ color: '#6b7280', fontSize: '0.85rem', fontWeight: 600 }}>Add another platform</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.5rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '0.75rem' }}>
                <span style={{ color: '#9ca3af', fontSize: '0.85rem', fontWeight: 600 }}>Make portfolio public immediately</span>
                <div style={{ width: '44px', height: '24px', background: F, borderRadius: '9999px', position: 'relative', cursor: 'pointer' }}>
                  <div style={{ position: 'absolute', right: '3px', top: '3px', width: '18px', height: '18px', borderRadius: '50%', background: LIME }} />
                </div>
              </div>

              <div style={s.footer}>
                <button style={s.backBtn} onClick={() => setStep(2)}>← Back</button>
                <button style={{ ...s.continueBtn, padding: '0.9rem 2.2rem' }} onClick={() => setStep(4)}>
                  🚀 Launch My Portfolio
                </button>
              </div>
            </>
          )}

          {/* STEP 4: Success */}
          {step === 4 && (
            <div style={s.successWrap}>
              <div style={s.checkCircle}>
                <span className="material-symbols-outlined" style={{ color: LIME, fontSize: '2.5rem', fontWeight: 700 }}>check_circle</span>
              </div>
              <h3 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 900, marginBottom: '0.5rem' }}>Your Portfolio is Live! 🎉</h3>
              <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Share your page with brands and start getting discovered.</p>

              <div style={s.urlCard}>
                <span style={{ color: '#9ca3af', fontSize: '0.85rem', fontWeight: 600 }}>geniepot.ma/creators/your_handle</span>
                <span className="material-symbols-outlined" style={{ color: F, fontSize: '1.1rem', cursor: 'pointer' }}>content_copy</span>
              </div>

              <button style={{ ...s.continueBtn, width: '100%', justifyContent: 'center', marginBottom: '0.75rem' }}>
                View My Portfolio →
              </button>
              <button style={{ background: 'transparent', border: `1.5px solid rgba(255,255,255,0.15)`, color: '#fff', padding: '0.8rem 2rem', borderRadius: '9999px', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', width: '100%' }}>
                Share on Instagram
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
