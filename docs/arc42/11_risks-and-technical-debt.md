# Risks and Technical Debt

## Behaviour features need evals (base challenge)

Most cape capabilities are claims about an LLM's **behaviour**, not deterministic code —
verifiable only by running the flow and observing the result, not by reading the source. So
cape's own development needs **standing eval / QA infrastructure**. The risk if it is
under-built: features ship on assertion instead of evidence, and the framework's central
promise (chapter 1) stays unproven.

First instance: the convention-consultation eval (F006, issues I030–I031); its throwaway-repo
bootstrap is shared with the installability smoke test (I027). The general parts (fixture
generator, runner, scorer, rate aggregation) should stay reusable so the next feature's eval is
cheap.

## Eval results are model-dependent

The size of an effect an eval measures — e.g. the progressive-disclosure gap a generic setup
shows without cape — **varies by model**: some read `CLAUDE.md` proactively, some do not.
Results must be read per model and re-run as models change; a single run is not a verdict.
