import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import flowbiteReact from "flowbite-react/plugin/vite";

export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss(), flowbiteReact()],
  ssr: {
    noExternal: [/^d3.*$/],
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
});
