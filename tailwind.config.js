/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}", flowbite.content()],
  theme: {
    extend: {},
  },
  plugins: [require("flowbite/plugin"), flowbite.plugin()],
};
