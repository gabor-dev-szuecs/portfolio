// pv2-tweaks.jsx — Tweaks panel for accents + mono mode

const { useEffect: useEffectT } = React;

const ACCENTS = {
  forest:   '#2d8653',
  petrol:   '#1f5a6b',
  ochre:    '#b8742a',
  burgundy: '#8a3324',
  ink:      '#222222',
};
const ACCENTS_DARK = {
  forest:   '#4db87a',
  petrol:   '#7fb4c2',
  ochre:    '#e2a96a',
  burgundy: '#e08766',
  ink:      '#d8d2c4',
};

function PortfolioTweaks() {
  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "accent": "forest",
    "monoMode": false,
    "cursorRing": true,
    "dropcap": true
  }/*EDITMODE-END*/;

  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffectT(() => {
    const root = document.documentElement;
    const isDark = root.getAttribute('data-theme') === 'dark';
    const a = (isDark ? ACCENTS_DARK : ACCENTS)[t.accent] || ACCENTS.forest;
    root.style.setProperty('--accent', a);
    root.setAttribute('data-mode', t.monoMode ? 'mono' : 'serif');
    document.body.classList.toggle('no-dropcap', !t.dropcap);
    // expose for app to read
    window.__pv2_tweaks = t;
    window.dispatchEvent(new CustomEvent('pv2-tweaks-changed', { detail: t }));
  }, [t]);

  // also react to theme changes (to swap accent palette)
  useEffectT(() => {
    const obs = new MutationObserver(() => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const a = (isDark ? ACCENTS_DARK : ACCENTS)[t.accent] || ACCENTS.forest;
      document.documentElement.style.setProperty('--accent', a);
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => obs.disconnect();
  }, [t.accent]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Akzentfarbe">
        <TweakColor
          label="Akzent"
          value={ACCENTS[t.accent]}
          options={Object.values(ACCENTS)}
          onChange={(hex) => {
            const key = Object.keys(ACCENTS).find(k => ACCENTS[k] === hex) || 'burgundy';
            setTweak('accent', key);
          }}
        />
      </TweakSection>
      <TweakSection label="Typografie">
        <TweakToggle label="Mono-First Modus" value={t.monoMode} onChange={(v) => setTweak('monoMode', v)} />
        <TweakToggle label="Drop Caps" value={t.dropcap} onChange={(v) => setTweak('dropcap', v)} />
      </TweakSection>
      <TweakSection label="Bewegung">
        <TweakToggle label="Cursor-Ring" value={t.cursorRing} onChange={(v) => setTweak('cursorRing', v)} />
      </TweakSection>
    </TweaksPanel>
  );
}

window.PortfolioTweaks = PortfolioTweaks;
