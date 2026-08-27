# Skill audit checklist

## Output

```markdown
# Audit: <skill-name>

Status: PASS | NEEDS_WORK | BLOCKED

## Findings
- [blocking|important|minor] <issue and evidence> → <recommended change>

## Strengths
- ...

## Remaining risks
- None | ...
```

## Responsibility and cohesion

- [ ] The Skill's job is expressible in one sentence.
- [ ] Its trigger and observable outcome are distinct from nearby Skills.
- [ ] No existing Skill already owns the same job.
- [ ] Internal branches share the same entry context and completion condition.
- [ ] The Skill does not require another Skill for its normal path.
- [ ] A split or merge decision is justified by independent triggering, not file length alone.

## Frontmatter

- [ ] Frontmatter contains exactly `name` and `description`.
- [ ] `name` uses lowercase letters, digits, and hyphens and is below 64 characters.
- [ ] Folder name equals `name`.
- [ ] `description` is quoted, starts with `Use when` or `Use for`, and states what and when.
- [ ] Positive, negative, and adjacent prompts can be inferred from the description.

## Package

- [ ] `SKILL.md` exists.
- [ ] Optional directories exist only when used.
- [ ] Every referenced file exists and is inside the Skill.
- [ ] References are linked directly and do not duplicate the body.
- [ ] References longer than 100 lines include a table of contents.
- [ ] No auxiliary README, changelog, quick reference, setup log, or process note exists.
- [ ] Added scripts were executed successfully.

## Behavior shaping

- [ ] Instructions use direct imperative language.
- [ ] Ambiguous boundaries have concrete positive and negative examples where useful.
- [ ] Hard evidence requirements include a bounded blocked alternative.
- [ ] Ask-user branches define immediate actions for each response.
- [ ] Stop conditions and exceptions prevent over-application.
- [ ] Precision matches operational fragility.
- [ ] The body contains no trigger section that arrives too late to affect activation.
- [ ] The Skill avoids personas, activation announcements, and ceremonial wording.

## Context economy

- [ ] Every section materially changes behavior.
- [ ] Repeated or inferable explanation has been removed.
- [ ] Detail needed only on a minority branch lives in a reference.
- [ ] Trigger metadata is concise enough to remain always visible.

## Public safety

- [ ] Shipped content contains no secrets, private URLs, internal hostnames, private paths, or unexplained private jargon.
- [ ] Bundled paths are relative.
- [ ] Prompt prose does not claim to enforce permissions or security boundaries.
- [ ] Adapted third-party material preserves required license and attribution.

## Trigger probes

- [ ] At least one clear positive prompt should activate the Skill.
- [ ] At least one clear negative prompt should not activate it.
- [ ] At least one adjacent-Skill prompt routes to the correct owner.
- [ ] At least one ambiguous prompt has a safe routing behavior.
