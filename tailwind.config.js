/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('daisyui'),
  ],
}

//여기서 커스텀 css 사용 및 수정 가능
//예제에 ES6 관련 내용이 없다.. IE 호환성 때문인가?