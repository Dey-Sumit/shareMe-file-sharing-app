module.exports = {
  purge: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        blue: {
          light: " #F3F7FD",
        },
        yellow: {
          light: "#FFC26D",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
