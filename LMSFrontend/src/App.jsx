//CSS
import './styles/style.css'

//Libraries
import { Route, Routes } from 'react-router-dom'

//Components
import HomePage from './pages/homePage.jsx'
import AboutUs from './pages/aboutus.jsx'
import NotFound from './pages/notFound.jsx'
import SignUp from './pages/signUp.jsx'
import Login from './pages/login.jsx'
import CourseList from './pages/courses/courseList.jsx'
import ContactUs from './pages/contactUs.jsx'
import AccessDenied from './pages/denied.jsx'
import CourseDescription from './pages/courses/courseDescription.jsx'


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>}> </Route>
        <Route path='/about' element={<AboutUs />}> </Route> 

        <Route path='/signup' element={<SignUp />}> </Route>
        <Route path='/login' element={<Login />}> </Route>

        <Route path='/courses' element={<CourseList />}> </Route>
        <Route path='//course/discription' element={<CourseDescription />}> </Route>
        
        <Route path='/contact' element={<ContactUs />}> </Route>
        <Route path='/denied' element={<AccessDenied />}> </Route>

        
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </>
  )
}

export default App
