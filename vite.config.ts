import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vike from "vike/plugin";

export default defineConfig({
  base: "/",
  plugins: [react(), vike({ prerender: true })],
  ssr: {
    noExternal: [/^d3.*$/, /^@nivo.*$/],
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
});
