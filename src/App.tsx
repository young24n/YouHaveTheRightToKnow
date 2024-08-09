import './App.css'
import SignInPage from './page/SignInPage'
import {Routes, Route} from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path='/' element={<SignInPage/>}/>
    </Routes>
  )
}

export default App
