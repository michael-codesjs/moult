/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,ts,js,tsx,jsx}"],
  darkMode: "class",
  theme: {
    screens: {
      sm: "576px",
      "semi-sm": "768px",
      md: "960px",
      lg: "1360px"
    },
    extend: {
      colors: {
        blackAlpha: "rgba(0,0,0,0.6)",
        whiteAlpha: "rgba(255,255,255,0.2)"
      },
      keyframes: {
        "bounce-horizontal": {
          '0%, 100%': {
            transform: "translateX(-25%)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)"
          },
          '50%': {
            transform: "translateY(0)",
            "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)"
          },
        }
      },
      animation: {
        "bounce-horizontal": 'wiggle 1s ease-in-out infinite',
      }
    }
  },
  plugins: [],
}
