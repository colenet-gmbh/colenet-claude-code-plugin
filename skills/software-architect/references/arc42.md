# Architecture documentation — arc42 skeleton & ADR format

capd's skills treat architecture documentation as the **facts** an architect reasons
against. Use whatever the project already has. If nothing exists, create `docs/arc42/` with
the standard [arc42](https://arc42.org) sections and evolve it over time. ADRs live in
section 9.

## arc42 sections

```text
docs/arc42/
  00-index.md                          Metadata & table of contents
  01-einfuehrung-und-ziele.md          1  Introduction and goals
  02-randbedingungen.md                2  Constraints
  03-kontextabgrenzung.md              3  Context and scope
  04-loesungsstrategie.md              4  Solution strategy
  05-bausteinsicht.md                  5  Building-block view
  06-laufzeitsicht.md                  6  Runtime view
  07-verteilungssicht.md               7  Deployment view
  08-querschnittliche-konzepte.md      8  Cross-cutting concepts
  09-architekturentscheidungen.md      9  Architecture decisions (ADRs)
  10-qualitaetsanforderungen.md       10  Quality requirements
  11-risiken-und-technische-schulden.md 11 Risks & technical debt
  12-glossar.md                       12  Glossary
```

Do not force all twelve at once. Start with the sections the project actually needs
(commonly 1, 3, 4, 5, 9, 12) and grow.

## ADR format

Keep ADRs in section 9. One subsection per decision:

```markdown
## ADR-NNN: <decision title>

**Status:** Accepted | Superseded by ADR-MMM | …
**Context:** Why was a decision needed?
**Decision:** The decision, in 1–2 sentences.

**Rationale**
- …

**Rejected alternative: <name>**
- Why not.

**Consequences**
- Long-term impact.
```

Write an ADR only when a decision is **hard to reverse**, **surprising without context**,
**and** the result of a real trade-off (the same bar `grill-with-docs` uses).

## Provenance

arc42 is a public template (<https://arc42.org>). The section layout and the ADR shape here
mirror Michael Spanier's coding harness usage. See [`../../../ATTRIBUTION.md`](../../../ATTRIBUTION.md).
