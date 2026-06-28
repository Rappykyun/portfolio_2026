# Documentator Skill Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a reusable local Codex skill that writes Obsidian-ready development notes into a central vault, with optional per-project config.

**Architecture:** The skill lives in `~/.codex/skills/documentator/`. `SKILL.md` defines when and how to document work. `scripts/write_note.py` owns path resolution, folder creation, slugging, frontmatter, duplicate-safe writes, and a tiny self-check.

**Tech Stack:** Markdown, Python 3 standard library, Codex local skills.

---

## File Structure

- Create: `/home/rappy/.codex/skills/documentator/SKILL.md`
  - Skill instructions Codex reads when the user asks for documentator behavior.
- Create: `/home/rappy/.codex/skills/documentator/scripts/write_note.py`
  - CLI helper for writing notes into the configured Obsidian vault.
- Optional per project: `.documentator.json`
  - Local override for vault path and project name.

### Task 1: Create the Documentator Skill

**Files:**
- Create: `/home/rappy/.codex/skills/documentator/SKILL.md`

- [ ] **Step 1: Create the skill folder**

Run:

```bash
mkdir -p /home/rappy/.codex/skills/documentator/scripts
```

Expected: command exits with status `0`.

- [ ] **Step 2: Write the skill instructions**

Create `/home/rappy/.codex/skills/documentator/SKILL.md` with:

```markdown
---
name: documentator
description: Write Obsidian-ready development notes for solved issues, shipped features, reusable patterns, commands, gotchas, and project decisions.
---

# Documentator

Use this skill when the user asks to document work, create an Obsidian note, save a dev note, remember an issue, or capture a reusable pattern.

## What To Document

Document work that has reuse value:

- solved bugs or confusing errors
- shipped features
- reusable implementation patterns
- important project decisions
- commands that fixed or verified something
- gotchas that may happen again

Skip tiny edits with no future value.

## Vault

Default vault:

```text
~/Documents/Obsidian/Developer-KB
```

Optional project config:

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

If config exists, use it. If not, use the default vault and the current folder name as the project name.

## Note Types

Use the smallest matching type:

- `issue` for bugs, errors, failed builds, and fixes
- `feature` for user-facing or developer-facing functionality
- `pattern` for reusable technical approaches
- `decision` for tradeoffs and project direction
- `command` for useful command recipes

## Writing Notes

Prefer the helper script:

```bash
python3 /home/rappy/.codex/skills/documentator/scripts/write_note.py \
  --type issue \
  --title "Short useful title" \
  --context "What happened." \
  --decision "What changed or what was decided." \
  --reuse "When this helps again." \
  --files "app/_components/Hero.tsx"
```

Keep notes short. Write what future-you needs to recognize the problem and reuse the fix.

## Output

After writing a note, tell the user:

- note path
- note type
- one-line summary
```

- [ ] **Step 3: Verify the skill file exists**

Run:

```bash
test -f /home/rappy/.codex/skills/documentator/SKILL.md
```

Expected: command exits with status `0`.

- [ ] **Step 4: Commit checkpoint if working inside a repo**

Run from `/mnt/c/Users/Lenovo Pc/Desktop/portfolio_2026`:

```bash
git status --short
```

Expected: local skill files are outside the repo and do not appear in repo status.

### Task 2: Add the Note Writer Script

**Files:**
- Create: `/home/rappy/.codex/skills/documentator/scripts/write_note.py`

- [ ] **Step 1: Write the script**

Create `/home/rappy/.codex/skills/documentator/scripts/write_note.py` with:

