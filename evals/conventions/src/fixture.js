// Fixture generator — builds a throwaway two-tier repo from static templates.
//
// The fixture is a minimal but believable repo: a root CLAUDE.md + CONTEXT.md, a scaffolded
// docs/work/ board and tracker (so cape:implement has somewhere to read the issue), and two
// tiers (frontend/, backend/) each carrying a CLAUDE.md convention with a verbatim canary.
// One issue file — the chosen constellation — lands in docs/work/02-development/ with an
// UNDERSPECIFIED instruction that only the tier convention resolves.
//
// Everything comes from templates/ (static files); nothing is generated at runtime beyond
// copying and the board .gitkeep/.next-id bookkeeping. The generator writes only inside the
// target dir it is handed (an ephemeral tmpdir) — never the real cape checkout.

import { cp, mkdir, writeFile, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const TEMPLATES = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "templates");

export const CONSTELLATIONS = ["frontend-only", "backend-only", "cross-tier"];

// The verbatim canary tokens. These MUST match the tokens embedded in the tier CLAUDE.md
// templates (guarded by fixture.test.js) — the tier convention is their single home.
// Deliberately absurd values: no agent would ever produce "lilac pale-blue plaid" or this
// id prefix spontaneously, so a verbatim hit can only mean the tier convention was in
// context. The issues (see templates/issues/) invite invention ("pick a colour you find
// nice") rather than pointing at a defined answer, so a baseline agent that lacks the
// convention invents something ordinary and the canary is absent — the negative control.
export const CANARIES = {
  frontend: "CAPE_CANARY_LILAC_PALEBLUE_PLAID",
  backend: "CAPE_CANARY_QUOKKA_LEDGER_ID",
};

const BOARD_COLUMNS = ["01-backlog", "02-development", "03-approval", "04-done", "out-of-scope"];

/**
 * What a constellation's run should show.
 * - `expected`: an ARRAY of canaries that must ALL appear (each optionally scoped to a tier
 *   prefix) if the conventions were consulted — this is the recall signal. Recall for the
 *   cell is the conjunction: every expected canary present at its prefix.
 * - `forbidden`: a canary that must NOT appear (a wrong tier leaking in) — the precision
 *   signal. `null` when the constellation has no leakage counterpart.
 * - `tiers`: the tiers the issue touches (consulted by the I031 nudge; recorded here too).
 */
export function scoringPlan(constellation) {
  switch (constellation) {
    case "frontend-only":
      return {
        tiers: ["frontend"],
        expected: [{ canary: CANARIES.frontend, pathPrefix: "frontend/" }],
        forbidden: { canary: CANARIES.backend },
      };
    case "backend-only":
      return {
        tiers: ["backend"],
        expected: [{ canary: CANARIES.backend, pathPrefix: "backend/" }],
        forbidden: { canary: CANARIES.frontend },
      };
    case "cross-tier":
      // The real discriminator: a FRONTEND convention (the colour) must shape a BACKEND
      // artifact written FIRST, and the BACKEND convention (the id prefix) must shape that
      // same artifact. So BOTH canaries are expected inside a BACKEND file — each proving a
      // different tier's convention was consulted up front, at their correct path prefix.
      return {
        tiers: ["backend", "frontend"],
        expected: [
          { canary: CANARIES.frontend, pathPrefix: "backend/" },
          { canary: CANARIES.backend, pathPrefix: "backend/" },
        ],
        forbidden: null,
      };
    default:
      throw new Error(`unknown constellation: ${constellation}`);
  }
}

const ISSUE_SLUG = {
  "frontend-only": "I001_badge",
  "backend-only": "I001_create-user",
  "cross-tier": "I001_backend-theme",
};

/**
 * Generate a fixture repo for one constellation into `targetDir`.
 * @param {string} targetDir  an (ideally empty, ephemeral) directory to fill
 * @param {string} constellation  one of CONSTELLATIONS
 * @returns {Promise<{root:string, constellation:string, issuePath:string,
 *   plan:ReturnType<typeof scoringPlan>}>}
 */
export async function generateFixture(targetDir, constellation) {
  if (!CONSTELLATIONS.includes(constellation)) {
    throw new Error(`unknown constellation: ${constellation}`);
  }
  await mkdir(targetDir, { recursive: true });

  // 1. Scaffold: root CLAUDE.md, CONTEXT.md, glossary, tracker.
  await cp(path.join(TEMPLATES, "scaffold"), targetDir, { recursive: true });

  // 2. Tiers with their conventions + a placeholder source file each.
  await cp(path.join(TEMPLATES, "tiers"), targetDir, { recursive: true });

  // 3. Board columns (committable-empty) + the shared id counter.
  for (const col of BOARD_COLUMNS) {
    const dir = path.join(targetDir, "docs/work", col);
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, ".gitkeep"), "");
  }
  await writeFile(path.join(targetDir, "docs/work/.next-id"), "2\n");

  // 4. The one issue for this constellation, in the development column.
  const slug = ISSUE_SLUG[constellation];
  const issueRel = path.join("docs/work/02-development", `${slug}.md`);
  const issueBody = await readFile(
    path.join(TEMPLATES, "issues", `${constellation}.md`),
    "utf8",
  );
  await writeFile(path.join(targetDir, issueRel), issueBody);

  return {
    root: targetDir,
    constellation,
    issuePath: issueRel,
    plan: scoringPlan(constellation),
  };
}

/** True if `dir` looks like a generated fixture (guards the runner against a stray path). */
export function looksLikeFixture(dir) {
  return (
    existsSync(path.join(dir, "frontend/CLAUDE.md")) &&
    existsSync(path.join(dir, "backend/CLAUDE.md")) &&
    existsSync(path.join(dir, "docs/work/02-development"))
  );
}
