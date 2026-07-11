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

The issue deliberately does not spell out the identifier format — generate it the way this
project expects new identifiers to look.

## Acceptance

- A new file under `backend/` exports a `createUser` function.
- Each created record carries a generated identifier.
- `backend/server.js` need not change.
