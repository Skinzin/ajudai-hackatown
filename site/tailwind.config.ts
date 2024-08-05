import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "pelorous": {
          '50': '#ebfffd',
          '100': '#cdfffc',
          '200': '#a1fffd',
          '300': '#60fffe',
          '400': '#18f5f8',
          '500': '#00d8de',
          '600': '#00a8b5',
          '700': '#088896',
          '800': '#106d7a',
          '900': '#125a67',
          '950': '#053c47',
        },
        'affair': {
          '50': '#f9f7fc',
          '100': '#f3eef9',
          '200': '#e7dcf2',
          '300': '#d5c0e7',
          '400': '#bb99d9',
          '500': '#9e71c4',
          '600': '#8252a7',
          '700': '#774898',
          '800': '#5a3771',
          '900': '#4c315e',
          '950': '#2d173b',
      },
    
      },
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
