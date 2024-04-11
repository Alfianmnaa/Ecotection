/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        greenMain: "#114232",
        greenSecondary: "#38866C",
        yellowMain: "#FCDC2A",
        inputBorder: "#B0B0B0",
      },
      fontSize: {
        headline1: "80px",
        headline2: "64px",
        subheadline: "24px",
        body: "20px",
        normal: "16px",
        smallText: "14px",
        verySmallText: "12px",
      },
    },
  },
  plugins: [],
};
