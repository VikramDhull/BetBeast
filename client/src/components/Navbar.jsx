import React, { useContext, useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { LuLogIn, LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { setShowLogin, logout, user, loadCreditsData } =
    useContext(AppContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleMenu = () => {
    setIsProfileOpen((prev) => !prev);
  };

  const handleClickOutside = (e) => {
    if (!e.target.closest("#user-menu")) {
      setIsProfileOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className=" text-white">
      <div className="flex items-center justify-between py-2 px-6 md:px-12">
        <div>
          <img
            className="cursor-pointer"
            onClick={() => navigate("/")}
            src={logo}
            alt="logo"
            width={170}
          />
        </div>

        <div className="hidden md:flex items-center gap-10 orbitron">
          <Link to="/" className="play text-xl hover:text-red-600">
            Home
          </Link>

          {/* <button
            onClick={() => handleNavClick("howitworks")}
            className="play text-xl hover:text-red-600"
          >
            How it works
          </button>
          <button
            onClick={() => handleNavClick("about")}
            className="play text-xl hover:text-red-600"
          >
            About
          </button> */}
          <button
            onClick={() => {
              if (!user) {
                setShowLogin(true);
              } else {
                navigate("/strategy");
              }
            }}
          >
            <p className="play text-xl hover:text-red-600 cursor-pointer">
              Strategies
            </p>
          </button>

          <Link to="/pricing" className="play text-xl hover:text-red-600">
            Pricing
          </Link>
          <Link to="/contact" className="play text-xl hover:text-red-600">
            Contact
          </Link>

          {user ? (
            <div className="relative" id="user-menu">
              <FaUserCircle
                onClick={toggleMenu}
                className="text-2xl cursor-pointer hover:text-red-600"
              />
              {isProfileOpen && (
                <div className="absolute top-0 right-0 z-10 text-black rounded pt-12">
                  <ul className="list-none w-32 m-0 p-2 bg-white rounded-md border text-sm shadow-lg">
                    <li
                      onClick={() => {
                        if (!user) {
                          setShowLogin(true);
                        } else {
                          loadCreditsData();
                          navigate("/profile");
                        }
                      }}
                      className="py-1 px-2 cursor-pointer pr-10 hover:text-red-600"
                    >
                      My Profile
                    </li>
                    <li
                      onClick={logout}
                      className="py-1 px-2 cursor-pointer pr-10 hover:text-red-600"
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                onClick={() => setShowLogin(true)}
                className="play text-xl bg-red-600 text-white px-5 py-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-300 active:scale-102 flex items-center gap-2"
              >
                Login
                <LuLogIn className="text-xl" />
              </button>
            </>
          )}
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <HiOutlineX size={28} />
            ) : (
              <HiOutlineMenu size={28} />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
          <div className="md:hidden text-2xl flex flex-col items-center gap-6 px-6 mt-6 pb-4">
            {/* <Link to="/">Home</Link> */}
            <a
              className="cursor-pointer"
              onClick={() => {
                setIsMenuOpen(!isMenuOpen), navigate("/");
              }}
            >
              Home
            </a>

            {/* <button onClick={() => handleNavClick("howitworks")}>
            How it works
          </button>
          <button onClick={() => handleNavClick("about")}>About</button> */}

            <a
              onClick={() => {
                if (!user) {
                  setIsMenuOpen(!isMenuOpen), setShowLogin(true);
                } else {
                  navigate("/strategy");
                }
              }}
              className="cursor-pointer"
            >
              Strategies
            </a>
            <Link to="/pricing">Pricing</Link>
            <Link to="/contact">Contact</Link>

            {user ? (
              <>
                <p
                  className="cursor-pointer"
                  onClick={() => {
                    if (!user) {
                      setShowLogin(true);
                    } else {
                      loadCreditsData();
                      navigate("/profile");
                    }
                  }}
                >
                  My Profile
                </p>

                <a onClick={logout} className="cursor-pointer">
                  Logout
                </a>
              </>
            ) : (
              <button
                onClick={() => {
                  setIsMenuOpen(!isMenuOpen), setShowLogin(true);
                }}
                className="bg-red-600 text-white w-full px-5 py-2 text-sm rounded-md cursor-pointer hover:scale-105 transition-all duration-300 active:scale-102"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
