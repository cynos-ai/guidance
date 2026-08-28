# Cynos Guidance

Cynos Guidance packages short, harness-neutral system guidance and cohesive on-demand Agent Skills. Pi is the first adapter.

## Architecture

- `principles/core.md`: the small cross-domain, always-on guidance block.
- `skills/communication/`: domain-neutral dialogue modes organized by user intent.
- `skills/<domain>/`: optional task judgment for a specific domain, currently engineering.
- `extensions/pi.js`: the Pi adapter; injects core guidance and does nothing else.
- `.pi/skills/`: project-maintenance Skills; never ship them.
- `evaluations/`: qualitative behavior probes; CI validates their structure, not model behavior.
- `test/`: deterministic package, injection, link, language, and Skill-structure checks.

Grouping directories such as `skills/communication/` and `skills/engineering/` must not contain `SKILL.md`. Pi discovers their nested Skills recursively.

## Ownership

- Keep behavior in `principles/core.md` only when it is cross-domain and useful in nearly every interaction.
- Communication Skills control how a specific dialogue advances; they do not own domain work.
- Domain Skills control task judgment and evidence in their domain; they do not own general dialogue style.
- A new Skill or family requires an independently recognizable trigger, a useful standalone outcome, and admission evidence.
- No communication Skill may require another communication Skill for normal completion. Shared conversation state may pass between independently selected modes.

## Maintenance

- Load `guidance-authoring` before adding, moving, consolidating, or removing persistent system guidance or high-level shipped Skills.
- Load `skill-authoring` once a Skill is the chosen form, and use it to create or audit that Skill.
- Keep always-on guidance below 2 KB. Put workflows and examples in a cohesive Skill.
- Keep public guidance portable across repositories, industries, and technology stacks unless a domain family explicitly narrows its scope.
- Prefer extending an existing owner over adding overlapping guidance.
- Do not use prompt text for deterministic enforcement, permissions, or security boundaries.
- Do not put maintainer-machine facts, private paths, project-specific commands, or local workflow manuals in shipped guidance.
- Keep all shipped prompt and Skill content in English.

## Verification

Run before reporting implementation completion:

```bash
npm run verify
npm run pack:dry-run
```

Before release, also use the installed Pi version to load the source tree and an unpacked tarball. Record the Pi version and exact pass, fail, unavailable, or blocked result.

The tarball must include `extensions/`, `principles/`, `skills/`, both READMEs, and `LICENSE`, and must exclude `.pi/`, `docs/`, `evaluations/`, `test/`, and local project files.

## Release gate

Follow [`docs/plans/v0.2.0-guidance-restructure.md`](docs/plans/v0.2.0-guidance-restructure.md) for the `0.2.0` acceptance and migration record. Do not tag or publish `0.2.0` until the project owner reviews the final core prompt and all communication Skills.
