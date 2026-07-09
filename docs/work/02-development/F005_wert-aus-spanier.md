---
id: F005
type: feature
priority: v2
---

# cape enthält die wertvollen Ideen aus Michael Spaniers Coding-Harness

## Outcome

cape hat alles Erhaltenswerte aus Spaniers Claude-Code-Harness aufgenommen — nichts
Wertvolles bleibt zurück. Spanier ist colenet-intern, daher ist keine externe Attribution
erforderlich.

## Realization job

`../kvjs-app/.claude/` (samt seiner `docs/` und Skripte) Datei für Datei durchgehen. Für
jede Datei entscheiden: in einen cape-Skill portieren, in eine Repo-`CLAUDE.md`
verallgemeinern oder verwerfen. Jede konkrete Übernahme wird zu einem Issue dieses Features,
sobald sie auftaucht.

## Stand

Der komplette Steckbrief (`requirements/03-spanier-harness.md`, S1–S6) ist item für item
durchgegangen und entschieden. Ergebnisse:

- **ADR 0001** — Harness (inkl. Level 3) wird eingecheckt, nicht als private Augmentation
  ausgeblendet (bewusste Absetzung von Spaniers Pre-Commit-Block).
- **`docs/agent-conventions/`** — neuer Ort für Level-3-Festlegungen, die Level-2-Skills
  abrufen (ersetzt `docs/agents/`), samt Nachträgen in F006/F014.
- **F023** (Guardrail-Vorbereitung), **F024** (Memory zu Tooling), **F025** (cape achtet
  gezielt auf Security) — neu abgespalten.
- Rest entweder schon integriert (Board = wandernde Feature-Datei, `architect` =
  `software-architect`, Drei-Schicht-Guardrails in F015) oder bewusst verworfen
  (Präambel-Injektion, Kanbanize-Wrapper, Directory-scoped Skills, `.ai/mcp.json`-Leerstelle,
  fehlende `.claude/commands`/`.claude/agents` als Designfrage ohne Lehrwert).

Einziger noch offener Punkt: das Vertical-vs-Horizontal-Slicing unten — das war bewusst
zurückgestellt, nicht vergessen.

## Open points

- **Vertikales vs. horizontales Slicing.** cape slict heute vertikal (`/split` +
  `/implement` pro Tracer-Bullet-Issue); Spanier slict horizontal / nach Rolle zur Build-Zeit
  (Datenmodell zuerst, dann Frontend) mit starken Ergebnissen. Sein `fullstack-orchestrator`
  genau zu lesen speist die Entscheidung: eines wählen, beides über eine
  Projekt-Config-Präferenz unterstützen oder Kriterien finden, wann welches gewinnt.

## Notes

- Wert, der real, aber zu projektspezifisch ist, bleibt in der lokalen `.claude/` des
  Nutzers, nicht in cape (Guardian-Regel).
