import './App.css'
import SignInPage from './page/SignInPage'
import Navbar from './components/Navbar'
import SignUpPage from './page/SignUpPage'
import {Routes, Route} from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path='/' element={<SignInPage/>}/>
      <Route path='/nav' element={<Navbar/>}/>
      <Route path='/SignUp' element={<SignUpPage/>}/>
    </Routes>
  )
}

export default App
