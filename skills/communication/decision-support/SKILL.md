---
name: decision-support
description: "Use when a user asks for structured help choosing among viable options or making a consequential decision and needs explicit criteria, trade-offs, evidence, and a recommendation. Organizes the decision without taking over unrelated domain work."
---

# Decision support

Turn a defined choice into an actionable recommendation with visible criteria, evidence boundaries, and remaining validation needs.

## Frame the decision

- Restate the decision, intended outcome, material constraints, and why the choice matters.
- Ask only for a preference or constraint that could change the recommendation. Use a reversible low-risk default when it would not materially constrain the user.
- Keep the current choice separate from adjacent implementation or domain work.

Reuse an existing end-to-end outcome model when one is present. When options divide responsibilities across multiple meaningful stages and no model exists, create one compact model labeled by outcomes or responsibilities and use it as the comparison backbone. Do not force a model onto a simple choice.

## Build a decision-changing comparison

For a material choice, organize the reasoning as:

1. **Situation:** the relevant outcome, constraints, and current state.
2. **Options:** a small set of credible paths. Include deliberate inaction only when it is genuinely viable.
3. **Criteria:** the few factors that could change the choice.
4. **Comparison:** the material trade-offs against the same criteria.
5. **Recommendation:** one preferred path, why it wins here, and what evidence would overturn it.

Lead with the recommendation when the evidence is already strong. Use the full sequence only when the user needs to inspect or shape the comparison.

- Present capabilities and responsibility boundaries before vendor, model, tool, or implementation names.
- Eliminate options that cannot satisfy the intended outcome rather than padding the comparison.
- Compare uncertainty as well as claimed capability.
- Do not treat the status quo as risk-free.

## Preserve evidence quality

Separate:

- **Verified fact:** supported by current primary evidence or direct observation.
- **Assessment:** a reasoned comparison or recommendation.
- **To validate:** dependent on behavior, assets, scale, quality, or another condition that only a test can establish.

When external evidence affects the choice:

- prefer official documentation, first-party pricing, release notes, model cards, or direct tests;
- attach dates to volatile capability, availability, policy, and price claims;
- state price currency, unit, tier, volume, and assumptions;
- report unavailable evidence as unavailable, not as proof that a capability does not exist;
- turn a material unknown into a bounded test or proof of concept;
- stop collecting options when another candidate is unlikely to change the decision.

This Skill organizes evidence for a decision. It does not replace the tools or domain Skills responsible for research, experimentation, or implementation.

## Maintain decision state

Track:

- the chosen option and rationale;
- rejected options and why they lost;
- assumptions that would reopen the decision;
- remaining validation needs and their owner or next step;
- the end-to-end model used by the comparison, when applicable.

Show deltas during normal turns and a compact full state at a decision point or close. Do not repeatedly reconfirm settled criteria or rejected options without new evidence.

## Boundary and stop

Do not turn an undefined goal into a large option table, rigorously attack a plan the user only asked to compare, or begin unrelated implementation.

Stop when the user has an actionable recommendation or when the only remaining blocker is a bounded validation step. State that boundary instead of manufacturing certainty.
