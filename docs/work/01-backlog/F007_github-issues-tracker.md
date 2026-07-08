---
id: F007
type: feature
priority: next
---

# cape's issue tracker is configurable and can use GitHub Issues

## Outcome

`/cape:setup` no longer hardcodes local files as the tracker: the tracker is configurable,
and GitHub Issues is a supported backend. Real users' feedback lands there once cape is in
use.

## Realization job

Make the tracker abstraction (today `docs/agents/issue-tracker.md`) configurable, and add a
GitHub Issues integration behind it.

## Open points

- **Preserve the backlog-as-incoming-queue model.** The incoming queue *is* the backlog
  (see [`../CLAUDE.md`](../CLAUDE.md)): raw items wait there and move to development only
  once work-up yields a result. The GitHub Issues integration must preserve this transition
  rather than reintroduce a separate inbox.
