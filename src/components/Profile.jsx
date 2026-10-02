// // import React from "react";

// // import { SectionWrapper } from "../hoc";
// // import { profiles } from "../constants";
// // import { textVariant } from "../utils/motion";
// // import { motion } from "framer-motion";
// // import { styles } from "../styles";


// // const Profile = () => {
// //   return (
// //     <>
// //       <motion.div id="tech" variants={textVariant()}>
// //         <h2 className={`${styles.sectionHeadText} text-center`}>
// //           Profile Section
// //         </h2>
// //       </motion.div>
// //     <div className='my-skills'>
// //       {profiles.map((profile) => (
// //         <div className="skill" data-aos="fade-up" data-aos-delay="200">
// //         <div className="icon-container">
// //           <a href={profile.link} target="_blank">
// //             <img src={profile.icon} />
// //           </a>
// //         </div>
// //       </div>
// //       ))}
// //     </div>
// //     </>
// //   );
// // };

// // export default SectionWrapper(Profile, "");



// import React from "react";
// import { SectionWrapper } from "../hoc";
// import { profiles } from "../constants";
// import { textVariant } from "../utils/motion";
// import { motion } from "framer-motion";
// import { styles } from "../styles";

// const Profile = () => {
//   return (
//     <>
//       <motion.div id="tech" variants={textVariant()}>
//         <h2 className={`${styles.sectionHeadText} text-center`}>
//           Profile Section
//         </h2>
//       </motion.div>

//       <div className="flex flex-wrap justify-center gap-6 py-10">
//         {profiles.map((profile, index) => (
//           <div
//             key={index}
//             className="w-24 h-24 flex items-center justify-center rounded-full bg-white shadow-lg hover:scale-105 transition-transform duration-300"
//             data-aos="fade-up"
//             data-aos-delay="200"
//           >
//             <a href={profile.link} target="_blank" rel="noopener noreferrer">
//               <img
//                 src={profile.icon}
//                 alt={`icon-${index}`}
//                 className="w-12 h-12 object-contain"
//               />
//             </a>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default SectionWrapper(Profile, "");



import React from "react";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { usePortfolio } from "../context/PortfolioContext";

const Profile = () => {
  const { data } = usePortfolio();
  const profiles = data?.profiles || [];

  return (
    <>
      <motion.div id="tech" variants={textVariant()}>
        <h2 className={`${styles.sectionHeadText} text-center animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent font-black`}>
          Coding Profiles
        </h2>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-8 py-10">
        {profiles.map((profile, index) => (
          <motion.div
            key={profile.id || `profile-${index}`}
            className="bg-[#1a1a1d] border border-white/5 hover:border-indigo-500 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all duration-300 rounded-2xl p-6 w-40 sm:w-44 h-40 sm:h-44 flex flex-col items-center justify-center cursor-pointer shadow-lg"
            data-aos="fade-up"
            data-aos-delay={index * 100}
            whileHover={{ scale: 1.05 }}
          >
            <a
              href={profile.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 w-full h-full justify-center"
            >
              <img
                src={profile.icon}
                alt={profile.name || `icon-${index}`}
                className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
              />
              <p className="text-white text-sm sm:text-base font-semibold text-center tracking-wide">
                {profile.name || "Profile"}
              </p>
            </a>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Profile, "");


