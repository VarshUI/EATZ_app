import { useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Header = () => {
  const [btnName, setbtnName] = useState("Login");
  const onlineStatus = useOnlineStatus();
  
  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo Container */}
          <div className="flex items-center gap-3">
            <img
              className="h-20 w-20 "
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpD62ZY3XDU6W80Fkim5czMlCIi3RFNvR6PnIMhElGg9fEDWDrv7-PxyG0RGFK8nKZHT4&usqp=CAU"
              alt="Logo"
            />
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-800">EATZ</h1>
              <p className="text-sm text-gray-600">Food Delivery App</p>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-6">
              <li className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Status:</span>
                <span className="text-lg">{onlineStatus ? "✅" : "🔴"}</span>
              </li>
              
              <li>
                <Link 
                  to="/grocery" 
                  className="text-gray-700 hover:text-orange-500 font-medium transition-colors duration-200"
                >
                  Grocery
                </Link>
              </li>
              
              <li>
                <Link 
                  to="/" 
                  className="text-gray-700 hover:text-orange-500 font-medium transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              
              <li>
                <Link 
                  to="/about" 
                  className="text-gray-700 hover:text-orange-500 font-medium transition-colors duration-200"
                >
                  About us
                </Link>
              </li>
              
              <li>
                <Link 
                  to="/contact" 
                  className="text-gray-700 hover:text-orange-500 font-medium transition-colors duration-200"
                >
                  Contact us
                </Link>
              </li>

              <li>
                <button 
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => alert("Cart clicked!")}
                >
                  <img
                    className="h-6 w-6"
                    src="https://cdn-icons-png.flaticon.com/512/891/891462.png"
                    alt="Cart Icon"
                  />
                </button>
              </li>
              
              <li>
                <button 
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                  onClick={() => btnName === "Login" ? setbtnName("Logout") : setbtnName("Login")}
                >
                  {btnName}
                </button>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation (Hidden by default - you can expand this with state) */}
        <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
          <ul className="flex flex-col gap-3 pt-4">
            <li className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Status:</span>
              <span className="text-lg">{onlineStatus ? "✅" : "🔴"}</span>
            </li>
            
            <li>
              <Link 
                to="/grocery" 
                className="block text-gray-700 hover:text-orange-500 font-medium transition-colors duration-200 py-2"
              >
                Grocery
              </Link>
            </li>
            
            <li>
              <Link 
                to="/" 
                className="block text-gray-700 hover:text-orange-500 font-medium transition-colors duration-200 py-2"
              >
                Home
              </Link>
            </li>
            
            <li>
              <Link 
                to="/about" 
                className="block text-gray-700 hover:text-orange-500 font-medium transition-colors duration-200 py-2"
              >
                About us
              </Link>
            </li>
            
            <li>
              <Link 
                to="/contact" 
                className="block text-gray-700 hover:text-orange-500 font-medium transition-colors duration-200 py-2"
              >
                Contact us
              </Link>
            </li>

            <li className="flex items-center gap-4 pt-2">
              <button 
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                onClick={() => alert("Cart clicked!")}
              >
                <img
                  className="h-6 w-6"
                  src="https://cdn-icons-png.flaticon.com/512/891/891462.png"
                  alt="Cart Icon"
                />
              </button>
              
              <button 
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                onClick={() => btnName === "Login" ? setbtnName("Logout") : setbtnName("Login")}
              >
                {btnName}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;