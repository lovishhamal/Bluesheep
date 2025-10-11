/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
        playfair: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "bounce-slow": "bounce 2s infinite",
        float: "float 6s ease-in-out infinite",
        "gradient-shift": "gradientShift 15s ease infinite",
        glow: "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        float: {
          "0%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
          "100%": { transform: "translateY(0px)" },
        },
        gradientShift: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)" },
          "100%": { boxShadow: "0 0 30px rgba(255, 255, 255, 0.5)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "glass-gradient":
          "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
        "animated-gradient":
          "linear-gradient(-45deg, #fff4e0, #3f494b, #004057, #3f494b, #fff4e0)",
        "cream-charcoal-navy-gradient":
          "linear-gradient(135deg, #fff4e0 0%, #3f494b 25%, #004057 50%, #3f494b 75%, #fff4e0 100%)",
      },
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
        "3xl": "40px",
      },
      colors: {
        glass: {
          white: "rgba(255, 255, 255, 0.1)",
          "white-strong": "rgba(255, 255, 255, 0.2)",
          black: "rgba(0, 0, 0, 0.1)",
          "black-strong": "rgba(0, 0, 0, 0.2)",
        },
        cream: {
          primary: "#fff4e0",
          secondary: "#3f494b",
          third: "#004057",
          accent: "#fff4e0",
        },
        cream: {
          light: "#fef3df",
          dark: "#f9b32d",
        },
        charcoal: {
          dark: "#3f494b",
          light: "#6b7280",
        },
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(63, 73, 75, 0.37)",
        "glass-lg": "0 12px 40px 0 rgba(63, 73, 75, 0.5)",
        glow: "0 0 20px rgba(255, 255, 255, 0.3)",
        "glow-lg": "0 0 30px rgba(255, 255, 255, 0.5)",
        "navy-glow": "0 0 30px rgba(0, 64, 87, 0.4)",
        "charcoal-glow": "0 0 25px rgba(63, 73, 75, 0.4)",
        "cream-glow": "0 0 25px rgba(255, 244, 224, 0.4)",
        "cream-shadow": "0 8px 32px 0 rgba(254, 243, 223, 0.3)",
      },
    },
  },
  plugins: [],
};
