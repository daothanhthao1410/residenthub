/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#14171F',
        surface: '#FFFFFF',
        bg: '#F6F7FA',
        primary: {
          DEFAULT: '#2A5C8A',
          dark: '#1D4266',
          light: '#EAF1F7',
        },
        accent: {
          DEFAULT: '#E08A3C',
          dark: '#C26F26',
          light: '#FCEEDE',
        },
        success: {
          DEFAULT: '#2F9E6E',
          light: '#E5F5EE',
        },
        danger: {
          DEFAULT: '#D64545',
          light: '#FBEAEA',
        },
        warning: {
          DEFAULT: '#D6A245',
          light: '#FBF3E4',
        },
        border: '#E2E5EB',
        muted: '#6B7280',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px 0 rgba(20, 23, 31, 0.04), 0 1px 3px 0 rgba(20, 23, 31, 0.06)',
      },
      backgroundImage: {
        'grid-dots': 'radial-gradient(circle, #FFFFFF33 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
}
