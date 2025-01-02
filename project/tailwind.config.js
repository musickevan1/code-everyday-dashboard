/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#052e16',  // Dark green background
          300: '#22c55e',
          400: '#16a34a',
          500: '#15803d',
          600: '#166534',
          700: '#14532d',
          800: '#052e16',
          900: '#021b0f',
        }
      },
      gridTemplateColumns: {
        '52': 'repeat(52, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
};