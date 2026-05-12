// pv2-data.jsx — Content data

const CONTENT = {
  name: 'Gabor Szücs',
  role: 'Senior Java Backend Engineer',
  roleLong: 'Backend Systems · APIs · Enterprise Integrationen',
  location: 'Ecknach, Bayern · DE',
  tagline: {
    de: 'Robuste Backend-Systeme und Integrationen für produktive Unternehmensprozesse.',
    en: 'Robust backend systems and integrations for production enterprise workflows.'
  },
  status: 'Projektbasiert · Remote',
  about: ["Moderne Backend-Entwicklung für produktive Unternehmenssysteme. Ich entwickle APIs, Integrationen und Backend-Anwendungen für ERP-, E-Commerce- und Industriesysteme — mit Fokus auf <strong>Stabilität, Wartbarkeit und saubere Architektur.</strong>", "Mein Anspruch sind Lösungen, die nicht nur heute funktionieren, sondern <strong>langfristig zuverlässig betrieben und weiterentwickelt</strong> werden können.", "Erfahrung aus produktiven Unternehmensumgebungen in der Medizintechnik — von ERP-Schnittstellen und Legacy-Systemen bis zu LDAP-/Active-Directory-Integrationen und eigener Infrastruktur."],
  principles: [{
    k: 'Architektur',
    v: 'Klare Schichten, dokumentierte Schnittstellen, vorhersehbares Verhalten.'
  }, {
    k: 'Wartbarkeit',
    v: 'Code, der nach Übergabe weiterläuft. Tests, Logging, Monitoring von Tag eins.'
  }, {
    k: 'Integration',
    v: 'Sichere Anbindung von ERP, E-Commerce, Industrie-Hardware und Auth-Providern.'
  }, {
    k: 'Produktion',
    v: 'Containerisiert, observability-ready, mit Fokus auf Stabilität statt Hype.'
  }],
  projects: [{
    n: '01',
    de: 'Pick-by-Light Kommissionierungssystem',
    en: 'Industrial · Java · SPS-Anbindung',
    stack: ['Java', 'JavaFX', 'Spring Boot', 'TCP/IP', 'Oxaion ERP', 'Offline-Sync'],
    bullets: ['JavaFX-Anwendung für die Lagerkommissionierung — Vollständiges Refactoring auf produktionsreife Architektur.', 'Anbindung an Oxaion ERP über API: Abruf von Entnahmescheinen, Rückmeldung von Pickvorgängen.', 'Direkte Kommunikation mit SPS-Steuerungen via TCP/IP zur Ansteuerung der Pick-by-Light-Indikatoren.', 'Offline-fähig mit lokalem Cache und automatischer Synchronisation bei Reconnect.']
  }, {
    n: '02',
    de: 'Automatisierte Job-API für den Blaulicht-Sektor',
    en: 'AI-Extraction · Crawling · REST API',
    stack: ['Java 21', 'Spring Boot 4', 'PostgreSQL 16', 'WebClient', 'FireCrawl', 'Gemini 2.5', 'Docker', 'Dokploy'],
    bullets: ['FireCrawl crawlt Karriereseiten, Google Gemini AI extrahiert strukturierte Stellen-Daten, PostgreSQL speichert dedupliziert.', 'REST-API mit Bearer-Auth (Custom API-Key Filter) und Background-Scheduler — zero Live-Scraping on request.', 'Java 21 mit Virtual Threads, Spring WebClient reaktiv und non-blocking, Flyway-Migrationen für Schema-Versionierung.', 'Deployed via Docker Compose + Dokploy, gebaut mit Maven.']
  }, {
    n: '03',
    de: 'ERP ↔ E-Commerce Vollintegration (B2C)',
    en: 'Integration · Spring Scheduler · Real-Time Sync',
    stack: ['Java', 'Billbee API', 'Oxaion ERP', 'MSSQL', 'Docker'],
    bullets: ['Vollständige Integration zwischen Oxaion ERP und Billbee — entworfen, entwickelt und im Betrieb gehalten.', 'Synchronisierte Entitäten: Kunden, Bestellungen, Versand, Artikel, Lagerbestand, Bezahl- und Auftragsstatus.', 'Hintergrundjobs für nahezu Echtzeit-Synchronisation.', 'Sauberes Fehler- und Retouren-Handling direkt im ERP-Prozess integriert.']
  }, {
    n: '04',
    de: 'Magento 2 B2B Schnittstelle',
    en: 'REST API · OAuth2 · Monitoring',
    stack: ['Java', 'Magento 2 REST', 'MSSQL', 'Grafana'],
    bullets: ['Weiterentwicklung und Performance-Optimierung der Schnittstelle zwischen Backend und Magento 2 B2B.', 'Umsetzung neuer fachlicher Anforderungen mit Fokus auf Stabilität und Antwortzeiten.']
  }, {
    n: '05',
    de: 'Entwicklungs­infrastruktur: GitLab, Grafana, Nexus',
    en: 'Platform Engineering · Self-Hosted',
    stack: ['GitLab', 'LDAP', 'Grafana', 'Nexus', 'Docker', 'Ubuntu'],
    bullets: ['Aufbau eines self-hosted GitLab-Servers inkl. LDAP-Integration für zentrale Benutzerverwaltung.', 'Betrieb von Grafana (Monitoring) und Nexus (Artifact Repository) auf derselben Infrastruktur.', 'Vollständig containerisiert via Docker — reproduzierbar und wartbar.']
  }],
  stack: [{
    cat: 'Backend',
    items: ['Java ', 'Spring Boot', 'Spring Security', 'Spring Data JPA', 'Spring Scheduler', 'REST APIs', 'Hibernate / JPA']
  }, {
    cat: 'Auth & Identity',
    items: ['OAuth2', 'LDAP', 'Spring Security']
  }, {
    cat: 'Datenbanken',
    items: ['PostgreSQL', 'MSSQL', 'IBM DB2']
  }, {
    cat: 'Integration',
    items: ['Oxaion ERP', 'Billbee', 'Magento 2', 'SPS / TCP-IP', 'JSON', 'HTTP / HTTPS']
  }, {
    cat: 'DevOps & Platform',
    items: ['Docker', 'Docker Compose', 'GitLab (self-hosted)', 'Grafana', 'Nexus', 'Linux (Ubuntu)']
  }, {
    cat: 'Frontend / Desktop',
    items: ['JavaFX']
  }],
  languages: [{
    name: 'Deutsch',
    level: 'Muttersprache'
  }, {
    name: 'Ungarisch',
    level: 'Muttersprache'
  }, {
    name: 'English',
    level: 'Professional'
  }],
  education: {
    title: 'Fachinformatiker für Anwendungsentwicklung',
    org: 'Mischok Academy · Bayern',
    when: '2023 — 2025'
  },
  contact: {
    email: 'mailto:gabor.szuecs@example.com',
    linkedin: 'https://linkedin.com/in/gabor-szuecs-2649962b3',
    github: 'https://github.com/gabor-dev-szuecs'
  }
};
window.CONTENT = CONTENT;