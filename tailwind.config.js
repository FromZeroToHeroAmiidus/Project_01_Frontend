/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      maxWidth: {
        1440: "1440px",
      },
      colors: {
        logoYellow: "#F4FF47",
        addAuctionHover: "#ACB723",
        background: "#F6F6F4",
        contentBarBg: "#EDF4F2",
        //
        outbidAuction: "#FFAA98",
        winningAuction: "#ADFF90",
        progressAuc: "#F9FF90",
        bidBorder: "#DDE9E6",
      },
      boxShadow: {
        "custom-combined":
          "0px 0px 0px 0px #0000001A, 0px 4px 8px 0px #0000001A, 0px 15px 15px 0px #00000017, 0px 34px 21px 0px #0000000D, 0px 61px 24px 0px #00000003, 0px 96px 27px 0px #00000000",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities(
        {
          ".no-scrollbar": {
            overflow: "hidden",
          },
          ".no-scrollbar::-webkit-scrollbar": {
            display: "none",
          },
          ".no-scrollbar": {
            "-ms-overflow-style": "none" /* IE and Edge */,
            "scrollbar-width": "none" /* Firefox */,
          },
        },
        ["responsive", "hover"]
      );
    },
  ],
};
