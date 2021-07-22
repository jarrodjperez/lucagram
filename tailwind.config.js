module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Mulish"],
      logo: ["Cookie"],
    },
    extend: {
      colors: {
        "light-gray": "#3D3C3F",
        "dark-gray": "#25272B",
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

//3D3C3F
//25272B
//25272B

//6FDEE3
//DBC0A7
//31353B
