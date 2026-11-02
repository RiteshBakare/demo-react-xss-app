/// <reference types="vitest/config" />
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Single config for both the static build and the vitest run (vitest reads this file's `test`
// block and applies the react plugin). `appType: "spa"` makes `vite preview` serve index.html
// for unknown routes (client-side routing); in the sandbox, Vulcan's static server does the same.
export default defineConfig({
  plugins: [react()],
  appType: "spa",
  build: {
    outDir: "dist",
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.js"],
    include: ["src/**/*.test.{js,jsx}"],
  },
});
