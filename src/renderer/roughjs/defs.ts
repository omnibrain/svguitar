import patrickHandWoff2 from './patrick-hand'

export default `
<defs>
  <style>
    @font-face {
      font-family: 'Patrick Hand';
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      src: local('Patrick Hand'), local('PatrickHand-Regular'), url(data:font/woff2;base64,${patrickHandWoff2}) format('woff2');
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }
  </style>
</defs>
`
