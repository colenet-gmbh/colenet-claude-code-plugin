# Steckbrief: Matt Pocock — `skills` (Skills For Real Engineers)

> Teil der capd-Synthese-Analyse. Perspektive: Welche Features bietet dieses Framework, und welche davon tragen zum kombinierten Colenet-Plugin (**capd**) bei?

**Quelle:** `/Users/pascal/Dev/harness/skills/` · npm `mattpocock-skills` v1.0.1 · MIT · Distribution via `npx skills@latest add mattpocock/skills`
**Schwerpunkt:** Die **Methode** — wie man Skills überhaupt baut (Predictability, Invocation, Information Hierarchy) — plus harte Engineering-Disziplin, bewusst klein & komponierbar gegen „Vibe Coding".
**Beitrag zur Synthese (Kurzform):** Aus capd-Sicht der **„Klebstoff"**: die Skill-Authoring-Methodik + Governance, die eine *heterogene* Sammlung konsistent und wartbar hält. Dazu die generischen Engineering-Disziplin-Skills. Stack-spezifisches Tooling bleibt draußen.

**Designprinzip (Leitsatz):** *„A skill exists to wrangle determinism out of a stochastic system."* Wurzeltugend = **Predictability** (gleicher *Prozess* pro Lauf). Vier Achsen: Invocation · Information Hierarchy · Steering · Pruning.

**Legende:** ✅ generisch & hoher Hebel → klarer Kandidat · 🔶 wertvoll, aber bedingt (überlappt/anzupassen/stack-spezifisch) · ⛔ nicht sinnvoll für capd (personengebunden/out-of-scope)

---

## M1 — Skill-Methodik & Meta-Governance (der „Klebstoff") ★

| Feature | Was es tut | Einschätzung für capd |
|---|---|---|
| `writing-great-skills` (+ `GLOSSARY.md`) | Explizite Theorie des Skill-Designs: ~25 präzise Begriffe entlang 4 Achsen, Failure-Modes (Premature Completion, Sediment, Sprawl, No-Op, Duplication) neben dem Hebel, der sie heilt | ✅★ **Das wertvollste Einzelstück im ganzen Feld.** Jeder capd-Skill würde gegen dieselben Begriffe geschrieben & reviewt. |
| `docs/invocation.md` | Formalisiert user-invoked vs. model-invoked (Cognitive Load vs. Context Load), Router-Regel | ✅ Fundament für ein wachsendes, nicht überlaufendes Skill-Set. |
| „Leading Word"-Prinzip | Verhalten in vortrainierte Konzept-Tokens verdichten (*tracer bullet*, *tight loop*, *deep module*) — dieselben Wörter in Description, Body, Prompt, Code | ✅ Günstigster Determinismus-Gewinn pro Token; verbessert Auto-Invocation. |
| `ask-matt` (Router-Skill) | Ein user-invoked Router über alle user-invoked Skills; zeichnet den Main-Flow „Idee → Ship" | ✅ Muster übernehmen (umbenannt, z. B. `ask-capd`); heilt Cognitive Load bei vielen Skills. |
| `.out-of-scope/` (3 Einträge) | Wissensbasis abgelehnter Feature-Requests mit Begründung + Issue-Referenz; `triage` liest sie gegen Wiedervorlagen | ✅ Institutionelles Gedächtnis, billig & sofort wirksam. |
| `docs/adr/0001` (hard/soft dependency) | ADR für die Skill-Sammlung selbst: nur *harte* Dependencies bekommen einen Setup-Pointer (kein Cargo-Culting) | ✅ Saubere Disziplin gegen Verbosität. |
| Bucket-Struktur (`engineering`/`productivity`/`misc`/`personal`/`in-progress`/`deprecated`) | Reife-/Sichtbarkeits-Klassen; nur die ersten drei erscheinen in README & `plugin.json` | ✅ Direkt übertragbares Ordnungsmodell (capd hat aktuell nur flaches `skills/`). |
| `CONTEXT.md` (Repo-Glossar, dogfooded) | Das Repo wendet seine eigene Methodik auf sich an | ✅ Vorbild für ein capd-eigenes Glossar. |
| Changesets-Versionierung + `link-skills.sh`/`list-skills.sh` | Release über `@changesets`; Symlinks nach `~/.claude/skills`; Skill-Listing | 🔶 capd nutzt bereits eigene CI/Version-Bump-Logik — Konzept ja, Tooling ggf. anders. |

