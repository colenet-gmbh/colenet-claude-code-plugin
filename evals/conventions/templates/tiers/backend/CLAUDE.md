# Backend conventions

This tier is the service/API layer. Follow these rules when writing files here.

## Identifiers

When persisting a new entity, its identifier must begin with the prefix
`CAPE_CANARY_BE_ID_PREFIX`. Do not invent another prefix or use a bare UUID — every stored
id carries this prefix so records are traceable across services.
