import { test } from "node:test";
import assert from "node:assert/strict";
import { aggregateRate, aggregateMatrix } from "../src/aggregate.js";

test("aggregateRate turns per-run booleans into a rate string", () => {
  const r = aggregateRate([true, false, false]);
  assert.equal(r.hits, 1);
  assert.equal(r.total, 3);
  assert.equal(r.rate, "1/3");
  assert.ok(Math.abs(r.fraction - 1 / 3) < 1e-9);
});

test("aggregateRate handles the N=1 pilot", () => {
  assert.deepEqual(aggregateRate([false]), {
    hits: 0,
    total: 1,
    rate: "0/1",
    fraction: 0,
  });
});

test("aggregateRate on an empty set does not divide by zero", () => {
  assert.deepEqual(aggregateRate([]), {
    hits: 0,
    total: 0,
    rate: "0/0",
    fraction: 0,
  });
});

test("aggregateMatrix reports one rate per constellation", () => {
  const m = aggregateMatrix({
    "frontend-only": [true, true, false],
    "backend-only": [false, false, false],
    "cross-tier": [false],
  });
  assert.equal(m["frontend-only"].rate, "2/3");
  assert.equal(m["backend-only"].rate, "0/3");
  assert.equal(m["cross-tier"].rate, "0/1");
});
