import { MouseEvent, useState } from "react"
import InputComponents from "../components/InputComponent"
import Navbar from "../components/Navbar"
import ButtonComponents from "../components/ButtonComponents"
function SignUpPage(){
    const [feedbackForEmail, setFeedbackForEmail] = useState("공란으로 둘수 없습니다!")
    const [feedbackForVerifyCode, setFeedbackForVerifyCode] = useState("")
    const [feedbackForPassword, setFeedbackForPassword] = useState("")
    const [feedbackForConfirmPassword, setFeedbackForConfirmPassword] = useState("")

    return(
        <>
            <Navbar></Navbar>
            <div className="flex flex-col justify-center space-y-10 m-auto w-[26rem] px-9 py-12 shadow-lg rounded-xl mt-8 ">
                <InputComponents dataType="Email" placeholder="example@email.com" feedback={feedbackForEmail}/>
                <InputComponents dataType="Verify Code" placeholder="123456" feedback={feedbackForVerifyCode}/>
                {/*인증번호 확인 버튼 추가*/}
                <InputComponents dataType="Password" placeholder="Password" feedback={feedbackForPassword}/>
                <InputComponents dataType="Password Confirm" placeholder="Re-enter Password" feedback={feedbackForConfirmPassword}/>
                <ButtonComponents buttonText="Confirm" eventHandler={()=>{console.log("hi")}}/>
                {/*check 함수 필요 (공백, email rex, password rex, 잘못된 인증번호(이거는 서버 요청), 재입력 틀림 )*/}
            </div>
        </>
    )
}

export default SignUpPage