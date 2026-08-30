[English](README.md) | [简体中文](README-zh-CN.md)

# Cynos Guidance (Archived)

> This project was retired on 2026-08-30 and is no longer maintained.

Use [Cynos Rules](https://github.com/cynos-ai/rules) for the maintained engineering, communication, project-file, and Git guidance.

## User impact

The published `@cynos-ai/guidance` npm versions remain available only so existing installations do not break. All versions are deprecated and will receive no new features, fixes, or security updates. New installations are not recommended.

GitHub keeps this repository, tags, Releases, and source history available in read-only form.

## Migrate

Remove the Pi package:

```bash
pi remove npm:@cynos-ai/guidance
```

Then open the [Cynos Rules README](https://github.com/cynos-ai/rules#readme) and give its installation or update prompt to an AI that can access the target project. Rules are merged into the project's native rule entry and `docs/rules/**`; they are not an npm package or runtime prompt injector.

## Why it was retired

- `engineering-judgment` substantially overlapped the maintained engineering rules;
- the useful output-organization ideas from Guidance 0.1 were absorbed into `docs/rules/communication.md`;
- Guidance 0.2 expanded communication into dialogue workflows that were not needed for the intended outcome;
- project-owned Markdown rules are more portable than maintaining separate runtime adapters for each AI host.

## Historical versions

- `v0.1.1`: original compact engineering judgment and project-owner communication design;
- `v0.2.0`: final published release with split communication Skills.

Historical versions may still inject prompts and register Skills in Pi when installed. Deprecation does not disable an existing local installation; remove the package explicitly to stop that behavior.

## License

[MIT](LICENSE)
