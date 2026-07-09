---
id: I022
type: issue
priority: next
---

# Der Main-Flow macht seine HITL- und AFK-Abschnitte durchgängig sichtbar

## Outcome

Der Main-Flow macht seine HITL- und AFK-Abschnitte durchgängig sichtbar, sodass das
README-Versprechen "vorne ausrichten, hinten unbeaufsichtigt bauen" voll gedeckt ist.

## Context

HITL/AFK ist heute vorhanden, aber verstreut: `diagnosing-bugs` läuft unbeaufsichtigt,
`triage` trennt `ready-for-agent`/`ready-for-human`, `prototype` behandelt den AFK-Fall.
Dieses Issue macht die Trennung zu einer konsistenten, erkennbaren Eigenschaft über den
ganzen Flow (grill → feature → split → build). Kleines, gut abgrenzbares To-Do.
