import React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import SignUp from './pages/SignUp/SignUp'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import './index.css'

const routes = (
  <Router>
    <Routes>
      <Route path = "/dashboard" exact element = {<Home/>}/>
      <Route path = "/login" exact element = {<Login/>}/>
      <Route path = "/signup" exact element = {<SignUp/>}/>
    </Routes>
  </Router>
)

//rafce for shortcut
const App = () => {
  return (
    <div>{routes}</div>
  )
}

export default App