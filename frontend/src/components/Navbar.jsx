import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsSearch } from 'react-icons/bs';
import { FaBars } from 'react-icons/fa';
import Menu from "./Menu";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const [prompt, setPrompt] = useState("");
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const { user } = useContext(UserContext);

  const showMenu = () => setMenu(!menu);

  const handleSearch = () => {
    if (prompt) {
      navigate(`?search=${prompt}`);
    } else {
      navigate("/");
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-indigo-600">Blog Market</Link>
          </div>

          {path === "/" && (
            <div className="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end">
              <div className="max-w-lg w-full lg:max-w-xs">
                <label htmlFor="search" className="sr-only">Search</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <BsSearch className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    id="search"
                    name="search"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Search posts"
                    type="search"
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                </div>
              </div>
              <button
                onClick={handleSearch}
                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Search
              </button>
            </div>
          )}

          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {user ? (
              <>
                <Link to="/write" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Write</Link>
                <div className="ml-3 relative">
                  <div>
                    <button onClick={showMenu} className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" id="user-menu" aria-expanded="false" aria-haspopup="true">
                      <span className="sr-only">Open user menu</span>
                      <FaBars className="h-6 w-6" />
                    </button>
                  </div>
                  {menu && <Menu />}
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                <Link to="/register" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Register</Link>
              </>
            )}
          </div>

          <div className="sm:hidden flex items-center">
            <button onClick={showMenu} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <FaBars className="block h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {menu && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {user ? (
              <>
                <Link to="/write" className="text-gray-600 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium">Write</Link>
                <Link to="/profile" className="text-gray-600 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium">Profile</Link>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium">Login</Link>
                <Link to="/register" className="text-gray-600 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium">Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;