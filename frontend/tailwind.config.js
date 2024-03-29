const { mbColors } = require("./src/styles/mbColors");

module.exports = {
  separator: "_",
  purge: false,
  theme: {
    //  screens: {
    //   'xl': {'max': '1279px'}, // => @media (max-width: 1279px) { ... }
    //   'lg': {'max': '1023px'},
    //   'md': {'max': '767px'},
    //   'sm': {'max': '639px'},
    // },
    container: {
      padding: {
        default: "0.5rem"
      }
    },
    fontFamily: {
      main: ["Montserrat"]
    },
    extend: {
      colors: mbColors,
      boxShadow: {
        mb: "0 10px 20px -10px rgba(0,0,0,0.3)"
      }
    }
  },
  variants: {
    boxShadow: ["hover"]
  },
  plugins: []
};
