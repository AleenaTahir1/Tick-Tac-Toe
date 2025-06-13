/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'quicksand': ['Quicksand', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Custom game colors
        'game': {
          'purple': '#6366f1',
          'pink': '#ec4899',
          'blue': '#3b82f6',
          'green': '#10b981',
          'orange': '#f59e0b',
          'red': '#ef4444',
        },
        'neon': {
          'purple': '#8b5cf6',
          'pink': '#f472b6',
          'blue': '#60a5fa',
          'green': '#34d399',
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "pulse-neon": {
          "0%, 100%": {
            boxShadow: "0 0 5px theme('colors.neon.purple'), 0 0 20px theme('colors.neon.purple'), 0 0 35px theme('colors.neon.purple')",
          },
          "50%": {
            boxShadow: "0 0 10px theme('colors.neon.purple'), 0 0 40px theme('colors.neon.purple'), 0 0 80px theme('colors.neon.purple')",
          },
        },
        "glow": {
          "0%": {
            boxShadow: "0 0 5px theme('colors.game.purple')",
          },
          "50%": {
            boxShadow: "0 0 20px theme('colors.game.purple'), 0 0 30px theme('colors.game.purple')",
          },
          "100%": {
            boxShadow: "0 0 5px theme('colors.game.purple')",
          },
        },
        "float": {
          "0%, 100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-10px)",
          },
        },
        "sparkle": {
          "0%, 100%": {
            transform: "scale(1) rotate(0deg)",
            opacity: "0.8",
          },
          "50%": {
            transform: "scale(1.2) rotate(180deg)",
            opacity: "1",
          },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-neon": "pulse-neon 2s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
        "sparkle": "sparkle 2s ease-in-out infinite",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mesh-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'game-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} 