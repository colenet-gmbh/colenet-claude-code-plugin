---
id: F024
type: feature
priority: v2
---

# /improve-harness untersucht frühere Sessions und leitet daraus Verbesserungen ab

## Outcome

`/improve-harness` (F015) schaut nicht nur auf den letzten Flow oder die aktuelle Session,
sondern kann auch frühere Sessions/Memory-Einträge untersuchen und daraus Verbesserungs-
Kandidaten ableiten — insbesondere das Muster "eine wiederkehrende, gelernte Heuristik
steckt flüchtig im Memory statt in reproduzierbarem Tooling".

## Realization job

Konkretes Beispiel als Ausgangspunkt: Spaniers `scripts/dep-triage.mjs`
(`/Users/pascal/Dev/harness/kvjs-app/scripts/dep-triage.mjs`) — laut Docstring beantwortet
es "die drei Fragen aus Memory `feedback_dependabot_triage`". Dort wurde eine wiederholt
gebrauchte, im Claude-Memory abgelegte Erkenntnis (Dependency-Triage-Heuristik) von Hand in
ein deterministisches Skript gegossen: die Fakten (Versionen, direkt/transitiv, riskant
gepinnt) werden jetzt reproduzierbar berechnet, nur die Empfehlung bleibt explizit als
Heuristik markiert.

Zu klären: Wie erkennt `/improve-harness`, dass ein Memory-Eintrag wiederholt dieselbe
Rolle spielt und reif fürs "Graduieren" in ein Skript ist? Vermutlich kein automatischer
Scan, sondern ein Anstoß, wenn der Skill aufgerufen wird — muss aber noch entworfen werden.

## Notes

- Hängt an F015 (`/improve-harness`), ist aber ein eigenständiges Feature, keine
  Selbstverständlichkeit von F015 — daher separat und v2.
