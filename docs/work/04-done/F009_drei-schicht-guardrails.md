---
id: F009
type: feature
status: wontfix
priority: next
---

# cape stellt die Drei-Schicht-Guardrail-Mechanik bereit

## Outcome

cape gibt Teams die Drei-Schicht-Guardrail-Mechanik — Claude-Code-Hook → Git-Hook → CI —
sodass Qualitätsregeln auf jeder Schicht erzwungen werden, nicht bloß dem Agenten überlassen.

## Resolution — in F015 aufgegangen

Kein eigenständiges Feature. Der Drei-Schicht-Guardrail-Ansatz ist **dokumentiertes Wissen**,
nichts, das cape im Voraus implementiert: Schichten 2 und 3 (Git-Hook / CI) sind von der
Stange (`pre-commit`, GitHub Actions), und nur Schicht 1 (das Claude-Code-Hook-Muster) ist
cape-förmig. Es lebt jetzt als Seed-**Guardrail-Strategie** innerhalb von F015
`/improve-harness` (Glossar + Strategie-Dateien), reaktiv angewendet, wenn der Harness nicht
greift — nicht im Voraus gebaut. Siehe F015 für den vollständigen Inhalt und die
Spanier-Referenz.
