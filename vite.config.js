import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// User-site repo (VSVwnl.github.io) is served from the domain root.
//
// Multi-page build rather than a client-side router: each destination emits a
// real directory with its own index.html, so GitHub Pages serves project URLs
// directly. No 404.html redirect shim, no rewrite rules, and refreshing or
// sharing /work/cinemascout/ loads that page rather than bouncing through the
// homepage first.
export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, "index.html"),
        work: resolve(__dirname, "work/index.html"),
        about: resolve(__dirname, "about/index.html"),
        lumi: resolve(__dirname, "work/lumi-vr/index.html"),
        cinemascout: resolve(__dirname, "work/cinemascout/index.html"),
        mrBlueprint: resolve(__dirname, "work/mr-blueprint/index.html"),
      },
      output: {
        // React is shared by every page, so it caches once across the site.
        manualChunks: {
          react: ["react", "react-dom"],
        },
      },
    },
  },
});
