---
id: F006
type: feature
priority: v1
---

# cape integriert projektspezifische Regeln, Technologie-Entscheidungen usw.

Grundlage-ADR: [docs/adr/0002-conventions-are-local-or-central.md](../../adr/0002-conventions-are-local-or-central.md).
Begriffe (Convention, lokal/zentral, Tier, Bounded Context) im Glossar
[docs/arc42/12_glossary.md](../../arc42/12_glossary.md).

# TOP — Was & Entscheidungen (Sign-off)

## Problem Statement

Ein Harness hat drei Schichten: **Level 1** Claude Code, **Level 2** cape, **Level 3** die
projektspezifischen Regeln. cape-Skills planen und bauen heute, ohne die Level-3-Konventionen
aufzugreifen, die für den *gerade angefassten* Teil gelten — besonders **bevor** die Dateien
eines Tiers angefasst werden. Level 1 lädt verschachtelte `CLAUDE.md` nur *lazy* (beim
Datei-Zugriff), also oft zu spät, um eine Entscheidung zu prägen, die vorher fällt oder einen
*anderen* Tier betrifft. Das Ergebnis ignoriert damit Regeln, die es hätten prägen müssen.

## Solution

cape liest die relevanten Konventionen **aktiv** an den zwei Stellen, an denen der native
Level-1-Draht nicht reicht (ADR 0002): `/cape:setup` bereitet die zentralen Konventionen vor
und legt den Pointer darauf in `CONTEXT.md` an; die Skills konsultieren die lokalen Konventionen
der berührten Tiers, bevor sie handeln. Die Korrektheit wird per **Canary-Eval** nachgewiesen:
ein Baseline-Lauf zeigt, dass die Konventionen *ohne* den Nudge verpuffen (die Hypothese),
dieselbe Eval zeigt, dass sie *mit* dem Nudge greifen.

## User Stories

1. Als Entwickler mit cape will ich, dass `/implement` die Konventionen der berührten Tiers
   beachtet — auch für Entscheidungen, die fallen, *bevor* die Dateien dieses Tiers angefasst
   werden —, damit das Ergebnis nicht nachgebessert werden muss.
2. Als Entwickler will ich, dass ein Slice, der Frontend *und* Backend berührt, die
   Konventionen **beider** Tiers aufgreift.
3. Als Entwickler will ich, dass ein Frontend-only-Issue **nicht** von Backend-only-Konventionen
   beeinflusst wird (keine Leckage falscher Tiers).
4. Als Entwickler will ich, dass `/cape:setup` die zentralen Konventionen anlegt und den Pointer
   darauf in `CONTEXT.md` erzeugt, damit Skills sie über einen stabilen Pfad finden.
5. Als cape-Maintainer will ich eine Eval, die zeigt, dass der Konsultations-Nudge **nötig** ist
   (Baseline verpufft) und **hinreichend** (mit Nudge greift er), damit wir keine Maschinerie
   auf einer ungeprüften Hypothese bauen.

## Business Rules

- Eine Konvention ist cape's Sache nur, wenn ihr Beachten die Ergebnisqualität eines Skills
  verbessert.
- Lokale Konvention → `CLAUDE.md` des Tiers; zentrale → `docs/agent-conventions/`, per Pointer
  aus `CONTEXT.md` erreichbar.
- Ein Skill konsultiert die Vereinigung der Konventionen aller vom Issue benannten Tiers (und
  seiner Bounded Contexts), bevor er handelt — jeder benannte Tier wird über die konventionelle
  `CLAUDE.md`-Position aufgelöst.
- Konventionen eines nicht berührten Tiers dürfen **nicht** ins Ergebnis leaken.
- Kein Parallel-Speicher; auf Level 1 aufsetzen. Neu gelernte Konventionen: propose-and-OK,
  keine eigene Mechanik.
- **Eval-Hygiene (kein Sicherheitsfall):** Der Lauf ist harmlos — wir schreiben den Prompt
  selbst, er hat keine Parameter, nichts von außen fließt in den Kontext (keine Injektion),
  `claude -p` nutzt die Session-Auth (kein übergebenes Secret). Proportionale Hygiene genügt:
  Fixtures aus **statischen Templates** in einem **ephemeren tmpdir**, nie im echten
  cape-Checkout; Workdir gitignored.
- **CI-Verdrahtung → I027 (nur falls relevant):** Sollte das Harness je in CI mit einem
  API-Key-*Secret* auf PRs laufen, gelten dort die üblichen CI-Secret-Regeln (kein Key an
  Fork-PRs). I027s CI-Anbindung, nicht der Harness-Bau hier.

## Acceptance Criteria

**Baseline-Gate (Hypothese, läuft VOR der Implementierung):**
```
Given ein Fixture-Repo mit je einer CLAUDE.md in frontend/ und backend/, die je eine
      Konvention mit fake-präfixiertem Canary tragen (CAPE_CANARY_*), und ein Issue mit
      einer unterspezifizierten Anweisung, die der Canary auflöst, und /implement OHNE den
      Konsultations-Nudge
When  /implement das Issue umsetzt
Then  taucht der zutreffende Canary in den geschriebenen Dateien spürbar seltener auf als
      die Zielschwelle — die Lücke belegt, dass die Konvention ohne den Nudge verpufft
```
Bestätigt die Hypothese. Fällt sie nicht so aus (Level 1 greift schon selbst), wird **nicht**
implementiert, sondern neu untersucht.

