import { test } from "node:test";
import assert from "node:assert/strict";
import { scoreCanary, changedFiles } from "../src/scorer.js";

const FE = "CAPE_CANARY_FE_ACCENT_TEAL";
const BE = "CAPE_CANARY_BE_ID_PREFIX";

test("scoreCanary finds a canary embedded verbatim in a written file", () => {
  const files = [{ path: "frontend/button.jsx", content: `color: "${FE}"` }];
  const r = scoreCanary(files, FE);
  assert.equal(r.present, true);
  assert.deepEqual(r.matches, ["frontend/button.jsx"]);
});

test("scoreCanary reports absent when no file contains the canary", () => {
  const files = [{ path: "frontend/button.jsx", content: 'color: "blue"' }];
  const r = scoreCanary(files, FE);
  assert.equal(r.present, false);
  assert.deepEqual(r.matches, []);
});

test("scoreCanary restricts the match to a tier prefix (cross-tier discriminator)", () => {
  // FE canary shows up only in a frontend file, but the cross-tier check demands it
  // in a backend-written artifact — so a prefix-scoped score must miss it.
  const files = [
    { path: "frontend/theme.js", content: FE },
    { path: "backend/config.js", content: "accent: unset" },
  ];
  assert.equal(scoreCanary(files, FE, { pathPrefix: "backend/" }).present, false);
  assert.equal(scoreCanary(files, FE, { pathPrefix: "frontend/" }).present, true);
});

test("changedFiles returns files that are new or whose content changed", () => {
  const before = { "frontend/app.js": "old", "backend/CLAUDE.md": "conv" };
  const after = {
    "frontend/app.js": "new", // changed
    "backend/CLAUDE.md": "conv", // unchanged -> excluded
    "frontend/button.jsx": "created", // new
  };
  const changed = changedFiles(before, after).map((f) => f.path).sort();
  assert.deepEqual(changed, ["frontend/app.js", "frontend/button.jsx"]);
});

test("changedFiles never surfaces the fixture's own CLAUDE.md (unchanged)", () => {
  // The canary lives in CLAUDE.md by construction; scoring it there would always pass.
  const before = { "frontend/CLAUDE.md": `use ${FE}` };
  const after = { "frontend/CLAUDE.md": `use ${FE}`, "frontend/x.js": FE };
  const changed = changedFiles(before, after);
  assert.deepEqual(changed.map((f) => f.path), ["frontend/x.js"]);
  assert.equal(scoreCanary(changed, FE).present, true);
});

test("changedFiles drops CLAUDE.md by basename even when /implement edits it", () => {
  // Guards against a false recall HIT: if the run edits a tier convention file, its
  // pre-existing canary must not re-enter the scored set.
  const before = { "frontend/CLAUDE.md": `use ${FE}` };
  const after = {
    "frontend/CLAUDE.md": `use ${FE}\nplus an edit`, // changed, but must stay excluded
    "frontend/button.jsx": FE,
  };
  const changed = changedFiles(before, after, { ignoreBasenames: ["CLAUDE.md"] });
  assert.deepEqual(changed.map((f) => f.path), ["frontend/button.jsx"]);
  assert.equal(scoreCanary(changed, FE, { pathPrefix: "frontend/" }).present, true);
});

test("changedFiles honours ignore prefixes (.git, board churn)", () => {
  const before = {};
  const after = {
    ".git/index": "binary",
    "docs/work/03-approval/I001.md": "moved",
    "backend/user.js": BE,
  };
  const changed = changedFiles(after && before, after, {
    ignore: [".git/", "docs/work/"],
  }).map((f) => f.path);
  assert.deepEqual(changed, ["backend/user.js"]);
});
