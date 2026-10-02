import React, { useState, useRef } from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { FiExternalLink, FiGithub, FiChevronLeft, FiChevronRight, FiGrid, FiList } from "react-icons/fi";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import livelink from "../assets/liveLink.png";
import { usePortfolio } from "../context/PortfolioContext";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  liveUrl,
  compact = false,
}) => {
  return (
    <Tilt
      options={{
        max: 25,
        scale: 1.01,
        speed: 400,
      }}
      className={`bg-tertiary p-5 rounded-2xl flex flex-col justify-between border border-white/5 shadow-card hover:border-purple-500/30 transition-all duration-300 ${
        compact ? "w-[300px] sm:w-[340px] flex-shrink-0" : "sm:w-[360px] w-full"
      }`}
    >
      <div>
        {/* Project Image Container */}
        <div className="relative w-full h-[190px] sm:h-[220px] flex items-center justify-center bg-black/40 rounded-xl overflow-hidden group">
          <img
            src={image}
            alt={name}
            className="h-full w-auto max-w-full object-contain rounded-xl group-hover:scale-105 transition-transform duration-300"
          />

          {/* Subtle badge on image */}
          <div className="absolute top-2 right-2 flex gap-1">
            {liveUrl && (
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" title="Live Available" />
            )}
          </div>
        </div>

        {/* Content */}
        <div className="mt-4">
          <h3 className="text-white font-bold text-[20px] sm:text-[22px] tracking-wide line-clamp-1">{name}</h3>
          <p className="mt-2 text-secondary text-[13px] sm:text-[14px] h-[5.5rem] overflow-y-auto leading-relaxed pr-1 custom-scrollbar">
            {description}
          </p>
        </div>

        {/* Tech Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5 max-h-[3.5rem] overflow-y-auto pr-1">
          {tags && tags.map((tag) => (
            <span
              key={`${name}-${tag.name}`}
              className={`text-[12px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 font-medium ${tag.color || "text-teal-400"}`}
            >
              #{tag.name}
            </span>
          ))}
        </div>
      </div>

      {/* Enhanced Action Text Buttons */}
      <div className="mt-5 pt-3 border-t border-white/10 flex items-center gap-3">
        {liveUrl ? (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 hover:opacity-95 text-white font-semibold text-xs sm:text-sm shadow-md shadow-purple-900/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <FiExternalLink className="w-4 h-4" />
            <span>Live / Visit</span>
          </a>
        ) : (
          <button
            disabled
            className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white/5 text-white/40 font-medium text-xs sm:text-sm cursor-not-allowed border border-white/5"
          >
            <span>Internal / Offline</span>
          </button>
        )}

        {source_code_link ? (
          <a
            href={source_code_link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-black/40 hover:bg-white/10 border border-white/20 text-white font-medium text-xs sm:text-sm shadow transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <FiGithub className="w-4 h-4" />
            <span>Code / GitHub</span>
          </a>
        ) : (
          <div
            title="Source code is private or confidential"
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white/5 text-white/40 text-xs sm:text-sm border border-white/5 select-none"
          >
            <FiGithub className="w-3.5 h-3.5 opacity-50" />
            <span>Private Repo</span>
          </div>
        )}
      </div>
    </Tilt>
  );
};

const Works = () => {
  const { data } = usePortfolio();
  const projects = data?.projects || [];

  // Mobile layout state: "scroll-2-rows" or "vertical-stack"
  const [mobileMode, setMobileMode] = useState("scroll-2-rows");
  const scrollRef1 = useRef(null);
  const scrollRef2 = useRef(null);

  // Divide projects into 2 rows for the 2-row horizontal scroll mode
  const half = Math.ceil(projects.length / 2);
  const row1Projects = projects.slice(0, half);
  const row2Projects = projects.slice(half);

  const scrollContainer = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = direction === "left" ? -320 : 320;
      ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className={`${styles.sectionSubText}`}>My work</p>
          <h2
            className={`${styles.sectionHeadText} animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent font-black`}
          >
            Projects
          </h2>
        </div>

        {/* Mobile View Toggle Button (2 Rows Left-to-Right Scroll vs Vertical Stack) */}
        <div className="sm:hidden flex items-center justify-start self-start bg-black/40 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => setMobileMode("scroll-2-rows")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              mobileMode === "scroll-2-rows"
                ? "bg-gradient-to-r from-teal-500 to-purple-600 text-white shadow-sm"
                : "text-secondary hover:text-white"
            }`}
          >
            <FiGrid className="w-3.5 h-3.5" />
            <span>2-Row Scroll ⇄</span>
          </button>
          <button
            onClick={() => setMobileMode("vertical-stack")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              mobileMode === "vertical-stack"
                ? "bg-gradient-to-r from-purple-600 to-orange-500 text-white shadow-sm"
                : "text-secondary hover:text-white"
            }`}
          >
            <FiList className="w-3.5 h-3.5" />
            <span>Vertical ⇅</span>
          </button>
        </div>
      </div>

      <div className="w-full flex">
        <p className="mt-3 text-secondary text-[16px] sm:text-[17px] max-w-3xl leading-[28px] sm:leading-[30px]">
          Following projects showcases my skills and experience through real-world examples of my work.
          Each project is briefly described with links to code repositories and live demos.
        </p>
      </div>

      {/* DESKTOP VIEW (Always responsive wrapped grid) */}
      <div className="hidden sm:flex mt-16 flex-wrap gap-7 justify-start">
        {projects.map((project, index) => (
          <ProjectCard key={project.id || `project-${index}`} index={index} {...project} />
        ))}
      </div>

      {/* MOBILE VIEW (Switchable between 2-Row Horizontal Scroll and Vertical Stack) */}
      <div className="sm:hidden mt-10">
        {mobileMode === "scroll-2-rows" ? (
          <div className="space-y-4">
            {/* Row 1 */}
            <div>
              <div className="flex items-center justify-between mb-1.5 px-1">
                <span className="text-xs font-medium text-teal-400">Row 1 • Swipe Left/Right ⇄</span>
                <div className="flex gap-1">
                  <button
                    onClick={() => scrollContainer(scrollRef1, "left")}
                    className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white active:scale-95"
                    aria-label="Scroll left"
                  >
                    <FiChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => scrollContainer(scrollRef1, "right")}
                    className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white active:scale-95"
                    aria-label="Scroll right"
                  >
                    <FiChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div
                ref={scrollRef1}
                className="flex gap-4 overflow-x-auto pb-3 pt-1 snap-x scrollbar-thin snap-mandatory scroll-smooth"
                style={{ scrollbarWidth: "none" }}
              >
                {row1Projects.map((project, index) => (
                  <div key={project.id || `row1-${index}`} className="snap-start flex-shrink-0">
                    <ProjectCard index={index} {...project} compact={true} />
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2 */}
            {row2Projects.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-1.5 px-1">
                  <span className="text-xs font-medium text-purple-400">Row 2 • Swipe Left/Right ⇄</span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => scrollContainer(scrollRef2, "left")}
                      className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white active:scale-95"
                      aria-label="Scroll left"
                    >
                      <FiChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => scrollContainer(scrollRef2, "right")}
                      className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white active:scale-95"
                      aria-label="Scroll right"
                    >
                      <FiChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div
                  ref={scrollRef2}
                  className="flex gap-4 overflow-x-auto pb-3 pt-1 snap-x scrollbar-thin snap-mandatory scroll-smooth"
                  style={{ scrollbarWidth: "none" }}
                >
                  {row2Projects.map((project, index) => (
                    <div key={project.id || `row2-${index}`} className="snap-start flex-shrink-0">
                      <ProjectCard index={index + half} {...project} compact={true} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Vertical Stack Mode */
          <div className="flex flex-col gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={project.id || `mobile-vert-${index}`} index={index} {...project} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "project");

