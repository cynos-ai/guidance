# Cynos Guidance

Cynos Guidance packages short, harness-neutral system guidance and cohesive Agent Skills. Pi is the first adapter.

## Active plan

Before modifying the unreleased `0.2.0` guidance or public Skill layout, read and follow [`docs/plans/v0.2.0-guidance-restructure.md`](docs/plans/v0.2.0-guidance-restructure.md). It defines the approved target architecture, file operations, ownership boundaries, tests, and release gate. Do not publish `0.2.0` until the project owner reviews the implemented prompt and Skill contents.

## Content layers

- `principles/core.md`: the small always-on system guidance block.
- `skills/`: public Skills shipped in the npm package.
- `extensions/pi.js`: the Pi adapter; injects core guidance and does nothing else.
- `.pi/skills/`: project-maintenance Skills; never ship them.
- `test/`: deterministic package, injection, and Skill-structure checks plus trigger cases.

## Maintenance

- Load `guidance-authoring` before adding, moving, consolidating, or removing persistent system guidance or high-level shipped Skills.
- Load `skill-authoring` once a Skill is the chosen form, and use it to create or audit that Skill.
- Keep always-on guidance short. Put scenario branches and examples in a cohesive Skill.
- Keep public guidance portable across repositories and technology stacks.
- Prefer extending an existing owner over adding overlapping guidance.
- Do not use prompt text for deterministic enforcement, permissions, or security boundaries.
- Do not add project-specific architecture, commands, framework choices, or workflow manuals to shipped guidance.

## Verification

Run before reporting completion:

```bash
npm test
npm run pack:dry-run
```

The tarball must include `extensions/`, `principles/`, `skills/`, `README.md`, and `LICENSE`, and must exclude `.pi/`, `test/`, and local project files.
