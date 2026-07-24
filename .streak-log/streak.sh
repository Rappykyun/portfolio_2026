#!/bin/bash
# Portfolio 2026 — daily streak keeper
# Adds a lightweight daily entry and pushes to keep GitHub streak alive
# Portfolio source code is NEVER modified.

REPO_DIR="/root/portfolio_2026"
STREAK_FILE="$REPO_DIR/.streak-log/daily.md"
DATE=$(date +%Y-%m-%d)
TIME=$(date '+%I:%M %p %Z')
DAY_OF_WEEK=$(date +%A)

# Random commit messages to keep things fresh
MESSAGES=(
  "daily log: $DATE"
  "streak: $DATE"
  "chore: $DATE streak"
  "📅 $DATE"
  "day $(date +%j): $DATE"
  "$DAY_OF_WEEK — $DATE"
)

QUOTES=(
  "Consistency > intensity."
  "Small steps every day."
  "Build in public."
  "Commitment over motivation."
  "Trust the process."
  "One day at a time."
  "The secret is showing up."
  "Plant seeds daily."
  "No zero days."
  "Just ship."
  "Progress over perfection."
  "Discipline = freedom."
  "Compound effort."
  "Stay consistent."
  "Chop wood, carry water."
  "Focus on the process."
  "Brick by brick."
  "Iterate daily."
  "Keep shipping."
  "Momentum matters."
)

RAND=$((RANDOM % ${#MESSAGES[@]}))
RAND_Q=$((RANDOM % ${#QUOTES[@]}))
MSG="${MESSAGES[$RAND]}"
QUOTE="${QUOTES[$RAND_Q]}"

cd "$REPO_DIR" || exit 1

# Append entry
cat >> "$STREAK_FILE" << EOF

## $DATE

- **$TIME** — ${QUOTE}
EOF

# Commit and push
git add -A 2>/dev/null
git commit -m "$MSG"
git push origin main 2>&1

echo "✅ Streak commit pushed: $MSG"
