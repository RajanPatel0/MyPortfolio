import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineBriefcase } from "react-icons/hi";
import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";
import { usePortfolio } from "../context/PortfolioContext";

const Navbar = () => {
  const { data } = usePortfolio();
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
    const resumeUrl = data?.hero?.resume?.url || "/Rajan_Resume.pdf";
    const resumeFileName = data?.hero?.resume?.fileName || "Rajan_Resume.pdf";

    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = resumeFileName;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const headerTitle = data?.header?.title || "Software Developer(FullStack) | Backend Engineer";

  return (
    <nav
      className={`
        ${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 
        ${scrolled ? "backdrop-blur-md bg-black/60 shadow-lg" : "bg-transparent"}
      `}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto gap-4">
        {/* Logo + Title: dynamically controlled from context */}
        <Link
          to="/"
          className="flex items-center min-w-0"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <p className="text-white text-[15px] sm:text-[18px] font-bold cursor-pointer leading-tight truncate sm:whitespace-nowrap">
            {headerTitle}
          </p>
        </Link>

        {/* Desktop Nav */}
        <ul className="list-none hidden md:flex flex-row items-center gap-6 lg:gap-10 flex-shrink-0">
          <button
            className={`${
              active === "resume" ? "abhishek" : "abhishek-btn"
            } font-medium cursor-pointer border-[1px] px-4 py-1 rounded-lg transition-transform hover:scale-105`}
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
              } hover:text-white text-[17px] font-medium cursor-pointer transition-colors`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
        </ul>

        {/* Mobile Nav Toggle */}
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
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[220px] z-30 rounded-xl shadow-2xl border border-white/10`}
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
                  <span className="text-white flex items-center gap-2">
                    <svg className="fill-current w-4 h-4 text-teal-400" viewBox="0 0 20 20">
                      <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                    </svg>
                    Download Resume
                  </span>
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

