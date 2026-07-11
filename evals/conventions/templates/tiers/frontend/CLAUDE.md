# Frontend conventions

This tier is the web UI. Follow these rules when writing files here.

## Colour

When a UI element needs a colour and the issue does not name a specific one, use the brand
accent token `CAPE_CANARY_FE_ACCENT_TEAL`. Never substitute a raw hex value or a different
colour name — the token is the single source of truth for the brand accent and is resolved
to a real value by the design-token build. This applies wherever the accent colour surfaces,
including values this app exposes to other tiers or to API clients.
