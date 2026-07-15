---
id: F008
type: feature
priority: next
---

# cape hält die Architektur komplexitätsangemessen

## Outcome

cape bemisst seine Architekturarbeit an der Komplexität des Projekts — die Lösungsstrategie
„Appropriate complexity" (arc42 Kapitel 4), angewandt auf die Architektur. Der `architect`
trägt diese Haltung als Stance: so viel Struktur und Doku wie das Problem verlangt, nicht als
fester Maximalausbau.

## Realization job — Architekturdokumentation

Der offensichtlichste und arbeitsintensivste Teil: eine Architekturdokumentation, deren Umfang
mitwächst und die **ganze Spannweite** abdeckt:

- die **Nichts-Variante** — noch keine Doku;
- die **Eindatei-Variante** — eine Seite mit Zielgruppe, zentralem Ziel und Tech-Stack; ein
  vollständiger, professioneller Start, kein Stub;
- den **Vollausbau** — eine komplette arc42-Doku.

Dazu gehören **Hinweise, welche arc42-Abschnitte als Nächstes ausgefüllt werden könnten** (der
Wachstums-Trigger aus dem Improvement-Loop — starten wir klein, merkt cape, wann mehr fällig
ist) und eine **vollständige Beschreibung einer arc42-Doku**: eine Inhaltsübersicht, die
Intention jedes Abschnitts und Templates dafür.

Geschrieben in Spaniers knappem, auf den Punkt gebrachten Stil — kein Bla-bla.

## Open points

- **Top-Level-`CONTEXT.md`-Karte vs. arc42-`00-index.md`.** Beides sind Karten — die Grenze
  sauber ziehen: die Top-Level-Karte spannt alle Doc-Arten auf; der arc42-Index deckt nur die
  arc42-Kapitel ab.
- **Weitere Facetten neben der Doku.** Angemessene Komplexität in der Architektur ist mehr als
  die Doku (z.B. wie fein modelliert wird, wann ein ADR fällig ist). Die Doku ist der Einstieg;
  weitere Facetten kommen dazu, wenn sie konkret werden.
