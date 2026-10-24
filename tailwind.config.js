/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#F9F6F0',
          surface: '#F1ECE3',
          border: '#DDD7CE',
        },
        charcoal: {
          DEFAULT: '#141414',
          surface: '#1A1A1A',
          border: '#27272A',
          muted: '#4A4A4A',
        },
        editorial: {
          crimson: '#991B1B',
          ink: '#0F172A',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Roboto Flex"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        space: ['"Playfair Display"', 'Georgia', 'serif'], // Fallback alias so existing headers inherit editorial serif
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
