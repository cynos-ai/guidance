import { readFileSync } from "node:fs";

export const CORE_GUIDANCE_MARKER = "<!-- cynos-guidance:core -->";
export const CORE_GUIDANCE = readFileSync(
  new URL("../principles/core.md", import.meta.url),
  "utf8",
).trim();

if (!CORE_GUIDANCE) {
  throw new Error("Cynos Guidance core principles are empty");
}

export default function cynosGuidancePiExtension(pi) {
  pi.on("before_agent_start", (event) => {
    if (event.systemPrompt.includes(CORE_GUIDANCE_MARKER)) return;

    const injected = `${CORE_GUIDANCE_MARKER}\n${CORE_GUIDANCE}`;
    return {
      systemPrompt: event.systemPrompt
        ? `${event.systemPrompt}\n\n${injected}`
        : injected,
    };
  });
}
