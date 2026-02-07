import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineBriefcase } from "react-icons/hi";
import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";
import { LOGO2 } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDownloadResume = (e) => {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = '/Rajan_Resume.pdf';
    link.download = 'Rajan_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <nav
      className={`
        ${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 
        ${scrolled ? "backdrop-blur-md bg-black/50" : "bg-transparent"}
      `}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto gap-4">
        {/* Logo + Title: Added 'min-w-0' to allow the container to shrink without breaking */}
        <Link
          to="/"
          className="flex items-center min-w-0" 
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          {/* Title: Added 'truncate' or 'text-wrap' logic to prevent pushing the menu out */}
          <p className="text-white text-[16px] sm:text-[18px] font-bold cursor-pointer leading-tight truncate sm:whitespace-nowrap">
            Full Stack Developer <span className="hidden xs:inline">|</span> 
            <br className="xs:hidden" /> 
            <span className="xs:ml-1">Backend Engineer</span>
          </p>
        </Link>

        {/* Desktop Nav: Kept as is, added 'flex-shrink-0' */}
        <ul className="list-none hidden md:flex flex-row items-center gap-6 lg:gap-10 flex-shrink-0">
          <button
            className={`${
              active === "resume" ? "abhishek" : "abhishek-btn"
            } font-medium cursor-pointer border-[1px] px-4 py-1 rounded-lg`}
            onClick={(e) => {
              setActive("resume");
              handleDownloadResume(e);
            }}
          >
            <span className="flex items-center animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent font-black">
              <svg className="fill-current w-4 h-4 mr-2" viewBox="0 0 20 20">
                <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
              </svg>
              Resume
            </span>
          </button>

          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title ? "text-white" : "text-secondary"
              } hover:text-white text-[18px] font-medium cursor-pointer`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
        </ul>

        {/* Mobile Nav Toggle: Added 'flex-shrink-0' to ensure the menu icon NEVER disappears */}
        <div className="md:hidden flex flex-shrink-0 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain cursor-pointer transition-all duration-300"
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[200px] z-10 rounded-xl shadow-2xl border border-white/10`}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
               {/* Resume in Mobile Menu */}
               <li className="w-full pb-2 border-b border-white/10">
                <button
                    className="w-full text-left font-medium cursor-pointer"
                    onClick={(e) => {
                      setActive("resume");
                      setToggle(false);
                      handleDownloadResume(e);
                    }}
                  >
                    <span className="text-white">Download Resume</span>
                  </button>
               </li>

              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-medium cursor-pointer text-[18px] ${
                    active === nav.title ? "text-white" : "text-secondary"
                  }`}
                  onClick={() => {
                    setActive(nav.title);
                    setToggle(false);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
