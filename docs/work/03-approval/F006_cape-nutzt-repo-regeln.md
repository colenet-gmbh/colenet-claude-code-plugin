---
id: F006
type: feature
priority: v1
---

# cape nutzt die Regeln des Projekts

Grundlage: [ADR 0002](../../adr/0002-conventions-are-local-or-central.md).
Begriffe (Convention, lokal/zentral, Tier, Bounded Context) im
[Glossar](../../arc42/12_glossary.md).

## Kernintention

**Progressive Disclosure** ist der Mechanismus, mit dem ein Harness den Fokus auf das
Relevante lenkt und den Kontext von Irrelevantem freihält — die Grundlage guter Arbeit. Zu
viele oder falsche Regeln verwässern den Fokus, dann werden die relevanten nicht befolgt.

Ein maßgeschneidertes **Level-3**-Harness schafft das leicht: Es ist für genau dieses Projekt
gebaut und weiß, was relevant ist. cape ist ein **Level-2-Framework** — projektunabhängig,
mitgebracht, im Projekt angepasst. Der Kern von F6: cape muss an den richtigen Stellen
**dieselbe Qualität der Progressive Disclosure** erreichen — die *spezifisch* relevanten
Dinge des Projekts genauso gut in den Kontext laden wie ein handgebautes Harness. So wenige
wie möglich, so viele wie nötig. Das ist die Spannung **Wiederverwendbarkeit vs.
Passgenauigkeit**, konkret gemacht.

Der Wert für den User: cape-Skills liefern in seinem Projekt Ergebnisse, die seine Regeln
beachten — so gut, als wäre das Harness eigens für sein Projekt gebaut, obwohl es das nicht ist.

## Was cape tut

Ein Skill deckt vor dem Handeln genau die Regeln auf, die zur Situation gehören: die der
berührten Tiers und die projektweiten — und nur die. Das Prinzip ist allgemein (jeder Skill,
der handelt, braucht es), aber F6 baut und beweist es an **einer** Stelle: `implement`. Das
Ausrollen auf weitere Skills ist nicht Teil von F6 (s. „Nicht Teil davon").

`/cape:setup` legt die projektweiten Regeln an eine feste Stelle und verweist in `CONTEXT.md`
darauf; die tier-eigenen Regeln liest ein Skill an ihrem gewohnten Ort.

## Beweis

Das Risiko ist doppelt: cape übersieht die relevante Regel — oder ertränkt sie in irrelevanten.
Ein Test prüft beides. In die Regeldatei eines Tiers kommt ein ausgedachter, unerratbarer Wert,
und eine absichtlich vage Aufgabe wird erst durch diese Regel eindeutig. Erscheint der Wert im
Ergebnis, wurde die Regel befolgt; erscheint der Wert eines *nicht* berührten Tiers, wurde
verwässert.

**Hypothese zuerst:** erst der Lauf *ohne* cape. Zeigt sich die erwartete Lücke, ist der Bedarf
belegt; zeigt sie sich nicht, wird gestoppt und neu gedacht — nicht gebaut. Gemessen am realen
Ergebnis über mehrere Läufe als Rate.

Der Detail-Aufbau steht in den Issues: **I030** baut den Test und fährt den Ohne-cape-Lauf
(Stopp-Gate); **I031** baut cape ein und zeigt, dass es greift.

## Nicht Teil davon

- Review-Schritte flexibler machen (eigene Review-Regeln, Simplify, Auflösung des Review-Skills)
  → **F004**.
- Sehr große Fachdomänen (mehrere Glossare, Beziehungen zwischen Bereichen) → **F028**.
- Den Mechanismus über `implement` hinaus auf weitere Skills (z.B. feature, split) ausrollen →
  spätere Features. F6 baut und beweist ihn an `implement`.

## Kernentscheidungen

1. Kern: Ein **Level-2-Framework** erreicht dieselbe **Progressive-Disclosure-Qualität** wie ein
   maßgeschneidertes Level-3-Harness — situationsabhängig die spezifisch relevanten Regeln
   laden, so wenige wie möglich, so viele wie nötig.
2. Das Prinzip ist allgemein; F6 baut und beweist es an `implement`. Ausrollen auf weitere
   Skills → spätere Features (nicht Teil von F6).
3. **Hypothese zuerst** — der Ohne-cape-Lauf ist ein Stopp-Gate.
4. Am realen Ergebnis gemessen, über Läufe als Rate.
5. Begriffe im Glossar, nicht hier — das Feature verweist nur.
