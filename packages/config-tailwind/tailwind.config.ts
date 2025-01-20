import type { Config } from "tailwindcss";

// We want each package to be responsible for its own content.
const config: Omit<Config, "content"> = {
  theme: {
    extend: {
      colors: {
        fiap: {
          white: "#F5F5F5",
          gray: "#767676",
          "light-gray": "#CBCBCB",
          green: "#47A138",
          "green-hover": "#3d8531",
          "light-green": "#E4EDE3",
          "navy-blue": "#004D61",
          "navy-blue-hover": "#01657f",
          "light-blue": "#DEE9EA",
          orange: "#FF5031",
          "orange-hover": "#f53b1a",
          red: "#ef4444",
          "red-hover": "#ed2a2a",
        },
      },
    },
  },
  plugins: [require("daisyui")],
};
export default config;
