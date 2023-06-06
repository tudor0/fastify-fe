/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
      }
    }
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#2061e5",
          secondary: "#aefce2",
          accent: "#91a5d8",
          neutral: "#272930",
          "base-100": "#252f41",
          info: "#2b78e3",
          success: "#18673e",
          warning: "#fcb831",
          error: "#fc5462"
        }
      }
    ]
  },
  plugins: [require("daisyui")]
};
