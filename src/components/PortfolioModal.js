import React, { useState } from 'react';

// ─── COLORS ───────────────────────────────────────────────
const LIME = '#aaff00';
const FOREST = '#0D2E0D';
const DARK = '#1a1a0a';
const CARD = '#242c14';
const SLATE = '#1e2a1e';
const SLATE2 = '#2a3a2a';

// ─── NICHES ───────────────────────────────────────────────
const NICHES = [
  { label: 'Lifestyle', icon: 'favorite' },
  { label: 'Beauty', icon: 'flare' },
  { label: 'Tech', icon: 'devices' },
  { label: 'Gaming', icon: 'sports_esports' },
  { label: 'Fashion', icon: 'checkroom' },
  { label: 'Fitness', icon: 'fitness_center' },
  { label: 'Travel', icon: 'flight' },
  { label: 'Food', icon: 'restaurant' },
  { label: 'Finance', icon: 'payments' },
];

const AGE_GROUPS = ['Gen Z', 'Millennials', 'Gen X', 'Alpha'];
const GENDERS = ['Mixed', 'Female', 'Male', 'Non-binary'];

const PLATFORMS = [
  { key: 'tiktok', label: 'TikTok', icon: 'music_note', color: '#000', placeholder: '@username', followerLabel: 'Followers' },
  { key: 'instagram', label: 'Instagram', icon: 'photo_camera', gradient: 'linear-gradient(135deg, #f9ce34, #ee2a7b, #6228d7)', placeholder: '@username', followerLabel: 'Followers' },
  { key: 'youtube', label: 'YouTube Channel', icon: 'play_arrow', color: '#FF0000', placeholder: 'Channel name', followerLabel: 'Subscribers' },
];

