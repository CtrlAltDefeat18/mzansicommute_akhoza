import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Security headers are set in public/_headers, which Cloudflare applies
  // at the edge before requests hit the worker — more reliable and cheaper
  // than applying them inside the worker on every request.
  //
  // If you ever need to add per-route headers that _headers can't express
  // (e.g. different CSP per page), add them here. Otherwise leave empty.
};

export default nextConfig;
