export default {
  content: [
    "./index.html",
    // CRITICAL: This line tells Tailwind to scan all React/TSX files in the src directory
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
