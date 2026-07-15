---
id: F039
type: feature
priority: next
---

# grilling klärt auch das Warum (das höhere Ziel)

## Outcome

Eine `grilling`-Session verankert früh das **Warum** — das höhere Ziel und die echte
Motivation hinter dem Vorhaben, nicht nur das Was und Wie eines Plans. Spätere Fragen im
Interview werden gegen dieses Warum gespiegelt. Damit lebt der Wert von Leivs `context-first`
in der bewussten grilling-Session, statt als eigener, breit getriggerter Skill.

## Warum / Quelle (Feedback 0.7.x)

Leivs beigesteuerter `context-first` (inspiriert von Simon Sineks Golden Circle) stellt vor
dem Handeln *eine* Warum-Frage und liefert ihm dadurch spürbar kürzere, bessere
Entwicklungszyklen — Claude versteht, *was* gewollt ist und *warum*. Diese Wirkung wollen wir,
aber ohne einen Always-on-Skill.

## Design / Abgrenzung

- **Kein neuer, breit getriggerter Skill.** Ein Skill, der bei fast jeder Äußerung anspringt,
  ist faktisch immer geladen und damit ein getarnter System-Prompt — er hebelt Progressive
  Disclosure aus. Das Warum gehört deshalb in die bewusst gestartete grilling-Session.
- **Sitzt in `grilling`** (der Interview-Engine), damit `grill-with-docs` und `grill-me` es
  erben.
- **Teil des Verstehens-Spektrums** — F037 (komplexitätsangemessener Workflow), angewandt aufs
  Verstehen: eine Warum-Frage bei einer Kleinigkeit, ein volles Grilling beim echten Plan.
- **Weiterführung (Leiv):** spätere Entwicklungen ebenfalls gegen das festgehaltene Warum
  spiegeln.
