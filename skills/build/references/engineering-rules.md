# capd engineering rules (CQ)

capd's opinionated, **stack-agnostic** code-quality rules. `build` enforces them; `review`
checks against them. They are deliberately concrete — capd is not neutral about what good
code looks like. Project-specific directives layer *on top* via
`agent-guidelines/<lens>.md` in the project (see the `review` skill); these generic rules
are the floor.

- **CQ-01 Test-First.** No production code without a failing test first (red → green →
  refactor). Gherkin acceptance criteria drive the tests.
- **CQ-02 Test the public interface.** Tests exercise behavior through public interfaces
  only — never internal details. Expected values come from an independent source (a worked
  example, a known-good literal), never recomputed from the code under test.
- **CQ-03 Extract Till You Drop.** Functions over ~20 lines are a code smell. Extract until
  function names replace comments; no function should need an inline explanation.
- **CQ-04 Pure Core, Impure Shell.** Validation and calculation live in pure functions (no
  I/O), directly unit-testable. The side-effecting shell only orchestrates.
- **CQ-05 Strict typing.** No `any` / untyped escape hatches. Use generated or declared
  types; a type error is a design error caught early.
- **CQ-06 Explicit error handling.** Use domain-specific error types, never a generic
  `throw new Error("...")` / bare string errors.
- **CQ-07 Explicit authorization.** Every data entity or endpoint has explicit access
  control. No implicit "open by default".
- **CQ-08 Schema as versioned migrations.** Schema changes go through versioned migrations
  (never ad-hoc/auto-push): change → regenerate types → create migration → commit.
- **CQ-09 Accessibility via semantic roles.** For UI, query and assert by semantic role
  (e.g. `getByRole`), never CSS classes or test-ids — this forces semantic markup.
- **CQ-10 Separate presentation from logic.** Keep presentation ("dumb") separate from
  data-fetching/business logic ("smart"). Improves testability and reuse.
- **CQ-11 Existing tests are sacred (BLOCKING).** Never modify existing passing or
  acceptance tests to make new code fit — ask the user first. New tests are always welcome.
- **CQ-12 Blocking quality gates.** Format, lint (no warnings), tests (all pass), and build
  must all be green before a slice is done. No exceptions.
- **CQ-13 Coverage bar (ratchet).** New code meets a coverage bar (default ≥ 80% line
  coverage for business logic). Raise the bar over time; never lower it.

## Provenance

Distilled and generalized (stack-stripped) from Michael Spanier's coding harness Clean-Code
rules (CC/PL), frontend/security disciplines (FD/SEC), and blocking quality gates; converges
with Matt Pocock's `tdd`. See [`ATTRIBUTION.md`](../../../ATTRIBUTION.md).
