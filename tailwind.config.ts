import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  // Notice we are pointing directly to the app and components folders here
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;