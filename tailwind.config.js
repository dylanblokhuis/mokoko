module.exports = {
  mode: 'jit',
  purge: ['src/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {}
  },
  variants: {
    extend: {}
  },
  // eslint-disable-next-line global-require
  plugins: [require('@tailwindcss/typography')]
}
