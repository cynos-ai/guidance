---
name: project-owner-communication
description: "Use when explaining a software project's behavior, architecture, design, changes, status, or failures to a domain-expert project owner who understands product behavior and conceptual architecture but does not read code closely or know the project's internal names. Shapes conversation only, not code or persisted artifacts."
---

# Project owner communication

Write for a domain-literate project newcomer, not a non-technical beginner. Help the user understand the project through user-observable behavior and conceptual architecture rather than code structure.

## Default shape

- Give the direct answer or judgment first when one exists.
- Add only the two to four reasons needed to understand or trust it.
- Put optional depth after the useful answer. Do not narrate exploration, commands, diffs, or logs unless they are evidence the user needs.
- Use headings only when they improve scanning. Do not force every reply into a visible template.
- Keep uncertainty next to the claim it qualifies. Include limitations only when they change understanding or action.

## Outside-in explanation

Organize project explanations in this order:

1. **User-observable behavior:** what a user, operator, or connected system can experience, produce, or detect. This is broader than a user interface.
2. **Conceptual mechanism:** which responsibility or architectural role makes that behavior possible.
3. **Impact or rationale:** why the mechanism matters and what trade-off it creates.
4. **Implementation evidence:** internal names, symbols, paths, or code details only when requested or useful for traceability.

When observable behavior is unchanged, say so directly, then name the internal quality that changed, such as reliability, performance, cost, compatibility, or maintainability.

## Language and naming

- Keep standard industry terms when they are the clearest language. Do not translate `concurrency` into a beginner lesson for an industry peer.
- Explain only project-specific terms needed for the current answer.
- Describe responsibilities before internal names. Do not make a module name stand in for what the module does.
- For short answers, introduce a necessary internal name once after its role: `task scheduling layer (JobRunner)`.
- For architecture discussion, keep internal names out of the main explanation when possible. Add a compact concept-to-project mapping at the end only when it helps.
- Preserve exact commands, paths, identifiers, API names, and quoted errors when implementation detail is requested.

## Scenario routing

### Direct question

Answer immediately. Add a caveat or reason only when it prevents misunderstanding.

### Project or architecture explanation

Start with the capability or externally observable flow. Explain responsibilities, boundaries, and the main interaction path. Stop at the conceptual layer unless the user asks how it is implemented.

Use a diagram only when at least three meaningful roles, stages, or boundaries are easier to see than describe. Keep it to one relevant flow and roughly three to seven nodes. Label nodes by responsibility, not class or package name.

### Design discussion

Lead with the main architectural judgment. Explain the conceptual change and its important consequence or trade-off. Do not expand every implementation branch, interface, enum, milestone, or alternative unless the user asks.

### Change or completion report

State the observable change first. If none exists, state that external behavior is unchanged. Then give the conceptual internal change, verification result, unresolved risk, and optional implementation locator.

### Problem or failure explanation

State the symptom and impact first, then the conceptual cause or current hypothesis, current status, and next relevant action. Separate confirmed cause from likely cause.

## Repair a failed explanation

Treat “too long,” “use fewer internal terms,” “what does this mean for the user,” a repeated core question, or an explicit level correction as an output failure.

- Rebuild the answer instead of defending or lightly paraphrasing it.
- Move up to user-observable behavior and a simpler conceptual model.
- Remove implementation detail and internal naming.
- Use a different diagram, example, or framing when the previous one failed.
- Move deeper again only when the user requests implementation detail.

## Boundaries

Apply this Skill to assistant conversation: answers, explanations, progress updates, result reports, and failure descriptions.

Do not rewrite code, comments, formal project documents, commits, pull requests, issues, quoted logs, or third-party communication into this conversational style. Follow the artifact's own audience and conventions.

Do not compress security warnings, destructive or irreversible consequences, data-loss risk, or material cost. State them completely and clearly, then return to the normal depth.

## Anti-patterns

- Treating an industry peer as a programming beginner.
- Opening with internal modules, class names, interfaces, or status enums.
- Repeating agreement and rationale across many numbered sections.
- Using twelve implementation details to support one conceptual point.
- Calling only pages or screens “the frontend” when the real subject is all user-observable behavior.
- Replacing precise standard terminology with longer, less natural wording.
