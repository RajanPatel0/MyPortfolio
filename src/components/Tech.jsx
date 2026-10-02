import React, { useState, useRef } from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiGrid, FiList } from "react-icons/fi";

import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { usePortfolio } from "../context/PortfolioContext";

const TechCard = ({ index, icon, name, compact = false }) => {
  return (
    <Tilt className={`${compact ? "w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0" : "w-24 h-24 sm:w-28 sm:h-28"}`}>
      <div
        variants={fadeIn("right", "spring", 0.1 * index, 0.75)}
        className="w-full h-full green-pink-gradient p-[1px] rounded-full shadow-card select-none group relative"
        title={name}
      >
        <div
          options={{ max: 45, scale: 1, speed: 450 }}
          className="bg-tertiary rounded-full w-full h-full flex justify-center items-center p-3 relative overflow-hidden"
        >
          <img src={icon} alt={name || "tech"} className="w-10 h-10 sm:w-14 sm:h-14 object-contain group-hover:scale-110 transition-transform duration-200" />
        </div>
      </div>
    </Tilt>
  );
};

const Tech = () => {
  const { data } = usePortfolio();
  const technologies = data?.technologies || [];

  const [mobileMode, setMobileMode] = useState("scroll-2-rows"); // scroll-2-rows | wrap
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);

  const half = Math.ceil(technologies.length / 2);
  const row1 = technologies.slice(0, half);
  const row2 = technologies.slice(half);

  const scrollRow = (ref, dir) => {
    if (ref.current) {
      ref.current.scrollBy({ left: dir === "left" ? -200 : 200, behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className={`${styles.sectionSubText}`}>My tools</p>
          <h2 className={`${styles.sectionHeadText} animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent font-black`}>
            Technologies
          </h2>
        </div>

        {/* Mobile View Toggle */}
        <div className="sm:hidden flex items-center bg-black/40 p-1 rounded-xl border border-white/10 self-start">
          <button
            onClick={() => setMobileMode("scroll-2-rows")}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              mobileMode === "scroll-2-rows"
                ? "bg-gradient-to-r from-teal-500 to-purple-600 text-white"
                : "text-secondary hover:text-white"
            }`}
          >
            <FiGrid className="w-3.5 h-3.5" />
            <span>2-Row Scroll ⇄</span>
          </button>
          <button
            onClick={() => setMobileMode("wrap")}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              mobileMode === "wrap"
                ? "bg-gradient-to-r from-purple-600 to-orange-500 text-white"
                : "text-secondary hover:text-white"
            }`}
          >
            <FiList className="w-3.5 h-3.5" />
            <span>Wrap All ⇅</span>
          </button>
        </div>
      </div>

      {/* Desktop Tech Grid */}
      <div className="hidden sm:flex flex-row flex-wrap justify-center gap-8 lg:gap-10 mt-16">
        {technologies.map((technology, index) => (
          <div key={technology.id || technology.name} className="flex flex-col items-center gap-2">
            <TechCard icon={technology.icon} name={technology.name} index={index} />
            <span className="text-secondary text-xs font-medium tracking-wide">{technology.name}</span>
          </div>
        ))}
      </div>

      {/* Mobile Tech (Switchable) */}
      <div className="sm:hidden mt-8">
        {mobileMode === "scroll-2-rows" ? (
          <div className="space-y-4">
            {/* Row 1 */}
            <div>
              <div className="flex justify-between items-center mb-1 px-1">
                <span className="text-[11px] text-teal-400 font-semibold">Row 1 ⇄</span>
                <div className="flex gap-1">
                  <button onClick={() => scrollRow(row1Ref, "left")} className="p-1 bg-white/10 rounded-full text-white">
                    <FiChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => scrollRow(row1Ref, "right")} className="p-1 bg-white/10 rounded-full text-white">
                    <FiChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <div ref={row1Ref} className="flex gap-4 overflow-x-auto pb-2 snap-x scroll-smooth" style={{ scrollbarWidth: "none" }}>
                {row1.map((tech, i) => (
                  <div key={tech.id || `tech-r1-${i}`} className="snap-start flex flex-col items-center gap-1">
                    <TechCard icon={tech.icon} name={tech.name} index={i} compact={true} />
                    <span className="text-[10px] text-secondary truncate max-w-[70px] text-center">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2 */}
            <div>
              <div className="flex justify-between items-center mb-1 px-1">
                <span className="text-[11px] text-purple-400 font-semibold">Row 2 ⇄</span>
                <div className="flex gap-1">
                  <button onClick={() => scrollRow(row2Ref, "left")} className="p-1 bg-white/10 rounded-full text-white">
                    <FiChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => scrollRow(row2Ref, "right")} className="p-1 bg-white/10 rounded-full text-white">
                    <FiChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <div ref={row2Ref} className="flex gap-4 overflow-x-auto pb-2 snap-x scroll-smooth" style={{ scrollbarWidth: "none" }}>
                {row2.map((tech, i) => (
                  <div key={tech.id || `tech-r2-${i}`} className="snap-start flex flex-col items-center gap-1">
                    <TechCard icon={tech.icon} name={tech.name} index={i + half} compact={true} />
                    <span className="text-[10px] text-secondary truncate max-w-[70px] text-center">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-4">
            {technologies.map((tech, i) => (
              <div key={tech.id || `tech-wrap-${i}`} className="flex flex-col items-center gap-1">
                <TechCard icon={tech.icon} name={tech.name} index={i} compact={true} />
                <span className="text-[10px] text-secondary truncate max-w-[70px] text-center">{tech.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "tech");

