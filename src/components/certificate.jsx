import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiGrid, FiList } from "react-icons/fi";
import { usePortfolio } from "../context/PortfolioContext";

const CertificateCard = ({ cert, index, compact = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, amount: 0.2 }}
      className={`flex flex-col sm:flex-row items-center sm:items-start gap-4 bg-[#1d1836] text-white p-5 rounded-2xl shadow-md border border-purple-600/50 hover:border-purple-400 transition-all ${
        compact ? "w-[290px] flex-shrink-0" : "w-full"
      }`}
    >
      {cert.image ? (
        <motion.img
          src={cert.image}
          alt={cert.title}
          className="w-full sm:w-52 h-44 object-contain rounded-xl border border-gray-700 bg-black/30"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 200 }}
        />
      ) : (
        <div className="w-full sm:w-52 h-44 bg-gray-800 rounded-xl flex items-center justify-center text-sm text-gray-400 border border-gray-700">
          No Image
        </div>
      )}

      <div className="text-center sm:text-left flex-1 flex flex-col justify-center">
        <h3 className="text-lg sm:text-xl font-bold text-white tracking-wide">{cert.title}</h3>
        <p className="text-sm text-gray-300 mt-1 font-medium">{cert.issuer}</p>
        <span className="text-xs mt-2 px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 w-fit self-center sm:self-start">
          {cert.year}
        </span>
      </div>
    </motion.div>
  );
};

const Certificate = () => {
  const { data } = usePortfolio();
  const certificates = data?.certificates || [];
  const [mobileMode, setMobileMode] = useState("scroll"); // scroll | vertical
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction === "left" ? -300 : 300, behavior: "smooth" });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <p className="sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider">Credentials & Honors</p>
          <h2 className="text-white text-3xl sm:text-4xl font-black animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">
            Certificates
          </h2>
        </div>

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

      {/* Desktop Grid */}
      <div className="hidden sm:grid grid-cols-1 lg:grid-cols-2 gap-6">
        {certificates.map((cert, index) => (
          <CertificateCard key={cert.id || `cert-${index}`} cert={cert} index={index} />
        ))}
      </div>

      {/* Mobile Section */}
      <div className="sm:hidden">
        {mobileMode === "scroll" ? (
          <div>
            <div className="flex justify-between items-center mb-2 px-1">
              <span className="text-xs text-teal-400 font-medium">Swipe certificates ⇄</span>
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
              {certificates.map((cert, index) => (
                <div key={cert.id || `cert-mob-${index}`} className="snap-start">
                  <CertificateCard cert={cert} index={index} compact={true} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {certificates.map((cert, index) => (
              <CertificateCard key={cert.id || `cert-mob-v-${index}`} cert={cert} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Certificate;

