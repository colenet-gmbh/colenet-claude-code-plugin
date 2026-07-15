---
id: F021
type: feature
priority: later
---

# Die gebündelte Statuszeile ist getestet, zuverlässig und wird beim Setup angeboten

## Outcome

cape bündelt Fabians Statuszeile (lauffähig, getestet), und `/cape:setup` fragt beim
Einrichten kurz, ob eine Statuszeile installiert werden soll — bei Ja installiert es sie. Die
Zeile zeigt u.a. eine **Kontext-Auslastungsanzeige** (farbiger Balken): die passive,
tokenfreie Frühwarnung, wann ein Gespräch das Kontextfenster füllt.

## Realization job

- **Die gebündelte Datei sitzt im falschen Slot.** `statusline/statusline.js` ist ein
  **Haupt-Bar-Skript** — es liest ein einzelnes Session-JSON (`data.model`,
  `data.context_window`, `data.cost`, `data.rate_limits`) und druckt *eine* Textzeile. In
  `settings.json` ist es aber als `subagentStatusLine` verdrahtet, und dieser Slot hat einen
  ganz anderen Vertrag (Input `{columns, tasks[]}`, Output pro Zeile `{"id","content"}` — siehe
  [Claude-Code-Doku](https://code.claude.com/docs/en/statusline.md)). Verträge inkompatibel →
  es funktioniert dort nicht, fällt still durch. Das ist der wahre Grund des früheren Rückzugs.
- **Als Haupt-`statusLine` installieren**, denn dort sitzt die Session-Kontext-Anzeige, die
  den Wert ausmacht. Das schreibt in die globale `~/.claude/settings.json`; die
  Setup-Opt-in-Frage **ist** die Zustimmung dafür (adressiert genau die Sorge, wegen der die
  Zeile herausgenommen wurde).
- **Optional zusätzlich eine echte `subagentStatusLine`** — Plugins dürfen sie laut Doku
  mitliefern; sie zeigt Kontext/Info **pro Subagenten-Zeile** (nicht die Hauptsession) und
  müsste den `{columns,tasks} → {id,content}`-Vertrag erfüllen. Separater, kleinerer Schritt.
- Testen, dass die Zeile zuverlässig rendert.

## Bezug (Feedback 0.7.x)

Dies ist die bessere Antwort auf Leivs beigesteuerten `session-monitor`: die
Kontext-Auslastung als **echter** Wert aus der Laufzeit, dauerhaft sichtbar, null Tokens —
statt eines dauerlaufenden Skills, der sie heuristisch schätzt. Die Handoff-Hälfte des
session-monitor deckt bereits das bestehende `handoff` ab.

## Context

Fabian brachte die Statuszeile im allerersten PR (#1, Commit `48ee187`, 0.1.0 → 0.2.0) ein;
am 09.07.2026 (v0.7.6) wieder zurückgezogen („withdraw bundled status line pending V2"), weil
ungetestet, unklar ob lauffähig, und weil sie in die globale `~/.claude/settings.json`
schreibt. Fabians README-Behauptung „Plugins können die Haupt-`statusLine` nicht setzen" ist
durch die Doku nicht gedeckt — dort steht nur, dass Plugins eine `subagentStatusLine`
mitliefern dürfen; zur Haupt-Bar sagt sie kein Verbot.
