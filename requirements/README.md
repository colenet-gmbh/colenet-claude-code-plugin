# capd-Synthese — Feature-Steckbriefe der Quell-Harnesses

Brainstorming-Material für das **Colenet Claude Code Plugin (capd)**. Ziel: das eine Dach-Plugin als kuratierte Kombination der besten Praktiken aus drei Quell-Harnesses — und aus capds eigener, schon reifer Hülle.

## Gewählte Richtung

capd wird das **eine Dach**, aber **kuratiert**:

- **Fundament (bleibt capd):** Plugin-Hülle, CI/Version-Zwang, Attribution, DoD-Guardian, Statusline.
- **Von Matt Pocock (der „Klebstoff"):** Skill-Authoring-Methodik (`writing-great-skills` + `GLOSSARY`), Invocation-Achse, Bucket-Struktur, `.out-of-scope/`-Governance + generische Engineering-Disziplin-Skills.
- **Von Michael Spanier (die Engineering-Substanz):** 3-Schicht-Guardrails (Hook→Git→CI), Orchestrator-mit-Präambel + Rollen-Muster, Spec-als-wandernde-Datei, Memory→deterministisches Tooling.
- **Von Fabian (gezielt, Auswahl offen):** Höhenstufen-Prozess-Rahmen + durable Gedächtnis-Schicht als klare Kandidaten; Orchestrierungs-Engine & Council als bewusste Ja/Nein-Entscheidungen.

## Achse 1 — Feature-Steckbriefe (*was* es gibt)

| Datei | Framework | Schwerpunkt |
|---|---|---|
| [`01-fabian-we.md`](./01-fabian-we.md) | Fabian — `we` | Höhenstufen (APO) + Orchestrierung |
| [`02-mattpocock-skills.md`](./02-mattpocock-skills.md) | Matt Pocock — `skills` | Skill-Methodik (der „Klebstoff") + Engineering-Disziplin |
| [`03-spanier-kvjs.md`](./03-spanier-kvjs.md) | Michael Spanier — `kvjs-app` | Engineering-Substanz in echter Codebase + Guardrails |

**Legende (einheitlich):** ✅ generisch & hoher Hebel → klarer Kandidat · 🔶 wertvoll, aber bedingt (überlappt/anzupassen/schwer) · ⛔ nicht sinnvoll für capd.

## Achse 2 — Workflows & Philosophien (*wie* man arbeitet und *warum*)

| Datei | Inhalt |
|---|---|
| [`04-workflows-und-philosophien.md`](./04-workflows-und-philosophien.md) | End-to-End-Workflow + Philosophie je Harness, Quervergleich, und der entscheidende Abschnitt „Wo es aus einem Guss schwer wird" (mergebare Konvergenzen vs. echte Kollisionen). |

Kernerkenntnis: Jedes Harness organisiert Arbeit entlang einer **anderen Hauptachse** —
Fabian nach *Höhe*, Pocock nach *Zustand* (Issue-Lifecycle), Spanier nach *Rolle*. Nur **eine**
kann das Rückgrat von capd werden; die Wahl folgt aus der Zielgruppe.

## Querschnitt: Konvergenz & Überlappung

Mehrere Primitive wurden **unabhängig mehrfach erfunden** — das markiert die robusten Bausteine, und zugleich die Stellen, wo capd *eine* Quelle wählen muss statt zu doppeln:

| Primitiv | Fabian | Pocock | Spanier |
|---|---|---|---|
| Grilling / Interview-Loop | `grill` | `grilling`/`grill-me`/`grill-with-docs` | (in `requirement-engineer`) |
| Durable Repo-Artefakte / Glossar | `docs/plans\|retros\|handoffs`, `CONTEXT.md` | `CONTEXT.md`, ADRs | `docs/features/` |
| Bug-Diagnose-Disziplin | `diagnose` | `diagnosing-bugs` | (in Rollen-TDD) |
| Rollen-Deliberation | `council` + 9 Rollen | — | Rollen-Skills + Orchestrator |
| DoR/DoD-Gates | `quality/dor\|dod.md` | — | `software-architect`-Checklisten |
| Handoff | `handoff` | `handoff` | — |
| Continuous Improvement | `retro` | (`.out-of-scope/`) | Memory→`dep-triage.mjs` |

## Nächster Schritt

1. **Zielgruppe festlegen** — wer ist capd für (Berater/PO, Engineers, beide)? Daraus folgt
   die **Rückgrat-Achse** (Höhe / Zustand / Rolle; siehe `04`, Abschnitt „Wo es aus einem
   Guss schwer wird", Entscheidung A).
2. **Feature-Picks** aus den 🔶-Zeilen festlegen (v. a. Fabian-Cluster A/D/F + die Quelle je
   Doppelung).
3. Daraus eine konkrete capd-Struktur ableiten (Ordnerbaum + Skill-Liste + Konventionen),
   inkl. der gesetzten Konvergenzen (Markdown-Wahrheit, Mensch-im-Loop, explizite Eskalation,
   Grilling-Einstieg, Authoring-Standard aus Pocock-Theorie + Spanier-Praxis).