**Mit Nudge — Recall & Precision:**
```
Given dasselbe Fixture MIT dem Konsultations-Nudge und ein Frontend-only-Issue
When  /implement es umsetzt
Then  taucht der Frontend-Canary in den geschriebenen Dateien auf UND der Backend-Canary nicht

Given dasselbe Fixture MIT dem Nudge und ein Cross-Tier-Issue (Frontend-Konvention prägt ein
      zuerst geschriebenes Backend-Artefakt)
When  /implement es umsetzt
Then  tauchen beide Canaries an der jeweils richtigen Stelle auf
```

**Setup-Scaffolding:**
```
Given ein frisches Repo
When  /cape:setup läuft
Then  enthält docs/agent-conventions/ den Tracker (tracker.md), und CONTEXT.md sagt
      „Central conventions are defined in files in docs/agent-conventions."
```

Alle Kriterien sind **statistisch**: N Läufe pro Zelle, gemessen als Rate (z.B. 9/10 vs. 1/10),
nicht als Einzel-Pass/Fail.

## Out of Scope

- Retrospektives Ernten von Konventionen → **F015**.
- Domain-Seam für große Domänen + `CONTEXT-MAP`-Ablösung + expliziter Tier-Index in `CONTEXT.md`
  + Kontext-Beziehungen nach arc42 → **F028**. `/implement` nutzt hier die konventionelle
  `CLAUDE.md`-Position, keinen gepflegten Index.
- Tracker-Templates (Issue/Feature/Agent-Brief) → **F014**.
- Der generische Schreib-/Evolutions-Pfad neuer Konventionen (über propose-and-OK hinaus).
- **Review wird aufgewertet und flexibel** (Review-Konventionen `review-*.md`, Inline-Reviews in
  `implement`/`build`, `review-build`, `coding-conventions.md`, Simplify-Achse, Auflösung des
  `review-implementation`-Skills) → **F004**. Setzt auf F006s Mechanismus auf, wird aber von
  F006s Canary-Eval nicht abgedeckt und fasst `build` an — darum ein eigenes Feature.

## Key Decisions

1. **Zwei-Touchpoint-Modell** wie ADR 0002 — genau zwei explizite Level-2→Level-3-Stellen.
2. **Gemessen wird `/implement`s reale Ausgabe** (die geschriebenen Dateien) auf einem Issue mit
   unterspezifizierter, vom Canary aufgelöster Anweisung — **nicht** ein Plan-Artefakt (das
   `/implement` gar nicht erzeugt). A/B cape-Nudge vs. Baseline, Konstellations-Matrix
   (frontend-only / backend-only / cross-tier), statistisch über N Läufe.
3. **Verbatim-Canary mit Fake-Prefix `CAPE_CANARY_` → deterministisches Scoring** (`grep`),
   kein LLM-Judge im Kern.
4. **Hypothese zuerst.** Das Baseline-Gate läuft VOR der Implementierung. Zeigt es keine Lücke,
   wird gestoppt und neu gedacht, nicht gebaut.
5. **Eval-Infra wohnt in diesem Feature**, aufgeteilt in Issues — kein eigenes Mini-Feature.
6. **`CONTEXT.md`-Format-Owner reconcilen:** F006 aktualisiert `context-format.md` (den
   kanonischen Vertrag) um die Sektion für den Pointer auf zentrale Konventionen und den Satz
   „Central conventions are defined in files in docs/agent-conventions." Domäne-Sektion + Tier-Index
   bleiben F028.
7. **Tier-Konventionen werden über die konventionelle `CLAUDE.md`-Position gefunden**, nicht
   über einen gepflegten Index (der hat in F006 keinen Schreiber — s. Out of Scope → F028).
8. **`/cape:setup` scaffoldet die zentralen Konventionen, die Skills konsultieren** — nicht per
   se „nur den Tracker". Dass setup bisher nur den Tracker anlegte, war Umstand, keine
   Entscheidung. Relevanz-Regel: eine zentrale Konvention wird angelegt, sobald ein Skill sie
   konsultiert (ADR 0002). In **F006** ist das **der Tracker** (plus der `CONTEXT.md`-Pointer).
   Weitere (Review-Konventionen, `coding-conventions.md`) kommen mit dem Item, das ihren
   Konsumenten einführt → **F004**.

# BOTTOM — Internes Design (Implementierung)

## Domain & Data Model

