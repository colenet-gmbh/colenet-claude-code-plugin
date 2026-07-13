# Rule: Plugin development & releases

Plugin-level lifecycle for `cape`: the branch model, versioning, releasing, and how
updates reach users. For skill content see [`skill-authoring.md`](skill-authoring.md); for
external sources see [`attribution.md`](attribution.md).

## How distribution works — why `main` is special

A cape "release" is not a built artifact. The plugin **is** its git repo. The colenet
marketplace lists cape with an **unpinned** source (the repo URL, no ref/tag), so Claude
Code tracks the repo's **default branch, `main`**:

- A **new install** pulls `main`'s current HEAD — whatever is there, released or not.
- An **existing user** gets a new snapshot only when `plugin.json` `version` **on `main`**
  increases (Claude Code reads it on marketplace refresh and via `/plugin update`).

So `main` is at once the **shop window and the install source**. Anything on `main` is
effectively live for the next person who installs. That is the whole reason for the branch
model below: **`main` must always be the released, stable state.**

## Branch model (binding)

- **`main` = the published state.** Only release merges land here. Never commit work to
  `main` directly.
- **`develop` = the integration branch** for all continuous work. It may run ahead of
  `main` and hold unreleased features; that is expected and safe, because users are not
  served from `develop`.
- **Every change lands via a PR into `develop`** — features, fixes, docs, everything.
  Direct pushes to both `develop` and `main` are blocked.
- **A release is a single PR `develop` → `main`.** That PR carries the **one** version bump
  and finalizes `CHANGELOG.md`. Merging it is what ships to users. Releasing is therefore a
  deliberate act — you decide *when* and *with which bundle of features* to cut it, not a
  side effect of merging day-to-day work.

This is what lets us "merge but not release": day-to-day PRs merge into `develop` freely
and reach nobody; the release happens only when we bring `develop` to `main`.

## Dependencies

- Declare plugin dependencies in `plugin.json` under `dependencies`. **Always qualify
  with the marketplace** (`name@marketplace`) — a bare name resolves against *this*
  plugin's own marketplace (`@colenet`), so `"superpowers"` is looked up as
  `superpowers@colenet` and fails. Use e.g. `"superpowers@claude-plugins-official"`.
- The marketplace must be one users have (the built-in `claude-plugins-official` is
  always present); otherwise the dependency cannot be resolved and the plugin fails to
  load.

## Versioning (SemVer)

`MAJOR.MINOR.PATCH` — cape reads the three positions as levels of significance:

- **PATCH** (third digit) — the small stuff: fixes, wording, optimisations, refactors. The
  bulk of day-to-day work.
- **MINOR** (second digit) — **conceptual and structural** changes: a new skill, a new
  capability, a reshaped flow. Backward compatible.
- **MAJOR** (first digit) — the big **maturity milestones**. **0 → 1**: cape is a
  well-functioning **single-person** framework. **1 → 2**: a well-functioning **team**
  framework.

The bump reflects the **whole bundle** a release ships — pick the level of its most
significant change (a release adding a skill and fixing typos is a MINOR).

## One bump per release — on the release PR

The `version` marks a **release** — the bundle of changes shipped to users together — not
an individual PR. Work on `develop` **does not touch `version`**; entries just accumulate
in `CHANGELOG.md` under the next release's heading. The **release PR (`develop` → `main`)**
is where you bump `plugin.json` `version` once and stamp that CHANGELOG heading with the
version and date.

`plugin.json` `version` is the single source of truth. The marketplace entry carries **no**
version, so there is nothing to keep in sync.

## Release checklist

Run this once per release, as the `develop` → `main` PR:

1. Open a PR from `develop` into `main`.
2. In it, bump `version` in `.claude-plugin/plugin.json` (SemVer) — once, for the whole
   bundle. **This is the only place.**
3. Finalize `CHANGELOG.md`: the release heading gets the version and today's date, with all
   the bundle's changes grouped beneath it.
4. Merge it (`main` is protected; CI must be green). Users with auto-update enabled receive
   the new version at their next startup; others via `/plugin update`.

The marketplace repo only needs a push when its **listing** changes (description,
keywords) — not for a version bump.

## CI gate

`validate` runs `pre-commit` (structure, manifest, doc links) on **every** PR. The
**version-bump requirement fires only on the release PR into `main`** — there the
`validate` check fails unless `plugin.json` `version` is greater than on `main`. PRs into
`develop` never need a bump. Direct pushes to `main` bypass the gate (admins only) — use
them only for changes that should not bump.

## Do not

- Do not commit work directly to `main`, and do not target day-to-day PRs at `main` — they
  go to `develop`. `main` changes only through a release PR.
- Do not bump `version` on a `develop` PR — the bump belongs on the release PR, once.
- Do not push behavior changes to `main` without a version bump — installed users will not
  receive them, and it puts unreleased-looking state in the shop window.
- Do not re-add a `version` to the marketplace entry — `plugin.json` is the single source
  of truth.
- Do not switch to commit-SHA versioning (omitting `version`): we ship explicit releases,
  not every-commit updates.
