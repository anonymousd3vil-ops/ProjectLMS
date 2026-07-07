//CSS
import './styles/style.css'

//Libraries
import { Route, Routes } from 'react-router-dom'

//Components
import HomePage from './pages/homePage.jsx'
import AboutUs from './pages/aboutus.jsx'
import NotFound from './pages/notFound.jsx'
import SignUp from './pages/signUp.jsx'


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>}> </Route>
        <Route path='/about' element={<AboutUs />}> </Route> 
        <Route path='/signup' element={<SignUp />}> </Route>
        
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </>
  )
}

export default App
