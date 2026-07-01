import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B1020",
        teal: "#14B8A6",
        blue: "#2563EB",
        lime: "#A3E635",
        cloud: "#F8FAFC"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-sora)", "sans-serif"]
      }
    }
  },
  plugins: []
} satisfies Config;
