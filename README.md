[English](README.md) | [简体中文](README-zh-CN.md)

# Cynos Guidance

Portable engineering judgment and project communication guidance for AI coding agents.

Cynos Guidance is a Pi package that combines a small always-on system guidance block with cohesive Agent Skills. It teaches durable judgment rather than prescribing one framework, repository layout, or detailed engineering workflow.

Pi is the first supported harness. The guidance content remains harness-neutral so future adapters can reuse it without rewriting the principles or Skills.

## Install and update with Pi

Install the published npm package:

```bash
pi install npm:@cynos-ai/guidance
```

Update it later:

```bash
pi update npm:@cynos-ai/guidance
```

To update all installed Pi packages instead:

```bash
pi update --extensions
```

You can also install the current GitHub version:

```bash
pi install https://github.com/cynos-ai/guidance
```

Restart Pi after installation. Use `pi config` to inspect or disable individual resources.

## How the Pi package works

`package.json` declares one extension and the public Skills:

```json
{
  "pi": {
    "extensions": ["./extensions/pi.js"],
    "skills": ["./skills"]
  }
}
```

The extension injects [`principles/core.md`](principles/core.md) into the system prompt once per turn and uses a stable marker to avoid duplicate injection. Pi discovers the two standard Agent Skills under `skills/`.

The extension registers no tools, accesses no network, and edits no project files. Prompt guidance is advice, not a security or authorization boundary.

## Included guidance

### Always-on core

The compact core asks the agent to:

- inspect actual project context before assuming;
- fit changes to existing responsibility boundaries;
- prefer the simplest complete solution;
- preserve safety, compatibility, and explicit failure handling;
- verify claims and stop when the requested outcome is complete;
- explain project work from user-observable behavior toward implementation detail.

### Skills

| Skill | Responsibility |
|---|---|
| [`engineering-judgment`](skills/engineering-judgment/SKILL.md) | Guide software design, change, diagnosis, refactoring, optimization, migration, and verification as one coherent engineering job. |
| [`project-owner-communication`](skills/project-owner-communication/SKILL.md) | Explain, research, jointly shape, decide, or stress-test project direction with a domain-expert owner who does not work from code or internal project names. |

The communication Skill combines one outcome-first presentation kernel with on-demand dialogue modes for Socratic discovery and decisions, technical research briefings, and rigorous stress tests such as grilling or premortems. This avoids competing Skills imposing different question cadence on the same conversation.

The two public Skills remain independent: one shapes engineering work, and the other shapes owner-facing conversation. They can activate together without depending on each other.

Project-maintenance Skills under `.pi/skills/` help maintain Cynos Guidance itself and are excluded from the npm package.

## Design boundary

Cynos Guidance favors:

- portable judgment over technology-specific recipes;
- a small permanent prompt plus on-demand detail;
- cohesive Skills organized by user intent;
- observable behavior, explicit boundaries, and clear stop conditions;
- English for all system guidance and Skill content.

It is not:

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
npm run verify
npm run pack:dry-run
```

The tests validate Pi prompt injection, Skill metadata and cohesion boundaries, trigger-case coverage, English-only prompt and Skill content, and the public package surface.

## Release

Releases use npm Trusted Publishing through [`.github/workflows/release.yml`](.github/workflows/release.yml). Configure the npm Trusted Publisher with:

- GitHub organization or user: `cynos-ai`;
- repository: `guidance`;
- workflow filename: `release.yml`;
- environment: leave empty;
- allowed action: `npm publish`.

After configuration, pushing a version tag such as `v0.1.0` verifies the package, publishes it to npm, and creates a GitHub Release containing the tarball.

## License

[MIT](LICENSE)
