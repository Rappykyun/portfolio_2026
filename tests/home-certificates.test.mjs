import { readFile } from "node:fs/promises";
import test from "node:test";
import assert from "node:assert/strict";

test("home page renders certificates below experiences", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");

  assert.match(page, /import\s+\{\s*Certificates\s*\}\s+from\s+["']\.\/_components\/Certificates["'];/);
  assert.match(page, /<Experiences compact\s*\/>[\s\S]*<Certificates compact\s*\/>/);
});

test("certificates component includes editable certificate entries", async () => {
  const component = await readFile(
    new URL("../app/_components/Certificates.tsx", import.meta.url),
    "utf8",
  );

  assert.match(component, /export function Certificates/);
  assert.match(component, /const certificates: Certificate\[\]/);
  assert.match(component, /Certificates/);
  assert.match(component, /View Certificate/);
});

test("certificates component shows Ralph's DataCamp certificate", async () => {
  const component = await readFile(
    new URL("../app/_components/Certificates.tsx", import.meta.url),
    "utf8",
  );

  assert.match(component, /Data Engineer Associate/);
  assert.match(component, /DataCamp/);
  assert.match(component, /27 March 2026/);
  assert.match(component, /26 March 2028/);
  assert.match(component, /https:\/\/www\.datacamp\.com\/certificate\/DEA0018866705032/);
  assert.doesNotMatch(component, /Certificate Title/);
  assert.doesNotMatch(component, /Issuing Organization/);
}
);
