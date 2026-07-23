---
id: I048
type: issue
priority: now
---

# Statuszeile zeigt die aktive cape-Version

`Cape 0.9.0 | …` statt nur `Cape | …`. Version der im Projekt aktiven cape-Installation
aus `~/.claude/plugins/installed_plugins.json`; kommt sie nicht aus dem offiziellen
Marketplace (`cape@colenet`), hängt ein `-dev` an. Macht sichtbar, welcher Plugin-Stand
eine Session speist (Reibung: Nutzer musste das manuell prüfen). Kein Wert ermittelbar →
Anzeige bleibt wie heute.

## Umsetzung (2026-07-23)

Auf `feat/i48-statusline-cape-version` (f83837f). Aktive Installation via
`projectPath`-Match in `installed_plugins.json`, `-dev` wenn nicht `cape@colenet`;
zusätzlich Thinking-Level am Modell (`Fable 5/LOW`, Feld `effort.level`). Manuell mit
dev-, offiziellem und fremdem Verzeichnis getestet; `make check` grün.
