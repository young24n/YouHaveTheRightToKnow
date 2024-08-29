import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import ButtonComponents from "../components/ButtonComponents";
import { ButtonHTMLAttributes, MouseEvent, useState } from "react";
import apiClient from "../apiClient";
interface UserData{
  email: string,
  password: string
}

function SignInPage() {
  const inputClass = "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm leading-6"

  const [userData, setUserData] = useState<UserData>({
    email: "",
    password: ""
  })

  function handleSignIn(event: React.MouseEvent<HTMLButtonElement>){
    apiClient.Post('/api/auths/login',{userData})
    .then((response)=>{console.log(response)})
  }

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>){
    const email = event.target.value
    setUserData((prev: UserData) => ({ ...prev, email }))
  }
  
  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>){
    const password = event.target.value
    setUserData((prev: UserData) => ({ ...prev, password }))
  }
  return (  
    <>
    <Navbar visibleSubmenu={false} logoRedirectUrl="/"/>
    
    <div className="mt-8">
      <div className="flex min-h-full w-[26rem] flex-1 flex-col justify-center px-9 py-12 shadow-lg rounded-xl m-auto">
        <div className="mx-auto w-full max-w-lg">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 mx-auto w-full max-w-lg">
          <form action="#" method="POST" className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required  
                  autoComplete="email"
                  className={inputClass}
                  onChange={handleEmailChange}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className={inputClass}
                  onChange={handlePasswordChange}
                />
              </div>
            </div>

            <div>
              <ButtonComponents buttonText={"Sign in"} eventHandler={handleSignIn}></ButtonComponents>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            계정이 아직 없으신가요?
            <Link to="/SignUp" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              {" 회원가입 하기"}
            </Link>
          </p>
        </div>
      </div>
    </div>
    </>
  );
}

export default SignInPage;
