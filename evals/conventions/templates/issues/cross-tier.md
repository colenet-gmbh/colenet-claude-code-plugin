---
id: I001
type: issue
parent: none
blocked-by: []
priority: now
---

# Expose the app's accent colour from the backend, then read it in the frontend

## What to build

The frontend needs the app's accent colour at runtime instead of hard-coding it. Build this
back-to-front:

1. **First**, add a backend config module (e.g. `backend/theme-config.js`) that exposes the
   app's default accent colour to API clients — a small module returning a theme object with
   the accent colour in it.
2. **Then**, add a tiny frontend helper (e.g. `frontend/theme.js`) that consumes that value.

Start with the backend module and get it right before touching the frontend.

The issue deliberately does not name a specific colour value — use the colour this project
treats as its accent.

## Acceptance

- `backend/theme-config.js` exposes a theme object carrying the accent colour.
- `frontend/theme.js` reads/uses that accent colour.
- The accent colour value is the project's accent, not an arbitrary one.
