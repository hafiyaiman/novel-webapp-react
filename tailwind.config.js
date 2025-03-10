import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      prefix: "heroui",
      addCommonColors: false,
      layout: {},
      themes: {
        light: {
          layout: {},
          colors: {
            primary: "#6A0DAD",
            secondary: "#FFD700",
            background: "#F5F5F5",
            default: "#333333",
          },
        },
        dark: {
          layout: {},
          colors: {
            primary: "#8E3BB0",
            secondary: "#F4A261",
            background: "#121212",
            default: "#E0E0E0",
          },
        },
      },
    }),
  ],
};


