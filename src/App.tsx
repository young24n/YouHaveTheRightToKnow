import './App.css'
import SignInPage from './page/SignInPage'
import Navbar from './components/Navbar'
import SignUpPage from './page/SignUpPage'
import {Routes, Route} from 'react-router-dom'
import InformationPage from './page/InformationPage'
import PostPage from './page/PostPage'

function App() {
  return (
    <Routes>
      <Route path='/' element={<SignInPage/>}/>
      <Route path='/information' element={<InformationPage/>}/>
      <Route path='/post' element={<PostPage/>}/>
      <Route path='/SignUp' element={<SignUpPage/>}/>
      <Route path='*' element={"잘못된 경로!"}/>
    </Routes>
  )
}

export default App
