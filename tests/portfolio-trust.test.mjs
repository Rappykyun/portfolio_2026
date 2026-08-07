import { readFile } from "node:fs/promises";
import test from "node:test";
import assert from "node:assert/strict";

const read = (path) =>
  readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("contact page gives users a real email path instead of fake success", async () => {
  const page = await read("app/contact/page.tsx");

  assert.match(page, /mailto:ralphvincentrodriguez@sksu\.edu\.ph/);
  assert.match(page, /Open Email|Email me directly/);
  assert.doesNotMatch(page, /handleSubmit|isSubmitted|Thanks for your message/);
});

test("hero does not link to a missing CV download", async () => {
  const hero = await read("app/_components/Hero.tsx");

  assert.doesNotMatch(hero, /href=["']\/cv\.pdf["']/);
});

test("metadata uses the deployed domain and an existing social image", async () => {
  const layout = await read("app/layout.tsx");

  assert.match(layout, /https:\/\/ralphvincent\.tech/);
  assert.doesNotMatch(layout, /your-domain\.com/);
  assert.match(layout, /portfolio_pic_v2\.png/);
});

test("robots and sitemap use the deployed domain", async () => {
  const [robots, sitemap] = await Promise.all([
    read("public/robots.txt"),
    read("public/sitemap.xml"),
  ]);

  assert.match(robots, /https:\/\/ralphvincent\.tech\/sitemap\.xml/);
  assert.match(sitemap, /https:\/\/ralphvincent\.tech\//);
  assert.doesNotMatch(`${robots}\n${sitemap}`, /your-domain\.com/);
});
