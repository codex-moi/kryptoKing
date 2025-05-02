import React, { useState } from 'react';
import { AiOutlineLogin, AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className="px-4 py-4 bg-gray-800 text-white flex justify-between items-center">
        <h2 className="text-3xl font-bold">KryptoKing</h2>
        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
          </button>
        </div>
        {/* Navigation Links */}
        <ul
          className={`flex flex-col md:flex-row md:space-x-4 text-lg absolute md:static top-16 left-0 w-full md:w-auto bg-gray-800 md:bg-transparent transition-all duration-300 ${
            isMenuOpen ? 'block' : 'hidden'
          }`}
        >
          <li className="py-2 md:py-0 text-center">
            <Link to="/">Home</Link>
          </li>
          <li className="py-2 md:py-0 text-center">
            <Link to="/about">Blog</Link>
          </li>
          <li className="py-2 md:py-0 text-center">
            <Link to="/contact">Pricing</Link>
          </li>
          <li className="py-2 md:py-0 text-center">
            <Link to="/services">Features</Link>
          </li>
        </ul>
        {/* Currency Selector and Sign-Up Button */}
        <div className="hidden md:flex items-center gap-2">
          <button className="bg-blue-500 text-white px-4 py-2 flex rounded">
            <AiOutlineLogin className="mt-1 mx-1" /> Sign Up
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;