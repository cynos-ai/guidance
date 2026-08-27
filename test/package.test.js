import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
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
  assert.ok(pkg.keywords.includes("pi-package"));
  assert.ok(pkg.files.includes("README.md"));
  assert.ok(pkg.files.includes("README-zh-CN.md"));
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

test("Skill Markdown links resolve inside each Skill package", async () => {
  for (const name of expectedSkills) {
    const skillDir = path.join(root, "skills", name);
    const text = await readFile(path.join(skillDir, "SKILL.md"), "utf8");
    const links = [...text.matchAll(/\]\(([^)]+\.md)\)/g)].map((match) => match[1]);

    for (const link of links) {
      assert.equal(path.isAbsolute(link), false);
      await access(path.resolve(skillDir, link));
    }
  }
});

test("core guidance stays compact and routes both Skills", async () => {
  const core = await readFile(path.join(root, "principles/core.md"), "utf8");

  assert.ok(Buffer.byteLength(core) < 2000, "core guidance exceeds 2 KB");
  for (const name of expectedSkills) assert.match(core, new RegExp(`\\b${name}\\b`));
});

test("trigger cases cover activation, adjacency, conflict, and over-following boundaries", async () => {
  const cases = JSON.parse(await readFile(path.join(root, "test/trigger-cases.json"), "utf8"));

  assert.deepEqual(Object.keys(cases).sort(), expectedSkills);
  for (const name of expectedSkills) {
    for (const kind of [
      "positive",
      "negative",
      "adjacent",
      "ambiguous",
      "conflict",
      "over_following",
    ]) {
      assert.ok(Array.isArray(cases[name][kind]) && cases[name][kind].length > 0);
    }
  }
});

test("all prompt and Skill content is written in English", async () => {
  const files = [path.join(root, "principles/core.md")];

  for (const base of [path.join(root, "skills"), path.join(root, ".pi/skills")]) {
    const stack = [base];
    while (stack.length > 0) {
      const current = stack.pop();
      for (const entry of await readdir(current, { withFileTypes: true })) {
        const target = path.join(current, entry.name);
        if (entry.isDirectory()) stack.push(target);
        else if (entry.name.endsWith(".md")) files.push(target);
      }
    }
  }

  for (const file of files) {
    const text = await readFile(file, "utf8");
    assert.doesNotMatch(text, /[\u3400-\u9fff]/u, `${path.relative(root, file)} contains Chinese text`);
  }
});
