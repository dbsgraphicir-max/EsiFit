import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    screens: {
      mobile: '0px',
      tablet: '640px',
      desktop: '1024px',
    },
    extend: {
      // DESIGN_BIBLE.md: 8px-based spacing scale
      spacing: {
        '0.5': '4px',
        '1': '8px',
        '1.5': '12px',
        '2': '16px',
        '3': '24px',
        '4': '32px',
        '6': '48px',
        '8': '64px',
        '12': '96px',
      },
      // DESIGN_BIBLE.md: radius scale
      borderRadius: {
        sm: '8px',
        md: '16px',
        lg: '24px',
        full: '9999px',
      },
      // DESIGN_BIBLE.md: shadow scale (3 elevation levels)
      boxShadow: {
        resting:
          '0px 1px 3px rgba(0, 0, 0, 0.06), 0px 1px 2px rgba(0, 0, 0, 0.04)',
        raised:
          '0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -4px rgba(0, 0, 0, 0.05)',
        floating:
          '0px 25px 50px -12px rgba(0, 0, 0, 0.25), 0px 8px 10px -6px rgba(0, 0, 0, 0.1)',
        'glow-primary':
          '0 0 20px rgba(74, 222, 128, 0.4), 0 0 40px rgba(74, 222, 128, 0.2)',
        'glow-accent':
          '0 0 20px rgba(56, 189, 248, 0.4), 0 0 40px rgba(56, 189, 248, 0.2)',
      },
      // DESIGN_BIBLE.md: typography
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        // Display & Headings
        display: ['72px', { lineHeight: '1.1', fontWeight: '700' }],
        'display-md': ['56px', { lineHeight: '1.15', fontWeight: '700' }],
        h1: ['48px', { lineHeight: '1.2', fontWeight: '700' }],
        h2: ['40px', { lineHeight: '1.25', fontWeight: '600' }],
        h3: ['32px', { lineHeight: '1.3', fontWeight: '600' }],
        h4: ['24px', { lineHeight: '1.4', fontWeight: '600' }],
        // Body
        'body-lg': ['18px', { lineHeight: '1.6' }],
        'body-md': ['16px', { lineHeight: '1.6' }],
        'body-sm': ['14px', { lineHeight: '1.5' }],
        caption: ['12px', { lineHeight: '1.4' }],
        // Data / Numbers (monospace)
        'data-lg': ['32px', { lineHeight: '1.2', fontWeight: '700' }],
        'data-md': ['24px', { lineHeight: '1.3', fontWeight: '600' }],
        'data-sm': ['16px', { lineHeight: '1.4', fontWeight: '500' }],
      },
      // DESIGN_BIBLE.md: backdrop-blur consistent value
      backdropBlur: {
        glass: '16px',
      },
      // DESIGN_BIBLE.md: color palette based on brand
      colors: {
        brand: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        surface: {
          light: {
            base: '#ffffff',
            raised: '#f8fafc',
            overlay: '#f1f5f9',
            border: '#e2e8f0',
          },
          dark: {
            base: '#0a0a0f',
            raised: '#12121a',
            overlay: '#1a1a2e',
            border: '#2a2a3e',
          },
        },
        accent: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        fitness: {
          mint: '#4ade80',
          ocean: '#38bdf8',
          graphite: '#64748b',
          ember: '#f97316',
          rose: '#fb7185',
          amethyst: '#a78bfa',
        },
      },
      // DESIGN_BIBLE.md: animation presets
      transitionTimingFunction: {
        snappy: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.4s ease-out forwards',
        'slide-up': 'slideUp 0.4s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'count-up': 'countUp 1s ease-out forwards',
        shimmer: 'shimmer 2s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(74, 222, 128, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(74, 222, 128, 0.6)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow':
          'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(74, 222, 128, 0.15), transparent)',
        'hero-glow-dark':
          'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(74, 222, 128, 0.08), transparent)',
      },
    },
  },
  plugins: [],
};

export default config;
