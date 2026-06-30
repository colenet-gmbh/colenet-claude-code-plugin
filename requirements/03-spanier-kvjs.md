# Steckbrief: Michael Spanier — Harness in `kvjs-app`

> Teil der capd-Synthese-Analyse. Perspektive: Welche Features bietet dieses Framework, und welche davon tragen zum kombinierten Colenet-Plugin (**capd**) bei?

**Quelle:** `/Users/pascal/Dev/harness/kvjs-app/` (Next.js/Payload-CMS-Produkt; nur der Harness-Anteil)
**Schwerpunkt:** Das einzige Harness, das **produktiv in einer echten, regulierten Codebase** mitläuft. Rollen statt Allzweck-Agent, Guardrails statt Vertrauen, Spec lebt neben dem Code.
**Beitrag zur Synthese (Kurzform):** Aus capd-Sicht die **Engineering-Substanz & Bodenhaftung**: das Muster, ein Harness in einer realen Codebase verlässlich zu betreiben. Die *Mechanik* ist Gold und generisch — der *Inhalt* ist Payload/Next.js-spezifisch und muss neu geschrieben werden.

**Designprinzip:** Wiederkehrende, leicht vergessene Schritte werden nicht der Disziplin der KI überlassen, sondern **mechanisch erzwungen oder sichtbar gemacht** (Hook → Git-Hook → CI). Fachwissen steckt in **scharf geschnittenen Rollen**, nicht in einem generischen Agenten.

**Legende:** ✅ generisch & hoher Hebel → klarer Kandidat · 🔶 Muster übertragbar, Inhalt anzupassen · ⛔ zu app-spezifisch / leer

---

## S1 — Rollen-Skills (die Engineering-Substanz) ★

Sechs directory-scoped Skills (greifen nur bei Arbeit unter `kvjs-app/`), jede eine scharfe Fach-Rolle.

| Feature | Was es tut | Einschätzung für capd |
|---|---|---|
| `fullstack-orchestrator` | Technischer Lead: koordiniert die Rollen phasenweise, gibt den **vollen Skill-Text als Präambel** an Subagenten weiter, **verbietet generische Agenten** für Implementierung (BLOCKING RULE) | ✅★ Das Muster (Orchestrator + Präambel-Injektion + Doer-Verbot für `general-purpose`) ist *die* Lehre für verlässliche Delegation bei kontrolliertem Kontext. |
| `requirement-engineer` | Feature-Specs (Gherkin-AC, Datenmodell, Abgrenzung); ruft Security + Architekt als Parallel-Review-Subagenten | ✅ Muster (Rolle + Parallel-Review) generisch; Fachfokus (öffentliche Verwaltung/a11y) capd-spezifisch anpassen. |
| `software-architect` | Clean-Code-Regeln (CC-01…CC-07), Review- & Feature-Abschluss-Checklisten, ADR-Pflege | ✅ Checklisten-Muster + ADR-Pflege generisch. Überlappt mit Fabians DoR/DoD + Pococks `codebase-design`. |
| `security-engineer` | OWASP-Top-10-Matrix, Access-Control, DSGVO-Checkliste (Review + Threat-Modeling) | 🔶 Methode generisch; OWASP/DSGVO breit nützlich, Payload-Access-Control spezifisch. Überlappt mit Fabians `audit`. |
| `payload-developer` | Payload-3.x-Spezialist; TDD; Migrations-Regeln (PL-01…PL-06); „Migrations = Single Source of Truth" | ⛔ Inhalt komplett Payload-spezifisch. Als *Vorlage* für „Stack-Experten-Rolle" wertvoll. |
| `frontend-developer` | Next.js 16/React 19/Tailwind/shadcn; TDD; a11y-Tests via `getByRole`; expliziter Pre-Commit-Block (keine `.claude/`/`CLAUDE.md`/Features stagen) | 🔶 Inhalt stack-spezifisch; das **Pre-Commit-Block-Muster** (vertrauliche Dateien nicht stagen) ist generisch übernehmenswert. |

## S2 — Guardrails / Enforcement (die 3-Schicht-Mechanik) ★

