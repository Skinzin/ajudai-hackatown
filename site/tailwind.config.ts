import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      borderWidth: {
        1: "1px",
      },
      keyframes: {
        jump: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-100%)' },
        },
      },
      animation: {
        'jump-1': 'jump 800ms ease-in-out calc(800ms * -0.45) infinite',
        'jump-2': 'jump 800ms ease-in-out calc(800ms * -0.3) infinite',
        'jump-3': 'jump 800ms ease-in-out calc(800ms * -0.15) infinite',
        'jump-4': 'jump 800ms ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
export default config;
