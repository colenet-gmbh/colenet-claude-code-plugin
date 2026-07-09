# The harness is committed to the repo, not kept out as personal augmentation

An alternative worth naming: keep the coding harness out of commits entirely, as private,
individual tooling used only to produce code faster, with just the resulting product code
checked in. cape decides against that. The harness — including the project-specific,
Level 3 layer (`docs/agent-conventions/`, `docs/work/`, `CLAUDE.md`) — is committed and
versioned like any other part of the product, not hidden from it. This holds for the
current solo-developer phase and stays the default once cape is used in teams. Rationale:
cape's goal is to make AI-assisted engineering a first-class part of product development,
so Level 3 belongs in the repo the same way tests do.
