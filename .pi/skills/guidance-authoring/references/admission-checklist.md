# Guidance admission checklist

## Output

```markdown
# Guidance admission: <proposal>

Status: ACCEPT | REVISE | RELOCATE | REJECT | BLOCKED
Placement: SYSTEM | EXTEND_SKILL | NEW_SKILL | PROJECT_CONTEXT | DETERMINISTIC | HOST_FIX | NONE

## Evidence
- Observed problem: ...
- Current owner: ...
- Expected behavior change: ...

## Findings
- [blocking|important|minor] <issue> → <next action>

## Probe cases
- Positive: ...
- Adjacent: ...
- Conflict: ...
- Over-following: ...

## Cost and risks
- Context cost: ...
- Main over-following risk: ...
```

## Problem evidence

- [ ] The proposal starts from a real or reproducible failure, recurring correction, or repeated coordination cost.
- [ ] Observation is separated from inferred cause.
- [ ] The desired behavior change is externally observable.
- [ ] The problem is material enough to justify permanent context.

## Responsible mechanism

- [ ] A deterministic mechanism was considered first.
- [ ] Harness, model, project-context, and documentation ownership were considered.
- [ ] Prompt guidance is not being used as a security or authorization boundary.
- [ ] The selected placement owns the problem more directly than alternatives.

## Existing coverage and cohesion

- [ ] Existing system guidance and Skills were searched.
- [ ] The proposal does not restate an existing instruction.
- [ ] An existing owner cannot absorb the behavior without losing cohesion.
- [ ] A proposed new Skill has an independent trigger and useful standalone outcome.
- [ ] Branches that normally co-trigger remain together.

## Guidance quality

- [ ] The proposal states a trigger or state.
- [ ] It defines a judgment boundary rather than a broad aspiration.
- [ ] It names an observable action or prohibition.
- [ ] It includes a stop condition or exception.
- [ ] It leaves project-specific implementation choices to project context.
- [ ] Its scope is portable or explicitly narrower.

## Behavior probes

- [ ] Positive case targets the observed failure.
- [ ] Adjacent case detects accidental activation.
- [ ] Conflict case preserves higher-priority user and project requirements.
- [ ] Over-following case detects failure to stop.
- [ ] Structural and injection behavior use deterministic tests where possible.

## Context economy and lifecycle

- [ ] Always-on text is short enough to justify permanent loading.
- [ ] On-demand detail is placed in a cohesive Skill.
- [ ] Redundant examples and explanation have been removed.
- [ ] Over-following and regression risks are named.
- [ ] Removal or replacement criteria are clear.
