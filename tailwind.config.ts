import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          glow: "hsl(var(--primary-glow))",
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
          border: "hsl(var(--card-border))",
        },
        neon: {
          blue: "hsl(var(--neon-blue))",
          cyan: "hsl(var(--neon-cyan))",
          purple: "hsl(var(--neon-purple))",
          pink: "hsl(var(--neon-pink))",
        },
        tech: {
          black: "hsl(var(--tech-black))",
          dark: "hsl(var(--tech-dark))",
          grey: "hsl(var(--tech-grey))",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      backgroundImage: {
        'gradient-neon': 'var(--gradient-neon)',
        'gradient-purple': 'var(--gradient-purple)',
        'gradient-dark': 'var(--gradient-dark)',
        'gradient-glow': 'var(--gradient-glow)',
        'gradient-cyber': 'var(--gradient-cyber)',
      },
      boxShadow: {
        'neon': 'var(--shadow-neon)',
        'neon-strong': 'var(--shadow-neon-strong)',
        'purple': 'var(--shadow-purple)',
        'card': 'var(--shadow-card)',
      },
      transitionDuration: {
        'fast': '200ms',
        'smooth': '300ms',
        'slow': '500ms',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        },
        "glow": {
          "0%, 100%": { boxShadow: "0 0 20px hsl(var(--neon-blue) / 0.5), 0 0 40px hsl(var(--neon-cyan) / 0.3)" },
          "50%": { boxShadow: "0 0 40px hsl(var(--neon-blue) / 0.9), 0 0 80px hsl(var(--neon-cyan) / 0.6)" },
        },
        "fadeInUp": {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slideInRight": {
          from: { opacity: "0", transform: "translateX(50px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "slideInLeft": {
          from: { opacity: "0", transform: "translateX(-50px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "scaleIn": {
          from: { opacity: "0", transform: "scale(0.8)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "glowPulse": {
          "0%, 100%": { 
            boxShadow: "0 0 20px hsl(var(--neon-blue) / 0.5)",
            transform: "scale(1)"
          },
          "50%": { 
            boxShadow: "0 0 40px hsl(var(--neon-cyan) / 0.8)",
            transform: "scale(1.05)"
          },
        },
        "borderFlow": {
          "0%": { borderColor: "hsl(var(--neon-blue))" },
          "33%": { borderColor: "hsl(var(--neon-cyan))" },
          "66%": { borderColor: "hsl(var(--neon-purple))" },
          "100%": { borderColor: "hsl(var(--neon-blue))" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        "fade-in-up": "fadeInUp 0.8s ease-out",
        "slide-in-right": "slideInRight 0.8s ease-out",
        "slide-in-left": "slideInLeft 0.8s ease-out",
        "scale-in": "scaleIn 0.6s ease-out",
        "border-flow": "borderFlow 3s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
