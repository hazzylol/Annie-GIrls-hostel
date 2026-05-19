// Annie Girls Hostel — Booking Tweaks
// Three expressive controls that reshape the feel of the booking flow.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "mood": "rose",
  "voice": "editorial",
  "pace": "roomy"
}/*EDITMODE-END*/;

const MOODS = {
  rose: {
    label: "Rose",
    accent: "#C8527A", accentDeep: "#9C3B5D", accentSoft: "#F6DDE4",
    bg: "#FBF7F2", bgTint: "#F3EAE0", surface: "#FFFFFF", surface2: "#FFF6EE",
    ink: "#2A1F1A", ink2: "#5C4A40", ink3: "#8C7B70",
    line: "rgba(42,31,26,0.10)", line2: "rgba(42,31,26,0.06)",
  },
  sage: {
    label: "Sage",
    accent: "#5A8B6A", accentDeep: "#3F6A4D", accentSoft: "#DDEAD9",
    bg: "#F6F4EE", bgTint: "#E8EDE0", surface: "#FFFFFF", surface2: "#F1F5EA",
    ink: "#1F2A1E", ink2: "#475244", ink3: "#7C8579",
    line: "rgba(31,42,30,0.10)", line2: "rgba(31,42,30,0.06)",
  },
  plum: {
    label: "Plum",
    accent: "#8B4F8E", accentDeep: "#5F3464", accentSoft: "#E8D8E9",
    bg: "#1A1320", bgTint: "#241932", surface: "#21172C", surface2: "#2A1E37",
    ink: "#F5EBF0", ink2: "#C9B6CC", ink3: "#8C7B96",
    line: "rgba(245,235,240,0.10)", line2: "rgba(245,235,240,0.06)",
  },
  sand: {
    label: "Sand",
    accent: "#C66B3D", accentDeep: "#9A4F2A", accentSoft: "#F2DDC8",
    bg: "#F5F0E8", bgTint: "#EAE1D2", surface: "#FFFDF8", surface2: "#F8F1E5",
    ink: "#2D241B", ink2: "#5C4F40", ink3: "#8C7E6C",
    line: "rgba(45,36,27,0.10)", line2: "rgba(45,36,27,0.06)",
  },
};

const VOICES = {
  editorial: {
    label: "Editorial",
    display: '"Fraunces", "Times New Roman", serif',
    body: '"DM Sans", system-ui, sans-serif',
    displayWeight: 500,
    accentTreatment: "italic",
  },
  modern: {
    label: "Modern",
    display: '"Inter", system-ui, sans-serif',
    body: '"Inter", system-ui, sans-serif',
    displayWeight: 700,
    accentTreatment: "uppercase",
  },
  soft: {
    label: "Soft",
    display: '"Fraunces", "Times New Roman", serif',
    body: '"DM Sans", system-ui, sans-serif',
    displayWeight: 500,
    accentTreatment: "handwritten",
  },
};

const PACES = {
  compact: {
    label: "Compact",
    formPad: "24px",
    sectionGap: "16px",
    fieldGap: "10px",
    h3Size: "18px",
    summaryPad: "20px",
  },
  roomy: {
    label: "Roomy",
    formPad: "40px",
    sectionGap: "28px",
    fieldGap: "16px",
    h3Size: "24px",
    summaryPad: "32px",
  },
  grand: {
    label: "Grand",
    formPad: "56px",
    sectionGap: "44px",
    fieldGap: "20px",
    h3Size: "32px",
    summaryPad: "40px",
  },
};

