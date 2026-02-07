import React from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion"; // Make sure motion is imported

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import rajan from "../assets/Me.jpg";

const ServiceCard = ({ index, title, icon }) => (
  <Tilt className="xs:w-[250px] w-full">
    <div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
      >
        <img
          src={icon}
          alt="web-development"
          className="w-16 h-16 object-contain"
        />

        <h3 className="text-white text-[20px] font-bold text-center">
          {title}
        </h3>
      </div>
    </div>
  </Tilt>
);

const About = () => {

  const emailTo = "rkp1505.l@gmail.com";

  const emailSubject = encodeURIComponent(
    "Hiring / Collaboration Opportunity"
  );

  const emailBody = encodeURIComponent(
  `Hi Rajan,

  I came across your portfolio and would like to discuss a potential opportunity with you.

  Please let me know your availability for a quick call or meeting.

  Best regards,
  `
  );

const mailtoLink = `mailto:${emailTo}?subject=${emailSubject}&body=${emailBody}`;

  return (
    <>
      {/* Changed div to motion.div */}
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={`${styles.sectionHeadText} animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent font-black`}>Overview</h2>
      </motion.div>
      <div className="flex items-center min-[1000px]:flex-row flex-col-reverse">
        {/* Changed p to motion.p */}
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
        I am a Software Engineer and Full-Stack Developer driven by the challenge of building systems that don't just work, but scale. Currently pursuing my B.Tech at I.K.G. PTU with an 8.5 CGPA, I have deeply immersed myself in distributed systems and high-performance backend architecture & System-Design. My technical journey is centered on the MERN Stack, yet my true expertise lies under the hood—optimizing data flow and reliability. During my tenure at Small Fare™, I engineered event-driven services using PostGreSQL, Kafka, Cassendra and Redis to ensure seamless performance under heavy loads. Beyond core development, I focus on solving real-world gaps through innovation, from building ML-powered demand platforms like InVolv to AI-driven learning tools like Questify. My grit is reflected in continuous LeetCode solutions and finalist rankings in hackathons like HackMol 6.0. As a Training & Placement Cell Coordinator, I bridge the gap between technical execution and strategic leadership, always seeking to push the boundaries of the digital landscape through collaborative, production-grade engineering.
  <a
    target="_blank"
    href={mailtoLink}
    rel="noopener noreferrer"
    className="animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent font-black m-2"
  >
    rkp1505.l@gmail.com
  </a>


{" "}
          I'm always open to new opportunities and collaborations!{" "}
        </motion.p> {/* Changed p to motion.p */}
        <Tilt className="xs:w-[350px] xs:h-[350px] w-full h-full m-auto max-[1000px]:my-17">
          {/* Changed div to motion.div */}
          <motion.div
            variants={fadeIn("", "", 0.5, 1)}
            className="xs:w-[350px] w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
          >
            <div
              options={{ max: 45, scale: 1, speed: 450 }}
              className="bg-tertiary rounded-[20px] min-h-[200px] flex justify-evenly items-center flex-col overflow-hidden mt-0"
            >
              <img
                src={rajan}
                alt="up"
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div> {/* Changed div to motion.div */}
        </Tilt>
      </div>
      <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");