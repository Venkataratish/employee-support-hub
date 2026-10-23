import { copyFile, mkdir } from "node:fs/promises";
const root = new URL("../", import.meta.url);
export const birthdayAssets = ["birthday-core.js", "birthday.css", "birthday-greeting.js", "birthday.html"];
await mkdir(new URL("public/", root), { recursive: true });
for (const name of [...birthdayAssets, "styles.css"]) await copyFile(new URL(`docs/${name}`, root), new URL(`public/${name}`, root));
await mkdir(new URL("public/data/", root), { recursive: true });
await copyFile(new URL("docs/data/birthdays.json", root), new URL("public/data/birthdays.json", root));
