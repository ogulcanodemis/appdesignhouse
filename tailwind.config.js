/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F72585",
        secondary: "#560BAD",
        tertiary: "#3A0CA3",
        accent: "#4361EE",
        light: "#4CC9F0",
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(45deg, var(--color-primary), var(--color-secondary))',
        'gradient-secondary': 'linear-gradient(135deg, var(--color-secondary), var(--color-tertiary))',
        'gradient-accent': 'linear-gradient(90deg, var(--color-accent), var(--color-light))',
        'gradient-dark': 'linear-gradient(180deg, var(--color-tertiary), var(--color-secondary))',
        'gradient-light': 'linear-gradient(45deg, var(--color-light), var(--color-accent))',
      },
    },
  },
  plugins: [],
} 