import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0a0a0a',
          secondary: '#111111',
          tertiary: '#1a1a1a',
          card: '#161616',
          'card-hover': '#1e1e1e',
          elevated: '#1c1c1c',
          input: '#1a1a1a',
        },
        text: {
          primary: '#ffffff',
          secondary: '#a0a0a0',
          tertiary: '#6b6b6b',
          inverse: '#0a0a0a',
        },
        brand: '#e8e8e8',
        border: {
          DEFAULT: '#2a2a2a',
          light: '#333333',
        },
        divider: '#222222',
        overlay: 'rgba(0, 0, 0, 0.72)',
        accent: '#c7f25b',
        danger: '#ef4444',
        success: '#22c55e',
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '3.75rem',
        'display': 'clamp(2.5rem, 5.6vw, 4.5rem)',
      },
      fontWeight: {
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
      },
      lineHeight: {
        tight: '1.1',
        snug: '1.25',
        normal: '1.5',
        relaxed: '1.625',
      },
      letterSpacing: {
        tight: '-0.025em',
        normal: '0',
        wide: '0.05em',
        wider: '0.1em',
        widest: '0.2em',
      },
      spacing: {
        'xs': '0.25rem',
        'sm': '0.5rem',
        'md': '1rem',
        'lg': '1.5rem',
        'xl': '2rem',
        '2xl': '3rem',
        '3xl': '4rem',
        '4xl': '6rem',
        '5xl': '8rem',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        'full': '9999px',
      },
      boxShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.4)',
        'md': '0 8px 24px rgba(0, 0, 0, 0.45)',
        'lg': '0 24px 60px rgba(0, 0, 0, 0.55)',
      },
      transitionDuration: {
        'fast': '150ms',
        'med': '250ms',
        'slow': '400ms',
      },
      fontFamily: {
        sans: ['"Noto Sans SC"', 'Inter', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
      maxWidth: {
        'site': '1280px',
        'narrow': '800px',
      },
    },
  },
  plugins: [],
} satisfies Config
