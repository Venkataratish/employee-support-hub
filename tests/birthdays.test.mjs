import test from "node:test";
import assert from "node:assert/strict";
import { birthdaysToday, validateDirectory } from "../docs/birthday-core.js";

test("GitHub birthday directory validates and supports multiple birthdays", () => {
  const rows = validateDirectory({ version: 1, birthdays: [
    { id: "alex", name: "Alex", month: 10, day: 2 },
    { id: "morgan", name: "Morgan", month: 10, day: 2 },
  ] });
  assert.equal(rows.length, 2);
  assert.throws(() => validateDirectory({ version: 1, birthdays: [...rows, rows[0]] }));
});

test("birthday greetings appear only on the matching Eastern date", () => {
  const rows = validateDirectory({ version: 1, birthdays: [{ id: "alex", name: "Alex", month: 10, day: 2 }] });
  assert.equal(birthdaysToday(rows, new Date("2026-10-02T16:00:00Z")).length, 1);
  assert.equal(birthdaysToday(rows, new Date("2026-10-03T16:00:00Z")).length, 0);
});

test("February 29 birthdays appear February 28 in non-leap years", () => {
  const rows = validateDirectory({ version: 1, birthdays: [{ id: "leap", name: "Taylor", month: 2, day: 29 }] });
  assert.equal(birthdaysToday(rows, new Date("2027-02-28T17:00:00Z")).length, 1);
});
