---
id: I042
type: issue
priority: next
status: needs-info (wartet auf Leivs Beispiel)
---

# Domain-Glossar interpretiert Begriffe teils unpräzise (Leiv)

## Was wir haben

Leivs Rückmeldung (0.7.x), wörtlich: „Glossar: Teilweise unpräzise Interpretationen — für
uns kritisch, da User-Kontext entscheidend ist." Getestet am Meeting-Inspektor-Projekt
(HTML-Onepager, ~6K Zeilen).

Lesart: Beim Aufbau des Domain-Glossars hat cape einzelne Begriffe **generisch statt in
Leivs Sinn** interpretiert. Weil ihre Domäne stark kontextabhängig ist, fällt das sofort ins
Gewicht. Qualitätsproblem beim **Erfassen** der Domänenbegriffe — getrennt von der
Benennungs-Mehrdeutigkeit in I041.

Zwei plausible Ursachen, beide schon auf dem Radar:

- **Zu flach erfasst.** Die tiefe Begriffsarbeit steckt in `grill-with-docs` / der
  `architect`-Domänenmodellierung (Begriffe herausfordern, Grenzfälle erfinden). Ein leichter
  Lauf liefert ein flaches Glossar → angemessene Komplexität (F008/F037).
- **Kontext/Warum fehlte.** „User-Kontext entscheidend" ist genau das, was das
  Warum-im-Grilling (F039) einfangen soll. Ohne den Kontext rät cape die Bedeutung.

## Fragen an Leiv (damit es umsetzbar wird)

1. **Ein konkretes Beispiel:** Welcher Begriff wurde unpräzise interpretiert — wie hat cape
   ihn verstanden, und was hattest du gemeint?
2. **Wo trat es auf?** Bei `/cape:setup`, in `grill-with-docs`, in der
   `architect`-Domänenmodellierung, oder woanders? Hast du das tiefe Domänen-Interview
   überhaupt gefahren, oder nur das schnelle Setup?
3. **Welcher Kontext hätte den Unterschied gemacht** — was hätte cape wissen müssen, das ihm
   fehlte?
4. **Falsch oder nur flach?** War die Interpretation *verkehrt* (Begriff falsch verstanden)
   oder bloß *zu allgemein* (unscharf, aber nicht falsch)?

## Status

Wartet auf Leivs Beispiel. Ohne konkretes Beispiel bleibt es Rätselraten — erst mit Antwort
wird daraus ein sauber geschnittenes Feature (vermutlich eine Facette von F039 bzw. der
Domänenmodellierung).
