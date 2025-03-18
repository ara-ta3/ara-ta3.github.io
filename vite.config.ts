import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",
  plugins: [react()],
  ssr: {
    noExternal: [/^d3.*$/, /^@nivo.*$/],
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
});
