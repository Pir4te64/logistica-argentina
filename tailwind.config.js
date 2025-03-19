/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-dark": "#272D33",
        "custom-red": "#FF1B27",
        "custom-blue": "#89B9BD",
        "custom-gray": "#818181",
      },
    },
  },
  plugins: [],
};
