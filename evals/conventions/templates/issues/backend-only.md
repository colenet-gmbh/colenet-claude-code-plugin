---
id: I001
type: issue
parent: none
blocked-by: []
priority: now
---

# Add a user-creation function to the backend

## What to build

Add a function under `backend/` (e.g. `backend/users.js`) that creates a new user record
and returns it. Each new record needs a generated identifier.

Use whatever id scheme seems reasonable to you — the issue doesn't prescribe a format, so
just pick something sensible.

## Acceptance

- A new file under `backend/` exports a `createUser` function.
- Each created record carries a generated identifier.
- `backend/server.js` need not change.
