// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // Build for Vercel.
  //
  // Two things have to be set or Vercel serves a 404:
  //  1. `nitro` must be defined (an object) — otherwise the Lovable wrapper
  //     SKIPS the Nitro deploy plugin entirely outside its own sandbox, leaving
  //     a client-only build with no server. An object force-enables Nitro.
  //  2. `preset: "vercel"` makes Nitro emit Vercel's Build Output API, BUT the
  //     wrapper hard-defaults the output dirs to `dist/*` (meant for its
  //     Cloudflare flow). We override them back to the `.vercel/output` layout
  //     Vercel auto-detects: a function bundle under functions/__nitro.func and
  //     prerendered/static assets under static/, with config.json at the root.
  nitro: {
    preset: "vercel",
    output: {
      dir: ".vercel/output",
      serverDir: ".vercel/output/functions/__nitro.func",
      publicDir: ".vercel/output/static",
    },
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
