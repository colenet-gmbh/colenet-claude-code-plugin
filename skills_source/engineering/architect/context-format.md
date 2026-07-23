# CONTEXT.md Format

`CONTEXT.md` is the repo's **context map** — a short pointer file that names the project's
context and says *where* the durable facts live. It holds **no glossary and no
implementation detail itself**; it points to them. The domain vocabulary lives in the
**domain glossary** (the `domain-glossary` pointer), decisions in the ADR-dir, the rest of
the architecture in the arc-docs. It also lists the repo's **tiers** (name → path), so a
slice knows which sections it can touch.

## Structure

```md
# {Context Name}

{One or two sentences: what this context is and why it exists.}

## Pointers

- **arc-docs** — `docs/arc42/` — the architecture documentation: goals, solution strategy, concepts.
- **domain-glossary** — `docs/arc42/08_crosscutting-concepts.md` — the ubiquitous language of the project.
- **environment-glossary** — `docs/arc42/12_glossary.md` — terms of the surroundings (documentation, tooling), not the domain.
- **ADR-dir** — `docs/adr/` — one file per decision (arc42 chapter 9 only indexes them).
- **conventions-dir** — `docs/agent-conventions/` — the central conventions (issue tracker, release process, …).

## Tiers

{0..N entries detected from THIS repo — each `- **Name** — path/`; **not** a fixed set of keys, the names are the repo's own; omit the whole section if there are no distinct tiers}
```

Keep it a map, not content. A skill that needs the vocabulary follows the
`domain-glossary` pointer; one that needs a decision follows the ADR-dir pointer. If a doc
lives somewhere non-standard, the pointer here is what makes it findable — so keep the
pointers current.

## The central conventions it points to

Some conventions belong to no single place in the code — which issue tracker is used, the
release process, a review checklist. They have nowhere to live in the source tree, so they
sit together in the conventions-dir, and the **conventions-dir** pointer above names
that directory. A skill that needs one of these follows the pointer and reads the file.

`/cape:setup` creates the directory and the central conventions cape depends on (the issue
tracker is the first one), so the pointer always resolves. Conventions that *do* belong to a
place in the code — a tier's rules — are **not** stored here: they live in that tier's own
nested `CLAUDE.md` and load from there. (Where those tiers *are* is listed separately, under
`## Tiers` below — a path, never the rules.)

## The tiers it lists

A **tier** is a section of the stack with its own tech and rules — frontend, backend, a data
layer — each carrying a nested `CLAUDE.md`. The `## Tiers` block lists them by a stable name
and their path — `/cape:setup` **detects** them from the repo layout and records them here, so
the list mirrors the actual repo, never a fixed assumption. It makes the local touchpoint work:
`/split` picks the tiers a slice touches **from this list** (the canonical menu), and
`/implement` resolves each named tier to its path here and reads that tier's `CLAUDE.md` before
acting.

Unlike the **Pointers** above — a fixed set, always present — the
Tiers are an **open, detected list**: zero or more, each named after whatever the repo's own
sections are, **not** keys to fill in. One repo with a TypeScript frontend and a Rust backend
lists `Frontend → apps/web/` and `Backend → services/api/`; another lists `web`, `api`,
`worker`; a single-package repo lists nothing and the section is dropped.

This is a **pointer**, not a parallel store — it records *where* a tier lives, never its rules;
those stay in the tier's own `CLAUDE.md` and load natively. A repo with no distinct tiers omits
the section.

## The glossaries it points to

The **domain glossary** (`domain-glossary` pointer; in arc42 that is chapter 8) holds the
ubiquitous language, one entry per term. The **environment glossary**
(`environment-glossary` pointer; arc42 chapter 12) is a *separate* glossary — for
documentation and tooling terms, the surroundings, not the domain. In a project with only
one glossary, both pointers may target the same file.

```md
**Order**:
A customer's request to buy, from placement to fulfilment.
_Avoid_: Purchase, transaction

**Invoice**:
A request for payment sent to a customer after delivery.
_Avoid_: Bill, payment request
```

Rules for the domain glossary:

- **Be opinionated.** When multiple words exist for one concept, pick the best and list the others under `_Avoid_`.
- **Keep definitions tight.** One or two sentences max. Define what it IS, not what it does.
- **Only terms specific to this project.** General programming concepts (timeouts, error types, utility patterns) don't belong. Before adding a term, ask: unique to this domain, or general? Only the former.
- **Group terms under subheadings** when natural clusters emerge; a flat list is fine when they don't.

## Single vs multi-context repos

**Single context (most repos):** one `CONTEXT.md` at the repo root, pointing to the shared
arc-docs and ADR-dir.

**Multiple contexts:** a `CONTEXT-MAP.md` at the repo root lists the contexts, where they
live, and how they relate; each context keeps its own `CONTEXT.md` pointer file.

```md
# Context Map

## Contexts

- [Ordering](./src/ordering/CONTEXT.md) — receives and tracks customer orders
- [Billing](./src/billing/CONTEXT.md) — generates invoices and processes payments
- [Fulfillment](./src/fulfillment/CONTEXT.md) — manages warehouse picking and shipping

## Relationships

- **Ordering → Fulfillment**: Ordering emits `OrderPlaced`; Fulfillment consumes it to start picking
- **Fulfillment → Billing**: Fulfillment emits `ShipmentDispatched`; Billing consumes it to invoice
- **Ordering ↔ Billing**: shared types for `CustomerId` and `Money`
```

The skill infers which structure applies:

- If `CONTEXT-MAP.md` exists, multi-context — read it to find the contexts.
- If only a root `CONTEXT.md` exists, single context.
- If neither exists, a root `CONTEXT.md` map (and the glossaries it points to) is
  created — eagerly by `/cape:setup`, or lazily when the first term is resolved.

When multiple contexts exist, infer which one the current topic relates to. If unclear, ask.
