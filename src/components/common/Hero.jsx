// src/components/common/Hero.jsx
import React, { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { AppContext } from "../../context/AppContext";

const Hero = () => {
  const heroRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const buttonsRef = useRef(null);

  const { searchQuery, setSearchQuery } = useContext(AppContext);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.from(headingRef.current, {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    })
      .from(
        subheadingRef.current,
        { y: 40, opacity: 0, duration: 0.8 },
        "-=0.5"
      )
      .from(
        buttonsRef.current,
        { scale: 0.8, opacity: 0, duration: 0.6 },
        "-=0.4"
      );
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-screen flex items-center justify-center text-white px-6 md:px-16 overflow-hidden bg-gradient-to-br from-indigo-800 via-purple-700 to-pink-600"
    >
      {/* Glow Background Circles */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-indigo-500/30 rounded-full blur-3xl"></div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl text-center backdrop-blur-md bg-white/10 p-10 rounded-3xl shadow-2xl border border-white/20">
        <h1
          ref={headingRef}
          className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 tracking-wide"
        >
          Shree Status & Quotes 
        </h1>

        <p
          ref={subheadingRef}
          className="text-lg md:text-2xl text-gray-200 mb-8"
        >
          Explore trending quotes, powerful thoughts, and beautiful status —
          like, share & download instantly.
        </p>

        {/* Search */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search beautiful quotes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-xl h-12 px-6 rounded-full text-white bg-white/10 border border-white/30 outline-none placeholder-gray-300 focus:ring-2 focus:ring-pink-400"
          />
        </div>

        {/* Buttons */}
        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Link
            to="/category"
            className="bg-white text-indigo-700 font-semibold px-10 py-3 rounded-full shadow-lg hover:scale-105 hover:bg-pink-100 transition-all duration-300"
          >
            Explore Categories
          </Link>

          <Link
            to="/about"
            className="border border-white text-white font-semibold px-10 py-3 rounded-full hover:bg-white hover:text-indigo-700 transition-all duration-300"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
