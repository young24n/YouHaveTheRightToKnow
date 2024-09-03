import { useState } from "react"
import InputComponents from "../components/InputComponent"
import Navbar from "../components/Navbar"
import ButtonComponents from "../components/ButtonComponents"
import apiClient from "../apiClient"
import { Loading } from "react-daisyui"
// todo: feedback 주는 곳으로 ref 설정
// todo: 요청 전 네트워크 상태 확인 후 빠른 피드백 가능한지 확인
// (이전 프로젝트에서 원인이 확실한 경우 timeout이 5초 동안 유지되는 것은 불쾌했음 timeout을 줄이기엔 불안정한 상황 또한 고려해야함)
// response 타입 정의
interface UserInfo{
    email: string, 
    nickName: string
    verifyCode: string,
    password: string, 
    passwordCheck: string, 
    isVerify: boolean
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
        isVerify: false
    })
    const [isChecked, setIsChecked] = useState<boolean>(false)

    const [checkLoading, setCheckLoading] = useState<boolean>(false)
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false)

    const [verifyBtnText, setVerifyBtnText] = useState<string>("Send Code")
    //추후 기능 관련 함수는 파일을 분리하는 것이 좋아보임
    function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>){
        const email = event.target.value
        setUserInfo((prev: UserInfo) => ({ ...prev, email }))
    }

    function handleNickNameChange(event: React.ChangeEvent<HTMLInputElement>){
        const nickName = event.target.value
        setUserInfo((prev: UserInfo) => ({ ...prev, nickName }))
    }

    //CAUTION: 자판 배열이 한컴 입력기일 경우 입력이 안됨
    function handleVerifyCodeChange(event: React.ChangeEvent<HTMLInputElement>){
        const verifyCode = event.target.value
        event.target.value = verifyCode.replace(/\D/g, '').slice(0, 6)
        setUserInfo((prev: UserInfo) => ({ ...prev, verifyCode }))
    }

    function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>){
        const password = event.target.value
        setUserInfo((prev: UserInfo) => ({ ...prev, password }))

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
        if(!passwordRegex.test(password)){
            setFeedbackForPassword("비밀번호는 특수문자, 숫자를 포함하여 8자 이상으로 구성해야 합니다.")
        } 
        else{
            setFeedbackForPassword("완벽합니다!")
        }

        if(userInfo.passwordCheck && userInfo.passwordCheck !== password){
            setFeedbackForConfirmPassword("비밀번호가 일치하지 않습니다.")
        } 
        else if(userInfo.passwordCheck === password && userInfo.passwordCheck !== ""){
            setFeedbackForConfirmPassword("완벽합니다!")
        } 
        else{
            setFeedbackForConfirmPassword("")
        }
    }

    function handleConfirmPasswordChange(event: React.ChangeEvent<HTMLInputElement>){
        const confirmPassword = event.target.value
        setUserInfo((prev: UserInfo) => ({ ...prev, passwordCheck: confirmPassword }))

        if(confirmPassword === userInfo.password && confirmPassword !== ""){
            setFeedbackForConfirmPassword("완벽합니다!")
        } 
        else if(confirmPassword !== userInfo.password && confirmPassword !== ""){
            setFeedbackForConfirmPassword("비밀번호가 일치하지 않습니다.")
        } 
        else{
            setFeedbackForConfirmPassword("")
        }
    }

    async function handleVerifyCodeCheck(event: React.MouseEvent<HTMLButtonElement>){
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const trimmedEmail = userInfo.email.trim()
        if(!emailRegex.test(trimmedEmail)){
            setFeedbackForEmail("이메일 형식과 일치하지 않습니다!")
            return
        }
    
        try{
            setCheckLoading(true)  // 로딩 상태 시작
            setVerifyBtnText("Loading...")
    
            const response = await apiClient.Post(`/api/emails/verification-requests?email=${encodeURIComponent(trimmedEmail)}`)                
    
            if(response.status === 200){
                setFeedbackForVerifyCode("인증번호가 전송되었습니다.")
                setVerifyBtnText("Check Code")
            } 
            else{
                setFeedbackForVerifyCode("인증번호 전송에 실패했습니다.")
                setVerifyBtnText("Send Code")
            }
        } 
        catch(error){
            setFeedbackForVerifyCode("네트워크 오류가 발생했습니다.")
        } 
        finally{
            setCheckLoading(false) 
            setFeedbackForEmail("") 
        }
    }
    
    async function handleVerifyCodeConfirm(event: React.MouseEvent<HTMLButtonElement>){
        try{
            if(userInfo.verifyCode === ""){
                setFeedbackForVerifyCode("인증번호를 입력하세요")
            }
            else if(userInfo.verifyCode.length < 6){
                setFeedbackForVerifyCode("인증번호는 6자리 모두 입력해야 합니다.")
            }
            else{
                setCheckLoading(true)
                const response = await apiClient.Get(`/api/emails/verification`,{
                    params: {
                        email: userInfo.email,
                        code: userInfo.verifyCode,
                    }
                })
    
                if(response.status === 200){
                    setFeedbackForVerifyCode("인증이 완료되었습니다!")
                    setIsChecked(true)
                }
                else{
                    setFeedbackForVerifyCode("인증에 실패했습니다. 다시 시도해 주세요")
                    setVerifyBtnText("Send Code")
                }
            }
            setCheckLoading(false)
        }
        catch(error){

        }
        //이메일 일치 하지 않음 -> 서버 검증에 따른 피드백 하기

    }

    function handleConfirmCheck(event: React.MouseEvent<HTMLButtonElement>){
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const nickNameRegex = /^[가-힣a-zA-Z]{2,10}$/
    
        // 이메일 검증
        if(!emailRegex.test(userInfo.email)){
            setFeedbackForEmail("이메일 형식과 일치하지 않습니다!")
        } 
        else{
            // 서버 요청,피드백
            setFeedbackForEmail("")
        }    
    
        // 닉네임 검증
        if(userInfo.nickName.length < 2){
            setFeedbackForNickName("닉네임은 최소 2자 이상이어야 합니다.")
        } 
        else if(userInfo.nickName.length > 10){
            setFeedbackForNickName("닉네임은 최대 10자까지만 입력할 수 있습니다.")
        } 
        else if(!nickNameRegex.test(userInfo.nickName)){
            setFeedbackForNickName("닉네임은 한글과 영문만 사용할 수 있습니다.")
        } 
        else if(!userInfo.isVerify){
            setFeedbackForVerifyCode("이메일 인증을 먼저 완료하여야 합니다.")
        }
        else{
            // 서버 요청,피드백
            const response = apiClient.Post(`/api/auths/join
                ?email=${encodeURIComponent(userInfo.email)}
                &password=${encodeURIComponent(userInfo.password)}
                &nickname=${encodeURIComponent(userInfo.nickName)}`)

            setFeedbackForNickName("")
            setFeedbackForVerifyCode("")
        }
    }

    return (
        <>
            <Navbar visibleSubmenu={false} logoRedirectUrl="/"/>
            <div className="flex flex-col justify-center space-y-7 m-auto w-[26rem] px-9 py-12 shadow-lg rounded-xl mt-8">
                <InputComponents type="text" dataType="Email" placeholder="example@email.com" feedback={feedbackForEmail} eventHandler={handleEmailChange} disable={isChecked} />
                <div className="">
                    <InputComponents type="text" dataType="Verify Code" placeholder="" feedback={feedbackForVerifyCode} eventHandler={handleVerifyCodeChange} disable={isChecked} />
                    <button
                        type="button"
                        className={`flex justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm m-3
                        ${isChecked ? 'bg-gray-500 cursor-auto opacity-50' : 'bg-indigo-600 hover:bg-indigo-500 cursor-pointer'}
                        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                        onClick={verifyBtnText === "Send Code" ? handleVerifyCodeCheck : handleVerifyCodeConfirm }
                        disabled={isChecked}
                    >
                        {verifyBtnText}
                    </button>

                </div>
                <InputComponents type="text" dataType="Nick Name" placeholder="" feedback={feedbackForNickName} eventHandler={handleNickNameChange} />
                <InputComponents type="password" dataType="Password" placeholder="Password" feedback={feedbackForPassword} eventHandler={handlePasswordChange} />
                <InputComponents type="password" dataType="Password Confirm" placeholder="Re-enter Password" feedback={feedbackForConfirmPassword} eventHandler={handleConfirmPasswordChange} />
                <ButtonComponents buttonText="Confirm" eventHandler={handleConfirmCheck} disable={false} />
            </div>
        </>
    )
}

export default SignUpPage