// ─── STEPPER BAR ──────────────────────────────────────────
function StepBar({ step }) {
  const steps = ['Identity', 'Niche', 'Platforms', 'Done'];
  return (
    <div style={{ padding: '1.5rem 2rem 0.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <span style={{ color: LIME, fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Step {step} of 3
        </span>
        <span style={{ color: LIME, fontWeight: 900, fontSize: '0.8rem' }}>
          {steps[step - 1]}
        </span>
      </div>
      <div style={{ display: 'flex', gap: '6px' }}>
        {[1, 2, 3].map(i => (
          <div key={i} style={{
            flex: 1, height: '6px', borderRadius: '9999px',
            background: i <= step ? LIME : 'rgba(170,255,0,0.15)',
            transition: 'background 0.4s',
          }} />
        ))}
      </div>
    </div>
  );
}

// ─── STEP 1 — IDENTITY ────────────────────────────────────
function Step1({ data, onChange }) {
  return (
    <div style={{ padding: '1.5rem 2rem' }}>
      <h1 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fff', marginBottom: '0.3rem', letterSpacing: '-0.03em' }}>
        Build Your Portfolio
      </h1>
      <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
        Let's start with your basic identity and brand.
      </p>

      {/* Avatar upload */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
        <div style={{ position: 'relative', cursor: 'pointer' }}>
          <div style={{
            width: '96px', height: '96px', borderRadius: '50%',
            border: `2px dashed ${LIME}`, background: 'rgba(170,255,0,0.05)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          }}>
            <span className="material-symbols-outlined" style={{ color: LIME, fontSize: '1.8rem' }}>add_a_photo</span>
            <span style={{ color: LIME, fontSize: '0.55rem', fontWeight: 700, marginTop: '2px' }}>UPLOAD</span>
          </div>
          <div style={{
            position: 'absolute', bottom: '-2px', right: '-2px',
            width: '28px', height: '28px', borderRadius: '50%',
            background: LIME, border: `3px solid ${CARD}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span className="material-symbols-outlined" style={{ color: FOREST, fontSize: '0.9rem' }}>edit</span>
          </div>
        </div>
      </div>

      {/* Fields */}
      {[
        { key: 'name', label: 'Creator Name', placeholder: 'e.g. Yassine El Idrissi', icon: null },
        { key: 'location', label: 'Location', placeholder: 'e.g. Ouarzazate, Morocco', icon: 'location_on' },
      ].map(f => (
        <div key={f.key} style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.4rem', paddingLeft: '1rem' }}>
            {f.label}
          </label>
          <div style={{ position: 'relative' }}>
            {f.icon && <span className="material-symbols-outlined" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)', fontSize: '1.1rem' }}>{f.icon}</span>}
            <input
              value={data[f.key] || ''}
              onChange={e => onChange(f.key, e.target.value)}
              placeholder={f.placeholder}
              style={{
                width: '100%', background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '9999px', padding: `0.8rem ${f.icon ? '1rem 0.8rem 2.5rem' : '1rem 1.5rem'}`,
                color: '#fff', fontSize: '0.9rem', outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>
        </div>
      ))}

      {/* Username field with prefix */}
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.4rem', paddingLeft: '1rem' }}>
          Username / Handle
        </label>
        <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '9999px', overflow: 'hidden' }}>
          <span style={{ paddingLeft: '1.5rem', color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>geniepot.ma/</span>
          <input
            value={data.username || ''}
            onChange={e => onChange('username', e.target.value)}
            placeholder="username"
            style={{ flex: 1, background: 'transparent', border: 'none', padding: '0.8rem 1rem 0.8rem 0.2rem', color: '#fff', fontSize: '0.9rem', outline: 'none' }}
          />
        </div>
      </div>

      {/* Bio */}
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.4rem', paddingLeft: '1rem' }}>
          Short Bio
        </label>
        <textarea
          value={data.bio || ''}
          onChange={e => onChange('bio', e.target.value)}
          placeholder="Tell brands about your niche and personality..."
          rows={3}
          style={{
            width: '100%', background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '1.2rem', padding: '0.9rem 1.5rem',
            color: '#fff', fontSize: '0.9rem', outline: 'none',
            resize: 'none', boxSizing: 'border-box',
          }}
        />
      </div>
    </div>
  );
}

// ─── STEP 2 — NICHE ───────────────────────────────────────
function Step2({ data, onChange }) {
  const toggle = (arr, val) => arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val];

  return (
    <div style={{ padding: '1.5rem 2rem' }}>
      <h1 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#fff', marginBottom: '1.2rem', letterSpacing: '-0.03em' }}>
        What content do you create?
      </h1>

      {/* Niche grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6rem', marginBottom: '1.5rem' }}>
        {NICHES.map(n => {
          const selected = (data.niches || []).includes(n.label);
          return (
            <button key={n.label}
              onClick={() => onChange('niches', toggle(data.niches || [], n.label))}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
                padding: '0.7rem 0.5rem', borderRadius: '9999px', cursor: 'pointer',
                border: selected ? 'none' : '1px solid rgba(170,255,0,0.2)',
                background: selected ? LIME : 'transparent',
                color: selected ? FOREST : 'rgba(255,255,255,0.6)',
                fontWeight: selected ? 700 : 500, fontSize: '0.8rem',
                transition: 'all 0.2s',
              }}>
              <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>{n.icon}</span>
              {n.label}
            </button>
          );
        })}
      </div>

      {/* Target audience */}
      <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '1rem' }}>Your Target Audience</h3>

      {/* Age */}
      <label style={{ display: 'block', color: 'rgba(170,255,0,0.5)', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.6rem' }}>Age Group</label>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.2rem' }}>
        {AGE_GROUPS.map(a => {
          const sel = (data.ageGroups || []).includes(a);
          return (
            <button key={a} onClick={() => onChange('ageGroups', toggle(data.ageGroups || [], a))} style={{
              padding: '0.4rem 1.2rem', borderRadius: '9999px', cursor: 'pointer',
              border: sel ? 'none' : '1px solid rgba(170,255,0,0.2)',
              background: sel ? LIME : 'transparent',
              color: sel ? FOREST : 'rgba(255,255,255,0.6)',
              fontWeight: sel ? 700 : 500, fontSize: '0.82rem', transition: 'all 0.2s',
            }}>{a}</button>
          );
        })}
      </div>

      {/* Gender */}
      <label style={{ display: 'block', color: 'rgba(170,255,0,0.5)', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.6rem' }}>Gender Focus</label>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {GENDERS.map(g => {
          const sel = (data.genders || []).includes(g);
          return (
            <button key={g} onClick={() => onChange('genders', toggle(data.genders || [], g))} style={{
              padding: '0.4rem 1.2rem', borderRadius: '9999px', cursor: 'pointer',
              border: sel ? 'none' : '1px solid rgba(170,255,0,0.2)',
              background: sel ? LIME : 'transparent',
              color: sel ? FOREST : 'rgba(255,255,255,0.6)',
              fontWeight: sel ? 700 : 500, fontSize: '0.82rem', transition: 'all 0.2s',
            }}>{g}</button>
          );
        })}
      </div>
    </div>
  );
}

// ─── STEP 3 — PLATFORMS ───────────────────────────────────
function Step3({ data, onChange }) {
  const [isPublic, setIsPublic] = useState(true);

  return (
    <div style={{ padding: '1.5rem 2rem' }}>
      <h1 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#fff', marginBottom: '1.2rem', letterSpacing: '-0.03em' }}>
        Where do you create?
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1.2rem' }}>
        {PLATFORMS.map(p => (
          <div key={p.key} style={{
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '1rem', padding: '1rem 1.2rem',
            display: 'flex', alignItems: 'center', gap: '1rem',
          }}>
            {/* Platform icon */}
            <div style={{
              width: '44px', height: '44px', borderRadius: '50%', flexShrink: 0,
              background: p.gradient || p.color,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span className="material-symbols-outlined" style={{ color: '#fff', fontSize: '1.3rem' }}>{p.icon}</span>
            </div>

            {/* Handle input */}
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', color: 'rgba(255,255,255,0.35)', fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.2rem' }}>
                {p.label}
              </label>
              <input
                value={(data.platforms || {})[p.key]?.handle || ''}
                onChange={e => onChange('platforms', { ...data.platforms, [p.key]: { ...(data.platforms?.[p.key] || {}), handle: e.target.value } })}
                placeholder={p.placeholder}
                style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '0.95rem', fontWeight: 600, outline: 'none', width: '100%' }}
              />
            </div>

            {/* Divider */}
            <div style={{ width: '1px', height: '36px', background: 'rgba(255,255,255,0.1)' }} />

            {/* Followers input */}
            <div style={{ width: '100px' }}>
              <label style={{ display: 'block', color: 'rgba(255,255,255,0.35)', fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.2rem' }}>
                {p.followerLabel}
              </label>
              <input
                value={(data.platforms || {})[p.key]?.followers || ''}
                onChange={e => onChange('platforms', { ...data.platforms, [p.key]: { ...(data.platforms?.[p.key] || {}), followers: e.target.value } })}
                placeholder="e.g. 50K"
                style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '0.9rem', fontWeight: 600, outline: 'none', width: '100%' }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Public toggle */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0.9rem 1.2rem', background: 'rgba(170,255,0,0.05)',
        borderRadius: '1rem', border: '1px solid rgba(170,255,0,0.1)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span className="material-symbols-outlined" style={{ color: LIME, fontSize: '1.2rem' }}>public</span>
          <span style={{ color: '#fff', fontWeight: 500, fontSize: '0.9rem' }}>Make my portfolio public immediately</span>
        </div>
        {/* Toggle switch */}
        <div
          onClick={() => setIsPublic(!isPublic)}
          style={{
            width: '44px', height: '24px', borderRadius: '9999px', cursor: 'pointer',
            background: isPublic ? LIME : 'rgba(255,255,255,0.15)',
            position: 'relative', transition: 'background 0.3s', flexShrink: 0,
          }}>
          <div style={{
            position: 'absolute', top: '2px',
            left: isPublic ? '22px' : '2px',
            width: '20px', height: '20px', borderRadius: '50%',
            background: isPublic ? FOREST : '#fff',
            transition: 'left 0.3s',
          }} />
        </div>
      </div>
    </div>
  );
}

// ─── STEP 4 — SUCCESS ─────────────────────────────────────
function StepSuccess({ data, onClose }) {
  const [copied, setCopied] = useState(false);
  const url = `geniepot.ma/creators/${(data.username || 'your-username').toLowerCase().replace(/\s/g, '_')}`;

  const handleCopy = () => {
    navigator.clipboard?.writeText(url).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      {/* Checkmark circle */}
      <div style={{
        width: '80px', height: '80px', borderRadius: '50%',
        background: LIME, display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '1.5rem', boxShadow: '0 0 40px rgba(170,255,0,0.35)',
      }}>
        <span className="material-symbols-outlined" style={{ color: FOREST, fontSize: '2.5rem', fontWeight: 700 }}>check</span>
      </div>

      <h1 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fff', marginBottom: '0.5rem', letterSpacing: '-0.03em' }}>
        Your Portfolio is Live! 🎉
      </h1>
      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', marginBottom: '2rem', lineHeight: 1.6, maxWidth: '340px' }}>
        Share your page with brands and start getting collaborations today.
      </p>

      {/* URL copy card */}
      <div style={{
        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'rgba(255,255,255,0.05)', borderRadius: '9999px',
        padding: '0.8rem 0.8rem 0.8rem 1.5rem', border: '1px solid rgba(255,255,255,0.1)',
        marginBottom: '1.5rem', cursor: 'pointer',
      }}>
        <span style={{ color: LIME, fontWeight: 600, fontSize: '0.85rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginRight: '0.5rem' }}>
          {url}
        </span>
        <button onClick={handleCopy} style={{
          width: '38px', height: '38px', borderRadius: '50%', flexShrink: 0,
          background: LIME, border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span className="material-symbols-outlined" style={{ color: FOREST, fontSize: '1.1rem' }}>
            {copied ? 'check' : 'content_copy'}
          </span>
        </button>
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%' }}>
        <button onClick={onClose} style={{
          width: '100%', background: LIME, color: FOREST,
          padding: '1rem', borderRadius: '9999px', fontWeight: 900,
          fontSize: '1rem', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
        }}>
          View My Portfolio
          <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>arrow_forward</span>
        </button>
        <button style={{
          width: '100%', background: 'transparent', color: '#fff',
          padding: '1rem', borderRadius: '9999px', fontWeight: 700,
          fontSize: '1rem', border: '2px solid rgba(255,255,255,0.2)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>share</span>
          Share on Instagram
        </button>
      </div>

      <p style={{ marginTop: '1.5rem', color: 'rgba(255,255,255,0.25)', fontSize: '0.8rem' }}>
        Need help?{' '}
        <span style={{ color: 'rgba(170,255,0,0.5)', textDecoration: 'underline', cursor: 'pointer' }}>Contact support</span>
      </p>
    </div>
  );
}

// ─── MAIN MODAL ───────────────────────────────────────────
export default function PortfolioModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  if (!isOpen) return null;

  const handleChange = (key, val) => setFormData(prev => ({ ...prev, [key]: val }));

  const handleNext = () => {
    if (step < 3) setStep(s => s + 1);
    else setStep(4); // success
  };

  const handleBack = () => setStep(s => s - 1);

  const handleClose = () => {
    setStep(1);
    setFormData({});
    onClose();
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 999,
      background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1rem',
    }}
      onClick={e => e.target === e.currentTarget && handleClose()}
    >
      <div style={{
        width: '100%', maxWidth: '560px',
        background: CARD, borderRadius: '1.2rem',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 40px 80px rgba(0,0,0,0.6)',
        overflow: 'hidden', position: 'relative',
        maxHeight: '90vh', display: 'flex', flexDirection: 'column',
      }}>
        {/* Lime top bar */}
        <div style={{ height: '4px', background: LIME, flexShrink: 0 }} />

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.2rem 2rem 0', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {/* Teapot logo */}
            <img src="/logo.png" alt="Geniepot" style={{ height: '28px', width: 'auto' }} />
          </div>
          <button onClick={handleClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', lineHeight: 1 }}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Stepper — only for steps 1-3 */}
        {step <= 3 && <StepBar step={step} />}

        {/* Scrollable content */}
        <div style={{ overflowY: 'auto', flex: 1 }}>
          {step === 1 && <Step1 data={formData} onChange={handleChange} />}
          {step === 2 && <Step2 data={formData} onChange={handleChange} />}
          {step === 3 && <Step3 data={formData} onChange={handleChange} />}
          {step === 4 && <StepSuccess data={formData} onClose={handleClose} />}
        </div>

        {/* Footer actions — only for steps 1-3 */}
        {step <= 3 && (
          <div style={{
            flexShrink: 0, padding: '1.2rem 2rem',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: 'rgba(0,0,0,0.2)',
          }}>
            {step > 1 ? (
              <button onClick={handleBack} style={{
                display: 'flex', alignItems: 'center', gap: '0.3rem',
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'rgba(255,255,255,0.5)', fontWeight: 600, fontSize: '0.85rem',
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>arrow_back</span>
                Back
              </button>
            ) : (
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem', textDecoration: 'underline' }}>
                Save as Draft
              </button>
            )}

            <button onClick={handleNext} style={{
              background: LIME, color: FOREST,
              padding: '0.75rem 2rem', borderRadius: '9999px',
              fontWeight: 900, fontSize: '0.95rem', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              boxShadow: '0 8px 24px rgba(170,255,0,0.25)',
            }}>
              {step === 3 ? '🚀 Launch My Portfolio' : 'Continue'}
              {step < 3 && <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>arrow_forward</span>}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