```python
#!/usr/bin/env python3
from __future__ import annotations

import argparse
import datetime as dt
import json
import re
from pathlib import Path

DEFAULT_VAULT = "~/Documents/Obsidian/Developer-KB"
CONFIG_FILE = ".documentator.json"
TYPE_DIRS = {
    "issue": "Issues",
    "feature": "Features",
    "pattern": "Patterns",
    "decision": "Projects",
    "command": "Patterns",
}


def slugify(text: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")
    return slug or "note"


def load_config(cwd: Path) -> dict[str, str]:
    config_path = cwd / CONFIG_FILE
    if not config_path.exists():
        return {}
    with config_path.open("r", encoding="utf-8") as fh:
        data = json.load(fh)
    if not isinstance(data, dict):
        raise ValueError(f"{CONFIG_FILE} must contain a JSON object")
    return {str(key): str(value) for key, value in data.items()}


def resolve_settings(cwd: Path) -> tuple[Path, str]:
    config = load_config(cwd)
    vault = Path(config.get("vault", DEFAULT_VAULT)).expanduser()
    project = config.get("project", cwd.name)
    return vault, project


def unique_path(folder: Path, date: str, title: str) -> Path:
    base = f"{date}-{slugify(title)}"
    path = folder / f"{base}.md"
    index = 2
    while path.exists():
        path = folder / f"{base}-{index}.md"
        index += 1
    return path


def format_list(value: str) -> str:
    items = [item.strip() for item in value.split(",") if item.strip()]
    return "\n".join(f"- {item}" for item in items) if items else "- None"


def build_note(args: argparse.Namespace, project: str, cwd: Path, today: str) -> str:
    tags = f"[documentator, {project}, {args.type}]"
    return f"""---
project: {project}
type: {args.type}
date: {today}
tags: {tags}
---

# {args.title}

## Context
{args.context}

## Fix / Decision
{args.decision}

## Reuse Later
{args.reuse}

## References
- Project: {cwd}
- Files:
{format_list(args.files)}
"""


def write_note(args: argparse.Namespace, cwd: Path) -> Path:
    vault, project = resolve_settings(cwd)
    today = dt.date.today().isoformat()
    if args.type == "decision":
        folder = vault / "Projects" / project
    else:
        folder = vault / TYPE_DIRS[args.type]
    folder.mkdir(parents=True, exist_ok=True)
    path = unique_path(folder, today, args.title)
    path.write_text(build_note(args, project, cwd, today), encoding="utf-8")
    return path


def self_check() -> None:
    assert slugify("React 19 + Next.js build issue!") == "react-19-next-js-build-issue"
    assert slugify("...") == "note"
    folder = Path("/tmp/documentator-self-check")
    first = unique_path(folder, "2026-06-28", "Same Title")
    assert first.name == "2026-06-28-same-title.md"
    print("self-check passed")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Write an Obsidian-ready development note.")
    parser.add_argument("--self-check", action="store_true")
    parser.add_argument("--type", choices=sorted(TYPE_DIRS), default="issue")
    parser.add_argument("--title", default="")
    parser.add_argument("--context", default="")
    parser.add_argument("--decision", default="")
    parser.add_argument("--reuse", default="")
    parser.add_argument("--files", default="")
    args = parser.parse_args()
    if args.self_check:
        return args
    missing = [name for name in ("title", "context", "decision", "reuse") if not getattr(args, name)]
    if missing:
        parser.error(f"missing required note fields: {', '.join(missing)}")
    return args


def main() -> None:
    args = parse_args()
    if args.self_check:
        self_check()
        return
    path = write_note(args, Path.cwd())
    print(path)


if __name__ == "__main__":
    main()
```

- [ ] **Step 2: Make the script executable**

Run:

```bash
chmod +x /home/rappy/.codex/skills/documentator/scripts/write_note.py
```

Expected: command exits with status `0`.

- [ ] **Step 3: Run the self-check**

Run:

```bash
python3 /home/rappy/.codex/skills/documentator/scripts/write_note.py --self-check
```

Expected output:

```text
self-check passed
```

### Task 3: Verify a Sample Note

**Files:**
- Uses: `/home/rappy/.codex/skills/documentator/scripts/write_note.py`
- Creates during test: `/tmp/documentator-vault/Issues/<date>-sample-issue.md`

- [ ] **Step 1: Create a temporary project config**

Run from `/mnt/c/Users/Lenovo Pc/Desktop/portfolio_2026`:

```bash
printf '{\n  "vault": "/tmp/documentator-vault",\n  "project": "portfolio_2026"\n}\n' > .documentator.json
```

Expected: `.documentator.json` exists in the project root.

- [ ] **Step 2: Write a sample issue note**

Run:

```bash
python3 /home/rappy/.codex/skills/documentator/scripts/write_note.py \
  --type issue \
  --title "Sample issue" \
  --context "Testing the documentator note writer." \
  --decision "The helper writes Markdown with frontmatter." \
  --reuse "Use this when verifying the skill in another project." \
  --files "docs/superpowers/specs/2026-06-28-documentator-skill-design.md"
```

Expected output ends with:

```text
/tmp/documentator-vault/Issues/<current-date>-sample-issue.md
```

- [ ] **Step 3: Inspect the generated note**

Run:

```bash
sed -n '1,80p' /tmp/documentator-vault/Issues/*-sample-issue.md
```

Expected output includes:

```markdown
---
project: portfolio_2026
type: issue
```

and:

```markdown
## Reuse Later
Use this when verifying the skill in another project.
```

- [ ] **Step 4: Remove the temporary project config**

Run:

```bash
rm .documentator.json
```

Expected: repo status no longer shows `.documentator.json`.

### Task 4: Final Verification

**Files:**
- Read: `/home/rappy/.codex/skills/documentator/SKILL.md`
- Read: `/home/rappy/.codex/skills/documentator/scripts/write_note.py`

- [ ] **Step 1: Confirm skill files are outside the portfolio repo**

Run:

```bash
git status --short
```

Expected: no `documentator` skill files appear because they live under `/home/rappy/.codex/skills/`.

- [ ] **Step 2: Confirm the script works without project config**

Run from `/tmp`:

```bash
python3 /home/rappy/.codex/skills/documentator/scripts/write_note.py \
  --type pattern \
  --title "Default vault smoke test" \
  --context "Testing default vault resolution." \
  --decision "The script uses the default Developer-KB vault when no config exists." \
  --reuse "Use this to confirm cross-project behavior." \
  --files "/home/rappy/.codex/skills/documentator/SKILL.md"
```

Expected: output path starts with:

```text
/home/rappy/Documents/Obsidian/Developer-KB/Patterns/
```

- [ ] **Step 3: Report result**

Tell the user:

```text
Documentator is installed at /home/rappy/.codex/skills/documentator.
Default vault is /home/rappy/Documents/Obsidian/Developer-KB.
Per-project overrides use .documentator.json.
```
