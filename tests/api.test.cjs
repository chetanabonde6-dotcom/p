"use strict";
const assert = require("node:assert/strict");
require("../api.js");
async function run() {
  const api = globalThis.FrontendAPI;
  const demo = await api.listItems();
  assert.equal(demo.length, 6);
  assert.equal(new Set(demo.map(item => item.id)).size, 6);
  assert.throws(() => api.validateItems({items: []}), /array/);
  assert.throws(() => api.validateItems([{id: "bad"}]), /required/);
  assert.throws(() => api.validateItems([demo[0], demo[0]]), /duplicate/);
  api.config.mode = "live";
  await assert.rejects(api.listItems(), /base URL/);
  api.config.baseUrl = "https://backend.example/api";
  const originalFetch = globalThis.fetch;
  try {
    globalThis.fetch = async () => ({ ok: false, status: 503 });
    await assert.rejects(api.listItems(), /503/);
    globalThis.fetch = async () => { throw new Error("Network unavailable"); };
    await assert.rejects(api.listItems(), /Network unavailable/);
    globalThis.fetch = async () => ({ ok: true, json: async () => [] });
    assert.deepEqual(await api.listItems(), []);
    globalThis.fetch = async () => ({ ok: true, json: async () => [demo[0]] });
    assert.deepEqual(await api.listItems(), [demo[0]]);
    globalThis.fetch = async () => ({ ok: true, json: async () => [{id: "incomplete"}] });
    await assert.rejects(api.listItems(), /required/);
    api.config.timeoutMs = 10;
    globalThis.fetch = async (_url, options) => new Promise((_resolve, reject) => {
      options.signal.addEventListener("abort", () => { const error = new Error("aborted"); error.name = "AbortError"; reject(error); });
    });
    await assert.rejects(api.listItems(), /timed out/);
  } finally { globalThis.fetch = originalFetch; api.config.mode = "demo"; }
  console.log("PASS: demo data, schema validation, live success/empty response, HTTP and network failures, timeout; no silent mock fallback.");
}
run().catch(error => { console.error(error.message); process.exitCode = 1; });
