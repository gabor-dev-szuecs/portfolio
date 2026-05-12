// pv2-sections.jsx — Hero, About, Projects, Stack, Languages, Contact, Footer

function Topbar({ onToggleTheme }) {
  const scrolled = useScrolled(8);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const navLinks = [
    { href: '#work', label: 'Arbeiten' },
    { href: '#about', label: 'Über' },
    { href: '#stack', label: 'Stack' },
    { href: '#referenzen', label: 'Referenzen' },
    { href: '#contact', label: 'Kontakt' },
  ];
  return (
    <header className={`topbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="topbar-left">
        <div className="topbar-logo-wrap">
          <img className="topbar-logo" src="GS.png" alt="GS" />
        </div>
        <span className="topbar-name" style={{ fontSize: "20px" }}>Gabor Szücs</span>
      </div>
      <nav className="topbar-nav" aria-label="Sections">
        {navLinks.map(l => <a key={l.href} href={l.href}>{l.label}</a>)}
      </nav>
      <div className="topbar-right">
        <button
          className="theme-toggle"
          aria-label="Theme umschalten"
          onClick={(e) => onToggleTheme(e.currentTarget)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4"></circle>
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"></path>
          </svg>
        </button>
        <button
          className="hamburger"
          aria-label="Menü öffnen"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(o => !o)}>
          <span className={`ham-icon ${menuOpen ? 'open' : ''}`}>
            <span></span><span></span><span></span>
          </span>
        </button>
      </div>
      {menuOpen && (
        <nav className="mobile-nav" aria-label="Mobile Navigation">
          {navLinks.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>
          ))}
          <a href="#contact" className="mobile-nav-cta" onClick={() => setMenuOpen(false)}>
            Projekt anfragen →
          </a>
        </nav>
      )}
    </header>);
}


function Hero() {
  const c = window.CONTENT;
  return (
    <section className="hero shell">
      <div className="hero-kicker reveal">Java Backend Engineer · Portfolio</div>
      <h1 className="hero-title reveal">
        Backend-Systeme,<br />
        die <em>produktiv</em> laufen.
      </h1>

      <div className="hero-grid">
        <p className="hero-lead reveal">
          <span className="dropcap">E</span>
          ntwicklung robuster Java-Backends, REST-APIs und Integrationen für produktive Unternehmenssysteme — von ERP- und E-Commerce-Plattformen bis zu industriellen Steuerungen. Fokus auf saubere Architektur, Wartbarkeit und langfristig stabile Software.
        </p>
        <dl className="hero-meta reveal">
          <dt>Status</dt>
          <dd><span className="status-dot"></span>{c.status}</dd>
          <dt>Standort</dt>
          <dd>{c.location}</dd>
          <dt>Fokus</dt>
          <dd className="focus-chips">
            {['ERP', 'E-Commerce', 'Industrie', 'Full-Stack · Partner'].map(tag => (
              <span key={tag} className="focus-chip">{tag}</span>
            ))}
          </dd>
          <dt>Sprachen</dt>
          <dd>DE · EN · HU</dd>
        </dl>
      </div>
      <div className="hero-actions reveal">
        <a href="#contact" className="hero-cta">
          Projekt anfragen
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"></path></svg>
        </a>
      </div>
    </section>);

}

function About() {
  const c = window.CONTENT;
  return (
    <section className="section shell" id="about">
      <div className="section-head reveal">
        <div>
          <div className="section-num">§ 01</div>
          <div className="section-sub">Über</div>
        </div>
        <h2 className="section-title">
          Backend-Engineering mit <em>Fokus auf Produktion.</em>
        </h2>
      </div>
      <div className="about-grid">
        <div className="about-photo reveal">
          <img src="portrait-nobg.png" alt="Gabor Szücs" className="about-portrait" />
        </div>
        <div className="about-body reveal">
          {c.about.map((p, i) =>
          <p key={i} dangerouslySetInnerHTML={{ __html: p }}></p>
          )}
        </div>
      </div>
    </section>);

}

function Project({ p }) {
  return (
    <article className="project reveal">
      <div className="project-num">{p.n}</div>
      <div className="project-main">
        <h3>{p.de}</h3>
        <div className="en-title">{p.en}</div>
        <div className="stack" aria-label="Stack">
          {p.stack.map((s) => <span key={s}>{s}</span>)}
        </div>
      </div>
      <div className="project-body">
        <ul>
          {p.bullets.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
      </div>
    </article>);

}

function Projects() {
  const c = window.CONTENT;
  return (
    <section className="section shell" id="work">
      <div className="section-head reveal">
        <div>
          <div className="section-num">§ 02</div>
          <div className="section-sub">Ausgewählte Arbeiten · 2024 — 2026</div>
        </div>
        <h2 className="section-title">
          Ausgewählte <em>Projekte.</em>
        </h2>
      </div>
      <div className="projects">
        {c.projects.map((p) => <Project key={p.n} p={p} />)}
      </div>
    </section>);

}

function Stack() {
  const c = window.CONTENT;
  return (
    <section className="section shell" id="stack">
      <div className="section-head reveal">
        <div>
          <div className="section-num">§ 03</div>
          <div className="section-sub">Werkzeuge · Inventar</div>
        </div>
        <h2 className="section-title">
          Tech <em>Stack.</em>
        </h2>
      </div>
      <div className="stack-grid reveal">
        {c.stack.map((s) =>
        <div className="stack-cat" key={s.cat}>
            <h4>{s.cat}</h4>
            <ul>{s.items.map((i) => <li key={i}>{i}</li>)}</ul>
          </div>
        )}
      </div>
    </section>);

}

function Languages() {
  const c = window.CONTENT;
  return (
    <section className="section shell" id="languages">
      <div className="section-head reveal">
        <div>
          <div className="section-num">§ 04</div>
          <div className="section-sub">Hintergrund</div>
        </div>
        <h2 className="section-title">
          Sprachen &amp; <em>Ausbildung.</em>
        </h2>
      </div>
      <div className="lang-grid">
        <div className="lang-block reveal">
          <h4>Sprachen</h4>
          <div className="lang-list">
            {c.languages.map((l) =>
            <div className="lang-row" key={l.name}>
                <span className="name">{l.name}</span>
                <span className="level">{l.level}</span>
              </div>
            )}
          </div>
        </div>
        <div className="edu-block reveal">
          <h4>Ausbildung</h4>
          <div className="edu-card">
            <div className="title">{c.education.title}</div>
            <div className="org">{c.education.org}</div>
            <div className="when">{c.education.when}</div>
          </div>
        </div>
      </div>
    </section>);

}

function References() {
  return (
    <section className="section shell" id="referenzen">
      <div className="section-head reveal">
        <div>
          <div className="section-num">§ 05</div>
          <div className="section-sub">Zusammengearbeitet mit</div>
        </div>
        <h2 className="section-title">
          Referenzen.
        </h2>
      </div>
      <div className="ref-grid reveal">
        <div className="ref-card">
          <img src="JW-Logo.png" alt="JW Software" className="ref-logo" />
          <h3 className="ref-name">JW Software</h3>
          <p className="ref-desc">Softwarehaus mit 40 Jahren Erfahrung in der Zeiterfassung — Modernisierung gewachsener Systeme.</p>
          <a href="https://www.jw-software.de/" target="_blank" rel="noopener" className="ref-link">jw-software.de ↗</a>
        </div>
        <div className="ref-card">
          <div className="ref-logo-placeholder">FS</div>
          <h3 className="ref-name">Fabio Spoto</h3>
          <p className="ref-desc">Full-Stack-Projekte als eingespieltes Team: Fabio übernimmt das Frontend, ich das Backend — eine vollständige Lösung aus einer Hand.</p>
          <a href="https://fabio-spoto.com/" target="_blank" rel="noopener" className="ref-link">fabio-spoto.com ↗</a>
        </div>
      </div>
    </section>);
}

function Contact() {
  const c = window.CONTENT;
  const [status, setStatus] = React.useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    setStatus('sending');
    fetch('https://formspree.io/f/mdabydvj', {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' },
    })
      .then((r) => {
        if (r.ok) { setStatus('sent'); form.reset(); }
        else setStatus('error');
      })
      .catch(() => setStatus('error'));
  };

  return (
    <section className="section shell contact" id="contact">
      <div className="section-head reveal">
        <div>
          <div className="section-num">§ 06</div>
          <div className="section-sub">Kontakt</div>
        </div>
        <div></div>
      </div>

      <div className="contact-layout">
        <div className="contact-intro reveal">
          <h2 className="contact-title">
            Projekt in Planung?<br />
            <em>Lassen Sie uns sprechen.</em>
          </h2>
          <p className="contact-body">
            Ich nehme ausgewählte Projekte an — mit Schwerpunkt auf
            Backend-Entwicklung, API-Integrationen und Enterprise-Systemen.
            Wenn Sie eine technisch solide, langfristig wartbare Umsetzung
            suchen, freue ich mich über Ihre Anfrage.
          </p>
          <div className="contact-socials">
            <a href={c.contact.email}>E-Mail ↗</a>
            <a href={c.contact.linkedin} target="_blank" rel="noopener">LinkedIn ↗</a>
          </div>
        </div>

        <div className="contact-form-wrap reveal">
          {status === 'sent' ? (
            <div className="contact-success">
              <div className="contact-success-icon">✓</div>
              <p>Nachricht erhalten. Ich melde mich zeitnah.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-field">
                <label htmlFor="cf-name">Name</label>
                <input id="cf-name" type="text" name="name" required placeholder="Ihr Name" />
              </div>
              <div className="form-field">
                <label htmlFor="cf-email">E-Mail</label>
                <input id="cf-email" type="email" name="email" required placeholder="ihre@email.de" />
              </div>
              <div className="form-field">
                <label htmlFor="cf-msg">Nachricht</label>
                <textarea id="cf-msg" name="message" required rows="5" placeholder="Beschreiben Sie kurz Ihr Vorhaben …"></textarea>
              </div>
              <button type="submit" className="form-submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Wird gesendet …' : (
                  <>
                    Anfrage senden
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 6l6 6-6 6"></path>
                    </svg>
                  </>
                )}
              </button>
              {status === 'error' && (
                <p className="form-error">Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut oder schreiben Sie direkt per E-Mail.</p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>);
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="shell footer">
      <span>© {year} Gabor Szücs</span>
      <span></span>
      <div className="footer-legal">
        <a href="impressum.html">Impressum</a>
        <a href="datenschutz.html">Datenschutz</a>
      </div>
    </footer>);

}

Object.assign(window, { Topbar, Hero, About, Projects, Stack, Languages, References, Contact, Footer });