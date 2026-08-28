[English](README.md) | [简体中文](README-zh-CN.md)

# Cynos Guidance

Portable system guidance and cohesive on-demand Skills for AI agents.

Cynos Guidance is a Pi package that combines a small cross-domain system guidance block with independently triggered Agent Skills. The core establishes a consistent behavior and communication baseline; Skills add deeper dialogue or domain judgment only when a task needs them.

Pi is the first supported harness. The content remains harness-neutral so future adapters can reuse it without rewriting the guidance or Skills.

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

## How it composes

```text
Domain Skill      → what task work and evidence are required
Dialogue Skill    → how a particular conversation advances
Always-on core    → how every response is grounded and presented
User instruction → explicit depth, cadence, and artifact format
```

The layers compose without depending on each other. For example, a software migration choice may use both `engineering-judgment` and `decision-support`, while a purchasing decision may use only `decision-support`.

## Always-on core

The Pi extension injects [`principles/core.md`](principles/core.md) once per turn. The compact core asks the agent to:

- ground claims in available context;
- preserve the user's intended outcome rather than narrowing it to a convenient mechanism;
- match the user's domain knowledge and lead with the useful answer;
- disclose mechanisms and evidence progressively;
- distinguish facts, inferences, recommendations, unknowns, and blockers;
- propagate user corrections through dependent conclusions;
- ask only path-changing questions and avoid ceremonial confirmation;
- preserve requested artifact conventions, safety boundaries, and truthful verification;
- stop when the requested outcome is satisfied.

## Skills

Pi recursively discovers the public Skills under `skills/`.

### Communication

Communication Skills are domain-neutral and organized by dialogue intent.

| Skill | Responsibility |
|---|---|
| [`guided-discovery`](skills/communication/guided-discovery/SKILL.md) | Clarify an ambiguous goal, problem, idea, requirement, or desired outcome through guided questions and stable end-to-end modeling when needed. |
| [`decision-support`](skills/communication/decision-support/SKILL.md) | Organize a defined choice using criteria, evidence, trade-offs, a recommendation, and bounded validation needs. |
| [`stress-test`](skills/communication/stress-test/SKILL.md) | Challenge an existing plan, argument, strategy, or design using focused assumption probes, adverse scenarios, premortems, or alternatives. |

### Engineering

Domain Skills own task judgment in a declared domain.

| Skill | Responsibility |
|---|---|
| [`engineering-judgment`](skills/engineering/engineering-judgment/SKILL.md) | Guide software design, change, diagnosis, refactoring, optimization, migration, and verification as one coherent engineering job. |

Project-maintenance Skills under `.pi/skills/` help maintain Cynos Guidance itself and are excluded from the npm package.

## Migrating from 0.1.x

Version `0.2.0` removes `project-owner-communication` without a compatibility alias. Its responsibilities move as follows:

| Previous use | New owner |
|---|---|
| Ordinary explanations, change reports, and failure descriptions | Always-on core; no Skill command required |
| Clarifying a goal, outcome, or boundary | `guided-discovery` |
| Choosing among options, vendors, models, or routes | `decision-support` |
| Grilling, red-teaming, or running a premortem on a proposal | `stress-test` |

The `engineering-judgment` Skill name remains unchanged. Its nested package path does not change `/skill:engineering-judgment` or automatic activation.

## Package behavior

`package.json` declares one extension and one recursive Skill root:

```json
{
  "pi": {
    "extensions": ["./extensions/pi.js"],
    "skills": ["./skills"]
  }
}
```

The extension only modifies the system prompt. It registers no tools, accesses no network, and edits no project files. Prompt guidance is advice, not a security or authorization boundary.

## Design boundary

Cynos Guidance favors:

- a small permanent baseline plus on-demand detail;
- Skills with independent triggers and standalone outcomes;
- communication modes separated from domain task judgment;
- portable judgment over technology-specific recipes;
- observable behavior, explicit evidence boundaries, and clear stop conditions;
- English for all shipped system guidance and Skill content.

It is not:

- a complete agent runtime or universal Skill marketplace;
- a fixed conversation framework applied to every request;
- a framework-specific engineering handbook;
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

Deterministic tests validate package structure, prompt injection, Skill metadata, links, language, and behavior-probe schema. [`evaluations/behavior-probes.json`](evaluations/behavior-probes.json) is a qualitative review inventory; CI does not claim to test model routing or response quality.

## Release

Releases use npm Trusted Publishing through [`.github/workflows/release.yml`](.github/workflows/release.yml). Configure the npm Trusted Publisher with:

- GitHub organization or user: `cynos-ai`;
- repository: `guidance`;
- workflow filename: `release.yml`;
- environment: leave empty;
- allowed action: `npm publish`.

After configuration, pushing a version tag such as `vX.Y.Z` verifies the package, publishes it to npm, and creates a GitHub Release containing the tarball.

## License

[MIT](LICENSE)