| Feature | Was es tut | Einschätzung für capd |
|---|---|---|
| `.claude/hooks/migrate-reminder.sh` | PostToolUse(Bash): erkennt `migrate:create`/`generate:types`, erinnert an Co-Dateien, zeigt `git status` | ✅★ Das **Muster** (Session-Hook erinnert an „generierte Datei mitcommitten") ist generisch auf jedes Co-File-Problem übertragbar. |
| `.claude/hooks/block-thumbnail-check.sh` | PreToolUse(Bash): prüft bei `git commit` referenzierte Assets (warn-only) | 🔶 Inhalt app-spezifisch; zeigt das PreToolUse-Gate-Muster (Schwäche: warn-only ist übergehbar). |
| `.githooks/pre-push` | Führt Coverage-Tests, *wenn* das Coverage-Gate geändert wurde; bricht bei Regression ab | ✅ Generisches Git-Hook-Muster (lokal blockieren). |
| CI: `check-pending-migrations.sh` + `git diff --exit-code payload-types.ts` | Erzwingt im PR, dass Migrations/generierte Typen synchron sind | ✅★ Die **Dreischicht** Hook→Git-Hook→CI für *dieselbe Invariante* (erinnern → lokal blockieren → final blockieren) ist die wertvollste Mechanik. „Shift Left" in Reinform. |

## S3 — Spec-als-Code / Feature-Workflow ★

| Feature | Was es tut | Einschätzung für capd |
|---|---|---|
| `tooling/feature-workflow/setup-prompt.md` | Copy-Paste-Prompt + vollständige Beschreibung des wandernde-Datei-Workflows | ✅ Bereits **bewusst portabel** gemacht — direkt übernehmbar. |
| `docs/features/` (Status-Ordner `01-backlog`→`04-done`, `_counter.txt`, `git mv`) | Features = versionierte Markdown-Karten, die physisch durch Status-Ordner wandern; Status im Pfad *und* im Frontmatter | ✅ KI-lesbarer, git-versionierter Feature-Kontext neben dem Code. Konvergiert mit Fabians durable Artefakten. |
| `tooling/feature-workflow/kanbanize.mjs` | Generischer Businessmap/Kanbanize-API-Wrapper (ENV-konfiguriert, keine hartkodierten Werte, umlautsicherer JSON-Body) | 🔶 Tracker-Anbindung generisch gebaut; nur relevant, wenn capd an einen Tracker spiegeln soll. Vgl. Fabians `ticketing`/`mirror-block`. |

## S4 — Memory → deterministisches Tooling ★

| Feature | Was es tut | Einschätzung für capd |
|---|---|---|
| `scripts/dep-triage.mjs` (+ `SECURITY.md`-Disposition) | Eine gelernte KI-Erfahrung (Dependabot-Triage) in ein Skript gegossen: liefert Fakten deterministisch, markiert Heuristik klar als solche | ✅★ Das **Muster** (flüchtiges Memory → reproduzierbares Team-Tooling) ist die richtige Antwort auf unzuverlässiges Memory. |
| `scripts/scan-orphan-references.mjs` | Verwaiste Referenzen finden | 🔶 Muster (deterministischer Lint) generisch; Inhalt app-nah. |
| `scripts/mermaid-render.mjs` | Mermaid-Diagramme rendern | 🔶 Nice-to-have für Doku-Skills. |
| `capture-block-previews.mjs` · `generate-block-thumbnails.mjs` | Block-Vorschauen/Thumbnails | ⛔ App-spezifisch. |

## S5 — Distribution & Setup-Modell

| Feature | Was es tut | Einschätzung für capd |
|---|---|---|
| `package.json` → `"prepare": "git config core.hooksPath .githooks"` | Zero-Config-Aktivierung der Git-Hooks beim `npm install` | ✅ Sauberes, dependency-freies Selbstaktivierungs-Modell. |
| `.gitignore`-Split: `.claude/skills/` geteilt, `settings.local.json` lokal | Team-Wissen wird versioniert, maschinenlokale Hook-Verdrahtung nicht | 🔶 Gutes Modell — capd sollte die **Lücke schließen** (Hook-Verdrahtung doch teilbar via versionierter `settings.json`). |
| Directory-scoped Skills | Skills greifen nur bei Arbeit im passenden Verzeichnis → gezielte Kontext-Aktivierung | ✅ Übertragbares Kontext-Management-Muster. |

## S6 — Leerstellen / nicht übertragbar

| Feature | Was es tut | Einschätzung für capd |
|---|---|---|
| `.ai/mcp/mcp.json` (0 Bytes, gitignored) | Platzhalter für MCP-Config, ungenutzt | ⛔ Faktisch leer. |
| Kein versioniertes `CLAUDE.md` | Projektgedächtnis bewusst lokal/privat; Wissen über 6 Skills verstreut | — Schwäche: capd sollte ein zentrales, geteiltes Projektgedächtnis vorsehen. |
| Keine `.claude/commands/`, keine `.claude/agents/` | Rollen ad-hoc über Skill-Aufrufe + Subagent-Präambeln, nicht über deklarierte Agents | — Designentscheidung; capd kann hier von Fabians Command→Agent-Muster ergänzen. |

---

## Beitrag zur Synthese

- **Die Prunkstücke (✅★):** Cluster **S2** (3-Schicht-Guardrails Hook→Git→CI), das **Orchestrator-mit-Präambel-Muster** aus **S1**, **S3** (Spec-als-wandernde-Datei, bereits portabel) und das **Memory→Tooling-Muster** aus **S4**. Das ist die vom Nutzer gewünschte „Engineering-Substanz".
- **Wichtig:** Bei Spanier ist fast durchgängig die **Mechanik generisch, der Inhalt app-spezifisch**. capd übernimmt die Muster und schreibt die Rollen-/Hook-Inhalte stack-neutral (oder stack-konfigurierbar) neu.
- **Draußen (⛔):** Payload/Block-spezifische Skripte & Hooks, leeres `.ai/`.

**Offene Knackpunkte für die Auswahl:**
1. Rollen-Modell: Übernimmt capd das Orchestrator+Rollen-Muster — und mit welchen Rollen (stack-neutral, oder konfigurierbare „Stack-Experten-Rolle")?
2. Guardrails: Liefert capd ein generisches 3-Schicht-Guardrail-Kit (Hook-Templates + Git-Hook + CI-Snippets) als eigenes Feature?
3. Feature-Workflow: Übernimmt capd das `docs/features/`-Wandernde-Datei-Kit (konvergiert mit Fabians durable Artefakten → eine gemeinsame Lösung)?
4. Schließt capd Spaniers Lücken bewusst: zentrales geteiltes Projektgedächtnis + teilbare Hook-Verdrahtung?
