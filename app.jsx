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
          <a href="#work" className="nav-link" data-hide-mobile>Projekte</a>
          <a href="#about" className="nav-link" data-hide-mobile>Über mich</a>
          <a href="#services" className="nav-link" data-hide-mobile>Leistungen</a>
          <a href="#stack" className="nav-link" data-hide-mobile>Stack</a>
          <button className="theme-toggle" onClick={onToggleTheme} aria-label="Toggle theme">
            {theme === "dark" ? <Icons.Sun /> : <Icons.Moon />}
          </button>
          <a href="#contact" className="nav-cta">Contact</a>
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
          <span className="secondary-line">Java Developer · ERP &amp; E-Commerce Integration.</span>
        </h1>
        <p className="hero-sub" data-reveal style={{ transitionDelay: "120ms" }}>
          Ich verbinde moderne Java-Entwicklung mit dem Mut zur Legacy-Migration —
          Schnittstellen zwischen ERP, Shop und Backend, die im Hintergrund einfach laufen.
          Spring Boot, REST APIs, MSSQL. Aus Ecknach, Bayern.
        </p>
        <div className="hero-actions" data-reveal style={{ transitionDelay: "180ms" }}>
          <a href="#contact" className="btn btn-primary">
            Kontakt aufnehmen <Icons.Arrow className="arrow" size={14} />
          </a>
          <a href="#work" className="btn btn-secondary">
            <Icons.Arrow size={14} /> Projekte ansehen
          </a>
        </div>
        <div className="hero-meta" data-reveal style={{ transitionDelay: "240ms" }}>
          <div className="hero-meta-item">
            <span className="hero-meta-label">Standort</span>
            <span className="hero-meta-value">Ecknach, Bayern</span>
          </div>
          <div className="hero-meta-item">
            <span className="hero-meta-label">Fokus</span>
            <span className="hero-meta-value">ERP · APIs · Migration</span>
          </div>
          <div className="hero-meta-item">
            <span className="hero-meta-label">Sprachen</span>
            <span className="hero-meta-value">DE · EN · HU</span>
          </div>
          <div className="hero-meta-item">
            <span className="hero-meta-label">Status</span>
            <span className="hero-meta-value">Freiberuflich aktiv</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ Trust ============ */
function Trust() {
  const items = ["Java 17", "Spring Boot", "C# / .NET 8", "MSSQL", "REST APIs", "Docker", "Oxaion ERP"];
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
        <div className="trust-label" style={{ opacity: 0.6 }}>v26.05</div>
      </div>
    </section>
  );
}

