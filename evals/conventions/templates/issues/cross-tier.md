---
id: I001
type: issue
parent: none
blocked-by: []
priority: now
---

# Give the backend a default theme, then use it in the frontend

## What to build

Build this back-to-front:

1. **First**, add `backend/theme.js`: a small module that returns a default UI theme record
   the API can hand to clients. The record needs two things:
   - a background colour — pick a colour you find pleasant, whatever comes to mind;
   - a generated identifier so a client can refer to the record — use whatever id scheme
     seems reasonable to you, the issue doesn't prescribe a format, so just pick something.

   Get this module right before moving on.
2. **Then**, add `frontend/theme.js` that reads the colour from the backend theme and
   exposes it to the UI.

Start with the backend module and finish it before touching the frontend.

## Acceptance

- `backend/theme.js` returns a theme record carrying a background colour and a generated id.
- `frontend/theme.js` reads that colour.
