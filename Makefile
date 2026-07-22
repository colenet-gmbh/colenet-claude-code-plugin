# The one command to verify the repo — identical to the CI gate.
# One-time setup after cloning:  pre-commit install   (see CONTRIBUTING.md)
#
#   make          # same as `make check`
#   make check    # run every check across all files
#
# No options, no variants: one command that knows all the details — including
# where pre-commit lives when pipx's ~/.local/bin isn't on your PATH.
.DEFAULT_GOAL := check
.PHONY: check

PRE_COMMIT := $(shell command -v pre-commit 2>/dev/null || echo $(HOME)/.local/bin/pre-commit)

check:
	@test -x "$(PRE_COMMIT)" || { \
		echo "pre-commit not found. Install it and put ~/.local/bin on your PATH — see CONTRIBUTING.md."; \
		exit 1; }
	"$(PRE_COMMIT)" run --all-files
