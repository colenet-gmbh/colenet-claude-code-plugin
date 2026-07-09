# Steckbrief: Fabian — `we` (Agentic Product Ownership Toolkit)

> Teil der cape-Synthese-Analyse. Perspektive: Welche Features bietet dieses Framework, und welche davon tragen zum kombinierten Colenet-Plugin (**cape**) bei?

**Quelle:** `/Users/pascal/Dev/harness/claude-code-plugin/we/` · Plugin `we` (weside.ai) · v2.62.1 · MIT
**Schwerpunkt:** Höhenstufen-Modell für Produkt-Ownership (Vision→Deliver) + robuste Orchestrierung
**Beitrag zur Synthese (Kurzform):** Liefert den **Prozess-Rahmen** (Höhenstufen) und die **durable Gedächtnis-Schicht** als klare Kandidaten; Orchestrierung/Council als bewusste Ja/Nein-Entscheidungen. Aus cape-Sicht gezielt zu plündern, nicht ganz zu übernehmen.

**Legende:** ✅ generisch & hoher Hebel → klarer Kandidat · 🔶 wertvoll, aber bedingt (schwer/experimentell/überlappt/anzupassen) · ⛔ an weside-Account/Backend gebunden → für cape kaum sinnvoll

---

## A — Höhenstufen-Modell (APO): der Prozess-Rahmen

| Feature | Was es tut | Einschätzung für cape |
|---|---|---|
| `vision` `saga` `epic` `story` | Vier Plan-Stufen (Solo): vom PRD bis zum build-fertigen Feature-Slice | ✅ Das *mentale Gerüst* — Kern von Fabian. Generisch, ohne Account nutzbar. Top-Kandidat, ggf. abgespeckt. |
| `meet` | Eine Stufe per Council zerlegen (`/we:meet vision\|saga\|epic\|story`) | 🔶 Stark, aber braucht das Council (Agent-Teams, experimentell). |
| `coach` | Altitude-Advisor: schlägt die richtige nächste Stufe vor (y/n-Gate) | ✅ Leichtgewichtig, generisch, guter Einstieg für Nicht-Profis. |
| `map` | Read-only Dashboard des Plan-Baums über alle Stufen | ✅ Reiner Lese-Nutzen, kein Lock-in. |

## B — Durable Gedächtnis-Schicht (versioniert im Repo)

| Feature | Was es tut | Einschätzung für cape |
|---|---|---|
| `docs/plans` `docs/retros` `docs/handoffs` + `CONTEXT.md` + ADRs | „Gedächtnis außerhalb der Session" als git-versionierte Markdown-Dateien | ✅ Konvergiert mit Pocock & Spanier — robustestes Muster überhaupt. Klarer Pick. |
| `handoff` | Konversation → Übergabe-Dokument für eine frische Session | ✅ Generisch (Pocock hat es auch → bewährt). |
| `retro` | Reibungen sammeln → konkrete `.claude/rules/`-Edits hinter Per-Item-Gate | ✅ „Jeder Fehler nur einmal." Billig, hoher Hebel, macht das Harness über Zeit besser. |
| `privacy-guard` (reference) | Beim Transkript-Lesen nur Engineering-Inhalte zulassen | ✅ Macht transkript-lesende Skills commit-sicher. Sinnvolle Beigabe zu B. |

## C — Engineering- & Qualitäts-Disziplin

| Feature | Was es tut | Einschätzung für cape |
|---|---|---|
| `grill` | Relentless One-Question-Interview, schärft Glossar, bietet ADRs an | 🔶 **Überlappt** mit Pococks `grilling` und capes vorhandenem `grill-me`. Eins davon wählen, nicht doppeln. |
| `diagnose` | Disziplin für harte Bugs (tight, red-fähiger Loop) | 🔶 **Überlappt** mit Pococks `diagnosing-bugs`. Bestes von beiden nehmen. |
| `quality/dor.md` `quality/dod.md` | Definition of Ready / Done als Gates | 🔶 Überlappt mit Spaniers Architect-Checklisten + capes eigener `dod.md`. Konsolidieren. |
| `audit-architecture` | Mehrphasiger Backend-Audit: SPEC + Lens-Library + Python-Hotspot-Scoring + Mermaid | 🔶 Inhalt Python/Backend-spezifisch, aber das *Muster* (Skill als Mini-Framework) ist Gold als Vorlage. |
| `audit` | Security-Tooling-Audit | 🔶 Überlappt mit Spaniers `security-engineer`. |
| `find-dead-code` | Toter-Code-Scan | 🔶 Nur Python — als Inhalt nicht übertragbar, als Idee trivial. |
| `smoketest` · `ci-review` | Smoke-Tests fahren · CI-Ergebnisse reviewen | 🔶 Nützlich, aber teils stack-/CI-gebunden. |

