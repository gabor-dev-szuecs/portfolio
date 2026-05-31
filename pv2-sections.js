// pv2-sections.jsx — Hero, About, Projects, Stack, Languages, Contact, Footer

function HeroIntroOverlay() {
  const [phase, setPhase] = React.useState(() => {
    try {
      return sessionStorage.getItem('gs-intro') === '1' ? 'done' : 'playing';
    } catch {
      return 'playing';
    }
  });
  const dismiss = React.useCallback(() => {
    setPhase('fading');
    try {
      sessionStorage.setItem('gs-intro', '1');
    } catch {}
    setTimeout(() => setPhase('done'), 700);
  }, []);
  if (phase === 'done') return null;
  return /*#__PURE__*/React.createElement("div", {
    className: `intro-overlay${phase === 'fading' ? ' fading' : ''}`
  }, /*#__PURE__*/React.createElement("video", {
    autoPlay: true,
    muted: true,
    playsInline: true,
    src: "assets/hero-intro.mp4",
    onEnded: dismiss,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }), /*#__PURE__*/React.createElement("button", {
    className: "intro-skip",
    onClick: dismiss
  }, "Skip \u2192"));
}
function Topbar({
  onToggleTheme
}) {
  const scrolled = useScrolled(8);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const navLinks = [{
    href: '#work',
    label: 'Arbeiten'
  }, {
    href: '#about',
    label: 'Über'
  }, {
    href: '#stack',
    label: 'Stack'
  }, {
    href: '#referenzen',
    label: 'Referenzen'
  }, {
    href: '#contact',
    label: 'Kontakt'
  }];
  return /*#__PURE__*/React.createElement("header", {
    className: `topbar ${scrolled ? 'scrolled' : ''}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "topbar-left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "topbar-logo-wrap"
  }, /*#__PURE__*/React.createElement("img", {
    className: "topbar-logo",
    src: "GS.png",
    alt: "GS"
  })), /*#__PURE__*/React.createElement("span", {
    className: "topbar-name",
    style: {
      fontSize: "20px"
    }
  }, "Gabor Sz\xFCcs")), /*#__PURE__*/React.createElement("nav", {
    className: "topbar-nav",
    "aria-label": "Sections"
  }, navLinks.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.href,
    href: l.href
  }, l.label))), /*#__PURE__*/React.createElement("div", {
    className: "topbar-right"
  }, /*#__PURE__*/React.createElement("button", {
    className: "theme-toggle",
    "aria-label": "Theme umschalten",
    onClick: e => onToggleTheme(e.currentTarget)
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
  }))), /*#__PURE__*/React.createElement("button", {
    className: "hamburger",
    "aria-label": "Men\xFC \xF6ffnen",
    "aria-expanded": menuOpen,
    onClick: () => setMenuOpen(o => !o)
  }, /*#__PURE__*/React.createElement("span", {
    className: `ham-icon ${menuOpen ? 'open' : ''}`
  }, /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null)))), menuOpen && /*#__PURE__*/React.createElement("nav", {
    className: "mobile-nav",
    "aria-label": "Mobile Navigation"
  }, navLinks.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.href,
    href: l.href,
    onClick: () => setMenuOpen(false)
  }, l.label)), /*#__PURE__*/React.createElement("a", {
    href: "#contact",
    className: "mobile-nav-cta",
    onClick: () => setMenuOpen(false)
  }, "Projekt anfragen \u2192")));
}
function Hero() {
  const c = window.CONTENT;
  return /*#__PURE__*/React.createElement("section", {
    className: "hero shell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-kicker reveal"
  }, "Automatisierung, Schnittstellen & Unternehmenssoftware"), /*#__PURE__*/React.createElement("h1", {
    className: "hero-title reveal"
  }, "Backend-Systeme,", /*#__PURE__*/React.createElement("br", null), "die ", /*#__PURE__*/React.createElement("em", null, "produktiv"), " laufen."), /*#__PURE__*/React.createElement("div", {
    className: "hero-grid"
  }, /*#__PURE__*/React.createElement("p", {
    className: "hero-lead reveal"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dropcap"
  }, "E"), "ntwicklung robuster Java-Backends, REST-APIs und Integrationen f\xFCr produktive Unternehmenssysteme \u2014 von ERP- und E-Commerce-Plattformen bis zu industriellen Steuerungen. Fokus auf saubere Architektur, Wartbarkeit und langfristig stabile Software."), /*#__PURE__*/React.createElement("dl", {
    className: "hero-meta reveal"
  }, /*#__PURE__*/React.createElement("dt", null, "Status"), /*#__PURE__*/React.createElement("dd", null, /*#__PURE__*/React.createElement("span", {
    className: "status-dot"
  }), c.status), /*#__PURE__*/React.createElement("dt", null, "Standort"), /*#__PURE__*/React.createElement("dd", null, c.location), /*#__PURE__*/React.createElement("dt", null, "Fokus"), /*#__PURE__*/React.createElement("dd", {
    className: "focus-chips"
  }, ['Backend & APIs', 'ERP & E-Commerce', 'Industrie', 'Full-Stack · Partner'].map(tag => /*#__PURE__*/React.createElement("span", {
    key: tag,
    className: "focus-chip"
  }, tag))), /*#__PURE__*/React.createElement("dt", null, "Sprachen"), /*#__PURE__*/React.createElement("dd", null, "DE \xB7 EN \xB7 HU"))), /*#__PURE__*/React.createElement("div", {
    className: "hero-actions reveal"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#contact",
    className: "hero-cta"
  }, "Projekt anfragen", /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14M13 6l6 6-6 6"
  })))));
}
function About() {
  const c = window.CONTENT;
  return /*#__PURE__*/React.createElement("section", {
    className: "section shell",
    id: "about"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head reveal"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "section-num"
  }, "\xA7 01"), /*#__PURE__*/React.createElement("div", {
    className: "section-sub"
  }, "\xDCber")), /*#__PURE__*/React.createElement("h2", {
    className: "section-title"
  }, "Backend-Engineering mit ", /*#__PURE__*/React.createElement("em", null, "Fokus auf Produktion."))), /*#__PURE__*/React.createElement("div", {
    className: "about-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "about-photo reveal"
  }, /*#__PURE__*/React.createElement("img", {
    src: "portrait-nobg.png",
    alt: "Gabor Sz\xFCcs",
    className: "about-portrait"
  })), /*#__PURE__*/React.createElement("div", {
    className: "about-body reveal"
  }, c.about.map((p, i) => /*#__PURE__*/React.createElement("p", {
    key: i,
    dangerouslySetInnerHTML: {
      __html: p
    }
  })))));
}
function Project({
  p
}) {
  return /*#__PURE__*/React.createElement("article", {
    className: "project reveal"
  }, /*#__PURE__*/React.createElement("div", {
    className: "project-num"
  }, p.n), /*#__PURE__*/React.createElement("div", {
    className: "project-main"
  }, /*#__PURE__*/React.createElement("h3", null, p.de), /*#__PURE__*/React.createElement("div", {
    className: "en-title"
  }, p.en), /*#__PURE__*/React.createElement("div", {
    className: "stack",
    "aria-label": "Stack"
  }, p.stack.map(s => /*#__PURE__*/React.createElement("span", {
    key: s
  }, s)))), /*#__PURE__*/React.createElement("div", {
    className: "project-body"
  }, /*#__PURE__*/React.createElement("ul", null, p.bullets.map((b, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, b)))));
}
function Projects() {
  const c = window.CONTENT;
  return /*#__PURE__*/React.createElement("section", {
    className: "section shell",
    id: "work"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head reveal"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "section-num"
  }, "\xA7 02"), /*#__PURE__*/React.createElement("div", {
    className: "section-sub"
  }, "Ausgew\xE4hlte Arbeiten \xB7 2024 \u2014 2026")), /*#__PURE__*/React.createElement("h2", {
    className: "section-title"
  }, "Ausgew\xE4hlte ", /*#__PURE__*/React.createElement("em", null, "Projekte."))), /*#__PURE__*/React.createElement("div", {
    className: "projects"
  }, c.projects.map(p => /*#__PURE__*/React.createElement(Project, {
    key: p.n,
    p: p
  }))));
}
function Stack() {
  const c = window.CONTENT;
  return /*#__PURE__*/React.createElement("section", {
    className: "section shell",
    id: "stack"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head reveal"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "section-num"
  }, "\xA7 03"), /*#__PURE__*/React.createElement("div", {
    className: "section-sub"
  }, "Werkzeuge \xB7 Inventar")), /*#__PURE__*/React.createElement("h2", {
    className: "section-title"
  }, "Tech ", /*#__PURE__*/React.createElement("em", null, "Stack."))), /*#__PURE__*/React.createElement("div", {
    className: "system-diagram-wrap reveal"
  }, /*#__PURE__*/React.createElement("video", {
    autoPlay: true,
    muted: true,
    loop: true,
    playsInline: true,
    "aria-label": "Tech-Stack Architektur-\xDCbersicht",
    className: "diagram-desktop",
    src: "assets/system-diagram.mp4"
  }), /*#__PURE__*/React.createElement("video", {
    autoPlay: true,
    muted: true,
    loop: true,
    playsInline: true,
    "aria-label": "Tech-Stack Architektur-\xDCbersicht",
    className: "diagram-mobile",
    src: "assets/system-diagram-mobile.mp4"
  })), /*#__PURE__*/React.createElement("div", {
    className: "stack-grid reveal"
  }, c.stack.map(s => /*#__PURE__*/React.createElement("div", {
    className: "stack-cat",
    key: s.cat
  }, /*#__PURE__*/React.createElement("h4", null, s.cat), /*#__PURE__*/React.createElement("ul", null, s.items.map(i => /*#__PURE__*/React.createElement("li", {
    key: i
  }, i)))))));
}
function Languages() {
  const c = window.CONTENT;
  return /*#__PURE__*/React.createElement("section", {
    className: "section shell",
    id: "languages"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head reveal"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "section-num"
  }, "\xA7 04"), /*#__PURE__*/React.createElement("div", {
    className: "section-sub"
  }, "Hintergrund")), /*#__PURE__*/React.createElement("h2", {
    className: "section-title"
  }, "Sprachen & ", /*#__PURE__*/React.createElement("em", null, "Ausbildung."))), /*#__PURE__*/React.createElement("div", {
    className: "lang-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lang-block reveal"
  }, /*#__PURE__*/React.createElement("h4", null, "Sprachen"), /*#__PURE__*/React.createElement("div", {
    className: "lang-list"
  }, c.languages.map(l => /*#__PURE__*/React.createElement("div", {
    className: "lang-row",
    key: l.name
  }, /*#__PURE__*/React.createElement("span", {
    className: "name"
  }, l.name), /*#__PURE__*/React.createElement("span", {
    className: "level"
  }, l.level))))), /*#__PURE__*/React.createElement("div", {
    className: "edu-block reveal"
  }, /*#__PURE__*/React.createElement("h4", null, "Ausbildung"), /*#__PURE__*/React.createElement("div", {
    className: "edu-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "title"
  }, c.education.title), /*#__PURE__*/React.createElement("div", {
    className: "org"
  }, c.education.org), /*#__PURE__*/React.createElement("div", {
    className: "when"
  }, c.education.when)))));
}
function References() {
  return /*#__PURE__*/React.createElement("section", {
    className: "section shell",
    id: "referenzen"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head reveal"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "section-num"
  }, "\xA7 05"), /*#__PURE__*/React.createElement("div", {
    className: "section-sub"
  }, "Zusammengearbeitet mit")), /*#__PURE__*/React.createElement("h2", {
    className: "section-title"
  }, "Referenzen.")), /*#__PURE__*/React.createElement("div", {
    className: "ref-grid reveal"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ref-card"
  }, /*#__PURE__*/React.createElement("img", {
    src: "JW-Logo.png",
    alt: "JW Software",
    className: "ref-logo"
  }), /*#__PURE__*/React.createElement("h3", {
    className: "ref-name"
  }, "JW Software"), /*#__PURE__*/React.createElement("p", {
    className: "ref-desc"
  }, "Softwarehaus mit 40 Jahren Erfahrung in der Zeiterfassung \u2014 Modernisierung gewachsener Systeme."), /*#__PURE__*/React.createElement("a", {
    href: "https://www.jw-software.de/",
    target: "_blank",
    rel: "noopener",
    className: "ref-link"
  }, "jw-software.de \u2197")), /*#__PURE__*/React.createElement("div", {
    className: "ref-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ref-logo-placeholder"
  }, "FS"), /*#__PURE__*/React.createElement("h3", {
    className: "ref-name"
  }, "Fabio Spoto"), /*#__PURE__*/React.createElement("p", {
    className: "ref-desc"
  }, "Full-Stack-Projekte als eingespieltes Team: Fabio \xFCbernimmt das Frontend, ich das Backend \u2014 eine vollst\xE4ndige L\xF6sung aus einer Hand."), /*#__PURE__*/React.createElement("a", {
    href: "https://fabio-spoto.com/",
    target: "_blank",
    rel: "noopener",
    className: "ref-link"
  }, "fabio-spoto.com \u2197"))));
}
function Contact() {
  const c = window.CONTENT;
  const [status, setStatus] = React.useState('idle');
  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    setStatus('sending');
    fetch('https://formspree.io/f/mdabydvj', {
      method: 'POST',
      body: data,
      headers: {
        Accept: 'application/json'
      }
    }).then(r => {
      if (r.ok) {
        setStatus('sent');
        form.reset();
      } else setStatus('error');
    }).catch(() => setStatus('error'));
  };
  return /*#__PURE__*/React.createElement("section", {
    className: "section shell contact",
    id: "contact"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head reveal"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "section-num"
  }, "\xA7 06"), /*#__PURE__*/React.createElement("div", {
    className: "section-sub"
  }, "Kontakt")), /*#__PURE__*/React.createElement("div", null)), /*#__PURE__*/React.createElement("div", {
    className: "contact-layout"
  }, /*#__PURE__*/React.createElement("div", {
    className: "contact-intro reveal"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "contact-title"
  }, "Projekt in Planung?", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("em", null, "Lassen Sie uns sprechen.")), /*#__PURE__*/React.createElement("p", {
    className: "contact-body"
  }, "Backend, API-Integrationen, Enterprise-Systeme \u2014 und mit meinem Partner auch das komplette Frontend. Schreiben Sie mir \u2014 ich antworte pers\xF6nlich und schnell."), /*#__PURE__*/React.createElement("div", {
    className: "contact-socials"
  }, /*#__PURE__*/React.createElement("a", {
    href: c.contact.email
  }, "E-Mail \u2197"), /*#__PURE__*/React.createElement("a", {
    href: c.contact.linkedin,
    target: "_blank",
    rel: "noopener"
  }, "LinkedIn \u2197"))), /*#__PURE__*/React.createElement("div", {
    className: "contact-form-wrap reveal"
  }, status === 'sent' ? /*#__PURE__*/React.createElement("div", {
    className: "contact-success"
  }, /*#__PURE__*/React.createElement("div", {
    className: "contact-success-icon"
  }, "\u2713"), /*#__PURE__*/React.createElement("p", null, "Nachricht erhalten. Ich melde mich zeitnah.")) : /*#__PURE__*/React.createElement("form", {
    className: "contact-form",
    onSubmit: handleSubmit
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "cf-name"
  }, "Name"), /*#__PURE__*/React.createElement("input", {
    id: "cf-name",
    type: "text",
    name: "name",
    required: true,
    placeholder: "Ihr Name"
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "cf-email"
  }, "E-Mail"), /*#__PURE__*/React.createElement("input", {
    id: "cf-email",
    type: "email",
    name: "email",
    required: true,
    placeholder: "ihre@email.de"
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "cf-msg"
  }, "Nachricht"), /*#__PURE__*/React.createElement("textarea", {
    id: "cf-msg",
    name: "message",
    required: true,
    rows: "5",
    placeholder: "Beschreiben Sie kurz Ihr Vorhaben \u2026"
  })), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "form-submit",
    disabled: status === 'sending'
  }, status === 'sending' ? 'Wird gesendet …' : /*#__PURE__*/React.createElement(React.Fragment, null, "Anfrage senden", /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14M13 6l6 6-6 6"
  })))), status === 'error' && /*#__PURE__*/React.createElement("p", {
    className: "form-error"
  }, "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut oder schreiben Sie direkt per E-Mail.")))));
}
function Footer() {
  const year = new Date().getFullYear();
  return /*#__PURE__*/React.createElement("footer", {
    className: "shell footer"
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 ", year, " Gabor Sz\xFCcs"), /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("div", {
    className: "footer-legal"
  }, /*#__PURE__*/React.createElement("a", {
    href: "impressum.html"
  }, "Impressum"), /*#__PURE__*/React.createElement("a", {
    href: "datenschutz.html"
  }, "Datenschutz")));
}
Object.assign(window, {
  HeroIntroOverlay,
  Topbar,
  Hero,
  About,
  Projects,
  Stack,
  Languages,
  References,
  Contact,
  Footer
});
