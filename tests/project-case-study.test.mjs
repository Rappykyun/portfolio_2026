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

test("missing CHED screenshot renders a neutral accessible placeholder", async () => {
  const detail = await read("app/projects/[projectId]/page.tsx");

  assert.match(detail, /caseStudy\.screenshotPath \?/);
  assert.match(detail, /Project screenshot/);
  assert.match(detail, /Screenshot coming soon/);
  assert.match(detail, /Temporary screenshot placeholder/);
  assert.doesNotMatch(detail, /role="img"/);
  assert.doesNotMatch(detail, /aria-label=\{caseStudy\.screenshotAlt\}/);
});
