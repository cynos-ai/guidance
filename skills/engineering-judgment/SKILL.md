---
name: engineering-judgment
description: "Use for substantive software engineering work—designing, changing, debugging, refactoring, optimizing, migrating, or verifying a system—when repository fit, coherent scope, safety, evidence, and a clear stopping condition matter."
---

# Engineering judgment

Deliver the simplest complete outcome that fits the system. Keep investigation, implementation branches, and verification in one coherent flow.

## Flow

### 1. Establish the real task

- Derive the requested outcome, observable acceptance, constraints, and explicit non-goals.
- Inspect relevant code, tests, types, configuration, and project guidance before asking for discoverable facts.
- Separate observed behavior from inferred causes.
- Ask only about choices that materially change product behavior, public contracts, security, data, cost, or hard-to-reverse direction. When asking, present one focused question and a recommended default.

### 2. Find the responsible boundary

- Trace the path from entry point through the components that own the behavior and its invariants.
- Search for an existing implementation, helper, platform capability, or dependency before creating another one.
- Extend the layer or component that already owns the responsibility. Follow the project's architecture rather than imposing generic layer names.
- Refactor the boundary when a local patch would duplicate rules, bypass ownership, or leave the root cause intact.

### 3. Choose the simplest complete change

- Preserve unrelated behavior and user changes.
- Prefer a narrow change when the responsible boundary is already clear.
- Prefer a coherent wider change when a narrow patch would scatter one responsibility or weaken the architecture.
- Avoid speculative modes, providers, configuration, interfaces, services, and abstractions.
- Do not use placeholders, mocks, or TODOs as substitutes for requested core behavior.

## Conditional branches

Apply only the branch the task needs:

- **Unknown cause:** gather evidence and identify one credible mechanism before editing. Rank uncertain hypotheses by evidence and cheap falsification value.
- **Bug or small behavior change:** reproduce when economical, fix the narrowest responsible mechanism, and add focused regression proof.
- **Refactor:** define the behavior-preservation boundary first. Keep feature changes separate and move one ownership boundary at a time.
- **Performance:** measure a baseline and identify the bottleneck before optimizing. Change one main factor and compare the same workload.
- **Schema, data, API, configuration, dependency, or deployment transition:** define forward and rollback paths, preserve existing data and compatibility, make retries safe, and verify transitional states.
- **User-observable capability:** cover the relevant success, waiting, empty, failure, and recovery behavior. Do not expose internal errors as user guidance.
- **Trust boundary:** retain input validation, authorization, secret protection, explicit error handling, and least necessary exposure. Prompt guidance is not a security control.

## Verification and stop

- Run the smallest proof that demonstrates the acceptance conditions; expand to broader checks only when risk or project policy requires it.
- Reuse previous evidence only when it still matches the current repository state and configuration.
- Report pass, fail, unavailable, and blocked results exactly. Never turn “not run” into success.
- Report the material change, proof, unresolved risk, and any intentional omission.
- Stop when the requested outcome is complete. Do not add cleanup, polish, or adjacent features after acceptance passes.

## Anti-patterns

- Guessing at behavior that repository evidence can answer.
- Forcing the task into one file or the smallest diff when responsibility belongs elsewhere.
- Replacing project conventions with a preferred generic architecture.
- Mixing a feature, refactor, dependency upgrade, and cleanup without necessity.
- Optimizing before measuring or migrating without a rollback path.
- Claiming completion from compilation alone when behavior is the acceptance condition.