/* ============ About ============ */
function About() {
  return (
    <section id="about">
      <div className="container">
        <div data-reveal className="section-head">
          <div>
            <span className="eyebrow">01 — Über mich</span>
            <h2 className="section-title">Engineering, ohne Show.</h2>
          </div>
          <span className="section-counter">/ 01</span>
        </div>
        <div className="about-grid">
          <div className="about-copy" data-reveal>
            <p>
              Ich bin <strong>Fachinformatiker für Anwendungsentwicklung</strong> und arbeite
              als Java Developer an der Schnittstelle zwischen ERP-Systemen und modernen
              E-Commerce-Plattformen. Mein Schwerpunkt: Daten zuverlässig dorthin bringen,
              wo sie hingehören — automatisiert, idempotent, nachvollziehbar.
            </p>
            <p>
              Bei einem <strong>mittelständischen Medizintechnikunternehmen in Bayern</strong> entwickle und pflege ich seit 2024
              Schnittstellen zwischen <strong>Oxaion ERP</strong> und <strong>Billbee</strong>
              {" "}(B2C) sowie REST-APIs zu <strong>Magento 2</strong> für den B2B-Bereich —
              vollständige Synchronisation von Kunden, Bestellungen, Versand, Lagerbestand.
            </p>
            <p>
              Parallel als Freiberufler: Migration eines 40 Jahre alten COBOL-Systems auf
              {" "}<strong>C# / .NET 8</strong>, inklusive Überführung proprietärer ISAM-
              Indexdateien nach MSSQL. Legacy ist kein Schimpfwort — es ist eine Aufgabe.
            </p>
          </div>
          <div className="about-stats" data-reveal style={{ transitionDelay: "100ms" }}>
            <div className="about-stat">
              <span className="about-stat-num">2<span className="accent-text">+</span></span>
              <span className="about-stat-label">Jahre Java / Spring Boot</span>
            </div>
            <div className="about-stat">
              <span className="about-stat-num">7</span>
              <span className="about-stat-label">Sync-Datenflüsse live</span>
            </div>
            <div className="about-stat">
              <span className="about-stat-num">40<span className="accent-text">y</span></span>
              <span className="about-stat-label">COBOL-Legacy migriert</span>
            </div>
            <div className="about-stat">
              <span className="about-stat-num">3</span>
              <span className="about-stat-label">Sprachen fließend</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ Project visuals ============ */
function VizGraph() {
  return (
    <div className="project-visual viz-grid">
      <div className="viz-graph-stage">
        <div className="viz-graph-node accent" style={{ top: "18%", left: "8%" }}>
          <span className="ndot" /> billbee.shop
        </div>
        <div className="viz-graph-node" style={{ top: "55%", left: "20%" }}>
          <span className="ndot" /> spring.scheduler
        </div>
        <div className="viz-graph-node" style={{ top: "30%", left: "44%" }}>
          <span className="ndot" /> sync.service
        </div>
        <div className="viz-graph-node accent" style={{ top: "65%", left: "60%" }}>
          <span className="ndot" /> oxaion.erp
        </div>
        <div className="viz-graph-node" style={{ top: "20%", left: "72%" }}>
          <span className="ndot" /> mssql.db
        </div>
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
          <path className="viz-line-muted" d="M 80 40 C 140 40, 140 130, 200 130" />
          <path className="viz-line" d="M 200 130 C 260 130, 260 70, 330 70" strokeDasharray="3 3" />
          <path className="viz-line-muted" d="M 330 70 C 400 70, 400 150, 480 150" />
          <path className="viz-line-muted" d="M 480 150 C 540 150, 540 50, 600 50" />
        </svg>
      </div>
    </div>
  );
}

function VizTerminal() {
  return (
    <div className="project-visual">
      <div className="viz-terminal">
        <div className="viz-terminal-bar">
          <span className="dot" /><span className="dot" /><span className="dot" />
          <span style={{ marginLeft: 8 }}>~/migration — db2-to-mssql</span>
        </div>
        <div className="viz-terminal-body">
          <div><span className="prompt">$</span> java -jar migrator.jar --src db2://prd --dst mssql://stg</div>
          <div className="dim">› scanning 42 tables · IBM DB2 format</div>
          <div><span className="ok">✓</span> customers           <span className="dim">12 480 rows</span></div>
          <div><span className="ok">✓</span> orders              <span className="dim">89 213 rows</span></div>
          <div><span className="ok">✓</span> articles            <span className="dim">  3 456 rows</span></div>
          <div className="dim">› migrated 42 / 42 · 0 errors · 11.7s</div>
          <div><span className="prompt">$</span> <span style={{ borderRight: "6px solid currentColor", marginLeft: 2 }}>&nbsp;</span></div>
        </div>
      </div>
    </div>
  );
}

function VizCode() {
  return (
    <div className="project-visual">
      <div className="viz-code">
        <div><span className="com">// PickByLightService.java</span></div>
        <div><span className="kw">public void</span> activateLight(<span className="kw">String</span> binId) {"{"}</div>
        <div>&nbsp;&nbsp;<span className="kw">var</span> socket = tcp.connect(PLC_HOST, PORT);</div>
        <div>&nbsp;&nbsp;socket.send(<span className="str">"ON:"</span> + binId);</div>
        <div>&nbsp;&nbsp;log.info(<span className="str">"light {} on"</span>, binId);</div>
        <div>{"}"}</div>
        <div><span className="com">// TCP/IP → SPS · Offline-Sync</span></div>
      </div>
    </div>
  );
}

function VizChart() {
  return (
    <div className="project-visual viz-grid">
      <svg viewBox="0 0 600 200" preserveAspectRatio="none">
        <path className="viz-area"
          d="M 0 150 L 40 130 L 90 140 L 140 110 L 200 95 L 260 100 L 320 70 L 380 60 L 440 40 L 500 30 L 560 20 L 600 25 L 600 200 L 0 200 Z" />
        <path className="viz-line"
          d="M 0 150 L 40 130 L 90 140 L 140 110 L 200 95 L 260 100 L 320 70 L 380 60 L 440 40 L 500 30 L 560 20 L 600 25" />
        <circle className="viz-dot" cx="500" cy="30" r="4" />
        <circle className="viz-dot" cx="560" cy="20" r="3" />
      </svg>
    </div>
  );
}

function VizBars() {
  const bars = [40, 55, 38, 70, 62, 85, 78, 92, 88, 100, 95, 80];
  return (
    <div className="project-visual">
      <div className="viz-bars">
        {bars.map((h, i) => (
          <div key={i} className={"bar" + (i < 3 ? " muted" : "")} style={{ height: h + "%" }} />
        ))}
      </div>
    </div>
  );
}

/* ============ Projects ============ */
function ProjectCard({ project, featured }) {
  const Viz = project.viz;
  return (
    <article className={"project-card" + (featured ? " featured" : "")} data-reveal>
      <Viz />
      <div className="project-meta">
        {project.tags.map((t) => <span key={t} className="project-tag">{t}</span>)}
        <span className="project-year">{project.year}</span>
      </div>
      <h3 className="project-title">
        {project.title}
        <span className="ext-icon"><Icons.ArrowUR size={16} /></span>
      </h3>
      <p className="project-desc">{project.desc}</p>
    </article>
  );
}

function Projects() {
  const projects = [
    { title: "#1 Pick-by-Light Kommissionierungssystem", year: "2024 — 2025",
      desc: "Eigenverantwortliche Fertigstellung einer JavaFX Desktop-App für die Lagerkommissionierung (übernommen von Azubi-Codebase, vollständig refactored). TCP/IP-Kommunikation direkt mit der SPS steuert Lämpchen an den Kartons. Offline-Modus mit lokalem Cache, automatische Sync bei Verbindungswiederherstellung.",
      tags: ["Java", "JavaFX", "Spring Boot", "TCP/IP", "Oxaion ERP", "Offline-Sync"], viz: VizCode },
    { title: "#2 Cross-Datenbank-Migration DB2 → MSSQL", year: "2024 — 2025",
      desc: "Automatisiertes Migrationssystem für 40+ Tabellen von IBM DB2 (Produktion) nach Microsoft SQL Server (Staging). Dynamische Tabellenstruktur-Erkennung ohne hardcodiertes Schema — produktionssicherer Betrieb PRD → STG ohne manuelle Eingriffe.",
      tags: ["Java", "Spring Boot", "IBM DB2", "MSSQL", "Spring Data JPA", "Docker"], viz: VizTerminal },
    { title: "#3 ERP ↔ E-Commerce Vollintegration (B2C)", year: "2024 — heute",
      desc: "Vollintegration zwischen Oxaion ERP und Billbee. Synchronisierte Entitäten: Kunden, Bestellungen, Versand, Artikel, Lagerbestand, Bezahl- und Auftragsstatus. Automatisierte Hintergrundjobs via Spring Scheduler — der gesamte B2C-Bestellprozess läuft vollautomatisch.",
      tags: ["Java", "Spring Boot", "Spring Scheduler", "Billbee API", "Oxaion ERP", "MSSQL", "Docker"], viz: VizGraph, featured: true },
    { title: "#4 Magento 2 B2B Schnittstelle", year: "2024 — heute",
      desc: "Optimierung, Monitoring und Weiterentwicklung der REST API Schnittstellen zwischen Backend-Systemen und der Magento 2 B2B E-Commerce-Plattform. Server-Monitoring via Grafana: Speicherplatz, CPU, Memory Alerts.",
      tags: ["Java", "Spring Boot", "Magento 2 REST API", "OAuth2", "MSSQL", "Grafana"], viz: VizChart },
    { title: "#5 Entwicklungsinfrastruktur: GitLab, Grafana, Nexus", year: "2024 — 2025",
      desc: "Selbstständiges Aufsetzen eines GitLab-Servers inkl. LDAP-Integration für Benutzerverwaltung. Betrieb von Grafana (Monitoring) und Nexus (Artifact Repository) auf demselben Server. Vollständige Containerisierung der Infrastruktur via Docker.",
      tags: ["GitLab", "LDAP", "Grafana", "Nexus", "Docker", "Linux Ubuntu"], viz: VizBars },
  ];
  return (
    <section id="work">
      <div className="container">
        <div data-reveal className="section-head">
          <div>
            <span className="eyebrow">02 — Projekte</span>
            <h2 className="section-title">Was zuletzt live gegangen ist.</h2>
            <p className="section-lede">Alle Projekte realisiert bei einem mittelständischen Medizintechnikunternehmen, Bayern — kein Showcase, sondern Produktion.</p>
          </div>
          <span className="section-counter">/ 05</span>
        </div>
        <div className="projects-grid">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} featured={!!p.featured} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ Services ============ */
function Services() {
  const services = [
    {
      icon: <Icons.Plug />, num: "001",
      title: "ERP- & E-Commerce-Integration",
      desc: "Schnittstellen zwischen ERP-Systemen, Shops und Backend-Services. Vollständige Datensynchronisation in Echtzeit oder als Batch — robust und nachvollziehbar.",
      bullets: ["Oxaion · Billbee · Magento 2", "REST APIs · JSON · OAuth 2.0", "Idempotent & replayable"],
    },
    {
      icon: <Icons.Server />, num: "002",
      title: "Java / Spring-Boot-Backend",
      desc: "Backend-Entwicklung mit Java 17 und Spring Boot. Spring Data JPA, Spring Scheduler, MSSQL — saubere Architektur statt Heldentum.",
      bullets: ["Spring Boot · JPA", "REST · Background Jobs", "MSSQL · Postgres"],
    },
    {
      icon: <Icons.Bolt />, num: "003",
      title: "Legacy-Migration & Modernisierung",
      desc: "Analyse und Migration alter Systeme auf moderne Architekturen. Von COBOL/ISAM nach C#/.NET 8 und MSSQL — schrittweise, ohne Big Bang.",
      bullets: ["COBOL → C# / .NET 8", "ISAM → MSSQL", "Installer & Deployment"],
    },
  ];
  return (
    <section id="services">
      <div className="container">
        <div data-reveal className="section-head">
          <div>
            <span className="eyebrow">03 — Leistungen</span>
            <h2 className="section-title">Was ich konkret mache.</h2>
            <p className="section-lede">Drei Schwerpunkte, sauber umgesetzt. Wenn ein Thema nicht passt, sage ich es offen.</p>
          </div>
          <span className="section-counter">/ 03</span>
        </div>
        <div className="services-grid">
          {services.map((s) => (
            <div className="service" key={s.num} data-reveal>
              <div className="service-num">{s.num}</div>
              <div className="service-icon">{s.icon}</div>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-desc">{s.desc}</p>
              <ul className="service-bullets">
                {s.bullets.map((b) => <li key={b}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ Stack ============ */
function Stack() {
  const groups = [
    { cat: "Backend",       items: [["Java 17", "täglich"], ["Spring Boot", "täglich"], ["Spring Data JPA", "täglich"], ["C# / .NET 8", "wöchentlich"], ["ASP.NET Core", "wöchentlich"]] },
    { cat: "Datenbanken",   items: [["MSSQL", "täglich"], ["PostgreSQL", "wöchentlich"], ["Hibernate", "täglich"], ["Entity Framework", "wöchentlich"]] },
    { cat: "Integration",   items: [["Oxaion ERP", "täglich"], ["Billbee API", "täglich"], ["Magento 2 REST", "wöchentlich"], ["OAuth 2.0", "wöchentlich"]] },
    { cat: "DevOps",        items: [["Docker", "täglich"], ["Docker Compose", "täglich"], ["Git / GitHub", "täglich"], ["Linux (Ubuntu)", "wöchentlich"], ["Windows Server / IIS", "wöchentlich"]] },
    { cat: "Legacy",        items: [["COBOL", "in Arbeit"], ["ISAM Indexfiles", "in Arbeit"], ["Micro Focus NetExpress", "in Arbeit"]] },
    { cat: "KI-Tools",      items: [["Claude Code", "täglich"], ["GitHub Copilot", "täglich"], ["Cursor", "wöchentlich"]] },
    { cat: "Sonstiges",     items: [["n8n", "gelegentlich"], ["Tailscale", "gelegentlich"], ["Active Directory", "gelegentlich"], ["TeamViewer", "gelegentlich"]] },
    { cat: "Sprachen",      items: [["Deutsch", "Muttersprache"], ["Ungarisch", "Muttersprache"], ["Englisch", "verhandlungssicher"]] },
  ];
  return (
    <section id="stack">
      <div className="container">
        <div data-reveal className="section-head">
          <div>
            <span className="eyebrow">04 — Stack</span>
            <h2 className="section-title">Womit ich arbeite.</h2>
            <p className="section-lede">Nicht vollständig. Die Liste bewegt sich — aber langsam.</p>
          </div>
          <span className="section-counter">/ 04</span>
        </div>
        <div className="stack-grid">
          {groups.map((g) => (
            <div className="stack-cell" key={g.cat} data-reveal>
              <div className="stack-cat">{g.cat}</div>
              <div className="stack-list">
                {g.items.map(([name, freq]) => (
                  <div className="stack-item" key={name}>
                    <span>{name}</span>
                    <span className="stack-item-meta">{freq}</span>
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

/* ============ Experience ============ */
function Experience() {
  const rows = [
    { when: "2026 — laufend", org: "JW Software GmbH · Friedberg",
      role: "IT-Freiberufler — Legacy-Migration & Modernisierung",
      desc: "Analyse und Migration eines 40 Jahre alten COBOL-Systems auf C# / .NET 8. Überführung proprietärer ISAM-Indexdateien nach MSSQL. Modernisierung des Installer-Setups (.NET 3.5 → .NET 8 LTS) und Fertigstellung einer ASP.NET-Core-Browser-Anwendung für Zeiterfassung.",
      tags: ["C#", ".NET 8", "COBOL", "MSSQL", "IIS"] },
    { when: "2024 — heute", org: "Medizintechnikunternehmen · Bayern",
      role: "Java Developer — ERP & E-Commerce Integration",
      desc: "Entwicklung und Pflege von Schnittstellen zwischen Oxaion ERP und Billbee (B2C). Vollständige Datensynchronisation: Kunden, Bestellungen, Versand, Artikel, Lagerbestand, Bezahl- und Auftragsstatus. Zusätzlich REST-API-Schnittstellen zu Magento 2 für B2B. Eigenverantwortliche Umsetzung von Teilprojekten im Team.",
      tags: ["Java", "Spring Boot", "MSSQL", "Oxaion", "Billbee", "Magento 2"] },
    { when: "2022 — 2023", org: "Mischok Academy · Bayern",
      role: "Fachinformatiker für Anwendungsentwicklung",
      desc: "Schwerpunkte: Softwareentwicklung, Datenbankdesign, objektorientierte Programmierung, Web-Technologien.",
      tags: ["OOP", "DB-Design", "Web"] },
  ];
  return (
    <section id="experience">
      <div className="container">
        <div data-reveal className="section-head">
          <div>
            <span className="eyebrow">05 — Werdegang</span>
            <h2 className="section-title">Wo ich war.</h2>
          </div>
          <span className="section-counter">/ 05</span>
        </div>
        <div className="timeline">
          {rows.map((r) => (
            <div className="timeline-row" key={r.org} data-reveal>
              <div className="timeline-when">{r.when}</div>
              <div className="timeline-main">
                <h4>{r.org}</h4>
                <div className="role">{r.role}</div>
                <div className="desc">{r.desc}</div>
              </div>
              <div className="timeline-tags">
                {r.tags.map((t) => <span className="project-tag" key={t}>{t}</span>)}
              </div>
            </div>
          ))}
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
            <span className="eyebrow">06 — Kontakt</span>
          </div>
          <span className="section-counter">/ 06</span>
        </div>
        <div className="contact-card" data-reveal>
          <div>
            <span className="eyebrow" style={{ marginBottom: 8 }}>Aktuell verfügbar</span>
            <h3>ERP-Schnittstelle, Legacy-Migration<br/>oder Spring-Boot-Projekt? Schreib mir.</h3>
            <p>Bilingual DE/EN, EU-Zeitzone. Bevorzugt asynchron, mit klaren wöchentlichen Updates. Standort Ecknach (Bayern), remote oder hybrid.</p>
          </div>
          <div className="contact-actions">
            <a href="https://www.linkedin.com/in/gabor-szuecs-2649962b3" target="_blank" rel="noopener" className="contact-action">
              <span className="contact-action-label">
                <span className="k">LinkedIn</span>
                <span className="v">Gabor Szücs</span>
              </span>
              <Icons.ArrowUR size={16} className="arrow-mini" />
            </a>
            <a href="https://maps.google.com/?q=Ecknach,+Bayern,+Deutschland" target="_blank" rel="noopener" className="contact-action">
              <span className="contact-action-label">
                <span className="k">Standort</span>
                <span className="v">Ecknach, Bayern · DE</span>
              </span>
              <Icons.ArrowUR size={16} className="arrow-mini" />
            </a>
            <div className="contact-action">
              <span className="contact-action-label">
                <span className="k">Sprachen</span>
                <span className="v">Deutsch · English · Magyar</span>
              </span>
            </div>
          </div>
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
          <span>© 2026</span>
        </div>
        <div className="footer-meta">
          <span>Java · Spring Boot · ERP-Integration</span>
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
  "accent": "violet",
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
        <About />
        <Projects />
        <Services />
        <Stack />
        <Experience />
        <Contact />
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
