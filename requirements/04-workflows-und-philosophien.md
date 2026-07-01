# Workflows & Philosophien — die zweite Vergleichsachse

> Teil der capd-Synthese-Analyse. Die Feature-Steckbriefe (01–03) sagen, *was* es in
> jedem Harness gibt. Dieses Dokument sagt, *wie* man damit arbeitet und *warum* — die
> Achse, an der sich „aus einem Guss" entscheidet. Features lassen sich mergen;
> fundamental verschiedene Arbeitsweisen und Philosophien nicht. Die muss man bewusst
> versöhnen oder sich für eine entscheiden.

## Die Kernerkenntnis vorab

Jedes Harness organisiert Arbeit entlang einer **anderen Hauptachse**:

| Harness | Hauptachse | Arbeits-Einheit | Wo die Wahrheit lebt |
|---|---|---|---|
| **Fabian (`we`)** | **Höhe** (Vision→Saga→Epic→Story) | build-fertiger **Plan** (Markdown) | Markdown im Repo; Ticket = minimaler Index |
| **Matt Pocock (`skills`)** | **Zustand** (Issue-Lifecycle) | das **Issue** | Issue im Tracker |
| **Michael Spanier (Coding-Harness)** | **Rolle** (Domänen-Pipeline) | wandernde **Spec-Datei** | Markdown im Repo (`docs/features/`) |

Nur **eine** dieser Achsen kann der Main Flow von capd werden. Die anderen können als
ergänzende Schichten andocken — oder kollidieren. Welche Achse passt, hängt direkt an der
noch offenen **Zielgruppen-Entscheidung** (Berater/PO → Höhe; Engineers → Zustand/Rolle).

---

## 1. Fabian (`we`) — plan-zentriert, Höhenstufen

### Philosophie

- **Product Ownership, nicht Coding.** *„focuses on the strategic side … shaping products,
  not just building them"* (`we/CLAUDE.md`). Vier Planungsstufen *vor* dem Bauen.
- **Autonomie endet, wo Konsequenz beginnt.** Deliver ist menschlich; Claude merged/schließt
  nie: *„autonomy ends where consequence begins"* (`docs/workflow.md`).
