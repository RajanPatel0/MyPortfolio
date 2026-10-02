import React, { useState, useRef } from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiGrid, FiList } from "react-icons/fi";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { usePortfolio } from "../context/PortfolioContext";

const ServiceCard = ({ index, title, icon, compact = false }) => (
  <Tilt className={`${compact ? "w-[240px] flex-shrink-0" : "xs:w-[250px] w-full"}`}>
    <div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card h-full"
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-tertiary rounded-[20px] py-5 px-8 min-h-[260px] flex justify-evenly items-center flex-col h-full"
      >
        <img
          src={icon}
          alt={title}
          className="w-16 h-16 object-contain"
        />

        <h3 className="text-white text-[18px] sm:text-[20px] font-bold text-center">
          {title}
        </h3>
      </div>
    </div>
  </Tilt>
);

const About = () => {
  const { data } = usePortfolio();
  const about = data?.about || {};
  const services = about.services || [];
  const [mobileMode, setMobileMode] = useState("scroll-rows"); // scroll-rows | vertical
  const scrollRef = useRef(null);

  const emailTo = about.email || "rkp1505.l@gmail.com";
  const emailSubject = encodeURIComponent("Hiring / Collaboration Opportunity");
  const emailBody = encodeURIComponent(
    `Hi Rajan,\n\nI came across your portfolio and would like to discuss a potential opportunity with you.\n\nPlease let me know your availability for a quick call or meeting.\n\nBest regards,\n`
  );

  const mailtoLink = `mailto:${emailTo}?subject=${emailSubject}&body=${emailBody}`;

  const scrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -260, behavior: "smooth" });
  };
  const scrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: 260, behavior: "smooth" });
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>{about.subText || "Introduction"}</p>
          <h2 className={`${styles.sectionHeadText} animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent font-black`}>
            {about.headText || "Overview"}
          </h2>
        </motion.div>

        {/* Mobile View Toggle */}
        <div className="sm:hidden flex items-center bg-black/40 p-1 rounded-xl border border-white/10 self-start">
          <button
            onClick={() => setMobileMode("scroll-rows")}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              mobileMode === "scroll-rows"
                ? "bg-gradient-to-r from-teal-500 to-purple-600 text-white"
                : "text-secondary hover:text-white"
            }`}
          >
            <FiGrid className="w-3.5 h-3.5" />
            <span>Scroll ⇄</span>
          </button>
          <button
            onClick={() => setMobileMode("vertical")}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              mobileMode === "vertical"
                ? "bg-gradient-to-r from-purple-600 to-orange-500 text-white"
                : "text-secondary hover:text-white"
            }`}
          >
            <FiList className="w-3.5 h-3.5" />
            <span>Vertical ⇅</span>
          </button>
        </div>
      </div>

      <div className="flex items-center min-[1000px]:flex-row flex-col-reverse gap-8 mt-4">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="text-secondary text-[16px] sm:text-[17px] max-w-3xl leading-[28px] sm:leading-[30px]"
        >
          {about.bio}
          {" "}
          <a
            target="_blank"
            href={mailtoLink}
            rel="noopener noreferrer"
            className="animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent font-black mx-1 inline-block"
          >
            {emailTo}
          </a>
          {" "}I'm always open to new opportunities and collaborations!
        </motion.p>

        <Tilt className="xs:w-[350px] xs:h-[350px] w-full h-full m-auto max-[1000px]:my-6 flex-shrink-0">
          <motion.div
            variants={fadeIn("", "", 0.5, 1)}
            className="xs:w-[350px] w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
          >
            <div
              options={{ max: 45, scale: 1, speed: 450 }}
              className="bg-tertiary rounded-[20px] min-h-[200px] flex justify-evenly items-center flex-col overflow-hidden"
            >
              <img
                src={about.image}
                alt="profile"
                className="w-full h-full object-contain max-h-[350px]"
              />
            </div>
          </motion.div>
        </Tilt>
      </div>

      {/* Desktop Services Grid */}
      <div className="hidden sm:flex mt-20 flex-wrap gap-10 justify-center">
        {services.map((service, index) => (
          <ServiceCard key={service.id || service.title} index={index} {...service} />
        ))}
      </div>

      {/* Mobile Services Section (with toggle) */}
      <div className="sm:hidden mt-12">
        {mobileMode === "scroll-rows" ? (
          <div>
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-xs text-teal-400 font-medium">Swipe cards ⇄</span>
              <div className="flex gap-1">
                <button
                  onClick={scrollLeft}
                  className="p-1 rounded-full bg-white/10 text-white"
                  aria-label="Scroll left"
                >
                  <FiChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={scrollRight}
                  className="p-1 rounded-full bg-white/10 text-white"
                  aria-label="Scroll right"
                >
                  <FiChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth"
              style={{ scrollbarWidth: "none" }}
            >
              {services.map((service, index) => (
                <div key={service.id || service.title} className="snap-start">
                  <ServiceCard index={index} {...service} compact={true} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {services.map((service, index) => (
              <ServiceCard key={service.id || service.title} index={index} {...service} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");