import type { Config } from 'tailwindcss'

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class', 'class'],
  theme: {
    screens: {
      sm: '576px',
      'semi-sm': '768px',
      md: '960px',
      lg: '1360px',
    },
    extend: {
      colors: {
        blackAlpha: 'rgba(0,0,0,0.6)',
        whiteAlpha: 'rgba(255,255,255,0.2)',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      keyframes: {
        'bounce-horizontal': {
          '0%, 100%': {
            transform: 'translateX(-25%)',
            'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(0)',
            'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
        'slide-in': {
          '0%': {
            transform: 'translateX(100%)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1',
          },
        },
        'fade-out': {
          '0%': {
            transform: 'translateX(0)',
            opacity: '1',
          },
          '100%': {
            transform: 'translateX(100%)',
            opacity: '0',
          },
        },
        spin: {
          from: {
            transform: 'rotate(0deg)',
          },
          to: {
            transform: 'rotate(360deg)',
          },
        },
        'flip-down': {
          '0%': { transform: 'rotateX(0deg)', opacity: '1' },
          '100%': { transform: 'rotateX(-90deg)', opacity: '0' },
        },
        'flip-up': {
          '0%': { transform: 'rotateX(90deg)', opacity: '0' },
          '100%': { transform: 'rotateX(0deg)', opacity: '1' },
        },
        vibrate: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        'hanger-hover': {
          '0%': { transform: 'scale(1) rotate(0deg)' },
          '50%': { transform: 'scale(1.2) rotate(-12deg)' },
          '100%': { transform: 'scale(1.2) rotate(0deg)' },
        },
        'drawer-slide-in': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'drawer-slide-out': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'drawer-fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'drawer-fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
      animation: {
        'bounce-horizontal': 'wiggle 1s ease-in-out infinite',
        'slide-in': 'slide-in 0.3s ease-out forwards',
        'fade-out': 'fade-out 0.3s ease-out forwards',
        spin: 'spin 0.6s linear infinite',
        'flip-down': 'flip-down 600ms cubic-bezier(0.4, 0, 0.2, 1)',
        'flip-up': 'flip-up 600ms cubic-bezier(0.4, 0, 0.2, 1)',
        gradient: 'gradient 6s linear infinite',
        vibrate: 'vibrate 0.3s ease-in-out infinite',
        'hanger-hover': 'hanger-hover 0.3s ease-out forwards',
        'drawer-in': 'drawer-slide-in 0.3s ease-out forwards',
        'drawer-out': 'drawer-slide-out 0.3s ease-out forwards',
        'drawer-fade-in': 'drawer-fade-in 0.2s ease-out forwards',
        'drawer-fade-out': 'drawer-fade-out 0.2s ease-out forwards',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      backgroundSize: {
        '300%': '300%',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config
