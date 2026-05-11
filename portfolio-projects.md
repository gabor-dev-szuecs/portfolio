# Gabor Szücs — Projekte

> Alle Projekte realisiert bei einem mittelständischen Medizintechnikunternehmen, Bayern, Deutschland.
> Zurück zur Übersicht: [portfolio-content.md](portfolio-content.md)

---

## #1 Pick-by-Light Kommissionierungssystem
**Pick-by-Light Warehouse Commissioning System**

**Stack:** Java · JavaFX · Spring Boot · TCP/IP · Oxaion ERP API · Offline-Sync

**DE:**
- Eigenverantwortliche Fertigstellung einer JavaFX Desktop-App für die Lagerkommissionierung (übernommen von Azubi-Codebase, vollständig refactored)
- Integration mit dem ERP-System Oxaion: Entnahmeschein-Abruf via REST API
- Pick-by-Light: Java-App kommuniziert via TCP/IP direkt mit SPS – steuert Lämpchen an den Kartons
- Offline-Modus: Lokaler Cache für Betrieb ohne WLAN im Lager, automatische Synchronisation bei Verbindungswiederherstellung

**EN:**
- Independently completed a JavaFX desktop app for warehouse commissioning (inherited from trainee codebase, fully refactored)
- Integrated with Oxaion ERP: picking slip retrieval via REST API
- Pick-by-Light: Java app communicates directly with PLC via TCP/IP – controls indicator lights on storage bins
- Offline mode: local cache for operation without WLAN in warehouse, automatic sync on reconnection

---

## #2 Cross-Datenbank-Migration DB2 → MSSQL
**Cross-Database Migration DB2 → MSSQL**

**Stack:** Java · Spring Boot · IBM DB2 · MSSQL · Spring Data JPA · Docker

**DE:**
- Entwicklung eines automatisierten Migrationssystems für über 40 Tabellen von IBM DB2 (Produktion) nach Microsoft SQL Server (Staging)
- Dynamische Tabellenstruktur-Erkennung – kein hardcoded Schema
- Gezielter Datentransfer mit Fehlerhandling und Logging
- Produktionssicherer Betrieb: PRD → STG ohne manuelle Eingriffe

**EN:**
- Developed an automated migration system for 40+ tables from IBM DB2 (production) to Microsoft SQL Server (staging)
- Dynamic table structure detection – no hardcoded schema
- Selective data transfer with error handling and logging
- Production-safe operation: PRD → STG without manual intervention

---

## #3 ERP-E-Commerce Vollintegration (B2C)
**Full ERP ↔ E-Commerce Integration (B2C)**

**Stack:** Java · Spring Boot · Spring Scheduler · Billbee API · Oxaion ERP · MSSQL · Docker

**DE:**
- Entwicklung und Pflege einer Vollintegration zwischen dem ERP-System Oxaion und der E-Commerce-Plattform Billbee
- Synchronisierte Entitäten: Kunden, Bestellungen, Versand, Artikel, Lagerbestand, Bezahlstatus, Auftragsstatus
- Automatisierte Hintergrundjobs via Spring Scheduler für Echtzeit-Datensynchronisation
- Dynamisches Retouren-Fehlerhandling direkt im ERP-Prozess

**EN:**
- Developed and maintained a full integration between Oxaion ERP and the Billbee e-commerce platform
- Synchronised entities: customers, orders, shipping, items, stock levels, payment status, order status
- Automated background jobs via Spring Scheduler for real-time data synchronisation
- Dynamic returns error handling integrated directly into ERP processes

---

## #4 Magento 2 B2B Schnittstelle
**Magento 2 B2B API Integration**

**Stack:** Java · Spring Boot · Magento 2 REST API · OAuth2 · MSSQL · Grafana

**DE:**
- Optimierung, Monitoring und Weiterentwicklung der REST API Schnittstelle zwischen Backend-Systemen und der Magento 2 B2B E-Commerce-Plattform
- Implementierung neuer Anforderungen und Performance-Optimierungen
- Server-Monitoring via Grafana: Speicherplatz, CPU, Memory Alerts

**EN:**
- Optimisation, monitoring and enhancement of REST API integrations between backend systems and the Magento 2 B2B e-commerce platform
- Implementation of new requirements and performance optimisations
- Server monitoring via Grafana: disk space, CPU, memory alerts

---

## #5 Entwicklungsinfrastruktur: GitLab, Grafana, Nexus
**Development Infrastructure: GitLab, Grafana, Nexus**

**Stack:** GitLab · LDAP · Grafana · Nexus · Docker · Linux Ubuntu

**DE:**
- Selbstständiges Aufsetzen eines GitLab-Servers inkl. LDAP-Integration für Benutzerverwaltung
- Betrieb von Grafana (Monitoring) und Nexus (Artifact Repository) auf demselben Server
- Vollständige Containerisierung der Infrastruktur via Docker

**EN:**
- Independently set up a GitLab server including LDAP integration for user management
- Operated Grafana (monitoring) and Nexus (artifact repository) on the same server
- Full containerisation of the infrastructure via Docker
