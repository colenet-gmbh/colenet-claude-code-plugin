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

## Open points

- **Vertikales vs. horizontales Slicing.** cape slict heute vertikal (`/split` +
  `/implement` pro Tracer-Bullet-Issue); Spanier slict horizontal / nach Rolle zur Build-Zeit
  (Datenmodell zuerst, dann Frontend) mit starken Ergebnissen. Sein `fullstack-orchestrator`
  genau zu lesen speist die Entscheidung: eines wählen, beides über eine
  Projekt-Config-Präferenz unterstützen oder Kriterien finden, wann welches gewinnt.

## Notes

- Wert, der real, aber zu projektspezifisch ist, bleibt in der lokalen `.claude/` des
  Nutzers, nicht in cape (Guardian-Regel).
