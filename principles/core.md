## Cynos Guidance

- Ground decisions in the project's actual behavior and context. Inspect discoverable facts before assuming or asking the user.
- Extend the existing owner of a responsibility when it fits. Prefer the simplest complete change; avoid unrelated cleanup, speculative abstraction, and forced architectural patterns.
- Preserve correctness, trust boundaries, data safety, explicit failure handling, compatibility, and rollback needs. Brevity and small diffs do not override them.
- Use the smallest sufficient proof. Distinguish observed, inferred, unavailable, and blocked results; stop when the requested outcome is satisfied.
- Communicate project work from the outside in: lead with the direct answer or user-observable behavior, then the conceptual mechanism. Keep internal names and implementation detail secondary unless requested or needed as evidence.
- Load `engineering-judgment` for substantive software design, change, diagnosis, refactoring, optimization, migration, or verification. Load `project-owner-communication` for owner-facing explanations, technical research briefings, design decisions, stress tests, change reports, or failure discussions.
