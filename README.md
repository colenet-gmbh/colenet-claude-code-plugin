# cape — Colenet Agentic Product Engineering

> colenet's Claude Code harness for **agentic product development**.

Early stage — a small, curated set of skills, growing deliberately. Expect gaps
and rough edges; the shape below is where it's heading.

## Why cape exists

If you've handed real work to an AI agent, you know the failure modes:

- It confidently builds something — just not the thing you meant.
- Quality swings wildly, because steps quietly get skipped: no tests here, no review there.
- Everyone on the team drives the agent their own way. There's no shared route and no shared
  words for what you're doing, so *developing as a team* barely works — you can't hand a
  piece of work to a colleague (or their agent) and expect it to land the same way.
- You end up babysitting: sitting next to the agent, watching every step, because letting it
  run on its own for longer feels reckless.

cape is colenet's answer to that — the accumulated practices of our consultants and
engineers, packaged as Claude Code skills, conventions, and a recognizable route from idea
to shipped slice, designed to fit together as one framework (by some called a harness) rather than a loose collection of skills. It's built for teams working in an agile way, but that's its natural home, not an entry requirement.

## The idea: align up front, then hand off

cape front-loads *your* involvement. You spend real effort at the start — getting interviewed on
the idea, shaping the feature, agreeing on the vocabulary — so the agent actually hits what
you meant instead of guessing. Once you're aligned, you hand off wherever you're comfortable.

The quality discipline holds either way: tests and review happen at each step whether you
step away completely or stay in the loop on a small change. Toward the back of the flow,
`build` and its smaller brother `implement` are designed to run unattended.

Think of it as an invitation, not a hard cut. There's no single line where "your job" ends
and "the agent's job" begins. That said, the distinction between *where your judgement is
needed* (human-in-the-loop) and *what the agent can grind through on its own*
(away-from-keyboard) is a deliberate design principle, and it's already real in several
skills: `triage` sorts items into ready-for-agent vs.
ready-for-human, `grill-me` and it's sibling `grill-with-docs` actively supports you in decision making, `build` handles the away-from-keyboard case, while keeping quality up with a two-tier multi-faceted review gate based on established quality guidelines and your architecture documentation.

## The main flow

Most work travels the same route, from interactive at the front to autonomous at the back:

1. an idea gets sharpened by interview — `/grill-with-docs`,
2. turned into a reviewed spec — `/feature`,
3. split into vertically-sliced issues — `/split`,
4. built with tests and review at every step — `/build` (or `/implement` for a single issue).

Supplemental skills — backlog triage, research against primary sources, prototyping,
session handoffs, architecture, TDD — plug into that route wherever they're needed.

## Getting started

Getting started is really easy. Cape is an open-source plugin you can get from the Colenet marketplace.

Install in Claude Code:

```text
/plugin marketplace add colenet-gmbh/colenet-claude-code-marketplace
/plugin install cape@colenet
```

Then, once per repo, start Claude and type:

```text
/cape:setup
```

Setup scaffolds the few docs the skills rely on: the `docs/work/` board, the issue-tracker
record, and a `CONTEXT.md` pointing to various important information sources like documentation and conventions. Commit those so they're pinned in the repo.

cape is **self-contained** — it owns its stack and declares no runtime plugin
dependencies, so nothing else needs installing.

**Your next step is `/ask-cape`.** It's your go-to place for any question about cape — ask it
anything and it explains how the pieces fit and points you to the right skill. If you have a concrete question, pass it as a parameter:

```text
/ask-cape
  or
/ask-cape "how does cape work? what is the main flow?"
```

You drive cape through its top-level skills, invoked explicitly as slash commands —
`/grill-with-docs`, `/feature`, `/split`, `/build`. Many skills are deliberately *not*
auto-invoked; that keeps your context clean. You reach for the top-level skill that fits
where you are, and it pulls in the finer-grained discipline skills (TDD, review, and the
like) as it needs them.

Pull a newer cape anytime with `/plugin update`.

For local development or testing without the marketplace, point Claude Code at a checkout:

```bash
claude --plugin-dir /path/to/colenet-claude-code-plugin
```

## How cape works

cape has two halves that meet in your repo.

The **project-independent frame** is what we — and the wider community — have learned about
getting real work out of AI agents in professional software development: interview before you
build, slice vertically, test at the seam, review from more than one angle. That's captured
here so nobody on the team reinvents it from scratch each time.

But a frame alone doesn't cut it. Any harness like this only works well when it meets the
**project's own conventions and directives** — its coding standards, its architecture
decisions, its way of tracking work. Those are essential, and they're specific to each repo.
cape reaches into them lightly and flexibly rather than dictating them: `/cape:setup`
scaffolds the touchpoints, and your team evolves them.

Over time that second half becomes *yours*. cape is the shared baseline; the conventions,
rules, and skills you add for your specific repo are a harness of your own, grown on top of
it. `/improve` keeps that growth deliberate — a helper you reach for when a session didn't
go the way it should have, or when you've just wrapped a feature. It looks back at the
friction, traces it to the root cause, and lands the fix on the layer where it belongs — by
default in your own project, so the lesson sticks right where the work happens.

On the mechanics: cape is a **plugin**, so its skills live in their own namespace and are
officially `cape:<name>`. In practice you call them by plain name (`/feature`) — the `cape:`
prefix is only a fallback for when another installed skill happens to share a name.

> Ported and synthesized skills credit their sources in
> [`ATTRIBUTION.md`](ATTRIBUTION.md).

## Contributing

Want to add a skill or extend `cape`? See [`CONTRIBUTING.md`](CONTRIBUTING.md) for the
setup, conventions, and quality checks.

The lightest way to help is a **GitHub issue** — spot a gap or a rough edge, open one
against the repo. `/improve` takes part in this automatically: every fix it makes lands in
your own project's harness, and whenever it finds a genuinely general improvement it
suggests sending it to the cape community as a GitHub issue.

## Marketplace

This plugin is distributed via the separate
[`colenet-claude-code-marketplace`](https://github.com/colenet-gmbh/colenet-claude-code-marketplace)
repository. Future colenet plugins get their own repositories and are referenced there
as well.

## License

MIT © colenet GmbH — see [`LICENSE`](LICENSE). Adopted third-party content is listed
separately in [`ATTRIBUTION.md`](ATTRIBUTION.md).
