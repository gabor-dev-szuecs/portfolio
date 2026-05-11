/* global React */
const { useState, useEffect, useRef } = React;

/* ============ Icons ============ */
const Svg = ({ size = 16, stroke = 1.6, children, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth={stroke}
       strokeLinecap="round" strokeLinejoin="round" {...rest}>{children}</svg>
);
const Icons = {
  Arrow:    (p) => <Svg {...p}><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></Svg>,
  ArrowUR:  (p) => <Svg {...p}><path d="M7 17 17 7"/><path d="M8 7h9v9"/></Svg>,
  Github:   (p) => <Svg {...p}><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/></Svg>,
  Mail:     (p) => <Svg {...p}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></Svg>,
  LinkedIn: (p) => <Svg {...p}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></Svg>,
  Sun:      (p) => <Svg {...p}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></Svg>,
  Moon:     (p) => <Svg {...p}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></Svg>,
  Server:   (p) => <Svg {...p}><rect x="3" y="4" width="18" height="7" rx="2"/><rect x="3" y="13" width="18" height="7" rx="2"/><path d="M7 8h.01M7 17h.01"/></Svg>,
  Plug:     (p) => <Svg {...p}><path d="M9 2v6M15 2v6M6 8h12v3a6 6 0 0 1-12 0V8zM12 17v5"/></Svg>,
  Bolt:     (p) => <Svg {...p}><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z"/></Svg>,
  Check:    (p) => <Svg {...p} stroke={2}><path d="M20 6 9 17l-5-5"/></Svg>,
  Copy:     (p) => <Svg {...p}><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></Svg>,
  Gear:     (p) => <Svg {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></Svg>,
};

/* ============ Reveal hook ============ */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.setAttribute("data-visible", "true");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ============ Nav ============ */
function Nav({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className="nav" data-scrolled={scrolled}>
      <div className="nav-inner">
        <a href="#top" className="brand">
          <span className="brand-mark">GS</span>
          <span>Gabor Szücs</span>
        </a>
        <nav className="nav-links">
          <a href="#skills" className="nav-link" data-hide-mobile>Skills</a>
          <a href="#referenzen" className="nav-link" data-hide-mobile>Referenzen</a>
          <button className="theme-toggle" onClick={onToggleTheme} aria-label="Toggle theme">
            {theme === "dark" ? <Icons.Sun /> : <Icons.Moon />}
          </button>
          <a href="#contact" className="nav-cta">Kontakt</a>
        </nav>
      </div>
    </header>
  );
}

/* ============ Hero ============ */
function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-aurora" />
      <div className="hero-bg" />
      <div className="container hero-inner">
        <div data-reveal>
          <span className="hero-status">
            <span className="status-pulse" />
            <span>Aktuell verfügbar · 2026</span>
          </span>
        </div>
        <h1 data-reveal style={{ transitionDelay: "60ms" }}>
          Gabor Szücs<span className="accent-dot">.</span>
          <span className="secondary-line secondary-line--small">Java Developer · Backend, Integration &amp; Systemmodernisierung.</span>
        </h1>
        <p className="hero-sub" data-reveal style={{ transitionDelay: "120ms" }}>
          Systeme verstehen, verbinden, modernisieren.
        </p>
        <div className="hero-actions" data-reveal style={{ transitionDelay: "180ms" }}>
          <a href="#contact" className="btn btn-primary">
            Kontakt aufnehmen <Icons.Arrow className="arrow" size={14} />
          </a>
          <a href="#skills" className="btn btn-secondary">
            <Icons.Arrow size={14} /> Skills ansehen
          </a>
        </div>
        <div className="hero-meta" data-reveal style={{ transitionDelay: "240ms" }}>
          <div className="hero-meta-item">
            <span className="hero-meta-label">Standort</span>
            <span className="hero-meta-value">Ecknach, Bayern</span>
          </div>
          <div className="hero-meta-item">
            <span className="hero-meta-label">Sprachen</span>
            <span className="hero-meta-value">DE · EN · HU</span>
          </div>
          <div className="hero-meta-item">
            <span className="hero-meta-label">Ausbildung</span>
            <span className="hero-meta-value">Fachinformatiker AE</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ Trust ============ */
function Trust() {
  const items = ["Java", "Spring Boot", "Docker", "MSSQL", "REST APIs", "Oxaion ERP"];
  return (
    <section className="trust">
      <div className="container trust-inner">
        <div className="trust-label">Aktuell im Einsatz</div>
        <div className="trust-stack">
          {items.map((t) => (
            <span key={t} className="trust-tag">
              <span className="trust-tag-dot" />{t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ Tech icon map ============ */
const DI = (path) => `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${path}`;
const TECH = [
  { name: "Java",             icon: DI("java/java-original.svg") },
  { name: "Spring Boot",      icon: DI("spring/spring-original.svg") },
  { name: "Spring Data JPA",  icon: DI("spring/spring-plain.svg") },
  { name: "Spring Scheduler", icon: DI("spring/spring-plain.svg") },
  { name: "Spring Security",  icon: DI("spring/spring-plain.svg") },
  { name: "JavaFX",           icon: DI("java/java-plain.svg") },
  { name: "MSSQL",            icon: DI("microsoftsqlserver/microsoftsqlserver-plain.svg") },
  { name: "PostgreSQL",       icon: DI("postgresql/postgresql-original.svg") },
  { name: "IBM DB2",          icon: DI("ibmdb2/ibmdb2-original.svg") },
  { name: "Hibernate",        icon: DI("hibernate/hibernate-original.svg") },
  { name: "Docker",           icon: DI("docker/docker-original.svg") },
  { name: "Docker Compose",   icon: DI("docker/docker-plain.svg") },
  { name: "GitLab",           icon: DI("gitlab/gitlab-original.svg") },
  { name: "GitHub",           icon: DI("github/github-original.svg") },
  { name: "Grafana",          icon: DI("grafana/grafana-original.svg") },
  { name: "Magento 2",        icon: DI("magento/magento-original.svg") },
  { name: "Oxaion ERP",       icon: "https://www.aptean.com/favicon.ico", mono: true },
  { name: "Billbee",          icon: "https://app.billbee.io/favicon.ico", mono: true },
  { name: "Nexus",            icon: null },
  { name: "OAuth 2.0",        icon: null },
  { name: "LDAP",             icon: null },
  { name: "Active Directory", icon: null },
  { name: "Legacy-Migration", icon: null },
  { name: "Refactoring",      icon: null },
  { name: "Stabilisierung",   icon: null },
];
const techMap = Object.fromEntries(TECH.map((t) => [t.name, t]));

function TechIcon({ name }) {
  const t = techMap[name] || {};
  if (!t.icon) return <span className="stack-icon-text">{name.slice(0, 2).toUpperCase()}</span>;
  return <img src={t.icon} alt={name} className={"stack-icon" + (t.mono ? " stack-icon-mono" : "")} />;
}

/* ============ Skills Grid ============ */
function SkillsGrid() {
  const skills = [
    { icon: "⚙️", title: "Backend",
      tech: ["Java", "Spring Boot", "Spring Data JPA", "Spring Scheduler", "JavaFX"] },
    { icon: "🔌", title: "Integration",
      tech: ["Oxaion ERP", "Billbee", "Magento 2"] },
    { icon: "🗄️", title: "Datenbank & Migration",
      tech: ["MSSQL", "PostgreSQL", "IBM DB2", "Hibernate"] },
    { icon: "🔐", title: "Authentifizierung",
      tech: ["OAuth 2.0", "LDAP", "Active Directory", "Spring Security"] },
    { icon: "🐳", title: "DevOps & Infrastruktur",
      tech: ["Docker", "Docker Compose", "GitLab", "GitHub", "Nexus", "Grafana"] },
    { icon: "🔄", title: "Systemmodernisierung",
      tech: ["Legacy-Migration", "Refactoring", "Stabilisierung"] },
  ];
  return (
    <section id="skills">
      <div className="container">
        <div data-reveal className="section-head">
          <div>
            <span className="eyebrow">01 — Skills</span>
            <h2 className="section-title">Was ich mitbringe.</h2>
          </div>
          <span className="section-counter">/ 06</span>
        </div>
        <div className="skills-grid">
          {skills.map((s) => (
            <div className="skill-card" key={s.title} data-reveal>
              <div className="skill-icon">{s.icon}</div>
              <h3 className="skill-title">{s.title}</h3>
              <div className="skill-tech">
                {s.tech.map((name) => (
                  <div className="skill-tech-item" key={name}>
                    <TechIcon name={name} />
                    <span>{name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ Referenzen ============ */
function Referenzen() {
  return (
    <section id="referenzen">
      <div className="container">
        <div data-reveal className="section-head">
          <div>
            <span className="eyebrow">02 — Referenzen</span>
            <h2 className="section-title">Zusammengearbeitet mit.</h2>
          </div>
          <span className="section-counter">/ 02</span>
        </div>
        <div className="ref-grid" data-reveal style={{ transitionDelay: "60ms" }}>

          <div className="ref-card">
            <div className="ref-card-top">
              <img src="JW-Logo.png" alt="JW Software" className="ref-logo" />
              <span className="ref-badge ref-badge--laufend">laufend</span>
            </div>
            <h3 className="ref-name">JW Software</h3>
            <p className="ref-desc">
              Softwarehaus mit 40 Jahren Erfahrung in der Zeiterfassung —
              Modernisierung gewachsener Systeme.
            </p>
            <a href="https://www.jw-software.de/" target="_blank" rel="noopener" className="ref-link">
              jw-software.de <Icons.ArrowUR size={12} />
            </a>
          </div>

          <div className="ref-card">
            <div className="ref-card-top">
              <div className="ref-logo-placeholder">FS</div>
              <span className="ref-badge ref-badge--partner">Frontend-Partner</span>
            </div>
            <h3 className="ref-name">Fabio Spoto</h3>
            <p className="ref-desc">
              Ansprechendes Frontend, stabiles Backend —
              zusammen die komplette Lösung.
            </p>
            <a href="https://fabio-spoto.com/" target="_blank" rel="noopener" className="ref-link">
              fabio-spoto.com <Icons.ArrowUR size={12} />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}


/* ============ Contact Form ============ */
function ContactForm() {
  const [status, setStatus] = useState("idle");
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    fetch("https://formspree.io/f/mdabydvj", {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    }).then((r) => {
      if (r.ok) { setStatus("sent"); form.reset(); }
      else setStatus("error");
    }).catch(() => setStatus("error"));
  };
  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="cf-row">
        <div className="cf-field">
          <label className="cf-label">Name</label>
          <input className="cf-input" name="name" type="text" placeholder="Dein Name" required />
        </div>
        <div className="cf-field">
          <label className="cf-label">E-Mail</label>
          <input className="cf-input" name="email" type="email" placeholder="deine@email.com" required />
        </div>
      </div>
      <div className="cf-field">
        <label className="cf-label">Nachricht</label>
        <textarea className="cf-textarea" name="message" rows={5} placeholder="Worum geht es?" required />
      </div>
      {status === "sent" && <p className="cf-success">Nachricht gesendet — ich melde mich bald!</p>}
      {status === "error" && <p className="cf-error">Etwas ist schiefgelaufen. Bitte schreib direkt an gabor_szuecs@icloud.com</p>}
      <button type="submit" className="btn btn-primary" style={{ marginTop: 4 }} disabled={status === "sent"}>
        Nachricht senden <Icons.Arrow size={14} className="arrow" />
      </button>
    </form>
  );
}

/* ============ Impressum ============ */
function Impressum() {
  return (
    <section id="impressum" className="impressum">
      <div className="container">
        <div data-reveal className="section-head">
          <div>
            <span className="eyebrow">Impressum</span>
            <h2 className="section-title">Angaben gemäß § 5 TMG</h2>
          </div>
        </div>
        <div className="impressum-body" data-reveal>
          <div className="impressum-block">
            <h4>Verantwortlich</h4>
            <p>Gabor Szücs<br />Ecknach, Bayern<br />Deutschland</p>
          </div>
          <div className="impressum-block">
            <h4>Kontakt</h4>
            <p>E-Mail: <a href="mailto:gabor_szuecs@icloud.com">gabor_szuecs@icloud.com</a></p>
          </div>
          <div className="impressum-block">
            <h4>Haftungshinweis</h4>
            <p>Trotz sorgfältiger inhaltlicher Kontrolle übernehme ich keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ Contact ============ */
function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <div data-reveal className="section-head">
          <div>
            <span className="eyebrow">03 — Kontakt</span>
          </div>
          <span className="section-counter">/ 03</span>
        </div>
        <div className="contact-layout" data-reveal>
          <div className="contact-info">
            <span className="eyebrow" style={{ marginBottom: 12 }}>Aktuell verfügbar</span>
            <h3>Backend, Integration, Legacy-Migration<br/>oder einfach eine Frage?</h3>
            <p>Remote oder hybrid · EU-Zeitzone · Ecknach, Bayern.</p>
            <div className="contact-actions" style={{ marginTop: 24 }}>
              <a href="https://www.linkedin.com/in/gabor-szuecs-2649962b3" target="_blank" rel="noopener" className="contact-action">
                <span className="contact-action-label">
                  <span className="k">LinkedIn</span>
                  <span className="v">Gabor Szücs</span>
                </span>
                <Icons.ArrowUR size={16} className="arrow-mini" />
              </a>
              <a href="mailto:gabor_szuecs@icloud.com" className="contact-action">
                <span className="contact-action-label">
                  <span className="k">E-Mail</span>
                  <span className="v">gabor_szuecs@icloud.com</span>
                </span>
                <Icons.ArrowUR size={16} className="arrow-mini" />
              </a>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

/* ============ Footer ============ */
function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-meta">
          <span><b>Gabor Szücs</b> · Ecknach, Bayern</span>
          <span><a href="#impressum" style={{ color: "var(--fg-subtle)" }}>Impressum</a> · © 2026</span>
        </div>
        <div className="footer-meta">
          <span>Java · Spring Boot · Backend · Integration · Modernisierung</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <span className="status-pulse" /> Verfügbar für Anfragen
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ============ Tweaks Trigger ============ */
function TweaksTrigger() {
  const [panelOpen, setPanelOpen] = useState(false);
  useEffect(() => {
    const onMsg = (e) => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setPanelOpen(true);
      else if (t === '__deactivate_edit_mode' || t === '__edit_mode_dismissed') setPanelOpen(false);
    };
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, []);
  if (panelOpen) return null;
  return (
    <button
      aria-label="Tweaks öffnen"
      onClick={() => window.postMessage({ type: '__activate_edit_mode' }, '*')}
      style={{
        position: 'fixed', bottom: 20, right: 20, zIndex: 2147483645,
        width: 40, height: 40, borderRadius: '50%', border: 'none',
        background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)',
        color: '#fff', cursor: 'pointer', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
        opacity: 0.7, transition: 'opacity .2s',
      }}
      onMouseEnter={e => e.currentTarget.style.opacity = 1}
      onMouseLeave={e => e.currentTarget.style.opacity = 0.7}
    >
      <Icons.Gear size={18} stroke={1.5} />
    </button>
  );
}

/* ============ Tweaks ============ */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "light",
  "accent": "green",
  "density": "default"
}/*EDITMODE-END*/;

const ACCENT_PRESETS = {
  violet: { accent: "oklch(0.58 0.22 290)", soft: "oklch(0.58 0.22 290 / 0.12)" },
  blue:   { accent: "oklch(0.6 0.2 245)",   soft: "oklch(0.6 0.2 245 / 0.12)" },
  green:  { accent: "oklch(0.62 0.16 155)", soft: "oklch(0.62 0.16 155 / 0.12)" },
  orange: { accent: "oklch(0.7 0.18 55)",   soft: "oklch(0.7 0.18 55 / 0.14)" },
  pink:   { accent: "oklch(0.66 0.22 12)",  soft: "oklch(0.66 0.22 12 / 0.14)" },
};

/* ============ App ============ */
function App() {
  useReveal();
  const [tweaks, setTweak] = window.useTweaks(TWEAK_DEFAULTS);

  // Apply theme + density to document
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", tweaks.theme);
    document.documentElement.setAttribute("data-density", tweaks.density);
    const a = ACCENT_PRESETS[tweaks.accent] || ACCENT_PRESETS.violet;
    document.documentElement.style.setProperty("--accent", a.accent);
    document.documentElement.style.setProperty("--accent-soft", a.soft);
  }, [tweaks.theme, tweaks.density, tweaks.accent]);

  const toggleTheme = () => setTweak("theme", tweaks.theme === "dark" ? "light" : "dark");

  return (
    <>
      <Nav theme={tweaks.theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero />
        <Trust />
        <SkillsGrid />
        <Referenzen />
        <Contact />
        <Impressum />
      </main>
      <Footer />

      <TweaksTrigger />

      <window.TweaksPanel title="Tweaks">
        <window.TweakSection title="Appearance">
          <window.TweakRadio
            label="Theme"
            value={tweaks.theme}
            onChange={(v) => setTweak("theme", v)}
            options={[{ label: "Light", value: "light" }, { label: "Dark", value: "dark" }]}
          />
          <window.TweakRadio
            label="Density"
            value={tweaks.density}
            onChange={(v) => setTweak("density", v)}
            options={[
              { label: "Compact", value: "compact" },
              { label: "Default", value: "default" },
              { label: "Spacious", value: "spacious" },
            ]}
          />
          <window.TweakSelect
            label="Accent"
            value={tweaks.accent}
            onChange={(v) => setTweak("accent", v)}
            options={[
              { label: "Violet (default)", value: "violet" },
              { label: "Blue", value: "blue" },
              { label: "Green", value: "green" },
              { label: "Orange", value: "orange" },
              { label: "Pink", value: "pink" },
            ]}
          />
        </window.TweakSection>
      </window.TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