## M2 — Alignment & Planung (vor dem Bauen)

| Feature | Was es tut | Einschätzung für capd |
|---|---|---|
| `grilling` (model-invoked) | Wiederverwendbarer Interview-Loop, eine Frage nach der anderen — die geteilte Engine | ✅ Die Engine hinter den Grill-Wrappern; capd hat bereits `grill-me` (Port davon). |
| `grill-me` (user-invoked) | Stateless-Grilling ohne Codebase | ✅ Bereits in capd vorhanden (portiert). Konvergiert mit Fabians `grill`. |
| `grill-with-docs` | Grilling-Session + Domain-Modeling (baut `CONTEXT.md`/ADRs) | 🔶 Stärker als `grill-me`; sinnvoll, wenn capd Domain-Modeling aufnimmt. |
| `to-prd` | Aktuelle Konversation → PRD (Synthese, kein Interview) | 🔶 Überlappt konzeptionell mit Fabians `vision`. Eins als Quelle wählen. |
| `to-issues` | Plan/PRD → unabhängig greifbare Issues via vertikale Slices | 🔶 Überlappt mit Fabians `story`/`epic` + Spaniers Feature-Workflow. |
| `triage` | Issues/externe PRs durch eine State-Machine von Triage-Rollen bewegen | 🔶 Nützlich für Team-Betrieb; braucht Issue-Tracker-Anbindung. |
| `decision-mapping` (in-progress) | Entscheidungen strukturiert abbilden | 🔶 Draft — beobachten, nicht jetzt übernehmen. |

## M3 — Engineering-Disziplin (model-invoked) ★

| Feature | Was es tut | Einschätzung für capd |
|---|---|---|
| `tdd` | Red-green-refactor, vertikale Slices/Tracer-Bullets, Tests gegen öffentliche Interfaces; warnt vor horizontal slicing & tautologischen Tests | ✅ Kerndisziplin, generisch. Überlappt mit Spaniers TDD-Vorgaben → konsolidieren. |
| `diagnosing-bugs` | 6-Phasen-Loop; Phase 1 (tighter, red-fähiger Feedback-Loop) ist „the skill" | ✅ Generisch, exzellent. Überlappt mit Fabians `diagnose` → diese Variante als Quelle. |
| `domain-modeling` | Domänenmodell aktiv bauen/schärfen; pflegt `CONTEXT.md` + ADRs inline | ✅ Hochwertig, stack-unabhängig. |
| `codebase-design` | Vokabular & Prinzipien für Deep Modules (Module, Interface, Depth, Seam, Adapter, Deletion-Test) | ✅ „Leading Words" für Architektur — sehr wertvoll. |
| `prototype` | Wegwerf-Prototyp zur Beantwortung *einer* Designfrage | ✅ Leichtgewichtig, generisch. |
| `improve-codebase-architecture` | Codebase nach Deepening-Chancen scannen → visueller HTML-Report → grillen | 🔶 Stark; teils TS-orientiert. Vgl. Fabians `audit-architecture`. |
| `resolving-merge-conflicts` | Disziplin für Merge-Konflikte | ✅ Generisch & alltagsnah. |

## M4 — Umsetzung & Review

| Feature | Was es tut | Einschätzung für capd |
|---|---|---|
| `implement` | Arbeit aus PRD/Issues umsetzen (nutzt `/tdd`, `/review`, committet) | 🔶 Orchestrierender Flow; überlappt mit Fabians `build`/`develop` + Spaniers Orchestrator. |
| `review` (in-progress) | Code-Review-Skill | 🔶 Nur Draft; `implement` verweist darauf (kleine Inkonsistenz). Überlappt mit Spaniers Review-Rollen. |

