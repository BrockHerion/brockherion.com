module.exports = {
  mode: 'jit',
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  media: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'source-code-pro': ['"Source Code Pro"',],
        'open-sans': ['"Open Sans"',],
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
