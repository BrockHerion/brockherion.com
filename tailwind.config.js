module.exports = {
  mode: 'jit',
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
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