## M5 — Kontinuität & Wissen

| Feature | Was es tut | Einschätzung für capd |
|---|---|---|
| `handoff` (user-invoked) | Konversation → Handoff-Dokument für eine frische Session | ✅ Konvergiert mit Fabians `handoff`. Eine Variante wählen. |
| `teach` (user-invoked) | Konzept über mehrere Sessions lehren; Verzeichnis als stateful Workspace | 🔶 Eigenständig & charmant; eher Nice-to-have für capd. |

## M6 — Setup & Tooling (stack-spezifisch)

| Feature | Was es tut | Einschätzung für capd |
|---|---|---|
| `setup-matt-pocock-skills` | Einmal-Setup pro Repo (Issue-Tracker, Triage-Labels, Doc-Layout) | 🔶 Konzept (Repo-Setup) ja; Inhalt personengebunden → eigenes `setup` bauen. |
| `setup-pre-commit` | Pre-commit-Hooks einrichten | 🔶 capd hat bereits pre-commit; ggf. als Skill anbieten. |
| `git-guardrails-claude-code` | Hooks gegen gefährliche git-Befehle (`scripts/block-dangerous-git.sh`) | ✅ Generisch & defensiv — guter Guardrail-Kandidat (vgl. Spaniers Hook-Linie). |
| `migrate-to-shoehorn` · `scaffold-exercises` | TS-Ökosystem-spezifisch (`@total-typescript/shoehorn`, AI-Hero) | ⛔ Zu TS/personengebunden. |

## M7 — Personal / Deprecated / Drafts (ignorieren)

| Feature | Was es tut | Einschätzung für capd |
|---|---|---|
| `personal/` (`edit-article`, `obsidian-vault`) | Private Skills, nicht promotet | ⛔ Privat. |
| `deprecated/` (`design-an-interface`, `qa`, `request-refactor-plan`, `ubiquitous-language`) | Abgekündigt | ⛔ Veraltet. |
| `in-progress/` (`loop-me`, `wizard`, `writing-*`, `review`, `decision-mapping`) | Drafts | 🔶 Beobachten, nicht übernehmen. |

---

## Beitrag zur Synthese

- **Das Prunkstück (✅★):** Cluster **M1** — `writing-great-skills` + `GLOSSARY` + Invocation-Achse + „Leading Words" + Bucket-Struktur + `.out-of-scope/` + ADR-Disziplin. Das ist der vom Nutzer gewünschte „Klebstoff", der das ganze capd zusammenhält und eine heterogene Sammlung konsistent macht.
- **Engineering-Kern (✅):** Cluster **M3** — `tdd`, `diagnosing-bugs`, `domain-modeling`, `codebase-design`, `prototype`, `resolving-merge-conflicts`. Generisch und stark; bei Überlappung mit Spanier/Fabian *diese* Varianten bevorzugen oder konsolidieren.
- **Bedingt (🔶):** Alignment/Planung (**M2**) und Umsetzung (**M4**) überlappen mit Fabians Höhenstufen — Quelle pro Funktion festlegen, nicht doppeln.
- **Draußen (⛔):** personengebundenes & TS-spezifisches Tooling (Teile **M6**, ganz **M7**).

**Offene Knackpunkte für die Auswahl:**
1. Übernimmt capd die Bucket-Struktur (`engineering`/`productivity`/`misc`/…) statt des flachen `skills/`?
2. Bei Grilling/Diagnose/Handoff/PRD/Issues: jeweils Pocock- *oder* Fabian-Variante — welche ist die Quelle?
3. Soll `writing-great-skills` capds verbindliche Skill-Authoring-Regel werden (ersetzt/erweitert `.claude/rules/skill-authoring.md`)?