- **Augmentation statt Automatisierung** („zwei POs"), **Mensch entscheidet** (überall `[y/n]`-Gates).
- **Jeder Fehler nur einmal** (`/we:retro` schreibt Friktionen in versionierte Regeln zurück).
- **Durable Markdown im Repo** statt opakem Session-State (`docs/plans|retros|handoffs/`).
- Lehnt ab: Sprint-Zeremonien, Sizing nach Zeit/Story-Points, **automatisches Komplexitäts-Raten**.

### Workflow

`/we:setup` → *(optional top-down)* `vision` → `saga` → `epic` → **`story`** (interaktiv,
grill-style; schreibt Plan-MD `docs/plans/{TICKET}-story.md`, Ticket bleibt minimal) →
**`build`** (autonom, 9 Schritte, blockierendes AC-Gate, Quality-Gates parallel,
SQLite-Checkpoints + Resume + Circuit-Breaker) → **Deliver** (Mensch, kein Skill) →
`retro`. Quer: `coach` (Router/Advisor), `meet`/`council` (Deliberation).

### Einstieg & Entscheidung — inkl. Council

`coach` liest den Repo-State und schlägt **genau einen** nächsten Befehl hinter `[y/n]` vor.
Solo vs. Meet: **Solo** wenn Scope klar/Routine; **Meet (Council)** wenn strittig. Der
Council — Fabians „bei schwierigen Fällen einberufen" — ist präziser, als es klingt: Er wird
durch **Strittigkeit** ausgelöst (nicht abstrakte „Komplexität") und **immer als explizites
Angebot**, nie automatisch:

> *„Neither flag → offer it: 'Convene the council …? [y/n]'. **No 'complexity' guessing —
> always a plain offer.**"* · *„Always offer the council … **never infer 'complexity'**."*
> (`we/skills/meet/SKILL.md`)

Council = lebendes Agent-Team (`CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`, kein Fallback).

### Stil

Ausführlich (zentrale SKILL.md 350–680 Zeilen), Modus-Tabellen, abschließende
`ALWAYS`/`⛔ NEVER`-Blöcke, das *Warum* in der Regel mitgeführt. Eher schwer.

---

## 2. Matt Pocock (`skills`) — issue-zentriert, flach

### Philosophie

- **Predictability** als Wurzeltugend — *Prozess*-, nicht Output-Determinismus.
- **Klein, anpassbar, komponierbar, modell-agnostisch** — bewusst gegen Prozess-Frameworks:
  *„GSD, BMAD, Spec-Kit … own the process … take away your control. These skills are …
  small, easy to adapt, and composable. They work with any model."* (`README.md`).
- Gegen **„Vibe Coding"**: Engineering-Fundamentals als wiederholbare Praktiken.
- Vier **Failure-Modes** als Daseinsgrund (Misalignment, Verbosity, kein Feedback-Loop, Ball of Mud).
- **Tight loops** & **vertikale Slices**; **Design ab Tag 1**.

### Workflow („Idee → Ship", definiert in `ask-matt`)

`setup-matt-pocock-skills` *(einmal)* → **`grill-with-docs`** (schärfen; baut `CONTEXT.md` +
ADRs) → *(Abstecher bei Beweis-Fragen: `handoff` → `prototype` → zurück)* → **`to-prd`**
(PRD als Issue) → **`to-issues`** (vertikale-Slice-Issues, abhängigkeitsgeordnet) → pro Issue
**frische Session**: **`implement`** (nutzt `/tdd`, bei harten Bugs `/diagnosing-bugs`,
dann `/review`, commit).

### Einstieg & Entscheidung

Router `ask-matt` („You don't remember every skill, so ask"). **user-invoked** (Mensch
orchestriert, keine Trigger) vs. **model-invoked** (Disziplin, auto-feuerbar). Strenge
**Kontext-Hygiene**: Grilling→PRD→Issues in *einem* Fenster (smart zone ~120k Tokens), dann
pro Issue frisch. Merksatz: *„`/handoff` forks; `/compact` continues."*

### Stil

„**Leading Words**": Verhalten auf vortrainierte Konzept-Tokens verdichten (*tight loop*,
*red*, *tracer bullet*). Plus **Pruning-Disziplin** (Single Source of Truth, No-op-Test pro
Satz). `writing-great-skills` ist die **explizite Theorie** des guten Skill-Schreibens.

### Eigenheit (verifiziert): issue- statt feature-getrieben

Die Arbeits-Einheit ist das **Issue**, nicht das Feature. *„'backlog' is no longer used as a
domain term"* (`CONTEXT.md`) — es gibt keine Feature-/Höhen-Schicht; der PRD *ist* nur ein
Issue. Arbeit wird **desaggregiert** in unabhängige vertikale Slices, Kontext dazwischen
bewusst *gecleart*.

---

## 3. Michael Spanier (Coding-Harness) — rollen-getriebene Pipeline, guardrail-erzwungen

### Philosophie

- **Rollen statt Allzweck-Agent** — *„VERBOTEN: `subagent_type: 'general-purpose'` für
  Feature-Implementierung"* (`fullstack-orchestrator/SKILL.md`), weil generische Agenten die
  Projektregeln nicht kennen.
- **Guardrails statt Vertrauen** — mehrschichtig: BLOCKING RULE im Prompt + Claude-Hook +
  Git-Hook + CI.
- **Spec lebt neben dem Code, nicht im Tracker** — *„durchsuchbar mit grep, versioniert mit
  git, lesbar ohne Login"* (`tooling/feature-workflow/setup-prompt.md`).
- **Zero-Dependency / portabel** (kein husky; bash-Hooks; kopierbares Kit).
- **Single Source of Truth**, mehrfach instanziiert (Collection-Config, Migrations, je eine Spec-Datei).
- **Test-First als Gesetz** — *„Kein produktiver Code ohne vorherigen fehlgeschlagenen Test."*

### Workflow

**`requirement-engineer`** erstellt Spec (`F<NNN>-<slug>.md` in `01-backlog/`) → **Pflicht-
Parallel-Review** durch `security-engineer` + `software-architect` → **`fullstack-
orchestrator`** extrahiert Datenmodell → **`payload-developer`** (Daten, TDD) → **`frontend-
developer`** (UI, TDD) → Quality-Gate (`npm run build`) → Architekt-Review (Coverage ≥ 80 %)
→ Payload-Pass (`migrate:create`/`generate:types`, Hook erinnert an Co-Files) → Commit (Hook
warnt) → Spec **wandert** `01-backlog`→`02-entwicklung`→`03-abnahme`→`04-done` per `git mv` →
Push (`pre-push` Coverage-Gate).

### Einstieg & Entscheidung

Noch keine Spec → `requirement-engineer`; Spec liegt vor → `fullstack-orchestrator`; reine
UI-Änderung → `frontend-developer` direkt. **Delegation per Präambel-Injektion**: der
volle SKILL-Text wird als Präambel in den Subagent-Prompt eingebettet. **Directory-scoped**
(greift nur im Projekt-Root).

### Stil (das no-fluff-Vorbild — verifiziert)

Ultra-knapp, aber jede Zeile trägt. Merkmale: **stabile ID-Präfixe** (`CC-01..07`,
`PL-01..06`) machen Regeln zitierbar; **Lemma + Imperativ**; **Zahlen statt Adjektive**.

> *„**CC-03 Extract Till You Drop:** Funktionen > 20 Zeilen sind ein Code Smell.
> Funktionsnamen ersetzen Kommentare."* · *„**PL-06 Migrations sind Single Source of Truth:**
> Schema-Änderungen AUSSCHLIESSLICH über Payload-Migrations."*

---

## Quervergleich

| Achse | Fabian (`we`) | Pocock (`skills`) | Spanier (Coding-Harness) |
|---|---|---|---|
| **Primäre Organisationsachse** | Höhe (abstrakt→konkret) | Zustand (Issue-Lifecycle) | Rolle (Domänen-Pipeline) |
| **Arbeits-Einheit** | Plan-Markdown | Issue | wandernde Spec-Datei |
| **Ground Truth** | Markdown im Repo | Issue im **Tracker** | Markdown im Repo |
| **Multi-Agent** | Council (Deliberation) + Worker-Dispatch | **abgelehnt** (1 Agent, 1 Disziplin) | Rollen-Pipeline (Execution) |
| **Schwierige Fälle** | Council — immer `[y/n]`, nie auto | Grilling vorab + Prototyp | Pflicht-Parallel-Review (fix) |
| **Kopplung** | aggregiert (unter Feature/Epic) | desaggregiert (unabh. Slices, Kontext cleart) | Pipeline (feste Reihenfolge) |
| **Autonomie-Grenze** | Deliver nur Mensch | Mensch committet, Session-Schnitt | Guardrails + finaler Merge Mensch |
| **Tooling** | schwer (SQLite, MCP, exp. flags) | leicht, modell-agnostisch | zero-dependency (bash) |
| **Stil** | ausführlich, ALWAYS/NEVER | „leading words" + Theorie | ultra-knapp, ID-Regeln |
| **Reichweite** | Initiative über Wochen/Monate | Issue für Issue | Feature für Feature (in einer App) |

---

## Konvergenzen — was sich mergen lässt

Mehrfach unabhängig erfundene oder übereinstimmende Haltungen. Das sind die *sicheren* Bausteine:

1. **Markdown-im-Repo-ist-Wahrheit** — Fabian **und** Spanier (2:1 gegen Pococks Tracker).
   → capd kann Repo-Markdown als Ground Truth setzen, ein Tracker bleibt optionaler Index.
2. **Mensch-im-Loop bei folgenreichen Aktionen** — alle drei (Deliver / Commit / Merge). Unstrittig.
3. **Kein Auto-Komplexitäts-Routing** — alle drei vermeiden „Magie": Fabian per explizitem
   Angebot, Pocock per menschlichem Router, Spanier per *fixem* Pflicht-Review. → Prinzip:
   Eskalation ist explizit, nicht geraten.
4. **Grilling/Interview als Einstieg** — Fabian (`story` grill-style), Pocock (`grilling`),
   Spanier (`requirement-engineer`-Spec). Gemeinsamer Einstiegs-Primitiv.
5. **Leichtgewicht & Portabilität** — Pocock + Spanier (gegen Fabians Schwere). capd-Wert.
6. **Stil** — Pococks **Theorie** (`writing-great-skills`) + Spaniers gelebte **Praxis**
   (ID-Regeln, Zahlen statt Adjektive) = *ein* verbindlicher Authoring-Standard für capd.
   Fabians Ausführlichkeit ist hier das Gegenbeispiel. **Die eleganteste Synthese im ganzen Feld.**

---

## Wo es „aus einem Guss" schwer wird — die echten Entscheidungen

Diese Punkte lassen sich **nicht** mergen; capd muss sich je entscheiden:

**A. Die primäre Organisationsachse (Höhe vs. Zustand vs. Rolle).** Die Main-Flow-Entscheidung —
alles andere hängt daran. Höhe (Fabian) ist ein Abstraktions-Kontinuum; Zustand (Pocock) ist
ein flacher Issue-Lifecycle; Rolle (Spanier) ist eine feste Domänen-Pipeline. Beispiel für
die Unvereinbarkeit: Wo „wohnt" ein `security-engineer` in einer Höhen-Hierarchie? Er ist
*keine* Höhe, sondern eine *Perspektive* — er reviewt die abstrakte Spec **und** konkreten
Code. Rollen liegen *quer* zu Höhen.

**B. Ground Truth: Repo-Markdown vs. Tracker-Issue.** Fabian/Spanier vs. Pocock. Es kann nur
**eine** SSoT geben, sonst driftet der Status. Spaniers Pfad+Frontmatter-Redundanz
funktioniert nur, weil beide *im selben Commit* gepflegt werden — diese Atomarität hat ein
externer Tracker nicht.

**C. Multi-Role-Orchestrierung — ja oder nein.** Fabian (Council) und Spanier (Rollen-Pipeline)
bauen darauf; Pocock **lehnt sie grundsätzlich ab** (ein Agent, eine Disziplin, sauberes
Fenster) — Rollen-Casting sei genau das „Owning the Process", das er Frameworks vorwirft.

**D. Aggregieren vs. Desaggregieren.** Fabian bündelt Arbeit *unter* Feature/Epic (geteilter
Kontext); Pocock *zerschneidet* in unabhängige Slices und *cleart* den Kontext dazwischen.
Eine Feature-Schicht einzuziehen, führt genau die Kopplung wieder ein, die Pocock auflöst.

**E. Tooling-Schwere.** Fabians SQLite-Engine/MCP/Experimental-Flags vs. die bewusste
Leichtigkeit von Pocock/Spanier.

**Meta-Spannung:** Schon der Wunsch nach „einem Guss" (ein kohärentes Framework) liegt näher
an Fabians/Spaniers Weltbild als an Pococks anti-Framework-These. Konsequenz: Von Pocock
übernimmt capd am ehesten die **Disziplinen** (`tdd`, `diagnosing-bugs`, `codebase-design`)
und die **Authoring-Methodik** — nicht aber seine anti-Prozess-Haltung als capd-Main-Flow.

---

## Implikationen für die Synthese (Kandidaten, noch nicht entschieden)

Drei mögliche Main Flows — die Wahl folgt aus der Zielgruppe:

- **Kandidat 1 — Höhen-Achse (Fabian) als Makro-Main-Flow:** Höhen als Planungsachse, Spaniers
  Rollen als *Wer* innerhalb Build, Pococks Disziplinen als *Wie*, Repo-Markdown als Ground
  Truth, Tracker als Index. *Risiko:* führt die von Pocock aufgelöste Kopplung wieder ein; schwer.
- **Kandidat 2 — Issue/Slice-Achse (Pocock) als Main Flow:** leicht & modell-agnostisch; Rollen
  & Disziplinen als optionale Layer, Council nur als Opt-in. *Risiko:* verliert Fabians
  strategische Höhen-Sicht (für Berater/PO wertvoll).
- **Kandidat 3 — Rollen-Pipeline (Spanier) als Main Flow, generalisiert/stack-konfigurierbar:**
  Höhen nur als optionaler Planungs-Vorbau, Pocock-Disziplinen in den Rollen. *Risiko:*
  Spaniers Stärke ist gerade die App-Spezifität — die geht beim Generalisieren teils verloren.

**Nächster Schritt:** Zielgruppe festlegen → daraus die Main-Flow-Achse (A) ableiten → dann B–E
entscheiden. Die Konvergenzen (Markdown-Wahrheit, Mensch-im-Loop, explizite Eskalation,
Grilling-Einstieg, Authoring-Standard) sind unabhängig davon gesetzt.
