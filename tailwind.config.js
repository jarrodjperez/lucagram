module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Montserrat"],
      logo: ["Cookie"],
    },
    extend: {
      colors: {
        "light-gray": "#3c3f51",
        "dark-gray": "#282a34",
        primary: "#e2336b",
        secondary: "#fcac46",
      },
      lineHeight: {
        hl: "0.1",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
