import './styles/style.css'
import HomePage from './pages/homePage.jsx'
import { Route, Routes } from 'react-router-dom'
import AboutUs from './pages/aboutus.jsx'
import NotFound from './pages/notFound.jsx'


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>}> </Route>
        <Route path='/about' element={<AboutUs />}> </Route> 

        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </>
  )
}

export default App
