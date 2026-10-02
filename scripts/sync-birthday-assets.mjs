import { copyFile, mkdir } from "node:fs/promises";
const root = new URL("../", import.meta.url);
export const birthdayAssets = ["birthday-core.js", "birthday-local.js", "birthday.css", "birthday-greeting.js", "birthday.html", "birthday-signup.js"];
await mkdir(new URL("public/", root), { recursive: true });
for (const name of [...birthdayAssets, "styles.css"]) await copyFile(new URL(`docs/${name}`, root), new URL(`public/${name}`, root));
