---
id: F003
type: feature
priority: v1
---

# cape installiert aus dem Marketplace und ist durchgängig nutzbar

## Outcome

Der echte Pfad funktioniert: das Plugin aus dem Marketplace installieren, `/cape:setup` in
einem frischen Repo ausführen, die vendorten Skills funktionieren flach (`/skill-name`), und
die gescaffoldeten Docs sind korrekt. Bisher ist der Sync-Mechanismus nur im Dev-Modus gegen
den Cache vor der Umbenennung verifiziert.

## Realization job

Echt installieren, `/cape:setup` in einem frischen Repo ausführen, die flachen Skills und
die gescaffoldeten Docs verifizieren. Was auch immer bricht, wird zu einem Issue dieses
Features.

## Graduiert in die Definition of Done

Einmal erreicht, wird dies zu einer stehenden Invariante: ein späteres Feature ist erst dann
fertig, wenn cape weiterhin durchgängig installiert und nutzbar ist.
