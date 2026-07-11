# CONTEXT.md Format

`CONTEXT.md` is the repo's **context map** — a short pointer file that names the project's
context and says *where* the durable facts live. It holds **no glossary and no
implementation detail itself**; it points to them. The domain vocabulary lives in the
arc42 glossary (`docs/arc42/12_glossary.md`), decisions in `docs/adr/`, the rest of the
architecture in `docs/arc42/`.

## Structure

```md
# {Context Name}

{One or two sentences: what this context is and why it exists.}

## Pointers

- **Glossary** — [docs/arc42/12_glossary.md](docs/arc42/12_glossary.md) — the ubiquitous language.
- **Architecture** — [docs/arc42/](docs/arc42/) — arc42 docs (domain model in §8, decisions index in §9).
- **Decisions** — [docs/adr/](docs/adr/) — the ADRs themselves, one file each.
- **Conventions** — [docs/agent-conventions/](docs/agent-conventions/) — the central conventions (issue tracker, release process, …).
```

Keep it a map, not content. A skill that needs the vocabulary follows the glossary
pointer; one that needs a decision follows the ADR pointer. If a doc lives somewhere
non-standard, the pointer here is what makes it findable — so keep the pointers current.

## The central conventions it points to

Some conventions belong to no single place in the code — which issue tracker is used, the
release process, a review checklist. They have nowhere to live in the source tree, so they
sit together under `docs/agent-conventions/`, and the **Conventions** pointer above names
that directory. A skill that needs one of these follows the pointer and reads the file.

`/cape:setup` creates the directory and the central conventions cape depends on (the issue
tracker is the first one), so the pointer always resolves. Conventions that *do* belong to a
place in the code — a tier's rules — are **not** listed here: they live in that tier's own
nested `CLAUDE.md` and load from there, so this pointer is only for the placeless ones.

## The glossary it points to

The glossary file (arc42 §12) holds the ubiquitous language, one entry per term:

```md
**Order**:
A customer's request to buy, from placement to fulfilment.
_Avoid_: Purchase, transaction

**Invoice**:
A request for payment sent to a customer after delivery.
_Avoid_: Bill, payment request
```

Rules for the glossary:

- **Be opinionated.** When multiple words exist for one concept, pick the best and list the others under `_Avoid_`.
- **Keep definitions tight.** One or two sentences max. Define what it IS, not what it does.
- **Only terms specific to this project.** General programming concepts (timeouts, error types, utility patterns) don't belong. Before adding a term, ask: unique to this domain, or general? Only the former.
- **Group terms under subheadings** when natural clusters emerge; a flat list is fine when they don't.

## Single vs multi-context repos

**Single context (most repos):** one `CONTEXT.md` at the repo root, pointing to the shared
`docs/arc42/` and `docs/adr/`.

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
- If neither exists, a root `CONTEXT.md` map (and the arc42 glossary it points to) is
  created — eagerly by `/cape:setup`, or lazily when the first term is resolved.

When multiple contexts exist, infer which one the current topic relates to. If unclear, ask.
