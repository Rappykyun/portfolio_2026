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
