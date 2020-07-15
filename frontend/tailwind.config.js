const { mbColors } = require('./src/styles/mbColors');

module.exports = {
  separator: "_",
  purge: [],
  theme: {
    fontFamily: {
      main: ["Montserrat"]
    },
    extend: {
      colors: mbColors,
    },
  },
  variants: {
    boxShadow: ['hover']
  },
  plugins: []
};
