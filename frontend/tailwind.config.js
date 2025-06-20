/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
      extend: {
          colors: {
              // If you want to define custom colors, do it here:
              // 'custom-black': '#000000',
          },
      },
  },
  plugins: [],
};