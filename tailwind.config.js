/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'ttb-dark': '#0a0e27',
        'ttb-navy': '#1a1f3a',
        'ttb-blue': '#00d9ff',
        'ttb-cyan': '#00f0ff',
        'ttb-violet': '#9d4edd',
        'ttb-purple': '#7b2cbf',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 20px rgba(0, 217, 255, 0.5)' },
          '50%': { opacity: '0.7', boxShadow: '0 0 40px rgba(157, 78, 221, 0.8)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'glow': {
          '0%, 100%': { filter: 'drop-shadow(0 0 10px rgba(0, 217, 255, 0.5))' },
          '50%': { filter: 'drop-shadow(0 0 20px rgba(157, 78, 221, 0.8))' },
        },
      },
    },
  },
  plugins: [],
}
