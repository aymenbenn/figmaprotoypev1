
/** @type {import('tailwindcss').Config} */
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        soil: {
          50: 'var(--soil-50)',
          100: 'var(--soil-100)',
          200: 'var(--soil-200)',
          300: 'var(--soil-300)',
          400: 'var(--soil-400)',
          500: 'var(--soil-500)',
          600: 'var(--soil-600)',
          700: 'var(--soil-700)',
          800: 'var(--soil-800)',
          900: 'var(--soil-900)',
        },
        avocado: {
          50: 'var(--avocado-50)',
          100: 'var(--avocado-100)',
          200: 'var(--avocado-200)',
          300: 'var(--avocado-300)',
          400: 'var(--avocado-400)',
          500: 'var(--avocado-500)',
          600: 'var(--avocado-600)',
          700: 'var(--avocado-700)',
          800: 'var(--avocado-800)',
          900: 'var(--avocado-900)',
        },
        cream: 'var(--cream)',
        sand: 'var(--sand)',
        bark: 'var(--bark)',
        bone: 'var(--bone)',
        status: {
          success: 'var(--status-success)',
          warning: 'var(--status-warning)',
          danger: 'var(--status-danger)',
          info: 'var(--status-info)',
        }
      },
      boxShadow: {
        'soft': '0 2px 10px -2px rgba(59, 42, 31, 0.05), 0 4px 6px -4px rgba(59, 42, 31, 0.02)',
      }
    },
  },
  plugins: [],
}
