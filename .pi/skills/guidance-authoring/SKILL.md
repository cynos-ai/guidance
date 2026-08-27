---
name: guidance-authoring
description: "Use when deciding whether or where recurring agent behavior should become persistent Cynos Guidance, or reviewing the admission, placement, overlap, and removal of always-on system instructions and high-level shipped Skills."
---

# Guidance authoring

Preserve the smallest set of durable guidance that improves observable agent judgment. Treat permanent prompt text as a product cost, not free documentation.

## Required flow

### 1. Start from an observed problem

Record a real or reproducible behavior failure, recurring user correction, or repeated coordination cost. Separate observation from the proposed explanation.

Do not add permanent guidance for a broad aspiration such as “think deeply,” “write clean code,” or “follow best practices.” If no concrete behavior can be named, keep the idea as a hypothesis and stop.

### 2. Find the responsible mechanism

Classify the problem before writing prompt text:

| Problem owner | Put the solution here |
|---|---|
| Formatter, linter, schema, type checker, test, hook, permission, sandbox, or runtime | Deterministic implementation |
| Harness or model defect | Harness fix, compatibility handling, or upstream report |
| One repository's facts or conventions | Project context or documentation |
| Judgment that must shape nearly every task | Always-on system guidance |
| A distinct user intent or task with meaningful on-demand detail | Existing or new Skill |
| No stable owner or observable benefit | Do not add guidance |

Prompt guidance does not enforce security, authorization, policy, or deterministic correctness.

### 3. Check existing ownership

Search current system guidance, shipped Skills, and project-local maintenance Skills.

- Extend existing guidance when it already owns the trigger and outcome.
- Consolidate content that normally co-triggers.
- Treat investigation, refactoring, optimization, migration, and verification as branches of one engineering job when they share entry context and completion.
- Create a new Skill only when it can activate and succeed independently.
- Remove or replace conflicting text instead of layering another instruction over it.

### 4. Apply the admission gate

Require all of the following before adding permanent guidance:

1. A concrete observed or reproducible problem.
2. A material judgment or communication error not better owned elsewhere.
3. An observable behavior the guidance should change.
4. Useful generality across repositories or a clearly declared narrower scope.
5. A trigger or state, judgment boundary, action or prohibition, and stop condition or exception.
6. No substantial overlap with existing guidance.
7. Acceptable context cost and over-following risk.
8. A lightweight way to probe positive, adjacent, conflict, and over-following behavior.

If a criterion is missing, revise the proposal, choose another mechanism, or reject it. Do not weaken the gate to preserve an appealing sentence.

### 5. Choose the smallest placement

Use always-on system guidance only for short principles that must survive every turn. Keep workflows, examples, and scenario branches out of the permanent prompt.

Use an existing Skill when the content shares its user intent, context, and completion condition. Add an internal branch rather than a new Skill when variants normally travel together.

Create a new Skill only when its trigger is independently recognizable and its result is useful without co-loading another Skill. Use `skill-authoring` to design or audit the package.

Use project documentation when the content describes facts, architecture, commands, or conventions rather than portable agent judgment.

### 6. Write a bounded guidance unit

Prefer this form:

```text
Trigger or state
→ judgment boundary
→ observable action or prohibition
→ stopping condition or exception
```

Keep task-specific implementation choices open. Use exact wording only where ambiguity would cause predictable failure.

### 7. Probe behavior before keeping it

Create compact cases for:

- **Positive:** the intended failure should change.
- **Adjacent:** a nearby task should not trigger or over-apply the guidance.
- **Conflict:** explicit user or project requirements should retain authority.
- **Over-following:** the agent should stop at the stated boundary.

Use deterministic checks for package structure and injection behavior. Use model behavior probes as evidence, not as perfectly stable per-commit guarantees.

### 8. Reassess after use

Modify or remove guidance when it has no visible benefit, repeatedly over-applies, duplicates improved host behavior, costs too much context, or no longer matches the product.

The goal is not to accumulate principles or Skills. The goal is to keep the smallest coherent set that still improves behavior.

## Decision record

For a proposal or audit, report:

```markdown
Decision: SYSTEM | EXTEND_SKILL | NEW_SKILL | PROJECT_CONTEXT | DETERMINISTIC | HOST_FIX | REJECT

Observed problem:
Responsible mechanism:
Expected behavior change:
Scope and boundary:
Stop condition or exception:
Overlap checked:
Probe cases:
Context and over-following cost:
```

State missing evidence explicitly. Do not present a hypothesis as an accepted guidance change.

## Anti-patterns

- Add a new Skill because a section has a name.
- Split one workflow into entry, branch, and exit Skills that always co-trigger.
- Put repository facts or framework preferences in portable system guidance.
- Encode a detailed workflow in the always-on prompt.
- Add prose where a deterministic mechanism can own the behavior.
- Use repeated emphasis, absolute wording, or personas as substitutes for a clear boundary.
- Keep guidance only because it sounds wise.

## Audit

Read `references/admission-checklist.md` and report the placement decision plus blocking gaps. Do not edit canonical guidance unless the task authorizes it.
