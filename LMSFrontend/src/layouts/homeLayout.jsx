import { FiMenu } from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import {useSelector, useDispatch } from 'react-redux'

import Footer from '../components/footer.jsx'

function HomeLayout({children}) {

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);

  const role = useSelector((state) => state?.auth?.role);

  const hideDrawer = () => {
    const drawer = document.getElementById("my-drawer");
    if (drawer) {
      drawer.checked = false;
    }
  };

  const handelLogout = async (event) => {
    event.preventDefault();

    const res = await dispatch(logout());
    
    if(res?.payload?.success){
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen">
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content">
          <label htmlFor="my-drawer" className="cursor-pointer inline-block">
            <FiMenu size={32} className="text-white m-4" />
          </label>
        </div>

        <div className="drawer-side z-50">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-48 sm:w-80 min-h-full bg-base-100 text-base-content relative ">
            <li className="w-fit absolute right-2 z-50">
              <button onClick={hideDrawer} className="btn btn-ghost btn-sm  hover:bg-yellow-600">
                <AiFillCloseCircle size={24} />
              </button>
            </li>

              <li className="hover:bg-yellow-500 rounded-lg transition-all ease-in-out duration-300">
                <Link to="/" onClick={hideDrawer}>
                  Home
                </Link>
              </li>
              
              {
                isLoggedIn && role === 'ADMIN' && (
                  <li className="hover:bg-yellow-500 rounded-lg transition-all ease-in-out duration-300">
                    <Link to="/admin/dashboard">
                      Admin Dashboard
                    </Link>
                  </li>
                )
              }

              <li className="hover:bg-yellow-500 rounded-lg transition-all ease-in-out duration-300">
                <Link to="/courses" onClick={hideDrawer}>
                  All Courses
                </Link>
              </li>

              <li className="hover:bg-yellow-500 rounded-lg transition-all ease-in-out duration-300">
                <Link to="/contact" onClick={hideDrawer}>
                  Contact Us
                </Link>
              </li>

              <li className="hover:bg-yellow-500 rounded-lg transition-all ease-in-out duration-300" >
                <Link to="/about" onClick={hideDrawer}>
                  About Us
                </Link>
              </li>
              
              {
                !isLoggedIn && (
                    <div className="w-full flex flex-col md:flex-row items-center gap-5 justify-center my-2">
                      <Link to='/login' className="w-1/2">
                        <button className="btn-primary px-4 py-1 w-full cursor-pointer hover:bg-yellow-600 font-semibold rounded-md bg-yellow-500 transition-all ease-in-out duration-500"> 
                          Login
                        </button>
                      </Link>
                      <Link to='/signup' className="w-1/2">
                        <button className="btn-secondary px-4 py-1 cursor-pointer font-semibold rounded-md w-full border border-yellow-500 hover:bg-yellow-500 transition-all ease-in-out  duration-500"> 
                          SignUp
                        </button>
                      </Link>
                    </div>
                )
              }
              {
                isLoggedIn && (
                    <div className="w-full flex flex-col md:flex-row items-center gap-5 justify-center my-2">
                      <Link to='/user/profile' className="w-1/2">
                        <button className="btn-primary px-4 py-1 w-full cursor-pointer hover:bg-yellow-600 font-semibold rounded-md bg-yellow-500 transition-all ease-in-out duration-500"> 
                          Profile
                        </button>
                      </Link>
                      <Link className="w-1/2">
                        <button onClick={handelLogout} className="btn-secondary px-4 py-1 cursor-pointer font-semibold rounded-md w-full border border-yellow-500 hover:bg-yellow-500 transition-all ease-in-out  duration-500"> 
                          Logout
                        </button>
                      </Link>
                    </div>
                )
              }
          </ul>
        </div>
      </div>

      {children}

      <Footer/>
    </div>
  );
}

export default HomeLayout;
