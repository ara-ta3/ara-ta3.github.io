import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",
  plugins: [react()],
  ssr: {
    noExternal: [/^d3.*$/],
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
});