function applyTweaks(t) {
  const root = document.documentElement;
  const mood = MOODS[t.mood] || MOODS.rose;
  const voice = VOICES[t.voice] || VOICES.editorial;
  const pace = PACES[t.pace] || PACES.roomy;

  // MOOD — overwrite color tokens at :root
  root.style.setProperty("--rose", mood.accent);
  root.style.setProperty("--rose-deep", mood.accentDeep);
  root.style.setProperty("--rose-soft", mood.accentSoft);
  root.style.setProperty("--bg", mood.bg);
  root.style.setProperty("--bg-tint", mood.bgTint);
  root.style.setProperty("--surface", mood.surface);
  root.style.setProperty("--surface-2", mood.surface2);
  root.style.setProperty("--ink", mood.ink);
  root.style.setProperty("--ink-2", mood.ink2);
  root.style.setProperty("--ink-3", mood.ink3);
  root.style.setProperty("--line", mood.line);
  root.style.setProperty("--line-2", mood.line2);

  // Plum is dark by default — flip the data-theme so dark-mode CSS rules engage,
  // but our inline tokens win over them.
  if (t.mood === "plum") {
    root.setAttribute("data-theme", "dark");
  } else {
    root.setAttribute("data-theme", "light");
  }

  // VOICE — fonts + accent treatment
  root.style.setProperty("--font-display", voice.display);
  root.style.setProperty("--font-body", voice.body);
  root.style.setProperty("--display-weight", String(voice.displayWeight));

  // PACE — spacing
  root.style.setProperty("--book-form-pad", pace.formPad);
  root.style.setProperty("--book-section-gap", pace.sectionGap);
  root.style.setProperty("--book-field-gap", pace.fieldGap);
  root.style.setProperty("--book-h3-size", pace.h3Size);
  root.style.setProperty("--book-summary-pad", pace.summaryPad);

  // Apply voice accent treatment via a body class
  document.body.classList.remove("voice-editorial", "voice-modern", "voice-soft");
  document.body.classList.add(`voice-${t.voice}`);

  // Apply mood class for any mood-specific tweaks
  document.body.classList.remove("mood-rose", "mood-sage", "mood-plum", "mood-sand");
  document.body.classList.add(`mood-${t.mood}`);

  // Apply pace class
  document.body.classList.remove("pace-compact", "pace-roomy", "pace-grand");
  document.body.classList.add(`pace-${t.pace}`);
}

function renderSwatch(mood) {
  return `
    <svg viewBox="0 0 80 56" xmlns="http://www.w3.org/2000/svg">
      <rect width="80" height="56" fill="${mood.bg}" />
      <rect x="6" y="8" width="42" height="40" rx="6" fill="${mood.surface}" stroke="${mood.line.replace(/[\d.]+\)/, '0.4)')}" />
      <rect x="12" y="14" width="22" height="3" rx="1.5" fill="${mood.ink}" />
      <rect x="12" y="20" width="14" height="2" rx="1" fill="${mood.ink2}" opacity="0.6" />
      <circle cx="64" cy="28" r="14" fill="${mood.accent}" />
      <circle cx="64" cy="28" r="8" fill="${mood.accentSoft}" />
    </svg>`;
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => { applyTweaks(t); }, [t.mood, t.voice, t.pace]);

  return (
    <TweaksPanel>
      <TweakSection label="Mood" hint="Overall feeling of the page" />
      <div className="mood-grid">
        {Object.entries(MOODS).map(([key, m]) => (
          <button
            key={key}
            className={`mood-card ${t.mood === key ? "is-active" : ""}`}
            onClick={() => setTweak("mood", key)}
            type="button"
            aria-label={m.label}
          >
            <span
              className="mood-card-thumb"
              dangerouslySetInnerHTML={{ __html: renderSwatch(m) }}
            />
            <span className="mood-card-label">{m.label}</span>
          </button>
        ))}
      </div>

      <TweakSection label="Voice" hint="Typographic character" />
      <TweakRadio
        value={t.voice}
        options={[
          { value: "editorial", label: "Editorial" },
          { value: "modern", label: "Modern" },
          { value: "soft", label: "Soft" },
        ]}
        onChange={(v) => setTweak("voice", v)}
      />

      <TweakSection label="Pace" hint="Form density and rhythm" />
      <TweakRadio
        value={t.pace}
        options={[
          { value: "compact", label: "Compact" },
          { value: "roomy", label: "Roomy" },
          { value: "grand", label: "Grand" },
        ]}
        onChange={(v) => setTweak("pace", v)}
      />
    </TweaksPanel>
  );
}

