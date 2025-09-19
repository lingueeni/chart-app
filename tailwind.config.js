/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Next.js app directory
    "./pages/**/*.{js,ts,jsx,tsx}", // if you use pages dir
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: ["bg-blue-700", "bg-orange-600", "bg-amber-600", "bg-red-600"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
        roboto: ["var(--font-roboto)", "sans-serif"],
      },
      colors: {
        orange: "#F86828",
        green: "#92C400",
        yellow: "#FFC400",
        cyan: "#00B6F1",
      },
    },
  },
  plugins: [],
};
