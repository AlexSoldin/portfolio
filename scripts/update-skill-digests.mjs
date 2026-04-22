#!/usr/bin/env node
// Refresh sha256 digests in public/.well-known/agent-skills/index.json
// so they match the current SKILL.md file contents.

import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const indexPath = resolve(root, "public/.well-known/agent-skills/index.json");
const publicDir = resolve(root, "public");

const index = JSON.parse(await readFile(indexPath, "utf8"));

for (const skill of index.skills) {
  const pathname = new URL(skill.url).pathname;
  const filePath = resolve(publicDir, `.${pathname}`);
  const content = await readFile(filePath);
  skill.sha256 = createHash("sha256").update(content).digest("hex");
}

await writeFile(indexPath, `${JSON.stringify(index, null, 2)}\n`);
console.log(`Updated ${index.skills.length} skill digests in ${indexPath}`);
