/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Orbitron"', 'monospace'],
        body: ['"Rajdhani"', 'system-ui', 'sans-serif'],
        mono: ['"Share Tech Mono"', 'monospace'],
      },
      colors: {
        void: {
          50:  '#e8f0ff',
          100: '#c5d4f5',
          200: '#8fa5e0',
          300: '#5a76cb',
          400: '#2547b6',
          500: '#0a1628',
          600: '#080f1e',
          700: '#060c18',
          800: '#040912',
          900: '#02060c',
          950: '#010408',
        },
        neon: {
          green:  '#00ff88',
          blue:   '#00d4ff',
          pink:   '#ff006e',
          yellow: '#ffee00',
          purple: '#bf00ff',
        },
        cyber: {
          400: '#00ff88',
          500: '#00cc6a',
          600: '#009950',
        },
        plasma: {
          300: '#ff6db8',
          400: '#ff2d93',
          500: '#ff006e',
          600: '#cc0058',
        },
      },
      boxShadow: {
        'neon-green': '0 0 8px #00ff88, 0 0 20px #00ff8840',
        'neon-pink':  '0 0 8px #ff006e, 0 0 20px #ff006e40',
        'neon-blue':  '0 0 8px #00d4ff, 0 0 20px #00d4ff40',
        'card': '0 0 0 1px rgba(0,255,136,0.1), 0 8px 32px rgba(0,0,0,0.6)',
        'card-hover': '0 0 0 1px rgba(0,255,136,0.4), 0 0 30px rgba(0,255,136,0.15)',
      },
      animation: {
        'fade-in':    'fadeIn 0.4s ease-out',
        'slide-up':   'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'shimmer':    'shimmer 2s linear infinite',
        'float':      'float 4s ease-in-out infinite',
        'pulse-neon': 'pulseNeon 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn:    { '0%': { opacity:'0' }, '100%': { opacity:'1' } },
        slideUp:   { '0%': { opacity:'0', transform:'translateY(24px)' }, '100%': { opacity:'1', transform:'translateY(0)' } },
        shimmer:   { '0%': { backgroundPosition:'-1000px 0' }, '100%': { backgroundPosition:'1000px 0' } },
        float:     { '0%,100%': { transform:'translateY(0)' }, '50%': { transform:'translateY(-8px)' } },
        pulseNeon: { '0%,100%': { opacity:'1' }, '50%': { opacity:'0.6' } },
      }
    },
  },
  plugins: [],
}