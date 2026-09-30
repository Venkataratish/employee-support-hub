import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("resource data powers the dashboard metrics and filters", async () => {
  const page = await readFile(new URL("app/page.tsx", root), "utf8");
  const resources = [...page.matchAll(/title: "([^"]+)"/g)].map((match) => match[1]);
  const categories = new Set([...page.matchAll(/category: "([^"]+)"/g)].map((match) => match[1]));
  assert.equal(resources.length, 20);
  assert.equal(categories.size, 8);
  assert.match(page, /resources\.length/);
  assert.match(page, /new Set\(resources\.map/);
  assert.match(page, /resource\.category.*resource\.keywords/s);
  assert.match(page, /No resources found/);
});

test("resource details and search are accessible", async () => {
  const page = await readFile(new URL("app/page.tsx", root), "utf8");
  assert.match(page, /aria-label="Search employee resources"/);
  assert.match(page, /aria-pressed=/);
  assert.match(page, /role="dialog"/);
  assert.match(page, /aria-modal="true"/);
  assert.match(page, /event\.key === "Escape"/);
  assert.match(page, /Close resource details/);
});

test("public GitHub Pages build stays synchronized", async () => {
  const [html, app, styles] = await Promise.all([
    readFile(new URL("docs/index.html", root), "utf8"),
    readFile(new URL("docs/app.js", root), "utf8"),
    readFile(new URL("docs/styles.css", root), "utf8"),
  ]);
  assert.match(html, /Adecco Employee Resource Hub/);
  assert.match(html, /id="overview"/);
  assert.match(html, /id="search"/);
  assert.match(app, /const resources = \[/);
  assert.match(app, /elements\.empty/);
  assert.match(styles, /grid-template-columns:repeat\(4/);
  assert.doesNotMatch(`${html}\n${app}`, /lorem ipsum|demo content|placeholder text/i);
});
