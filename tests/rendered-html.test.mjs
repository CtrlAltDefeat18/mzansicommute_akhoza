import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the MzansiCommute landing page", async () => {
  const response = await render();

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();

  assert.match(html, /Every trip\./i);
  assert.match(html, /Pre pilot venture/i);
  assert.match(html, /Pilot scorecard/i);
  assert.match(html, /Pilot target/i);
  assert.match(html, /Validation target/i);
  assert.match(html, /Evidence target/i);
  assert.match(html, /Start the conversation/i);

  assert.doesNotMatch(html, /Your site is taking shape/i);
  assert.doesNotMatch(html, /Building your site/i);
  assert.doesNotMatch(html, /codex-preview/i);
});

test("keeps target figures explicitly labelled as targets", async () => {
  const response = await render();
  const html = await response.text();

  assert.match(
    html,
    /These are first pilot targets, not claimed results\./i,
  );

  const targetLabels = html.match(/Pilot target|Validation target|Evidence target/g) ?? [];
  assert.ok(targetLabels.length >= 4);
});
