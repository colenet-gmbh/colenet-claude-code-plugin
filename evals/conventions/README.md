# Convention-consultation eval harness (F006 / I030)

Internal working material — **not shipped** with the plugin. It proves the F006 hypothesis:
without an explicit consultation nudge, a tier's `CLAUDE.md` convention *verpufft* — cape's
`/implement` writes files that ignore it, especially when a decision is made **before** the
owning tier's files are touched.

## How it works

1. **Fixture generator** (`src/fixture.js`, `templates/`) builds a throwaway two-tier repo
   (`frontend/` + `backend/`), each tier carrying a `CLAUDE.md` convention with a verbatim
   canary (`CAPE_CANARY_*`). One issue per constellation lands in `docs/work/02-development/`.
   - `frontend-only` — expect FE canary in a `frontend/` file, no BE leakage.
   - `backend-only` — expect BE canary in a `backend/` file, no FE leakage.
   - `cross-tier` — the discriminator: a **frontend** convention must shape a **backend**
     artifact written *first*, so the FE canary is expected inside a `backend/` file.

   **Why the canary is a valid read-receipt (the negative control).** Two things must both
   hold, or a baseline pass proves nothing:
   - The canary value is **deliberately absurd** (`LILAC_PALEBLUE_PLAID`, `QUOKKA_LEDGER_ID`).
     No agent produces it spontaneously, so a verbatim hit can *only* mean the convention was
     in context.
   - The issue **invites invention, never search**. It says "pick a colour you find nice,
     whatever comes to mind" — it must not say "use the project's colour / the accent / the
     way this project does it", which would send the agent hunting for a defined answer and
     surface the convention regardless. An agent that lacks the convention must invent
     something ordinary, so the baseline reads *absent*.

   If the issue points at a defined answer, or the value is guessable, the independent
   variable (convention present vs. absent at decision time) is never actually manipulated
   and the eval cannot show a gap. The `cross-tier` case additionally writes the **backend**
   file first so the frontend convention is not yet lazy-loaded by Level 1 when the colour is
   chosen — that is the only cell where a baseline miss is expected.
2. **Runner** (`src/runner.js`) drives `claude -p` headless over the fixture, cape loaded
   from this local checkout via `--plugin-dir`, in an ephemeral tmpdir. The real cape
   checkout is never modified (plugin load is read-only).
3. **Scorer** (`src/scorer.js`) diffs a before/after snapshot to find the files `/implement`
   wrote, then does a verbatim `grep` for the canary — never in the fixture's own
   `CLAUDE.md`. No LLM judge.
4. **Aggregation** (`src/aggregate.js`) turns N per-run booleans into a rate (`1/10`).

## Run

```bash
cd evals/conventions
npm test                                              # unit tests (pure seams)

# Baseline gate (spends tokens per run — invoke deliberately):
node bin/run-baseline.js --n 3                        # full matrix, Phase B
node bin/run-baseline.js --n 1 --constellations cross-tier --keep   # single pilot
```

The baseline runs the **stock** `/implement` (no nudge) — that stock flow *is* the baseline,
because the consultation nudge (I031) does not exist yet. A recall rate **below** the
threshold means the convention is ignored without the nudge → the hypothesis holds.

`--keep` writes fixtures under `.workdir/` (gitignored) for inspection; otherwise they go to
an OS tmpdir and are deleted. `--n` is a parameter; nothing hardcodes a run count.

## Baseline history — a first run that proved nothing

The **first** baseline (with an earlier fixture) came back `3/3` recall in every cell,
`cross-tier` included, and no leakage. That looked like "no gap → hypothesis refuted" — but
it was a fixture defect, not a finding. The old issues told the agent to "use the colour this
project treats as its accent", and the old canary was a plausible token. So the agent went
looking, found the accent defined in `frontend/CLAUDE.md`, and used it — in every run,
including `cross-tier`. The unguessable canary was doing its job: its presence proved the file
*was* read. The experiment simply never withheld the convention, so its independent variable
was pinned to "present" and no gap was possible.

The fixture above (absurd value + invention-only issues) is the fix.

## Baseline result — corrected fixture (N=3, stock/no-nudge, Opus 4.8)

```
frontend-only  recall=3/3 (1.00)   leakage=0/3   → masked cell, hit expected
backend-only   recall=3/3 (1.00)   leakage=0/3   → masked cell, hit expected
cross-tier     recall=1/3 (0.33)   → GAP below threshold (0.5) — hypothesis supported
```

The discriminator now behaves. In 2 of 3 `cross-tier` runs the baseline agent, writing
`backend/theme.js` first, invented an ordinary colour (`#2A9D8F` "a calm teal") and even
noted "this tier has no colour convention" — the frontend convention was genuinely not in
context, so the canary is absent. In 1 of 3 runs Opus consulted the frontend convention
proactively anyway ("per the frontend convention" → the canary appears). So the gap is
**real but partial** on Opus 4.8 — a strong, fairly proactive model; a weaker model would
likely miss more often. `frontend-only`/`backend-only` stay masked (Level 1 lazy-loads the
tier `CLAUDE.md` as the file is written), exactly as expected.

Read-off: without the nudge the convention *verpufft* in the case it is supposed to
(a decision made before the owning tier is touched). This validates the harness **and**
supports F006's hypothesis — the consultation nudge (I031) is warranted, and its job is to
lift `cross-tier` from ~1/3 toward the masked cells' rate without leaking wrong-tier
conventions. N=3 is a pilot: the qualitative gap is unambiguous, the exact rate is soft.
