/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],

  // daisyUI config (optional)
  daisyui: {

    styled: true,
    themes: [
      {
        doctorPortal: {

          "primary": "#F15C27",

          "secondary": "#FCD51C",

          "accent": "#3A4256",

          "base-200": "#ECEEF2",
        },
      },
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "light",
  },
}