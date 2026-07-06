import { FiMenu } from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

import Footer from '../components/footer/footer.jsx'

function HomeLayout({children}) {
  const hideDrawer = () => {
    const drawer = document.getElementById("my-drawer");
    if (drawer) {
      drawer.checked = false;
    }
  };

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
              <button onClick={hideDrawer} className="btn btn-ghost btn-sm">
                <AiFillCloseCircle size={24} />
              </button>
            </li>

            <div className="mt-10">
              <li className="hover:bg-yellow-500 rounded-lg transition-all ease-in-out duration-300">
                <Link to="/" onClick={hideDrawer}>
                  Home
                </Link>
              </li>

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
            </div>
          </ul>
        </div>
      </div>

      {children}

      <Footer/>
    </div>
  );
}

export default HomeLayout;
