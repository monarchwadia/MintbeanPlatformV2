// base colors (-500 suffix)
const basetone = "#466585";
const basemint = "#02ed9d";
const baseblue = "#009be2";
const basered  = "#f14668";

// TODO: fix color darkening/lightening (currently only '500' works)
// color darken/lighten tool: http://scg.ar-ch.org/
// loose rule:
// lighten: 15% (400), 40% (300), 50% (200), 55% (100)
// darken: 10% (600), 20% (700), 30% (800)

module.exports = {
  mbColors: {
    'mb-tone': {
      '100': '#eef2f6',
      '200': '#dde5ed',
      '300': '#bccbdb',
      '400': '#688bb0',
      '500': basetone,
      '600': '#344c64',
      '700': '#233242',
      '800': '#111921',
    },
    'mb-mint' : {
      '100': '#effffa',
      '200': '#bdfee8',
      '300': '#8afed7',
      '400': '#3efdbc',
      '500':  basemint,
      '600': '#1ad595', // sat 20%
      '700': '#32bd8e', // sat 50%
      '800': '#4aa586', // sat 60%
    },
    'mb-blue' : {
      '100': `#fbfeff`,
      '200': `#e2f6ff`,
      '300': `#afe6ff`,
      '400': `#2fbeff`,
      '500':  baseblue,
      '600': `#0078af`,
      '700': `#00557c`,
      '800': `#000f16`,
    },
    'mb-red' : {
      '100': `#fef9fa`,
      '200': `#feecef`, // 35%
      '300': `#fcd4dc`, // 30%
      '400': `#f68da2`,
      '500':  basered,
      '600': `#da1139`, // 15%
      '700': `#ab0d2c`, // 25%
      '800': `#7b0920`, // 35%
    }
  }
}
