/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#F26522',
          dark: '#d54d0d',
          light: '#ff8a4c'
        },
        secondary: {
          DEFAULT: '#1B3E6C',
          dark: '#132d4f',
          light: '#254f89'
        }
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1280px'
        }
      }
    }
  },
  plugins: []
};
