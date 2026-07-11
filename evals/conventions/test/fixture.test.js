import { test, afterEach } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import {
  generateFixture,
  scoringPlan,
  CONSTELLATIONS,
  CANARIES,
} from "../src/fixture.js";

const dirs = [];
async function freshDir() {
  const d = await mkdtemp(path.join(tmpdir(), "cape-fixture-test-"));
  dirs.push(d);
  return d;
}
afterEach(async () => {
  while (dirs.length) await rm(dirs.pop(), { recursive: true, force: true });
});

test("tier CLAUDE.md templates embed the canary tokens the scoring plan expects", async () => {
  // Single source of truth guard: the tokens live in the tier conventions; scoringPlan
  // and CANARIES must not drift from them.
  const dir = await freshDir();
  await generateFixture(dir, "frontend-only");
  const fe = await readFile(path.join(dir, "frontend/CLAUDE.md"), "utf8");
  const be = await readFile(path.join(dir, "backend/CLAUDE.md"), "utf8");
  assert.ok(fe.includes(CANARIES.frontend), "frontend CLAUDE.md holds the FE canary");
  assert.ok(be.includes(CANARIES.backend), "backend CLAUDE.md holds the BE canary");
});

test("generateFixture lays down a scaffolded board and both tiers", async () => {
  const dir = await freshDir();
  const { issuePath } = await generateFixture(dir, "frontend-only");
  for (const p of [
    "CLAUDE.md",
    "CONTEXT.md",
    "docs/agent-conventions/tracker.md",
    "docs/arc42/12_glossary.md",
    "docs/work/.next-id",
    "docs/work/01-backlog/.gitkeep",
    "docs/work/02-development/.gitkeep",
    "frontend/CLAUDE.md",
    "frontend/app.js",
    "backend/CLAUDE.md",
    "backend/server.js",
    issuePath,
  ]) {
    assert.ok(existsSync(path.join(dir, p)), `expected ${p} to exist`);
  }
});

test("the generated issue is underspecified — it never names the canary", async () => {
  for (const c of CONSTELLATIONS) {
    const dir = await freshDir();
    const { issuePath } = await generateFixture(dir, c);
    const issue = await readFile(path.join(dir, issuePath), "utf8");
    assert.ok(
      !issue.includes(CANARIES.frontend) && !issue.includes(CANARIES.backend),
      `${c} issue must not leak a canary`,
    );
  }
});

test("each constellation lands exactly one issue in the development column", async () => {
  for (const c of CONSTELLATIONS) {
    const dir = await freshDir();
    const { issuePath } = await generateFixture(dir, c);
    assert.match(issuePath, /^docs\/work\/02-development\/I001_.*\.md$/);
  }
});

test("cross-tier expects the FRONTEND canary inside a BACKEND file (the discriminator)", () => {
  const plan = scoringPlan("cross-tier");
  assert.equal(plan.expected.canary, CANARIES.frontend);
  assert.equal(plan.expected.pathPrefix, "backend/");
});

test("frontend-only forbids the backend canary (precision / no tier leakage)", () => {
  const plan = scoringPlan("frontend-only");
  assert.equal(plan.expected.canary, CANARIES.frontend);
  assert.equal(plan.forbidden.canary, CANARIES.backend);
});

test("generateFixture rejects an unknown constellation", async () => {
  const dir = await freshDir();
  await assert.rejects(() => generateFixture(dir, "nonsense"));
});
