# Cynos Guidance

Portable engineering judgment and project communication guidance for AI coding agents.

Cynos Guidance keeps the always-on prompt small, then loads cohesive Agent Skills when a task needs more context. It teaches durable judgment rather than prescribing one framework, repository layout, or step-by-step engineering process.

Pi is the first supported harness. The guidance content remains harness-neutral so other adapters can be added without rewriting it.

## What it includes

### Always-on core

The Pi extension injects a compact set of principles from [`principles/core.md`](principles/core.md):

- inspect actual project context before assuming;
- fit changes to existing responsibility boundaries;
- prefer the simplest complete solution;
- preserve safety, compatibility, and explicit failure handling;
- verify claims and stop when the requested outcome is complete;
- explain project work from user-observable behavior toward implementation detail.

### Skills

| Skill | Responsibility |
|---|---|
| [`engineering-judgment`](skills/engineering-judgment/SKILL.md) | Guide substantive software design, change, diagnosis, refactoring, optimization, migration, and verification as one coherent engineering job. |
| [`project-owner-communication`](skills/project-owner-communication/SKILL.md) | Explain project behavior and conceptual architecture to a domain-expert owner who does not work from code or internal project names. |

The Skills are independent: one shapes engineering work, the other shapes conversation. They may activate together without depending on each other.

## Install

From GitHub:

```bash
pi install https://github.com/cynos-ai/guidance
```

After the first npm release:

```bash
pi install npm:@cynos-ai/guidance
```

Restart Pi after installation. Use `pi config` to inspect or disable individual resources.

## Package behavior

The package contributes:

- one Pi extension: `extensions/pi.js`;
- one compact always-on guidance block;
- two standard Agent Skills under `skills/`.

The extension only modifies the system prompt. It registers no tools, accesses no network, edits no project files, and treats prompt guidance as advice rather than a security boundary.

Project-maintenance Skills under `.pi/skills/` are not included in the npm package.

## Non-goals

Cynos Guidance is not:

- a complete coding-agent runtime;
- a framework-specific best-practices handbook;
- a repository's project memory;
- a workflow or approval engine;
- a substitute for tests, permissions, sandboxing, or review;
- a guarantee that every model follows prompts identically.

## Development

Requirements: Node.js 22.19 or newer.

```bash
npm install
npm test
npm run pack:dry-run
```

The tests validate Pi prompt injection, Skill metadata and cohesion boundaries, trigger-case coverage, and the public package surface.

## License

[MIT](LICENSE)
