---
parent: F001
blocked-by: [F014]
---

# Wayfinder wieder aufgreifen — portieren und aktivieren

## What to build

Damit wir es nicht vergessen: `wayfinder` (Matt v1.1.0, engineering) soll aufgenommen werden.
Der Skill plant riesige Arbeitspakete als Karte von Investigation-Tickets und löst sie auf —
in F001 als **Planung, keine Orchestrierung** eingeordnet (kein persistenter Worker-Pool o. Ä.,
also **kein** `we`-Territorium, kein Guardrail-Verstoß).

Bewusst ein **eigenes** Issue, das nur lose an F001 hängt, mit zwei Auflagen aus der Session:

- **Blockiert durch F014.** wayfinder legt seine Investigation-Tickets auf einen Issue-Tracker
  ab; der muss erst stehen (F014: capes Issue-Tracker ist konfigurierbar, kann GitHub Issues
  nutzen). Erst danach lässt sich wayfinder sinnvoll aktivieren.
- **Vorerst nicht in `ask-cape` bewerben.** Falls der Skill zwischenzeitlich (dormant) portiert
  wird, taucht er im Router noch nicht auf. Ob wayfinder wirklich sichtbar/nutzbar *aktiviert*
  wird, ist die eigentliche Entscheidung dieses Issues.

## Offener Punkt

Zuschnitt bei Bearbeitung festlegen: dormant portieren jetzt vs. alles gebündelt nach F014.
Solange F014 offen ist, bleibt hier nichts anderes zu tun, als es nicht aus den Augen zu
verlieren.

## Acceptance criteria

- [ ] F014 steht (konfigurierbarer Issue-Tracker verfügbar).
- [ ] `wayfinder` portiert (engineering-Bucket), Attribution nach `.claude/rules/attribution.md`.
- [ ] wayfinder legt seine Investigation-Tickets über capes Tracker-Abstraktion (F014) ab.
- [ ] Entscheidung dokumentiert, ob wayfinder aktiviert (in `ask-cape`/README sichtbar) wird —
      und, falls ja, dort geführt; falls nein, begründet dormant belassen.
