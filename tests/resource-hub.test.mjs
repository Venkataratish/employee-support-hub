import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("resource data powers the dashboard metrics and filters", async () => {
  const page = await readFile(new URL("app/page.tsx", root), "utf8");
  const resources = [...page.matchAll(/title: "([^"]+)"/g)].map((match) => match[1]);
  const categories = new Set([...page.matchAll(/category: "([^"]+)"/g)].map((match) => match[1]));
  assert.equal(resources.length, 21);
  assert.equal(categories.size, 8);
  assert.match(page, /resources\.length/);
  assert.match(page, /new Set\(resources\.map/);
  assert.match(page, /resource\.category.*resource\.keywords/s);
  assert.match(page, /No resources found/);
});

test("resource actions and search are accessible", async () => {
  const page = await readFile(new URL("app/page.tsx", root), "utf8");
  assert.match(page, /aria-label="Search employee resources"/);
  assert.match(page, /aria-pressed=/);
  assert.match(page, /"Open resource"/);
  assert.match(page, />View instructions</);
  assert.match(page, /mailto:jamieson\.schmitt@adeccona\.com\?subject=Employee%20Resource%20Hub%20Question/);
  assert.match(page, /Have more questions\? Contact Jamie\./);
  assert.doesNotMatch(page, /target="_blank"|role="dialog"|aria-modal="true"/);
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
  assert.match(app, /Open resource/);
  assert.match(html, /mailto:jamieson\.schmitt@adeccona\.com/);
  assert.doesNotMatch(`${html}\n${app}`, /target=["']_blank["']|modalBackdrop/);
  assert.match(styles, /grid-template-columns:repeat\(4/);
  assert.doesNotMatch(`${html}\n${app}`, /lorem ipsum|demo content|placeholder text/i);
});
