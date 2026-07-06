import './styles/style.css'
import HomePage from './pages/homePage.jsx'
import { Route, Routes } from 'react-router-dom'


function App() {

  return (
    <>
      <Routes>

        <Route path='/' element={<HomePage/>}> </Route>

      </Routes>
    </>
  )
}

export default App
