module.exports = {
  presets: [require('@selfaware/tailwind-base')],
  content: ['./components/**/*.js', './lib/**/*.js', './pages/**/*.js'],
  theme: {
    screens: {
      xs: '480px',
      sm: '768px',
      md: '940px',
      lg: '1200px',
      xl: '1600px',
    },
    colors: {
      inherit: 'inherit',
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      black: '#000000',
      blue: '#0000ff',
      yellow: '#ffef00',
      pageBG: 'var(--pageBG)',
      pageText: 'var(--pageText)',
    },
    extend: {
      fontFamily: {
        inherit: 'inherit',
        body: ['helvetica, times new roman'],
        heading: ['helvetica, times new roman'],
      },
    },
  },
  plugins: [],
}
