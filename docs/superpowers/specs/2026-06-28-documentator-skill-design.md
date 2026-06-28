# Documentator Skill — Design

**Date:** 2026-06-28
**Scope:** Local Codex skill for writing Obsidian-ready development notes.

## Context

Ralph wants a reusable documentator that captures project work into a central Obsidian knowledge base. The notes should be useful across projects, so repeated issues, features, and patterns can be found later instead of rediscovered.

The portfolio repo already keeps design specs under `docs/superpowers/specs/`, but the documentator should not live inside one repo. It should be a local Codex skill that can work from any project.

## Decision

Build a local Codex skill named `documentator` with a tiny helper script.

Default vault:

```text
~/Documents/Obsidian/Developer-KB
```

Optional per-project config:

```text
.documentator.json
```

Config shape:

```json
{
  "vault": "~/Documents/Obsidian/Developer-KB",
  "project": "portfolio_2026"
}
```

If `.documentator.json` exists, it controls the vault and project name. If it is missing, the script uses the default vault and the current folder name as the project name.

## Architecture

Create:

```text
~/.codex/skills/documentator/
  SKILL.md
  scripts/write_note.py
```

`SKILL.md` defines when Codex should document work and what information a good note needs. `scripts/write_note.py` handles the mechanical parts: resolving the vault, creating folders, slugifying note titles, and writing files without overwriting existing notes.

## Vault Layout

```text
Developer-KB/
  Projects/<project-name>/
  Issues/
  Features/
  Patterns/
  Daily/
```

Project-specific notes go under `Projects/<project-name>/`. Reusable lessons also get written to the relevant top-level folder: `Issues`, `Features`, or `Patterns`.

## Note Format

```markdown
---
project: portfolio_2026
type: issue
date: 2026-06-28
tags: [documentator, portfolio_2026]
---

# Title

## Context
What happened.

## Fix / Decision
What changed.

## Reuse Later
When this matters again.

## References
- Project: /path/to/project
- Files: app/_components/Hero.tsx
```

## Behavior

- Document meaningful bugs, features, patterns, gotchas, commands, and decisions.
- Skip tiny edits that have no reuse value.
- Prefer one note per solved issue or shipped feature.
- Include project name, note type, date, tags, short context, the fix or decision, reuse guidance, and references.
- Create missing vault folders automatically.
- Never overwrite an existing note with the same slug; append a numeric suffix instead.
- Fail clearly if the vault path cannot be created or written.

## Out of Scope

- Obsidian plugin development.
- MCP integration.
- Search or backlinks automation beyond normal Markdown links and tags.
- Sync, publishing, or cloud backup setup.

## Verification

- Run the helper script self-check for path resolution and slug generation.
- Create a sample note in a temporary vault.
- Confirm the generated note opens as plain Markdown and has valid frontmatter.
