import vinext from "vinext";
import { defineConfig } from "vite";

// macOS Seatbelt blocks FSEvents; polling keeps HMR working in that env.
const isCodexSandbox = process.env.CODEX_SANDBOX === "seatbelt";

export default defineConfig(async () => {
  // Keep Wrangler/Miniflare state project-local, not in $HOME.
  process.env.WRANGLER_WRITE_LOGS ??= "false";
  process.env.WRANGLER_LOG_PATH ??= ".wrangler/logs";
  process.env.MINIFLARE_REGISTRY_PATH ??= ".wrangler/registry";

  const { cloudflare } = await import("@cloudflare/vite-plugin");

  return {
    server: isCodexSandbox
      ? { watch: { useFsEvents: false, usePolling: true } }
      : undefined,
    plugins: [
      vinext(),
      cloudflare({
        viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
        // wrangler.toml is the single source of truth for bindings now.
        // No inline config here — Cloudflare plugin reads wrangler.toml directly.
      }),
    ],
  };
});
