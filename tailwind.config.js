/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}", "./index.html"], // index.html 추가
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}

//여기서 커스텀 css 사용 및 수정 가능
//예제에 ES6 관련 내용이 없다.. IE 호환성 때문인가?