/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Next.js app directory
    "./pages/**/*.{js,ts,jsx,tsx}", // if you use pages dir
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: ["bg-blue-500", "bg-orange-400", "bg-amber-400", "bg-red-500"],
  theme: {
    extend: {},
  },
  plugins: [],
};