Begriffe aus dem Glossar: **Convention** (lokal/zentral), **Tier**, **Bounded Context**.
Neu, eval-spezifisch: **Canary** (ein wörtliches, fake-präfixiertes Token `CAPE_CANARY_*` in
einer Tier-`CLAUDE.md`, das eine unterspezifizierte Anweisung eindeutig auflöst; sein Auftauchen
in der Ausgabe beweist, dass die Konvention konsultiert wurde), **Fixture** (ein generiertes
Wegwerf-Repo mit definierten Tiers, Canaries und Issues), **Konstellation** (welche Tiers ein
Issue berührt: frontend-only / backend-only / cross-tier).

## Interfaces & Contracts

- **Setup-Scaffolding-Vertrag** (`/cape:setup`): stellt in `docs/agent-conventions/` den Tracker
  (`tracker.md`) bereit (wie heute) und schreibt in `CONTEXT.md` den Pointer auf
  `docs/agent-conventions/` samt dem Satz „Central conventions are defined in files in
  docs/agent-conventions."
- **`context-format.md`-Update:** der kanonische `CONTEXT.md`-Vertrag wird um die Sektion für den
  Pointer auf zentrale Konventionen ergänzt (Domäne-Sektion + Tier-Index bleiben F028).
- **`/split`-Nudge:** benennt die Tiers (und Bounded Contexts), die jeder erzeugte Issue
  berührt — Prosa im Issue, kein Schema (bewusste Entscheidung).
- **`/implement`-Nudge:** liest vor dem Handeln die Konventionen jedes vom Issue benannten Tiers,
  aufgelöst über die konventionelle `CLAUDE.md`-Position des Tiers.

## UI/UX

Keine.

## Test Seams & System under Test

**Eine Naht:** das Eval-Harness, das `claude -p` headless über ein generiertes Fixture fährt und
die von `/implement` **geschriebenen Dateien** auf die Canaries prüft.

- **Innerhalb der SUT** (wird geübt): der `/implement`-Fluss mit cape's Konsultations-Nudge, die
  aktive Konsultation der Tier-Konventionen vor dem Handeln.
- **Außerhalb** (nicht geübt / gestellt): `/feature` und der Review-Pfad (→ F004), die Stochastik
  des Modells (durch N Läufe behandelt), Claude Code selbst (Level 1).
- **Isolation:** Fixture in ephemerem tmpdir, nie im echten Checkout; cape aus dem **lokalen
  Checkout** geladen (nicht der ungepinnten Marketplace) → hermetisch. Geteilt mit I027.

Scoring: wörtlicher Match der Canaries in den geschriebenen Dateien; Anwesenheits-/Abwesenheits-
Matrix je Konstellation; Aggregation als Rate über N Läufe.

## Testing Decisions

- **`/implement`s Ausgabe messen, nicht einen Plan** — der Plan gehört `/feature`.
- **Unterspezifizierte Anweisung + Canary** — die Anweisung ist absichtlich vage („eine schöne
  Farbe"), die Tier-Konvention macht sie eindeutig; nur wenn die Konvention konsultiert wurde,
  erscheint der Canary.
- **Cross-Tier als eigentlicher Diskriminator** — beim gleichtierigen Issue lädt Level 1 die
  `CLAUDE.md` beim Datei-Schreiben oft nach und maskiert den Effekt; die Trennkraft steckt in
  Fällen, wo eine Konvention eine Entscheidung prägt, *bevor* der zugehörige Tier angefasst wird.
- **Verbatim-Canary** → deterministisch zählbar. **Konstellations-Matrix** → Recall *und*
  Precision. **A/B Baseline vs. Nudge, N Läufe, Rate** — die „Baseline" ist der *gleiche*
  `/implement`-Fluss ohne den Nudge (Tier-`CLAUDE.md` liegen weiter da); sie beweist die
  **Notwendigkeit des Nudges**, nicht „ohne cape".

## Further Notes

- Das Fixture-Bootstrap (cape in ein Wegwerf-Repo bringen) ist dieselbe Arbeit wie I027s
  Installier-Smoke-Test — dort einhängen; Bootstrap aus dem lokalen Checkout hält den Test
  hermetisch.
- Die Größe der Baseline-Lücke ist **modell-abhängig** (manche Modelle lesen `CLAUDE.md`
  proaktiv). Erwartet, wird über Modelle hinweg beobachtet, kein Defekt.
- Das Vorab-Laden der Tier-Konventionen reicht früher und breiter in Repo-Inhalt als Level 1s
  Lazy-Load — gleiche Vertrauensgrenze (eigenes Repo), aber in einem feindlichen Repo erreicht
  eine bösartige `CLAUDE.md` das Modell früher. Im „eigenes Repo"-Modell akzeptiert, kein Gate.
- Vorgeschlagene Issue-Reihenfolge (durch `/split` zu schärfen): (1) Eval-Harness +
  Fixture-Generator (statische Templates) + `claude -p`-Runner (isoliert) + Canary-Scorer +
  Matrix; (2) Baseline-Gate ausführen, Hypothese belegen (Entscheidungspunkt); (3) Callbacks
  bauen — `/cape:setup` (Tracker + `CONTEXT.md`-Pointer), `/split`- und `/implement`-Nudge,
  `context-format.md`-Update; (4) mit Nudge nachweisen, dass die Eval grün wird.
