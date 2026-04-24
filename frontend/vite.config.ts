import path from "path";
import flowbiteReactPlugin from "flowbite-react/plugin/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import vike from "vike/plugin";
import "vitest/config";

export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss(), flowbiteReactPlugin(), vike()],
  ssr: {
    noExternal: [/^d3.*$/],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/tests/e2e/**",
    ],
  },
});
