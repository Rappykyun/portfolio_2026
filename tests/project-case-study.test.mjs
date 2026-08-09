import { readFile } from "node:fs/promises";
import test from "node:test";
import assert from "node:assert/strict";

const read = (path) =>
  readFile(new URL(`../${path}`, import.meta.url), "utf8");

const getChedRecord = (source) => {
  const start = source.indexOf('slug: "ched-elibrary"');
  const end = source.indexOf('slug: "global-gradient-code"');

  assert.notEqual(start, -1, "CHED record should exist");
  assert.notEqual(end, -1, "the next project should follow CHED");

  return source.slice(start, end);
};

test("shared project source defines the typed case study contract", async () => {
  const source = await read("lib/projects.ts");

  assert.match(source, /export interface ProjectRecord/);
  assert.match(source, /export interface ProjectCaseStudy/);
  assert.match(source, /export const projects = \[/);
  assert.match(source, /caseStudy\?: ProjectCaseStudy/);
});

test("CHED is an honest complete case study record with a temporary screenshot", async () => {
  const record = getChedRecord(await read("lib/projects.ts"));

  assert.match(record, /name: "CHED E-Library System"/);
  assert.match(record, /summary:/);
  assert.match(record, /role: "Fullstack Developer Intern"/);
  assert.match(record, /status: "Internship Project"/);
  assert.match(record, /context:/);
  assert.match(record, /whatWasBuilt:/);
  assert.match(record, /demonstrates:/);
  assert.match(record, /screenshotPath: null/);
  assert.match(record, /screenshotAlt:/);
  assert.match(record, /features:/);
  assert.match(record, /technology:/);
  assert.match(record, /demo: "https:\/\/elibrary\.ralphvincent\.tech"/);
  assert.match(record, /sourceCode: null/);
  assert.match(
    record,
    /credentialsNote:[\s\S]*government office during internship/,
  );
  assert.doesNotMatch(record, /status: "Deployed"/);
});

test("credentials notes stay scoped to truthful project records", async () => {
  const source = await read("lib/projects.ts");
  const farmstockStart = source.indexOf('slug: "farmstock"');
  const tritrackStart = source.indexOf('slug: "tritrack"');
  const accessGuardStart = source.indexOf('slug: "access-guard"');

  assert.notEqual(farmstockStart, -1, "Farmstock record should exist");
  assert.notEqual(tritrackStart, -1, "TriTrack record should exist");
  assert.notEqual(accessGuardStart, -1, "the next project should follow TriTrack");

  assert.doesNotMatch(
    source.slice(farmstockStart, tritrackStart),
    /credentialsNote:/,
  );
  assert.doesNotMatch(
    source.slice(tritrackStart, accessGuardStart),
    /credentialsNote:/,
  );
});

test("project list and detail route read from the shared source", async () => {
  const [list, detail] = await Promise.all([
    read("app/projects/page.tsx"),
    read("app/projects/[projectId]/page.tsx"),
  ]);

  assert.match(list, /import \{ projects \} from "@\/lib\/projects"/);
  assert.match(list, /projects\.map/);
  assert.match(detail, /import \{ getProjectBySlug \} from "@\/lib\/projects"/);
  assert.match(detail, /getProjectBySlug\(projectId\)/);
});

test("reusable evidence screenshot defines a stable responsive contract", async () => {
  const component = await read("app/_components/EvidenceScreenshot.tsx");

  assert.match(component, /^"use client";/);
  assert.match(component, /export interface EvidenceScreenshotProps/);
  assert.match(component, /screenshotPath: string \| null/);
  assert.match(component, /screenshotAlt: string/);
  assert.match(component, /aspect-video/);
  assert.match(
    component,
    /sizes="\(max-width: 640px\) calc\(100vw - 5rem\), \(max-width: 1024px\) calc\(100vw - 9\.5rem\), 872px"/,
  );
});

test("CHED uses the reusable evidence screenshot with project data", async () => {
  const detail = await read("app/projects/[projectId]/page.tsx");

  assert.match(
    detail,
    /import \{ EvidenceScreenshot \} from "@\/app\/_components\/EvidenceScreenshot";/,
  );
  assert.match(detail, /Project screenshot/);
  assert.match(
    detail,
    /<EvidenceScreenshot[\s\S]*screenshotPath=\{caseStudy\.screenshotPath\}[\s\S]*screenshotAlt=\{caseStudy\.screenshotAlt\}/,
  );
  assert.doesNotMatch(detail, /<Image\b/);
});

test("missing screenshot renders a neutral accessible placeholder", async () => {
  const component = await read("app/_components/EvidenceScreenshot.tsx");

  assert.match(component, /Screenshot coming soon/);
  assert.match(component, /Temporary screenshot placeholder/);
  assert.doesNotMatch(component, /role="status"/);
  assert.doesNotMatch(component, /aria-live/);
  assert.doesNotMatch(component, /role="img"/);
  assert.doesNotMatch(component, /aria-label=\{screenshotAlt\}/);
});

test("configured screenshot uses its path and meaningful alternative text", async () => {
  const component = await read("app/_components/EvidenceScreenshot.tsx");

  assert.match(component, /src=\{activeScreenshotPath\}/);
  assert.match(component, /alt=\{screenshotAlt\}/);
  assert.match(component, /activeScreenshotPath =/);
  assert.match(component, /key=\{activeScreenshotPath\}/);
});

test("image state resets when the screenshot path changes", async () => {
  const component = await read("app/_components/EvidenceScreenshot.tsx");

  assert.match(component, /useState<string \| null>\(\s*null/);
  assert.match(
    component,
    /useEffect\(\(\) => \{\s*startTransition\(\(\) => setFailedScreenshotPath\(null\)\);\s*\}, \[screenshotPath\]\)/,
  );
  assert.match(component, /failedScreenshotPath === screenshotPath/);
  assert.match(
    component,
    /onError=\{\(\) => setFailedScreenshotPath\(activeScreenshotPath\)\}/,
  );
  assert.match(component, /activeScreenshotPath \? /);
});

test("configured screenshot failures use clear visible copy", async () => {
  const component = await read("app/_components/EvidenceScreenshot.tsx");

  assert.match(component, /screenshotLoadFailed/);
  assert.match(component, /Screenshot unavailable/);
  assert.match(component, /The configured screenshot could not be loaded\./);
});

test("loaded screenshot captions complement the detailed alternative text", async () => {
  const component = await read("app/_components/EvidenceScreenshot.tsx");
  const caption = component.slice(component.indexOf("<figcaption"));

  assert.match(caption, /Project screenshot shown above\./);
  assert.doesNotMatch(caption, /screenshotAlt/);
});
