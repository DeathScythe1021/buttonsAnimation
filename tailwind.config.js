/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.{html,js}'],
  theme: {
    extend: {
      fontFamily: {
        // 'oxanium' 是你之後要用的 class 名稱 (如 font-oxanium)
        // ['Oxanium', 'sans-serif'] 是後面的 CSS 設定
        'oxanium': ['Oxanium', 'sans-serif'], 
      },
    },
  },
  plugins: [],
}
