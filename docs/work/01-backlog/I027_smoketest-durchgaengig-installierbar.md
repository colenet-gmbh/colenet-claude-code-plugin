---
id: I027
type: issue
parent: none
blocked-by: []
priority: v2
---

# Automatisierter Smoketest: cape ist durchgängig installierbar

## What to build

Ein CI-Smoketest, der den echten Install-und-Nutzung-Pfad nach jeder Änderung prüft, ohne
dass jemand an den Rechner muss. Der Test startet `claude` headless
(`claude -p "/cape:setup"`) in einem frischen Wegwerf-Repo mit geladenem Plugin — der
*echte* Skill läuft also, kein Nachbau — und prüft danach nur leichtgewichtig, dass der
Scaffold da und plausibel ist (Spalten-Ordner existieren, Dateien nicht leer, ein paar
Schlüsselzeilen vorhanden). Die Assertions bleiben bewusst locker, weil LLM-Output leicht
variiert. Deckt die F003-Akzeptanzkriterien 3–6 ab (Setup läuft durch, Scaffold korrekt,
idempotent, Kreis schließt sich).

## Open points

- **Machbarkeits-Knackpunkt:** ob und wie `claude -p` einen Plugin-Slash-Command lädt
  (`--plugin-dir` vs. lokaler Marketplace). Das entscheidet, ob der Ansatz überhaupt trägt.
- **Kadenz:** pro PR (kostet Tokens, braucht API-Key als CI-Secret, etwas flaky) versus
  nächtlich / pro Release. Nicht vorab entschieden.

## Notes

- **Kein deterministisches Scaffold-Skript** — bewusst verworfen. Ein Skript hätte eigene
  Abhängigkeiten und Wartungslast und könnte auf tausenderlei Weise brechen; das LLM ist
  hier robuster.
- **Setup-Härtung** (eine Selbstprüfung am Ende von `/cape:setup`) ist bewusst **nicht**
  Teil dieses Issues.
- Realisiert die DoD-Invariante aus F003 (cape bleibt durchgängig installierbar) und macht
  sie automatisiert prüfbar statt nur manuell.
- Berührt voraussichtlich nur CI (`.github/`), keinen Skill-Body — Plugin-Versions-Bump
  nur, falls doch shipping files angefasst werden.
