# The one command to verify the repo — identical to the CI gate.
# One-time setup after cloning:  pre-commit install   (see CONTRIBUTING.md)
#
#   make          # same as `make check`
#   make check    # run every check across all files
#   make test     # alias for check
#
# No options, no variants: one command that knows all the details.
.DEFAULT_GOAL := check
.PHONY: check test

check:
	pre-commit run --all-files

test: check
