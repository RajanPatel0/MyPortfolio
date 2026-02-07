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
import { profiles } from "../constants";
import { textVariant } from "../utils/motion";
import { motion } from "framer-motion";
import { styles } from "../styles";

const Profile = () => {
  return (
    <>
      <motion.div id="tech" variants={textVariant()}>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Profile Section
        </h2>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-8 py-10">
        {profiles.map((profile, index) => (
          <motion.div
            key={index}
            className="bg-[#1a1a1d] border border-transparent hover:border-indigo-500 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all duration-300 rounded-xl p-6 w-44 h-44 flex flex-col items-center justify-center cursor-pointer"
            data-aos="fade-up"
            data-aos-delay={index * 100}
            whileHover={{ scale: 1.05 }}
          >
            <a
              href={profile.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3"
            >
              <img
                src={profile.icon}
                alt={`icon-${index}`}
                className="w-16 h-16 object-contain"
              />
              <p className="text-white text-sm font-semibold text-center">
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

