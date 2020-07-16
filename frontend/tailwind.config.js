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
      boxShadow: {
        'mb': '0 10px 20px -10px rgba(0,0,0,0.3)'
      }
    },
  },
  variants: {
    boxShadow: ['hover']
  },
  plugins: []
};
