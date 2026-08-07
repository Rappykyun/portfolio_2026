# GitHub Contributions on the Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a responsive GitHub contribution calendar for `Rappykyun` to the homepage between Experience and Certificates.

**Architecture:** Add one client component that wraps `react-github-calendar` and owns the section heading, explanation, responsive overflow, and library error copy. Add the component to `app/page.tsx`; do not add a custom API route, token, data cache, year selector, or animation.

**Tech Stack:** Next.js 16.2.9 App Router, React 19, TypeScript, Tailwind CSS v4, `react-github-calendar` 5.x, Node's built in test runner.

## Global Constraints

* Use the public GitHub username `Rappykyun`.
* Show the library's default last year view.
* Private activity is only the anonymized contribution data exposed by GitHub after the profile setting is enabled.
* Do not add GitHub credentials, private repository data, or a server side GitHub integration.
* Place the section after `<Experiences compact />` and before `<Certificates compact />`.
* Use a semantic `h2`, readable copy, responsive horizontal overflow, and no custom animation.
* Read the relevant Next.js guide in `node_modules/next/dist/docs/` before implementation.
* Preserve the project's existing light and dark theme conventions.

---

### Task 1: Add the failing regression test

**Files:**
* Create: `tests/github-contributions.test.mjs`

**Interfaces:**
* Produces source level checks for the homepage placement and the new component's public interface.

* [ ] **Step 1: Write the failing test**

```js
import { readFile } from "node:fs/promises";
import test from "node:test";
import assert from "node:assert/strict";

const read = (path) =>
  readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("home page places GitHub contributions between experience and certificates", async () => {
  const page = await read("app/page.tsx");

  assert.match(
    page,
    /import\s+\{\s*GitHubContributions\s*\}\s+from\s+["']\.\/\_components\/GitHubContributions["'];/,
  );
  assert.match(
    page,
    /<Experiences compact\s*\/>[\s\S]*<GitHubContributions\s*\/>[\s\S]*<Certificates compact\s*\/>/,
  );
});

test("GitHub contributions use the approved public username", async () => {
  const component = await read("app/_components/GitHubContributions.tsx");

  assert.match(component, /import\s+\{\s*GitHubCalendar\s*\}\s+from\s+["']react-github-calendar["'];/);
  assert.match(component, /username=["']Rappykyun["']/);
  assert.match(component, /GitHub activity/);
});
```

* [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
node tests/github-contributions.test.mjs
```

Expected: FAIL because the homepage has no `GitHubContributions` import and the component file does not exist.

* [ ] **Step 3: Commit the failing specification**

```bash
git add tests/github-contributions.test.mjs
git commit -m "test: specify homepage github contributions"
```

### Task 2: Install the calendar and render the section

**Files:**
* Create: `app/_components/GitHubContributions.tsx`
* Modify: `app/page.tsx`
* Modify: `package.json`
* Modify: `package-lock.json`
* Test: `tests/github-contributions.test.mjs`

**Interfaces:**
* Consumes: `react-github-calendar` named export `GitHubCalendar` and the existing homepage layout.
* Produces: `GitHubContributions()` with no props, rendering a section headed `GitHub activity` for username `Rappykyun`.

* [ ] **Step 1: Install the dependency**

Run:

```bash
npm install react-github-calendar
```

Expected: `package.json` and `package-lock.json` add `react-github-calendar` without adding another calendar or data fetching package.

* [ ] **Step 2: Write the minimal component**

Create `app/_components/GitHubContributions.tsx` with:

```tsx
"use client";

import { GitHubCalendar } from "react-github-calendar";

export function GitHubContributions() {
  return (
    <section
      aria-labelledby="github-activity-title"
      className="rounded-2xl border border-zinc-200/70 bg-white/80 p-5 shadow-sm backdrop-blur-sm sm:rounded-3xl sm:p-7 dark:border-zinc-800/80 dark:bg-zinc-900/40"
    >
      <h2
        id="github-activity-title"
        className="font-incognito text-xl font-bold sm:text-2xl"
      >
        GitHub activity
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 sm:text-base">
        Public and anonymized private contributions from the last year.
      </p>
      <div className="mt-5 overflow-x-auto pb-2">
        <GitHubCalendar
          username="Rappykyun"
          errorMessage="GitHub activity is temporarily unavailable."
        />
      </div>
    </section>
  );
}
```

* [ ] **Step 3: Add the component to the homepage**

Update `app/page.tsx` by adding:

```tsx
import { GitHubContributions } from "./_components/GitHubContributions";
```

Render it in this order:

```tsx
<Hero />
<section className={sectionClass}>
  <TechStack compact />
</section>
<section className={sectionClass}>
  <Experiences compact />
</section>
<GitHubContributions />
<section className={sectionClass}>
  <Certificates compact />
</section>
```

* [ ] **Step 4: Run the focused test to verify it passes**

Run:

```bash
node tests/github-contributions.test.mjs
```

Expected: 2 tests pass with 0 failures.

* [ ] **Step 5: Commit the implementation**

```bash
git add app/_components/GitHubContributions.tsx app/page.tsx package.json package-lock.json
git commit -m "feat: add github activity to homepage"
```

### Task 3: Verify the complete branch

**Files:**
* Read: `app/page.tsx`
* Read: `app/_components/GitHubContributions.tsx`
* Test: `tests/home-certificates.test.mjs`
* Test: `tests/portfolio-trust.test.mjs`
* Test: `tests/github-contributions.test.mjs`

**Interfaces:**
* Verifies the merged homepage remains compatible with existing behavior and the new contribution section.

* [ ] **Step 1: Run all source tests**

```bash
node tests/home-certificates.test.mjs
node tests/portfolio-trust.test.mjs
node tests/github-contributions.test.mjs
```

Expected: 9 tests pass with 0 failures.

* [ ] **Step 2: Run lint**

```bash
npm run lint
```

Expected: exit status 0. The existing unused `Store` warning in `app/projects/[projectId]/page.tsx` may remain; do not expand this feature to fix unrelated warnings.

* [ ] **Step 3: Run the production build**

```bash
npm run build
```

Expected: Next.js compiles, TypeScript completes, and all listed routes generate successfully.

* [ ] **Step 4: Check the final diff**

```bash
git diff --check
git status --short
```

Expected: no whitespace errors and only the intended committed changes present.
