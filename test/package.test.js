import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const root = path.resolve(import.meta.dirname, "..");
const expectedSkills = ["engineering-judgment", "project-owner-communication"];

function parseFrontmatter(text) {
  const match = text.match(/^---\n([\s\S]*?)\n---\n/);
  assert.ok(match, "SKILL.md must start with YAML frontmatter");

  const entries = match[1].split("\n").map((line) => {
    const separator = line.indexOf(":");
    assert.notEqual(separator, -1, `Malformed frontmatter line: ${line}`);
    return [
      line.slice(0, separator),
      line.slice(separator + 1).trim().replace(/^"|"$/g, ""),
    ];
  });
  return Object.fromEntries(entries);
}

test("package exposes one Pi extension and only shipped Skills", async () => {
  const pkg = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));

  assert.deepEqual(pkg.pi.extensions, ["./extensions/pi.js"]);
  assert.deepEqual(pkg.pi.skills, ["./skills"]);
  assert.equal(pkg.files.includes(".pi/"), false);
});

test("shipped Skills have valid, distinct discovery metadata", async () => {
  const names = (await readdir(path.join(root, "skills"))).sort();
  assert.deepEqual(names, expectedSkills);

  const descriptions = [];
  for (const name of names) {
    const text = await readFile(path.join(root, "skills", name, "SKILL.md"), "utf8");
    const frontmatter = parseFrontmatter(text);

    assert.deepEqual(Object.keys(frontmatter), ["name", "description"]);
    assert.equal(frontmatter.name, name);
    assert.match(name, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.match(frontmatter.description, /^Use (when|for) /);
    assert.ok(text.split("\n").length < 500);
    descriptions.push(frontmatter.description);
  }

  assert.notEqual(descriptions[0], descriptions[1]);
});

test("core guidance stays compact and routes both Skills", async () => {
  const core = await readFile(path.join(root, "principles/core.md"), "utf8");

  assert.ok(Buffer.byteLength(core) < 2000, "core guidance exceeds 2 KB");
  for (const name of expectedSkills) assert.match(core, new RegExp(`\\b${name}\\b`));
});

test("trigger cases cover positive, negative, adjacent, and ambiguous boundaries", async () => {
  const cases = JSON.parse(await readFile(path.join(root, "test/trigger-cases.json"), "utf8"));

  assert.deepEqual(Object.keys(cases).sort(), expectedSkills);
  for (const name of expectedSkills) {
    for (const kind of ["positive", "negative", "adjacent", "ambiguous"]) {
      assert.ok(Array.isArray(cases[name][kind]) && cases[name][kind].length > 0);
    }
  }
});
