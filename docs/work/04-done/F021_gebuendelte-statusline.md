---
id: F021
type: feature
priority: now  # 1 — Transparenz zuerst
---

# Die gebündelte Statuszeile ist getestet, zuverlässig und wird beim Setup angeboten

## Outcome

cape bündelt Fabians Statuszeile (lauffähig, getestet), und `/cape:setup` fragt beim
Einrichten kurz, ob eine Statuszeile installiert werden soll — bei Ja installiert es sie. Die
Zeile zeigt u.a. eine **Kontext-Auslastungsanzeige** (farbiger Balken): die passive,
tokenfreie Frühwarnung, wann ein Gespräch das Kontextfenster füllt.

## Design entschieden (Prototyp 16.07.2026)

Live gegen Mock- und echten Input ausprobiert; `statusline/statusline.js` ist damit die
**finale Fassung**, kein Wegwerf-Code mehr. Entschiedene Form der Zeile:

```
Opus 4.8 (1M) │ branch* │ dir │ ████░░░░░░ 82k │ 5h:34% 7d:61%
```

- **Inhalt reduziert auf das Nützliche:** Modell, Branch, Verzeichnis, Kontext-Balken,
  Rate-Limits. **RAM raus** (auf dem Mac immer ~100%, wertlos). **Kosten raus** (für
  Abo-/Flatrate-Teams irreführend; die Rate-Limits sind der echte Budget-Indikator).
- **Branch trägt einen Dirty-Marker** — gelbes `*` bei uncommitteten Änderungen. Passt zur
  Commit-Disziplin, kostet nichts (git läuft eh).
- **Kontext-Balken, der eigentliche Wert:** Label zeigt **absolute Tokens**
  (`total_input_tokens`), Balken füllt gegen die **200k-Praxisgrenze** (dort leidet die
  Kontextqualität, unabhängig von der Fenstergröße). Farbe eskaliert auf der **schärferen der
  beiden Achsen** Tokens/Prozent: grün unter 150k **und** unter 50%; gelb ab 150k **oder** 50%;
  orange ab 70%; blinkend rot ab 85%. So warnt es auf 1M-Sessions früh (bei 150k, obwohl
  prozentual niedrig) und auf 200k-Sessions über die Prozent-Achse.

## Realisiert

- **Skript finalisiert** (`statusline/statusline.js`): Reihenfolge Modell │ Verzeichnis │
  Branch │ Kontext-Balken │ Rate-Limits; „(1M context)" auf terses „(1M)" gekürzt; die vier
  Eskalationsstufen des Balkens auf **256-Farben** (grün/amber/orange/blinkend rot), damit die
  Warnung in jedem Terminal-Theme gleich liest (ANSI-33-„gelb" wirkte in manchen Themes grünlich
  — eine Warnung, die beruhigt aussieht, ist keine).
- **Als Haupt-`statusLine` installiert, projektlokal.** Ein Plugin kann die Haupt-`statusLine`
  nicht mitliefern (nur `agent`/`subagentStatusLine`), also kopiert `/cape:setup` das Skript ins
  Projekt (`.claude/cape-statusline.js`) und trägt den `statusLine`-Eintrag in die **committete**
  `.claude/settings.json` ein — Pfad über `${CLAUDE_PROJECT_DIR}` (nicht `${CLAUDE_PLUGIN_ROOT}`,
  das außerhalb der Plugin-Config nicht expandiert und sich bei jedem Update ändert). Neuer
  **Schritt 6** im Setup, **opt-in**, find-or-create, warnt bei bestehender `statusLine` statt zu
  überschreiben.
- **Dogfooding:** dieses Repo zeigt die Zeile über eine committete `.claude/settings.json`, die
  direkt auf `statusline/statusline.js` zeigt (im Plugin-Repo liegt das Skript ja am Ursprung).

## Offen (separat)

- **Optional eine echte `subagentStatusLine`** — Plugins dürfen sie mitliefern; sie zeigt
  Info **pro Subagenten-Zeile** und müsste den `{columns,tasks} → {id,content}`-Vertrag erfüllen.
  Separater, kleinerer Schritt, nicht Teil dieses Features.
- Das frühere Fehlverdrahten als `subagentStatusLine` (inkompatibler Vertrag, fiel still durch)
  war der wahre Grund des Rückzugs in 0.7.6 — hier nicht wiederholt.

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
