module.exports = {
  mode: 'jit',
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        'source-code-pro': ['"Source Code Pro"',],
				'inconsolata': ['"Inconsolata"', "monospace"],
        'open-sans': ['"Open Sans"',],
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
		require('@tailwindcss/line-clamp')
	],
}
