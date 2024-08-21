import { MouseEvent, useState } from "react"
import InputComponents from "../components/InputComponent"
import Navbar from "../components/Navbar"
import ButtonComponents from "../components/ButtonComponents"
function SignUpPage(){
    //feedback inputs ()
    const [feedbackForEmail, setFeedbackForEmail] = useState("해당 입력란을 필수로 입력해야합니다.")// "이메일 형식과 일치하지 않습니다!", "이미 존재하는 계정!"(Confirm 시도 시)
    const [feedbackForVerifyCode, setFeedbackForVerifyCode] = useState("잘못된 인증번호입니다.") //"서버와 연결 실패 잠시 후 다시 시도해 주세요", ""
    const [feedbackForPassword, setFeedbackForPassword] = useState("비밀번호는 특수문자, 숫자을 포함하여 8자 이상으로 구성해야합니다.") //"완벽합니다!"
    const [feedbackForConfirmPassword, setFeedbackForConfirmPassword] = useState("비밀번호가 일치하지 않습니다.") //"완벽합니다!"

    //todo: alert 디자인, 서버 피드백 필요

    //user infomation object
    const [userInfo, setUserInfo] = useState({
        email: "", 
        verifyCode: "",
        password: "", 
        passwordCheck: "", 
    })

    //Loding state
    const [checkLoding, setCheckLoding] = useState(false)
    const [confirmLoding, setConfirmLoading] = useState(false)

    return(
        <>
            <Navbar></Navbar>
            <div className="flex flex-col justify-center space-y-10 m-auto w-[26rem] px-9 py-12 shadow-lg rounded-xl mt-8 ">
                <InputComponents dataType="Email" placeholder="example@email.com" feedback={feedbackForEmail} eventHandler={()=>{}}/>
                <div className="">
                    <InputComponents dataType="Verify Code" placeholder="123456" feedback={feedbackForVerifyCode} eventHandler={()=>{}}/>
                    <button
                        type="button"
                        className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 m-3"
                        onClick={()=>{}}
                    >
                        {"Check"}
                    </button>
                </div>
                <InputComponents dataType="Password" placeholder="Password" feedback={feedbackForPassword} eventHandler={()=>{}}/>
                <InputComponents dataType="Password Confirm" placeholder="Re-enter Password" feedback={feedbackForConfirmPassword} eventHandler={()=>{}}/>
                <ButtonComponents buttonText="Confirm" eventHandler={()=>{console.log("hi")}}/>
                {/*check 함수 필요 (공백, email rex, password rex, 잘못된 인증번호(이거는 서버 요청), 재입력 틀림 )*/}
            </div>
        </>
    )
}

export default SignUpPage