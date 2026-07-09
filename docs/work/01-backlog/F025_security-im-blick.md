---
id: F025
type: feature
priority: next
---

# cape achtet gezielt auf Security

## Outcome

cape sorgt dafür, dass Security in Projekten, die mit cape arbeiten, nicht dem Zufall
überlassen bleibt — mit einer etablierten Methodik (z. B. OWASP Top 10) und einem
definierten Ort für projektspezifische Aspekte (z. B. DSGVO), die auf Level 3 landen.

## Realization job

Eine Idee für die Umsetzung: ein `security`-Skill analog zu `architect`, der eine Review-
und Threat-Modeling-Methodik fest eingebaut hat und für projektspezifische Aspekte auf
`agent-conventions/` verweist. Das ist aber nur eine mögliche Form — die Umsetzung ist noch
offen, das Feature legt nur das Outcome fest.

## Open points

- Wie hängt das mit F012 (Qualitäts-Schleifen) zusammen? Vereinbart: Security-Reviews
  laufen zunächst nicht direkt bei jedem Build, sondern als wiederkehrender Loop (v2) — die
  Fähigkeit selbst (dieses Feature) ist aber unabhängig davon nutzbar, nicht nur über den
  Loop gebunden.
