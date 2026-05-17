/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb', // Primary Tech Blue
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        accent: {
          light: '#38bdf8', // Electric highlight blue
        },
        ink: {
          950: '#03050A',
          900: '#070B12',
          800: '#0E141F',
          700: '#151D2B',
          600: '#243044',
        },
        platinum: {
          50: '#FAFBFC',
          100: '#F3F6F8',
          200: '#E6ECF1',
          300: '#CBD5E1',
        },
        navy: {
          deep: '#020617', // Deep navy
          charcoal: '#0f172a',
          slate: '#1e293b',
        },
        titanium: {
          900: '#0D0F12', // Deep Graphite
          800: '#1A1D24', // Titanium Gray
          700: '#2A2E35', // Lighter Titanium
        },
        cyber: {
          cyan: '#00E5FF',
          indigo: '#6366F1',
          violet: '#8B5CF6'
        },
        surface: {
          light: '#f8fafc',
          gray: '#e2e8f0',
          muted: '#64748b',
        },
        status: {
          success: '#10b981',
          warning: '#f59e0b',
          danger: '#ef4444',
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'shimmer': 'shimmer 1.5s infinite',
        'scan': 'scan 2.6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        scan: {
          '0%, 100%': { transform: 'translateY(-12%)', opacity: '0.2' },
          '50%': { transform: 'translateY(112%)', opacity: '0.75' },
        },
      }
    },
  },
  plugins: [],
}