// Inject styles for the mood swatch grid + voice/pace effects on the page
const tweakInjectedStyles = document.createElement("style");
tweakInjectedStyles.textContent = `
  .mood-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 6px;
  }
  .mood-card {
    appearance: none; padding: 4px; border-radius: 8px;
    background: rgba(0,0,0,0.04); border: 1.5px solid transparent;
    cursor: pointer; display: flex; flex-direction: column; gap: 4px;
    transition: all 150ms ease;
  }
  .mood-card:hover { background: rgba(0,0,0,0.08); }
  .mood-card.is-active { border-color: rgba(0,0,0,0.5); background: rgba(0,0,0,0.06); }
  .mood-card-thumb { display: block; width: 100%; aspect-ratio: 80/56; border-radius: 4px; overflow: hidden; }
  .mood-card-thumb svg { display: block; width: 100%; height: 100%; }
  .mood-card-label { font-size: 11px; font-weight: 500; padding: 0 2px 2px; }

  /* Voice: Modern — uppercase headlines + tighter tracking */
  body.voice-modern .display, body.voice-modern .h2, body.voice-modern h3, body.voice-modern .summary-room, body.voice-modern .book-hero h1, body.voice-modern .confirmation h2 {
    text-transform: uppercase;
    letter-spacing: -0.01em;
    font-weight: 700;
  }
  body.voice-modern .h2 em, body.voice-modern .display em, body.voice-modern .book-hero h1 em {
    font-style: normal;
    text-decoration: underline;
    text-decoration-thickness: 3px;
    text-underline-offset: 4px;
  }
  body.voice-modern .kicker { letter-spacing: 0.2em; }
  body.voice-modern .room-option-name { letter-spacing: 0.02em; }

  /* Voice: Soft — handwritten accent on italics + softer rounding */
  body.voice-soft .h2 em, body.voice-soft .display em, body.voice-soft .book-hero h1 em {
    font-family: "Caveat", "Fraunces", cursive;
    font-style: normal;
    font-weight: 600;
    font-size: 1.15em;
    letter-spacing: 0;
    color: var(--rose);
  }
  body.voice-soft .summary-room { font-style: italic; }
  body.voice-soft .room-option, body.voice-soft .book-form, body.voice-soft .book-summary,
  body.voice-soft .checkbox-row {
    border-radius: 22px;
  }
  body.voice-soft .field input, body.voice-soft .field select, body.voice-soft .field textarea {
    border-radius: 14px;
  }
  body.voice-soft .btn { font-family: var(--font-body); }

  /* Pace effects on the booking page */
  body .book-form { padding: var(--book-form-pad, 40px); }
  body .book-summary { padding: var(--book-summary-pad, 32px); }
  body .form-section { margin-bottom: var(--book-section-gap, 28px); }
  body .field { margin-bottom: var(--book-field-gap, 16px); }
  body .form-section h3 { font-size: var(--book-h3-size, 24px); }

  body.pace-compact .steps-rail { margin-bottom: 18px; padding-bottom: 14px; }
  body.pace-compact .form-section p { margin-bottom: 14px; font-size: 13px; }
  body.pace-compact .room-option { padding: 12px; }
  body.pace-compact .room-option-name { font-size: 16px; }
  body.pace-compact .field input, body.pace-compact .field select, body.pace-compact .field textarea {
    padding: 9px 12px; font-size: 14px;
  }
  body.pace-compact .room-options { gap: 8px; }
  body.pace-compact .field-grid { gap: 10px; }
  body.pace-compact .summary-photo { height: 96px; }
  body.pace-compact .summary-room { font-size: 22px; }

  body.pace-grand .steps-rail { margin-bottom: 44px; padding-bottom: 32px; }
  body.pace-grand .form-section { padding-bottom: 12px; }
  body.pace-grand .form-section p { font-size: 16px; max-width: 50ch; }
  body.pace-grand .room-option { padding: 26px; }
  body.pace-grand .room-option-name { font-size: 22px; }
  body.pace-grand .field label { font-size: 15px; }
  body.pace-grand .field input, body.pace-grand .field select, body.pace-grand .field textarea {
    padding: 16px 18px; font-size: 17px;
  }
  body.pace-grand .summary-photo { height: 200px; }
  body.pace-grand .summary-room { font-size: 32px; }
  body.pace-grand .summary-total .price { font-size: 38px; }
  body.pace-grand .book-hero h1 { font-size: clamp(48px, 7vw, 88px); }
  body.pace-grand .book-hero p { font-size: 19px; }
`;
document.head.appendChild(tweakInjectedStyles);

// Mount
const mount = document.getElementById("tweaks-mount");
if (mount) {
  ReactDOM.createRoot(mount).render(<App />);
}
