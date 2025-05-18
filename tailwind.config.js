/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

// chagptにara-ta3のdeep researchさせて出した色合い
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}", flowbite.content()],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        primary: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e", // ← 推奨メイン（深く知的なティール）
          800: "#115e59",
          900: "#134e4a",
        },
        secondary: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b", // Slate Blue（理性的で洗練された印象）
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
        background: {
          DEFAULT: "#f0fdfa", // 全体の背景色：mint寄りで清潔感あり
        },
        base: {
          DEFAULT: "#ffffff", // カードや中身の背景
          800: "#1f2937", // 濃い文字色など
        },
      },
    },
  },
  plugins: [require("flowbite/plugin"), flowbite.plugin()],
};
