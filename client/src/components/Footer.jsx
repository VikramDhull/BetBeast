import React from "react";
import logo from "../assets/logo.png";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto px-24 md:flex md:justify-between">
        {/* Brand / Logo */}
        <div>
          <img src={logo} alt="logo" width={170} />
        </div>

        {/* Quick Links */}
        <div className="mt-6 md:mt-0">
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            {/* <li>
              <a href="/" className="hover:text-white">
                About
              </a>
            </li> */}
            <li>
              <Link to="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
            {/* <li>
              <a href="/" className="hover:text-white">
                How It Works
              </a>
            </li> */}
            <li>
              <Link to="/terms" className="hover:text-white">
                Terms and Conditions
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} BetBeast. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
