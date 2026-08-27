import assert from "node:assert/strict";
import test from "node:test";
import extension, {
  CORE_GUIDANCE,
  CORE_GUIDANCE_MARKER,
} from "../extensions/pi.js";

function loadHandler() {
  const handlers = new Map();
  extension({
    on(name, handler) {
      handlers.set(name, handler);
    },
  });
  return handlers.get("before_agent_start");
}

test("injects core guidance after the existing system prompt", () => {
  const handler = loadHandler();
  const result = handler({ systemPrompt: "BASE" });

  assert.equal(
    result.systemPrompt,
    `BASE\n\n${CORE_GUIDANCE_MARKER}\n${CORE_GUIDANCE}`,
  );
});

test("injects into an empty system prompt", () => {
  const handler = loadHandler();
  const result = handler({ systemPrompt: "" });

  assert.equal(
    result.systemPrompt,
    `${CORE_GUIDANCE_MARKER}\n${CORE_GUIDANCE}`,
  );
});

test("does not inject the same guidance twice", () => {
  const handler = loadHandler();
  const first = handler({ systemPrompt: "BASE" });
  const second = handler({ systemPrompt: first.systemPrompt });

  assert.equal(second, undefined);
  assert.equal(
    first.systemPrompt.split(CORE_GUIDANCE_MARKER).length - 1,
    1,
  );
});
