/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        light: "#F9FAFB",
        primary: "#111827",
        accent: "#2563EB",
        card: "#FFFFFF",
      },
    },
  },
  plugins: [],
}
