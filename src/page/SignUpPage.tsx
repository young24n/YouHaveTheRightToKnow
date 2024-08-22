import { useState } from "react"
import InputComponents from "../components/InputComponent"
import Navbar from "../components/Navbar"
import ButtonComponents from "../components/ButtonComponents"

function SignUpPage() {
    const [feedbackForEmail, setFeedbackForEmail] = useState("")
    const [feedbackForVerifyCode, setFeedbackForVerifyCode] = useState("")
    const [feedbackForPassword, setFeedbackForPassword] = useState("")
    const [feedbackForConfirmPassword, setFeedbackForConfirmPassword] = useState("")

    const [userInfo, setUserInfo] = useState({
        email: "", 
        verifyCode: "",
        password: "", 
        passwordCheck: "", 
    })

    const [checkLoding, setCheckLoding] = useState(false)
    const [confirmLoding, setConfirmLoading] = useState(false)

    function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
        const email = event.target.value
        setUserInfo((prev) => ({ ...prev, email }))
    }

    //자판 배열이 한컴 입력기면 입력이 안됨
    function handleVerifyCodeChange(event: React.ChangeEvent<HTMLInputElement>) {
        let verifyCode = event.target.value
        event.target.value = verifyCode.replace(/\D/g, '').slice(0, 6)
        setUserInfo((prev) => ({ ...prev, verifyCode }))
    }

    function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        const password = event.target.value

        setUserInfo((prev) => {
            const updatedUserInfo = { ...prev, password }

            // 비밀번호 확인 로직을 여기에서 바로 실행
            if (updatedUserInfo.passwordCheck && updatedUserInfo.passwordCheck !== password) {
                setFeedbackForConfirmPassword("비밀번호가 일치하지 않습니다.")
            } else {
                setFeedbackForConfirmPassword("완벽합니다!") // 피드백 초기화
            }

            return updatedUserInfo
        })

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
        if (!passwordRegex.test(password)) {
            setFeedbackForPassword("비밀번호는 특수문자, 숫자를 포함하여 8자 이상으로 구성해야 합니다.")
        } else {
            setFeedbackForPassword("완벽합니다!") // 피드백 초기화
        }
    }

    function handleConfirmPasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        const confirmPassword = event.target.value
        setUserInfo((prev) => {
            const updatedUserInfo = { ...prev, passwordCheck: confirmPassword }

            if (confirmPassword !== updatedUserInfo.password) {
                setFeedbackForConfirmPassword("비밀번호가 일치하지 않습니다.")
            } else {
                setFeedbackForConfirmPassword("완벽합니다!") // 피드백 초기화
            }

            return updatedUserInfo
        })
    }

    return (
        <>
            <Navbar />
            <div className="flex flex-col justify-center space-y-10 m-auto w-[26rem] px-9 py-12 shadow-lg rounded-xl mt-8">
                <InputComponents type="text" dataType="Email" placeholder="example@email.com" feedback={feedbackForEmail} eventHandler={handleEmailChange} />
                <div className="">
                    <InputComponents type="text" dataType="Verify Code" placeholder="" feedback={feedbackForVerifyCode} eventHandler={handleVerifyCodeChange} />
                    <button
                        type="button"
                        className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 m-3"
                        onClick={() => {}}
                    >
                        {"Check"}
                    </button>
                </div>
                <InputComponents type="password" dataType="Password" placeholder="Password" feedback={feedbackForPassword} eventHandler={handlePasswordChange} />
                <InputComponents type="password" dataType="Password Confirm" placeholder="Re-enter Password" feedback={feedbackForConfirmPassword} eventHandler={handleConfirmPasswordChange} />
                <ButtonComponents buttonText="Confirm" eventHandler={() => { console.log(userInfo) }} />
            </div>
        </>
    )
}

export default SignUpPage
