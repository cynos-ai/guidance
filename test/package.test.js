import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const root = path.resolve(import.meta.dirname, "..");
const expectedSkills = new Map([
  ["decision-support", "skills/communication/decision-support/SKILL.md"],
  ["engineering-judgment", "skills/engineering/engineering-judgment/SKILL.md"],
  ["guided-discovery", "skills/communication/guided-discovery/SKILL.md"],
  ["stress-test", "skills/communication/stress-test/SKILL.md"],
]);
const requiredProbeBoundaries = ["positive", "adjacent", "conflict", "over_following"];
const allowedProbeBoundaries = new Set([
  ...requiredProbeBoundaries,
  "negative",
  "ambiguous",
]);

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

async function findFiles(base, predicate) {
  const files = [];
  const stack = [base];
  while (stack.length > 0) {
    const current = stack.pop();
    for (const entry of await readdir(current, { withFileTypes: true })) {
      const target = path.join(current, entry.name);
      if (entry.isDirectory()) stack.push(target);
      else if (predicate(target, entry)) files.push(target);
    }
  }
  return files.sort();
}

async function discoverSkills() {
  const files = await findFiles(
    path.join(root, "skills"),
    (_target, entry) => entry.name === "SKILL.md",
  );
  return files.map((file) => {
    const relative = path.relative(root, file);
    return { file, relative };
  });
}

test("package exposes one Pi extension and the recursive Skill root", async () => {
  const pkg = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));

  assert.deepEqual(pkg.pi.extensions, ["./extensions/pi.js"]);
  assert.deepEqual(pkg.pi.skills, ["./skills"]);
  assert.ok(pkg.keywords.includes("pi-package"));
  assert.ok(pkg.files.includes("README.md"));
  assert.ok(pkg.files.includes("README-zh-CN.md"));
  assert.equal(pkg.files.includes(".pi/"), false);
});

test("public Skill families contain exactly the expected recursively discovered Skills", async () => {
  const families = (await readdir(path.join(root, "skills"))).sort();
  assert.deepEqual(families, ["communication", "engineering"]);

  for (const family of families) {
    await assert.rejects(
      access(path.join(root, "skills", family, "SKILL.md")),
      { code: "ENOENT" },
      `${family} must be a grouping directory, not a Skill`,
    );
  }

  const discovered = await discoverSkills();
  assert.equal(discovered.length, expectedSkills.size);

  const descriptions = new Set();
  const names = new Set();
  for (const { file, relative } of discovered) {
    const text = await readFile(file, "utf8");
    const frontmatter = parseFrontmatter(text);

    assert.deepEqual(Object.keys(frontmatter), ["name", "description"]);
    assert.match(frontmatter.name, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.equal(path.basename(path.dirname(file)), frontmatter.name);
    assert.equal(expectedSkills.get(frontmatter.name), relative);
    assert.match(frontmatter.description, /^Use (when|for) /);
    assert.ok(frontmatter.description.length <= 1024);
    assert.ok(text.split("\n").length < 500);
    assert.equal(names.has(frontmatter.name), false, `duplicate Skill: ${frontmatter.name}`);

    names.add(frontmatter.name);
    descriptions.add(frontmatter.description);
  }

  assert.deepEqual([...names].sort(), [...expectedSkills.keys()].sort());
  assert.equal(descriptions.size, expectedSkills.size);
});

test("Skill Markdown links stay inside and resolve within each Skill package", async () => {
  for (const { file } of await discoverSkills()) {
    const skillDir = path.dirname(file);
    const text = await readFile(file, "utf8");
    const links = [...text.matchAll(/\]\(([^)]+\.md)\)/g)].map((match) => match[1]);

    for (const link of links) {
      assert.equal(path.isAbsolute(link), false);
      const resolved = path.resolve(skillDir, link);
      assert.ok(resolved.startsWith(`${skillDir}${path.sep}`));
      await access(resolved);
    }
  }
});

test("README links resolve inside the repository", async () => {
  for (const name of ["README.md", "README-zh-CN.md"]) {
    const text = await readFile(path.join(root, name), "utf8");
    const links = [...text.matchAll(/\]\(([^)]+)\)/g)].map((match) => match[1]);

    for (const link of links) {
      if (/^(?:https?:|mailto:|#)/.test(link)) continue;
      const relative = link.split("#", 1)[0];
      const resolved = path.resolve(root, relative);
      assert.ok(resolved.startsWith(`${root}${path.sep}`));
      await access(resolved);
    }
  }
});

test("core guidance stays cross-domain, compact, and free of manual Skill routing", async () => {
  const core = await readFile(path.join(root, "principles/core.md"), "utf8");

  assert.ok(Buffer.byteLength(core) < 2000, "core guidance exceeds 2 KB");
  for (const name of expectedSkills.keys()) {
    assert.doesNotMatch(core, new RegExp(`\\b${name}\\b`));
  }
});

test("behavior probe inventory has valid Skill names and boundary coverage", async () => {
  const inventory = JSON.parse(
    await readFile(path.join(root, "evaluations/behavior-probes.json"), "utf8"),
  );

  assert.equal(inventory.version, 1);
  assert.ok(Array.isArray(inventory.probes) && inventory.probes.length > 0);

  const ids = new Set();
  const coverage = new Map([...expectedSkills.keys()].map((name) => [name, new Set()]));
  const globalBoundaries = new Set();

  for (const probe of inventory.probes) {
    assert.match(probe.id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.equal(ids.has(probe.id), false, `duplicate probe: ${probe.id}`);
    assert.ok(expectedSkills.has(probe.focusSkill));
    assert.ok(allowedProbeBoundaries.has(probe.boundary));
    assert.ok(Array.isArray(probe.turns) && probe.turns.length > 0);
    assert.ok(Array.isArray(probe.expectedSkills));
    assert.ok(Array.isArray(probe.expectedBehavior) && probe.expectedBehavior.length > 0);
    assert.ok(Array.isArray(probe.forbiddenBehavior) && probe.forbiddenBehavior.length > 0);

    for (const name of probe.expectedSkills) assert.ok(expectedSkills.has(name));
    ids.add(probe.id);
    coverage.get(probe.focusSkill).add(probe.boundary);
    globalBoundaries.add(probe.boundary);
  }

  for (const [name, boundaries] of coverage) {
    for (const boundary of requiredProbeBoundaries) {
      assert.ok(boundaries.has(boundary), `${name} lacks ${boundary} coverage`);
    }
  }
  for (const boundary of allowedProbeBoundaries) {
    assert.ok(globalBoundaries.has(boundary), `inventory lacks ${boundary} coverage`);
  }
});

test("all prompt and Skill content is written in English", async () => {
  const files = [path.join(root, "principles/core.md")];

  for (const base of [path.join(root, "skills"), path.join(root, ".pi/skills")]) {
    files.push(...await findFiles(base, (target) => target.endsWith(".md")));
  }

  for (const file of files) {
    const text = await readFile(file, "utf8");
    assert.doesNotMatch(text, /[\u3400-\u9fff]/u, `${path.relative(root, file)} contains Chinese text`);
  }
});
