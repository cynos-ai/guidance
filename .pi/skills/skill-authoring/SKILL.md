---
name: skill-authoring
description: "Use when a Skill is already the chosen form and you need to create, maintain, consolidate, split, or audit its SKILL.md, trigger description, references, scripts, assets, and public distribution boundary."
---

# Skill authoring

Create Skills as cohesive behavior packages, not collections of related advice.

Use `guidance-authoring` first when the content's permanent placement is still undecided. This Skill starts after a Skill is the chosen form.

## Core design

- **One job per Skill.** Define the user intent or agent job the Skill owns in one sentence.
- **Cohesion before size.** Keep entry conditions, judgment branches, and exit conditions together when they serve the same job. A longer cohesive Skill is better than several fragments that always co-trigger.
- **Independent triggering before splitting.** Split only when each part has a distinct trigger, produces a useful result alone, and does not require another Skill to complete its normal flow.
- **No overlapping ownership.** Search existing Skills before adding one. Extend the current owner when the new behavior shares its trigger and outcome.
- **Progressive disclosure.** Frontmatter is always visible, `SKILL.md` loads on activation, and bundled references load only when needed.
- **Match precision to risk.** Use broad judgment for open-ended work and exact steps or scripts only for fragile, repetitive, consistency-critical operations.
- **Context is shared.** Keep only instructions that materially change behavior. Remove explanation the agent can already infer.

## Required workflow

1. State the Skill's job in one sentence.
2. Write concrete prompts that should activate it, should not activate it, and sit next to its boundary.
3. Search shipped `skills/` and project-local `.pi/skills/` for overlapping responsibility and trigger language.
4. Decide whether to extend, consolidate, split, replace, or create. Prefer extending or consolidating when Skills would normally co-load.
5. Design the smallest self-contained package.
6. Write bundled resources first when they are needed, then keep `SKILL.md` focused on behavior.
7. Audit the finished Skill with `references/audit-checklist.md`.
8. Exercise at least one positive and one adjacent negative trigger case before considering it complete.

## Frontmatter

Use YAML with exactly two fields:

```yaml
---
name: skill-name
description: "Use when ..."
---
```

- Use lowercase letters, digits, and hyphens for `name`; keep it below 64 characters.
- Make the folder name equal `name`.
- Start `description` with `Use when` or `Use for`.
- Put both the capability and activation boundary in `description`.
- Keep all trigger information in frontmatter. The body is unavailable before activation.

## Package shape

```text
skill-name/
├── SKILL.md
├── references/   # optional: detail loaded on demand
├── scripts/      # optional: repeated deterministic operations
└── assets/       # optional: output resources, not instructions
```

Create only directories the Skill uses.

- Keep references inside the Skill and link them directly from `SKILL.md`.
- Put a table of contents in reference files longer than 100 lines.
- Test every bundled script by running it.
- Do not add Skill-local README files, changelogs, quick references, setup logs, or process notes.

## Instruction design

- Write direct imperative instructions.
- Use concrete positive and negative examples where an abstract boundary is easy to reinterpret.
- Give hard evidence requirements a blocked alternative: record the blocker, attempted approaches, and degraded proof instead of looping indefinitely.
- Give every ask-user branch an immediate action for each answer. Do not write “decide based on the response.”
- State stop conditions. A Skill that only says what to do tends to over-apply.
- Keep implementation choices open when several approaches fit the project.
- Do not use personas, activation announcements, ceremonial preambles, or repeated emphasis as enforcement devices.

## Cohesion tests

Keep content in one Skill when most answers are yes:

- Does it start from the same user intent?
- Does it need the same repository context?
- Does it share one normal workflow and completion condition?
- Would the parts usually activate together?
- Would splitting force cross-Skill references or duplicate instructions?

Split only when most answers are yes:

- Can each part trigger from clearly different user requests?
- Can each part succeed independently?
- Can a user reasonably install or disable one without the other?
- Does each part own a distinct observable outcome?

Treat task variants as internal branches, not automatic reasons for new Skills.

## Public boundary

Assume root `skills/` content ships as readable plaintext.

- Exclude secrets, credentials, private URLs, internal hostnames, machine-specific absolute paths, private repository details, and unexplained internal jargon.
- Use relative paths for bundled files.
- Keep authorization and hard safety enforcement in runtime code, permissions, or sandboxing; Skill prose is guidance.
- Preserve third-party license and attribution when adapting external material.

Project-local `.pi/skills/` do not ship, but follow the same hygiene unless private context is essential to maintenance.

## Maintenance

- Prefer deleting duplication or tightening a trigger over adding another warning paragraph.
- When behavior is ignored, seek a checkable boundary, concrete example, or deterministic control before adding stronger wording.
- Revisit cohesion when two Skills repeatedly co-trigger or one Skill cannot complete without another.
- Remove obsolete instructions and unused bundled files.

## Audit

Read `references/audit-checklist.md`. Report status, findings, strengths, and remaining risks. Do not silently fix a target unless the task authorizes edits.
