/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5B9BD5', // Soft blue
          50: '#F0F7FC',
          100: '#D9E9F5',
          200: '#B3D3EB',
          300: '#8DBDE1',
          400: '#67A7D7',
          500: '#5B9BD5',
          600: '#4A7FAD',
          700: '#396385',
          800: '#28475D',
          900: '#172B35',
        },
        secondary: {
          DEFAULT: '#7FB3B8', // Pastel teal
          50: '#F0F7F8',
          100: '#D9EAEC',
          200: '#B3D5D9',
          300: '#8DC0C6',
          400: '#67ABB3',
          500: '#7FB3B8',
          600: '#669093',
          700: '#4D6D6E',
          800: '#334A49',
          900: '#1A2724',
        },
        accent: {
          DEFAULT: '#B8A9D9', // Soft purple
          50: '#F5F3F9',
          100: '#E8E3F0',
          200: '#D1C7E1',
          300: '#BAABD2',
          400: '#A38FC3',
          500: '#B8A9D9',
          600: '#9387AD',
          700: '#6E6581',
          800: '#494355',
          900: '#24212A',
        },
        neutral: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'Roboto', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        'glass-lg': '0 12px 48px 0 rgba(31, 38, 135, 0.2)',
        'glass-hover': '0 16px 64px 0 rgba(91, 155, 213, 0.25)',
        'soft': '0 2px 8px 0 rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
