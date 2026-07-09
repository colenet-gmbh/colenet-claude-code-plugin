---
id: I018
type: issue
parent: none
blocked-by: []
priority: next
---

# Setup erkennt Trigger-Phrasen-Kollisionen mit installierten Skills

## What to build

`/setup` prüft, ob bereits Skills installiert sind (z. B. aus superpowers), deren
Trigger-Phrasen sich mit capes Skills überschneiden, und macht die Kollisionen sichtbar,
statt sie stillschweigend durchgehen zu lassen. Bei einer Kollision treibt es eine bewusste
Auflösung an, statt sie zu ignorieren.

## Notes

- Hängt am `setup`-Skill, der noch geplant ist — nicht von einem anderen Board-Item
  blockiert, daher `blocked-by: []`.
- Open point (Teil dieses Issues): *wie* eine Kollision zu behandeln ist — warnen /
  priorisieren / namespacen / dem Nutzer zur Auflösung überlassen. Den Ansatz vor dem Bau
  entscheiden.
- Ursprung: aufgekommen 2026-07-08.
