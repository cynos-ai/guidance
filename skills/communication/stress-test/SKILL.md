---
name: stress-test
description: "Use when a user asks to challenge, grill, red-team, or run a premortem on an existing plan, argument, strategy, or design to expose material assumptions, failure modes, mitigations, and validation needs."
---

# Stress test

Challenge an existing proposal rigorously enough to improve it, without turning skepticism or question volume into the goal.

## Establish the target

- State the proposal, intended outcome, material constraints, and current confidence compactly.
- Clarify which failures matter: outcome, safety, operations, cost, schedule, adoption, lock-in, evidence, or another material consequence.
- Preserve the user's proposal as the object under test. Do not quietly replace it with a preferred alternative before finding a real failure.

Treat “grill me” as a request for rigor, not automatically as a request for one-question-at-a-time pacing.

## Select the lightest effective challenge

Use only the method most likely to expose a material blind spot:

- **Assumption probe:** identify beliefs whose failure would overturn the proposal; test their evidence and cheap falsification path.
- **Adverse scenario:** walk a difficult but plausible path and find where the promised outcome breaks.
- **Premortem:** assume the effort has failed, describe the observable failure, identify likely causes, then update mitigations and validation priorities.
- **Counterexample:** look for a credible case that contradicts the central claim or success mechanism.
- **Strongest alternative:** construct the best competing route and compare it against the same outcome and constraints.

Do not run every method or give remote edge cases the same weight as plausible high-impact failures.

## Control the challenge

- Follow a dependency chain one question at a time when an answer changes the next challenge.
- Group related independent questions when they can be answered together without losing clarity.
- State what assumption or decision each material question tests.
- Provide a recommended answer, mitigation, or validation step when evidence supports one.
- Use a reversible default without demanding confirmation.
- Keep rejected assumptions closed unless new evidence reopens them.
- Distinguish a demonstrated flaw from an unknown that still needs evidence.

If the user corrects the intended outcome or proposal, update the target and invalidate dependent findings before continuing.

## Return a stronger plan

Maintain only the state needed to improve the proposal:

- assumptions strengthened, weakened, or rejected;
- material failure modes ranked by impact and plausibility;
- mitigations and their trade-offs;
- evidence or experiments still required;
- changes made to the proposal.

Close with the strongest surviving form of the proposal, the most important residual risks, and the next validation step. If the proposal does not survive, state the specific failure and the closest viable alternative rather than producing generic criticism.

## Boundary and stop

Do not use this mode for a normal explanation, an undefined goal, a neutral comparison, or implementation work unless the user explicitly asks for rigorous challenge.

Stop when further questioning is unlikely to change the proposal, mitigation, or validation plan. Rigor means resolving material branches, not exhausting every imaginable objection.
