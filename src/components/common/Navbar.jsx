// src/components/common/Navbar.jsx
import { Link } from "react-router-dom";
import { useState, useContext, useRef, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import gsap from "gsap";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { searchQuery, setSearchQuery } = useContext(AppContext);

  const navRef = useRef(null);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Navbar entry animation
  useEffect(() => {
    gsap.from(navRef.current, {
      y: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  }, []);

  // Close menu on outside click (EXCEPT button)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        open &&
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        !buttonRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <nav
      ref={navRef}
      className="sticky top-0 z-50 w-full bg-gradient-to-r from-indigo-800 via-purple-700 to-pink-600 backdrop-blur-md shadow-lg"
    >
      <div className="flex items-center justify-between px-6 md:px-16 h-[72px]">

        {/* Logo */}
        <Link
          to="/"
          className="text-white text-xl md:text-2xl font-extrabold tracking-wide"
        >
          Shree Status Quotes
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-10 text-white font-medium">
          <li className="hover:text-pink-200 transition">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-pink-200 transition">
            <Link to="/about">About</Link>
          </li>
          <li className="hover:text-pink-200 transition">
            <Link to="/category">Categories</Link>
          </li>
          <li className="hover:text-pink-200 transition">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>

        {/* Desktop Search */}
        <input
          type="text"
          placeholder="Search quotes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="hidden md:block w-64 h-10 px-5 rounded-full bg-white/20 text-white placeholder-gray-200 outline-none focus:ring-2 focus:ring-pink-400"
        />

        {/* Mobile Toggle Button */}
        <button
          ref={buttonRef}
          onClick={() => setOpen((prev) => !prev)}
          className="md:hidden text-white text-3xl focus:outline-none"
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Slider */}
      <div
        ref={menuRef}
        className={`md:hidden absolute top-[72px] left-0 w-full bg-gradient-to-br from-indigo-800 to-purple-700 backdrop-blur-xl
        transition-all duration-300 ease-in-out
        ${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5 pointer-events-none"}`}
      >
        <div className="p-6 space-y-5 text-white text-lg">

          <input
            type="text"
            placeholder="Search quotes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 px-5 rounded-full bg-white/20 placeholder-gray-200 outline-none"
          />

          <Link to="/" onClick={() => setOpen(false)} className="block">
            Home
          </Link>
          <Link to="/about" onClick={() => setOpen(false)} className="block">
            About
          </Link>
          <Link to="/category" onClick={() => setOpen(false)} className="block">
            Categories
          </Link>
          <Link to="/contact" onClick={() => setOpen(false)} className="block">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
