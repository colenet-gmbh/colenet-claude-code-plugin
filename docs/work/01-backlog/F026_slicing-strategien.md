---
id: F026
type: feature
priority: next
---

# cape unterstützt unterschiedliche Slicing-Strategien

## Outcome

cape kann ein Feature nicht nur vertikal, sondern auch horizontal in Issues schneiden.
Heute slict cape ausschließlich vertikal (`/split` + `/implement` pro Tracer-Bullet-Issue,
jede Slice quer durch alle Schichten). Spaniers Harness slict horizontal / nach Schicht
(Datenmodell zuerst, dann Frontend) und erzielt damit starke Ergebnisse. Beide Strategien
haben ihren Platz; cape soll die passende wählen oder wählen lassen können.

## Realization job

Spaniers `fullstack-orchestrator` (`../kvjs-app/.claude/`) genau lesen, um zu verstehen,
wie horizontales Slicing dort konkret funktioniert. Dann entscheiden:

- eine Strategie als Default festlegen,
- beide über eine Projekt-Config-Präferenz anbieten, oder
- Kriterien finden, wann welche gewinnt.

## Open points

- **Verhältnis zur Orchestrierung.** Horizontales Slicing bei Spanier hängt an mehreren
  Rollen-Agents zur Build-Zeit. cape's `build` darf laut Guardrail (`.claude/rules/dod.md`)
  kein Orchestrierungs-Engine werden — Multi-Worker-Orchestrierung ist `we`-Territorium.
  Klären: Lässt sich horizontales Slicing als reine *Schnitt*-Strategie umsetzen (ein Issue
  pro Schicht, seriell abgearbeitet), ohne die `build`-Bright-Line zu überschreiten?
- **Bereichsspezifisches Wissen gehört zu F006.** Der eigentliche Wert hinter Spaniers
  Rollen-Agents (Frontend/Backend-Dev) ist schichtspezifisches Know-how — welche Frameworks
  gelten, wie auf der Ebene gearbeitet wird. Das sind bereichsgebundene Level-3-Vorgaben und
  wird als Facette von F006 geführt, nicht hier. Dieses Feature betrifft nur den *Schnitt*.
