/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
        code: ['"Fira Code"', 'monospace'],
      },
      colors: {
        bg: {
          DEFAULT: '#050d1a',
          2: '#0a1628',
          3: '#0e1f35',
          card: '#0c1a2e',
        },
        surface: {
          DEFAULT: 'rgba(255,255,255,0.04)',
          2: 'rgba(255,255,255,0.07)',
          3: 'rgba(255,255,255,0.10)',
        },
        accent: {
          DEFAULT: '#10b981',
          light: '#34d399',
          dark: '#059669',
        },
        gold: {
          DEFAULT: '#f59e0b',
          light: '#fbbf24',
          dark: '#d97706',
        },
        slate2: {
          DEFAULT: '#e2e8f0',
          2: '#94a3b8',
          3: '#475569',
          4: '#1e293b',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delay': 'float 6s ease-in-out 2s infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'slide-up': 'slideUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.5s ease forwards',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        slideUp: {
          from: { opacity: 0, transform: 'translateY(20px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      backgroundImage: {
        'gradient-accent': 'linear-gradient(135deg, #10b981 0%, #06b6d4 50%, #f59e0b 100%)',
        'gradient-hero': 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
        'gradient-card': 'linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(6,182,212,0.05) 100%)',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        'glow': '0 0 30px rgba(16,185,129,0.2)',
        'glow-lg': '0 0 60px rgba(16,185,129,0.3)',
        'glow-gold': '0 0 30px rgba(245,158,11,0.2)',
        'card': '0 4px 40px rgba(0,0,0,0.4)',
        'card-hover': '0 20px 60px rgba(0,0,0,0.5)',
      },
    },
  },
  plugins: [],
}
