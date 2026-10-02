import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { styles } from "../styles";
import { TicoCanvas } from "./canvas";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import { usePortfolio } from "../context/PortfolioContext";

import {
  BsTwitter,
  BsGithub,
  BsInstagram,
  BsLinkedin,
} from "react-icons/bs";
import { SiLeetcode } from "react-icons/si";

const Hero = () => {
  const { data } = usePortfolio();
  const heroData = data?.hero || {};
  const socialLinks = heroData.socialLinks || {};

  // Default fallback words if empty
  const subheadings =
    heroData.subheadings && heroData.subheadings.length > 0
      ? heroData.subheadings
      : [
          "JS to C++ — Fluent Thinker",
          "MERN Stack Developer",
          "System Design & CI/CD Enthusiast",
          "Building Scalable & Interactive Systems",
        ];

  const [text] = useTypewriter({
    words: subheadings,
    loop: true,
    delaySpeed: 1200,
  });

  const name = heroData.name || "Rajan Patel";
  const nameParts = name.split(" ");
  const firstName = nameParts[0] || "Rajan";
  const restName = nameParts.slice(1).join(" ") || "Patel";

  return (
    <section className="relative w-full h-screen mx-auto">
      <div
        className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500"></div>
          <div className="w-1 sm:h-80 h-40 animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500"></div>
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            {heroData.greeting || "Hi, I'm"}{" "}
            <span className="animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent font-black">
              {firstName} <span className="hidden sm:inline">{restName}</span>
            </span>
          </h1>

          <p className={`${styles.heroSubText} mt-2 sm:-mb-10 text-white-100 max-w-lg`}>
            {text}
            <Cursor cursorColor="#915eff" />
          </p>
        </div>
      </div>

      <TicoCanvas />

      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>

      {/* Right side vertical social strip */}
      <div className="absolute right-5 top-1/2 -translate-y-1/2 flex flex-col gap-5 items-center md:mt-10 mt-5 md:gap-8 z-10 bg-black/30 backdrop-blur-sm p-2 rounded-full border border-white/5">
        {/* 1. GitHub */}
        <Link
          target="_blank"
          to={socialLinks.github || "https://github.com/RajanPatel0"}
          title="GitHub Profile"
        >
          <BsGithub size={28} className="icon hover:text-[#494646] hover:-translate-y-1 transition-all duration-100" />
        </Link>

        {/* 2. LeetCode (Directly below GitHub, above LinkedIn) */}
        <Link
          target="_blank"
          to={socialLinks.leetcode || "https://leetcode.com/u/RajanPatel_/"}
          title="LeetCode Profile"
        >
          <SiLeetcode size={28} className="icon hover:text-[#FFA116] hover:-translate-y-1 transition-all duration-100" />
        </Link>

        {/* 3. LinkedIn */}
        <Link
          target="_blank"
          to={socialLinks.linkedin || "https://www.linkedin.com/in/rajan-patel-5016a628a"}
          title="LinkedIn Profile"
        >
          <BsLinkedin size={28} className="icon hover:text-[#0e76a8] hover:-translate-y-1 transition-all duration-100" />
        </Link>

        {/* 4. Twitter / X */}
        <Link
          target="_blank"
          to={socialLinks.twitter || "https://x.com/Rajan_patel15"}
          title="Twitter / X Profile"
        >
          <BsTwitter size={28} className="icon hover:text-[#1DA1F2] hover:-translate-y-1 transition-all duration-100" />
        </Link>

        {/* 5. Instagram */}
        <Link
          target="_blank"
          to={socialLinks.instagram || "https://www.instagram.com/rajanpatel._/"}
          title="Instagram Profile"
        >
          <BsInstagram size={28} className="icon hover:text-[#E1306C] hover:-translate-y-1 transition-all duration-100" />
        </Link>
      </div>
    </section>
  );
};

export default Hero;

