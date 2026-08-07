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

test("GitHub contributions keep the approved default range and anonymized copy", async () => {
  const component = await read("app/_components/GitHubContributions.tsx");
  const calendarMatch = component.match(/<GitHubCalendar\b([\s\S]*?)\/>/);

  assert.ok(calendarMatch, "the component should render GitHubCalendar");
  assert.doesNotMatch(calendarMatch[1], /\byear\s*=/);
  assert.match(
    component,
    /Public and anonymized private contributions from the last year\./,
  );
});

test("GitHub contributions keep semantic responsive and dark theme structure", async () => {
  const component = await read("app/_components/GitHubContributions.tsx");

  assert.match(
    component,
    /<h2\b[^>]*\bid=["']github-activity-title["'][^>]*>\s*GitHub activity\s*<\/h2>/,
  );
  assert.match(
    component,
    /<div\b[^>]*className=["'][^"']*\boverflow-x-auto\b[^"']*["'][^>]*>\s*<GitHubCalendar\b/,
  );
  assert.match(component, /\bdark:border-zinc-800\/80\b/);
  assert.match(component, /\bdark:bg-zinc-900\/40\b/);
  assert.match(component, /\bdark:text-zinc-400\b/);
});

test("GitHub calendar follows the portfolio theme class", async () => {
  const component = await read("app/_components/GitHubContributions.tsx");

  assert.match(component, /MutationObserver/);
  assert.match(component, /classList\.contains\(["']dark["']\)/);
  assert.match(component, /colorScheme=\{colorScheme\}/);
});

test("GitHub contributions do not add custom animation or server fetching", async () => {
  const component = await read("app/_components/GitHubContributions.tsx");

  assert.doesNotMatch(component, /\bfetch\s*\(/);
  assert.doesNotMatch(component, /["']use server["']/);
  assert.doesNotMatch(component, /\b(?:token|api[-_]?key|authorization|secret)\b/i);
  assert.doesNotMatch(
    component,
    /\b(?:animate|animation|motion|transition)\b|@keyframes|requestAnimationFrame/i,
    "the component should not add custom animation or motion code",
  );
});
