import React from "react";
import { motion } from "framer-motion";
import LOR from "../assets/lor.png";
import hackmol from "../assets/hackmol.png";
import udemy from "../assets/udemy.png";
import ml from "../assets/mlcert.jpeg";

const certificates = [
  {
    title: "Machine Learning Training",
    issuer: "IIT Madras Pravartak",
    year: "2025",
    image: ml,
  },
  
  {
    title: "Web Development",
    issuer: "Udemy - Proper Dot Institute",
    year: "2024",
    image: udemy,
  },
  {
    title: "Hackmol 6.0 Hackathon",
    issuer: "NIT Jalandhar",
    year: "2025",
    image: hackmol,
  },
  {
    title:"Letter of Recommendation",
    issuer: "Wyreflow Technologies",
    year: "2025",
    image: LOR,
  },
];

const Certificate = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <h2 className="text-white text-3xl font-bold mb-8">Certificates</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {certificates.map((cert, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-4 bg-[#1d1836] text-white p-5 rounded-xl shadow-md border border-purple-600"
          >
            {cert.image ? (
              <motion.img
                src={cert.image}
                alt={cert.title}
                className="w-full sm:w-58 h-auto object-contain rounded-lg border border-gray-600"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
              />
            ) : (
              <div className="w-full sm:w-58 h-48 bg-gray-700 rounded-lg flex items-center justify-center text-sm text-gray-400">
                No Image
              </div>
            )}

            {/* TEXT CONTENT - VISIBLE ON MOBILE, HIDDEN ON LAPTOP */}
            <div className="text-center sm:text-left block sm:hidden">
              <h3 className="text-xl font-semibold">{cert.title}</h3>
              <p className="text-sm text-gray-400 mt-1">{cert.issuer}</p>
              <p className="text-sm mt-1 text-teal-400">{cert.year}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Certificate;