## D — Build & autonome Orchestrierung

| Feature | Was es tut | Einschätzung für cape |
|---|---|---|
| `build` | Autonome 9-Schritt-Pipeline (Solo-Fastpath) | 🔶 Mächtig, aber komplex; braucht `acceptEdits`/`bypass`-Permission-Mode. |
| `develop` | Dev-only Worker-Slice: implement → Gates → commit → push → stop | 🔶 Sauberer Baustein, aber Teil des schweren Orchestrierungs-Pfads. |
| `orchestrate` | Multi-Chunk-Orchestrierung, Worker-Dispatch, Integration-Branch/Single-CI | 🔶 Sehr durchdacht (Kostenersparnis), aber 677-Zeilen-Monster + experimentell. |
| `codex-task` + `worker-dispatch`/`codex-dispatch` (refs) | Runtime-agnostischer Dispatch (Cheap-Claude/Codex/Fremd-Engine) + Cross-Review | 🔶 Entkoppelt von einem Anbieter — wertvoll fürs Firmen-Harness, aber schwer. |
| `orchestration.py` (Engine) | SQLite: Checkpoints (11 Phasen), Circuit-Breaker, CI-Fix-Loop, Resume, worktree-übergreifend | 🔶 **Robusteste Einzelmechanik im ganzen Feld.** Generisch & stdlib-only. Schwergewicht — bewusst entscheiden. |

## E — Pipeline-Agents (über Commands `/we:*`)

| Feature | Was es tut | Einschätzung für cape |
|---|---|---|
| `code-reviewer` `static-analyzer` `test-runner` `pr-creator` `doc-architect` (+ Commands `review/static/test/pr/docs`) | Dünne Commands routen zu spezialisierten Pipeline-Agenten | 🔶 **Überlappt stark mit Spaniers Rollen-Skills.** Konzept (Command → Agent) übernehmen, Inhalte aus der Spanier-Linie. |

## F — Council / Multi-Perspektiven-Deliberation

| Feature | Was es tut | Einschätzung für cape |
|---|---|---|
| `council` + 9 Rollen-Agents (architect, product-owner, scrum-master, ux-researcher, marketing, security, sales, legal, orchestrator) | Live-Agent-Team deliberiert via `SendMessage`, Lead synthetisiert Agreement/Tension/Recommendation | 🔶 Beeindruckend, aber: braucht `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`, hohe Komplexität, teils Business-Rollen (sales/legal/marketing) — passt nur, wenn cape Richtung „Produkt-Council" gehen soll. |

## G — Companion / weside-Backend (MCP)

| Feature | Was es tut | Einschätzung für cape |
|---|---|---|
| `setup` `onboarding` `materialize` `sideload` + `.weside/`-Konfig | Framework-Plumbing, legt Repo-Config & Companion-Identität an | ⛔ An die weside-Plattform gekoppelt. Eigenes cape-Setup statt dessen. |
| `companion-voice` (ref) + Identität/Memory/Goals (MCP-Tools) | Persistente Companion-Persönlichkeit & -Erinnerung | ⛔ Kern des weside-Geschäftsmodells, Account-gebunden. |
| `ticketing` `mirror-block` (refs) — Jira/Composio | Tickets ↔ Plan-Dateien spiegeln | 🔶 Idee (Spec ↔ Tracker) generisch; konkrete Composio-Jira-Bindung nicht. Vgl. Spaniers `kanbanize.mjs`. |
| Hooks: `SessionStart` (Identität laden) · `Stop` (`store_conversation_hook.py`) | Auto-Identität & Konversations-Memory ins weside-Backend | ⛔ Account-gebunden. (Das *Hook-Konzept* selbst nehmen wir von Spanier.) |

---

## Beitrag zur Synthese

- **Klare Kandidaten (✅):** Cluster **A** (Höhenstufen als Prozess-Rahmen) + **B** (durable Gedächtnis-Schicht inkl. `retro` + `privacy-guard`).
- **Bewusste Entscheidungen (🔶):** Cluster **D** (Orchestrierungs-Engine), **F** (Council), Teile von **C/E** — jeweils gegen Überlappung mit Pocock/Spanier abwägen.
- **Nicht sinnvoll (⛔):** Cluster **G** (weside-Account-gebunden).

**Offene Knackpunkte für die Auswahl:**

1. Höhenstufen (A): voll (vision→saga→epic→story) oder reduziert (z. B. nur story+epic)?
2. Orchestrierungs-Engine (D): rein oder draußen?
3. Council (F): nötig? Wenn ja, Business-Rollen oder nur Engineering-Rollen?
4. Doppelungen (C/E): bei `grill`, `diagnose`, DoR/DoD, Rollen-Agents jeweils Pocock-/Spanier-Variante als Quelle nehmen, Fabians Version verwerfen?
