
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiGrid, FiList } from "react-icons/fi";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { usePortfolio } from "../context/PortfolioContext";

const EducationCard = ({
  index,
  branch,
  marks,
  name,
  degree,
  year,
  image,
  compact = false,
}) => (
  <motion.div
    variants={fadeIn("", "spring", index * 0.5, 0.75)}
    className={`group bg-[#1a1a1d] border border-transparent hover:border-[#6a5acd] hover:shadow-[0_0_25px_#6a5acd] transition-all duration-300 p-6 rounded-2xl flex flex-col items-center cursor-pointer ${
      compact ? "w-[280px] flex-shrink-0" : "w-full sm:w-[320px]"
    }`}
  >
    <img
      src={image}
      alt={`profile-${name}`}
      className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
    />

    <div className="text-center mt-4">
      <h3 className="text-white text-lg sm:text-xl font-semibold group-hover:text-[#6a5acd] transition-colors line-clamp-2">
        {name}
      </h3>
      <p className="text-sm text-gray-400 mt-1">{year}</p>
    </div>

    <p className="text-white text-3xl font-black mt-1 group-hover:scale-110 transition-transform">"</p>

    <div className="text-center mt-2 space-y-1.5">
      <p className="text-white text-base font-medium">{degree}</p>
      <p className="text-sm text-blue-400 font-semibold">{branch}</p>
      <p className="text-sm text-green-400 font-semibold">{marks}</p>
    </div>
  </motion.div>
);

const Education = () => {
  const { data } = usePortfolio();
  const educations = data?.educations || [];
  const [mobileMode, setMobileMode] = useState("scroll"); // scroll | vertical
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction === "left" ? -280 : 280, behavior: "smooth" });
    }
  };

  return (
    <div className="mt-12 bg-black-100 rounded-3xl overflow-hidden border border-white/5">
      {/* Header Section */}
      <div className={`bg-tertiary rounded-t-3xl ${styles.padding} min-h-[220px] sm:min-h-[250px] flex flex-col sm:flex-row sm:items-center justify-between gap-4`}>
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>Education Details...</p>
          <h2 className={`${styles.sectionHeadText} animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent font-black`}>
            Education
          </h2>
        </motion.div>

        {/* Mobile View Toggle */}
        <div className="sm:hidden flex items-center bg-black/40 p-1 rounded-xl border border-white/10 self-start">
          <button
            onClick={() => setMobileMode("scroll")}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              mobileMode === "scroll"
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

      {/* Desktop Cards Section */}
      <div className="hidden sm:flex -mt-16 pb-16 px-5 sm:px-10 flex-wrap justify-center gap-8 lg:gap-10">
        {educations.map((education, index) => (
          <EducationCard key={education.id || education.name} index={index} {...education} />
        ))}
      </div>

      {/* Mobile Cards Section */}
      <div className="sm:hidden -mt-12 pb-10 px-4">
        {mobileMode === "scroll" ? (
          <div>
            <div className="flex justify-between items-center mb-2 px-1">
              <span className="text-xs text-teal-400 font-medium">Swipe cards ⇄</span>
              <div className="flex gap-1">
                <button onClick={() => scroll("left")} className="p-1 rounded-full bg-white/10 text-white">
                  <FiChevronLeft className="w-4 h-4" />
                </button>
                <button onClick={() => scroll("right")} className="p-1 rounded-full bg-white/10 text-white">
                  <FiChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth"
              style={{ scrollbarWidth: "none" }}
            >
              {educations.map((education, index) => (
                <div key={education.id || education.name} className="snap-start">
                  <EducationCard index={index} {...education} compact={true} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {educations.map((education, index) => (
              <EducationCard key={education.id || education.name} index={index} {...education} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionWrapper(Education, "education");


