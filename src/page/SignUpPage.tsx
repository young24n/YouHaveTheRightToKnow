import { useState } from "react"
import InputComponents from "../components/InputComponent"
import Navbar from "../components/Navbar"
import ButtonComponents from "../components/ButtonComponents"
//Todo: feedback 주는 곳으로 ref 설정
interface UserInfo{
    email: string, 
    nickName: string
    verifyCode: string,
    password: string, 
    passwordCheck: string, 
}

function SignUpPage() {
    const [feedbackForEmail, setFeedbackForEmail] = useState<string>("")
    const [feedbackForVerifyCode, setFeedbackForVerifyCode] = useState<string>("")
    const [feedbackForPassword, setFeedbackForPassword] = useState<string>("")
    const [feedbackForConfirmPassword, setFeedbackForConfirmPassword] = useState<string>("")
    const [feedbackForNickName, setFeedbackForNickName] = useState<string>("")

    const [userInfo, setUserInfo] = useState<UserInfo>({
        email: "", 
        nickName: "",
        verifyCode: "",
        password: "", 
        passwordCheck: "", 
    })

    const [checkLoding, setCheckLoding] = useState<boolean>(false)
    const [confirmLoding, setConfirmLoading] = useState<boolean>(false)
    
    //추후 기능 관련 함수는 파일을 분리하는 것이 좋아보임
    function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
        const email = event.target.value
        setUserInfo((prev: UserInfo) => ({ ...prev, email }))
    }

    function handleNickNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        const nickName = event.target.value
        setUserInfo((prev: UserInfo) => ({ ...prev, nickName }))
    }

    //CAUTION: 자판 배열이 한컴 입력기일 경우 입력이 안됨
    function handleVerifyCodeChange(event: React.ChangeEvent<HTMLInputElement>) {
        const verifyCode = event.target.value
        event.target.value = verifyCode.replace(/\D/g, '').slice(0, 6)
        setUserInfo((prev: UserInfo) => ({ ...prev, verifyCode }))
    }

    function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        const password = event.target.value
        setUserInfo((prev: UserInfo) => ({ ...prev, password }))

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
        if(!passwordRegex.test(password)) {
            setFeedbackForPassword("비밀번호는 특수문자, 숫자를 포함하여 8자 이상으로 구성해야 합니다.")
        } 
        else{
            setFeedbackForPassword("완벽합니다!")
        }

        if(userInfo.passwordCheck && userInfo.passwordCheck !== password) {
            setFeedbackForConfirmPassword("비밀번호가 일치하지 않습니다.")
        } 
        else if(userInfo.passwordCheck === password && userInfo.passwordCheck !== "") {
            setFeedbackForConfirmPassword("완벽합니다!")
        } 
        else{
            setFeedbackForConfirmPassword("")
        }
    }

    function handleConfirmPasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        const confirmPassword = event.target.value
        setUserInfo((prev: UserInfo) => ({ ...prev, passwordCheck: confirmPassword }))

        if(confirmPassword === userInfo.password && confirmPassword !== "") {
            setFeedbackForConfirmPassword("완벽합니다!")
        } 
        else if (confirmPassword !== userInfo.password && confirmPassword !== "") {
            setFeedbackForConfirmPassword("비밀번호가 일치하지 않습니다.")
        } 
        else {
            setFeedbackForConfirmPassword("")
        }
    }

    function handleVerifyCodeCheck(event: React.MouseEvent<HTMLButtonElement>){
        //todo: 서버 전송 후 response에 따른 제어 형식으로

        // if (verifyCode.length !== 6) {
        //     setFeedbackForVerifyCode("인증번호가 일치하지 않습니다.")
        // } else {
        //     setFeedbackForVerifyCode("")
        // }
    }

    function handleConfirmCheck(event: React.MouseEvent<HTMLButtonElement>) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const nickNameRegex = /^[가-힣a-zA-Z]{2,10}$/
    
        // 이메일 검증
        if(!emailRegex.test(userInfo.email)) {
            setFeedbackForEmail("이메일 형식과 일치하지 않습니다!")
        } 
        else{
            // 서버 피드백
            setFeedbackForEmail("")
        }    
    
        // 닉네임 검증
        if(userInfo.nickName.length < 2) {
            setFeedbackForNickName("닉네임은 최소 2자 이상이어야 합니다.")
        } 
        else if(userInfo.nickName.length > 10) {
            setFeedbackForNickName("닉네임은 최대 10자까지만 입력할 수 있습니다.")
        } 
        else if(!nickNameRegex.test(userInfo.nickName)) {
            setFeedbackForNickName("닉네임은 한글과 영문만 사용할 수 있습니다.")
        } 
        else{
            // 서버 피드백
            setFeedbackForNickName("")
        }
    }

    return (
        <>
            <Navbar />
            <div className="flex flex-col justify-center space-y-10 m-auto w-[26rem] px-9 py-12 shadow-lg rounded-xl mt-8">
                <InputComponents type="text" dataType="Email" placeholder="example@email.com" feedback={feedbackForEmail} eventHandler={handleEmailChange} />
                <InputComponents type="text" dataType="Nick Name" placeholder="" feedback={feedbackForNickName} eventHandler={handleNickNameChange} />
                <div className="">
                    <InputComponents type="text" dataType="Verify Code" placeholder="" feedback={feedbackForVerifyCode} eventHandler={handleVerifyCodeChange} />
                    <button
                        type="button"
                        className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 m-3"
                        onClick={handleVerifyCodeCheck}
                    >
                        {"Check"}
                    </button>
                </div>
                <InputComponents type="password" dataType="Password" placeholder="Password" feedback={feedbackForPassword} eventHandler={handlePasswordChange} />
                <InputComponents type="password" dataType="Password Confirm" placeholder="Re-enter Password" feedback={feedbackForConfirmPassword} eventHandler={handleConfirmPasswordChange} />
                <ButtonComponents buttonText="Confirm" eventHandler={handleConfirmCheck} disable={false} />
            </div>
        </>
    )
}

export default SignUpPage
