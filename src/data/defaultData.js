import devops from "../assets/devops.png";
import wyreflow from "../assets/wyreflow.jpg";
import smallfare from "../assets/sf.png";
import n8n from "../assets/n8n.png";
import linux from "../assets/linux.png";
import questify from "../assets/questify.png";
import involv from "../assets/involv2.png";
import ptumni_home from "../assets/ptumni_home.png";
import rtdt from "../assets/rtdt.png";
import meImg from "../assets/Me.jpg";
import lorImg from "../assets/lor.png";
import hackmolImg from "../assets/hackmol.png";
import udemyImg from "../assets/udemy.png";
import mlImg from "../assets/mlcert.jpeg";
import lorSfImg from "../assets/LOR_SF.jpg";
import coaSfImg from "../assets/COA_SF.jpg";

import {
  mobile,
  backend,
  creator,
  javascript,
  html,
  css,
  c,
  cpp,
  reactjs,
  redux,
  tailwind,
  nodejs,
  express,
  mongodb,
  git,
  figma,
  selenium,
  github,
  python,
  postman,
  sql,
  npm,
  leetcode,
  ptu,
  pseb,
  redis,
  postgres,
  docker,
} from "../assets";

export const assetMap = {
  "/src/assets/devops.png": devops,
  "/src/assets/wyreflow.jpg": wyreflow,
  "/src/assets/sf.png": smallfare,
  "/src/assets/n8n.png": n8n,
  "/src/assets/linux.png": linux,
  "/src/assets/questify.png": questify,
  "/src/assets/involv2.png": involv,
  "/src/assets/ptumni_home.png": ptumni_home,
  "/src/assets/rtdt.png": rtdt,
  "/src/assets/Me.jpg": meImg,
  "/src/assets/lor.png": lorImg,
  "/src/assets/hackmol.png": hackmolImg,
  "/src/assets/udemy.png": udemyImg,
  "/src/assets/mlcert.jpeg": mlImg,
  "/src/assets/LOR_SF.jpg": lorSfImg,
  "/src/assets/COA_SF.jpg": coaSfImg,
  "/src/assets/backend.png": backend,
  "/src/assets/creator.png": creator,
  "/src/assets/mobile.png": mobile,
  "/src/assets/tech/html.png": html,
  "/src/assets/tech/css.png": css,
  "/src/assets/tech/c.png": c,
  "/src/assets/tech/cpp.png": cpp,
  "/src/assets/tech/javascript.png": javascript,
  "/src/assets/tech/reactjs.png": reactjs,
  "/src/assets/tech/redux.png": redux,
  "/src/assets/tech/tailwind.png": tailwind,
  "/src/assets/tech/nodejs.png": nodejs,
  "/src/assets/tech/express.png": express,
  "/src/assets/tech/mongodb.png": mongodb,
  "/src/assets/tech/git.png": git,
  "/src/assets/tech/figma.png": figma,
  "/src/assets/tech/selenium.png": selenium,
  "/src/assets/tech/github.png": github,
  "/src/assets/tech/python.png": python,
  "/src/assets/tech/postman.png": postman,
  "/src/assets/tech/sql.svg": sql,
  "/src/assets/tech/npm.png": npm,
  "/src/assets/leetcode.jpg": leetcode,
  "/src/assets/ptu.webp": ptu,
  "/src/assets/pseb.webp": pseb,
  "/src/assets/redis.png": redis,
  "/src/assets/postgres.png": postgres,
  "/src/assets/docker.png": docker,
};

export function resolveAsset(src) {
  if (!src) return src;
  if (typeof src === "string" && assetMap[src]) {
    return assetMap[src];
  }
  return src;
}

export const defaultPortfolioData = {
  header: {
    title: "Software Developer(FullStack) | Backend Engineer",
    subTitle: "Backend Engineer",
  },
  hero: {
    greeting: "Hi, I'm",
    name: "Rajan Patel",
    subheadings: [
      "JS to C++ — Fluent Thinker",
      "MERN Stack Developer",
      "System Design & CI/CD Enthusiast",
      "Building Scalable & Interactive Systems",
      "Code + Logic Driven",
      "Elegant Full-Stack Builder"
    ],
    socialLinks: {
      github: "https://github.com/RajanPatel0",
      leetcode: "https://leetcode.com/u/RajanPatel_/",
      linkedin: "https://www.linkedin.com/in/rajan-patel-5016a628a",
      twitter: "https://x.com/Rajan_patel15",
      instagram: "https://www.instagram.com/rajanpatel._/",
    },
    resume: {
      url: "/Rajan_Resume.pdf",
      fileName: "Rajan_Resume.pdf",
    },
  },
  about: {
    subText: "Introduction",
    headText: "Overview",
    bio: "I am a Software Engineer and Full-Stack Developer driven by the challenge of building systems that don't just work, but scale. Currently pursuing my B.Tech at I.K.G. PTU with an 8.5 CGPA, I have deeply immersed myself in distributed systems and high-performance backend architecture & System-Design. My technical journey is centered on the MERN Stack, yet my true expertise lies under the hood—optimizing data flow and reliability. During my tenure at Small Fare™, I engineered event-driven services using PostGreSQL, Kafka, Cassendra and Redis to ensure seamless performance under heavy loads. Beyond core development, I focus on solving real-world gaps through innovation, from building ML-powered demand platforms like InVolv to AI-driven learning tools like Questify. My grit is reflected in continuous LeetCode solutions and finalist rankings in hackathons like HackMol 6.0. As a Training & Placement Cell Coordinator, I bridge the gap between technical execution and strategic leadership, always seeking to push the boundaries of the digital landscape through collaborative, production-grade engineering.",
    email: "rkp1505.l@gmail.com",
    image: meImg,
    services: [
      { id: "s1", title: "Backend Developer", icon: backend },
      { id: "s2", title: "Fullstack Developer", icon: creator },
      { id: "s3", title: "DevOps Engineer", icon: devops },
      { id: "s4", title: "Frontend Developer", icon: mobile },
    ],
  },
  experiences: [
    {
      id: "exp1",
      title: "Backend Developer",
      company_name: "Small Fare Pvt Ltd",
      icon: smallfare,
      iconBg: "#E6DEDD",
      date: "December 2025 - April 2026",
      months: "4 Months",
      points: [
        "Worked as a Backend Developer using Node.js/React.js and Postgres.",
        "Built scalable backend services for an event management and ticket booking platform - Events Fare",
        "Implemented secure authentication, session management with Redis, role-based access for users, organizers, admins.",
        "Developed modules include event management, booking, ticketing, payments, wallet, loyalty, and notifications.",
        "Used Kafka for async processing and Docker for containerized deployment."
      ],
    },
    {
      id: "exp2",
      title: "Mern Stack Developer",
      company_name: "Wyreflow Technologies",
      icon: wyreflow,
      iconBg: "#E6DEDD",
      date: "July 2025 - October 2025",
      months: "3 Months",
      points: [
        "Developing and maintaining web applications using Mern Stack & backend technologies.",
        "Built MERN-based job and career guidance platform with student, admin, and sub-admin modules.",
        "Implemented secure authentication, job posting workflows, subscriptions, and role-based access control.",
        "Integrated and worked with backend services using MERN, JWT, and Razorpay",
        "Participating in code reviews and providing constructive feedback to other developers."
      ],
    },
  ],
  projects: [
    {
      id: "proj1",
      name: "PTUmni Alumni Connect",
      description:
        "An enterprise-level university ERP & interactive social media platform architected for IKGPTU, supporting 6 constituent campuses and 250+ affiliated colleges across Punjab. Features a multi-tenant role hierarchy including a Main Campus Super Admin with systemic oversight, dynamically provisioned sub-admins for college nodes, and an open LinkedIn-style ecosystem for alumni/students supporting posts, community interactions, peer-to-peer connections, and job/event matching systems.",
      tags: [
        { name: "Next.js", color: "blue-text-gradient" },
        { name: "TypeScript", color: "green-text-gradient" },
        { name: "PostgreSQL & Prisma", color: "pink-text-gradient" },
        { name: "RBAC Multi-Tenant", color: "blue-text-gradient" },
        { name: "Redis Caching", color: "green-text-gradient" },
        { name: "OAuth", color: "pink-text-gradient" },
      ],
      image: ptumni_home,
      liveUrl: "https://ptumni.vercel.app",
      source_code_link: "",
    },
    {
      id: "proj2",
      name: "InVolv IN",
      description:
        "Nearest Store Discovery & Smart Demand Prediction(Inventory) Platform. It's a nearest-store product discovery platform using MERN, Redis, Leaflet, and OSRM routing – multi role with Implementation of real-time inventory visibility and ML-based demand forecasting for Stock analytics. Engineering a scalable system architecture with Redis caching, session hande, high-frequency search optimization.",
      tags: [
        { name: "MERN", color: "blue-text-gradient" },
        { name: "Leaflet Map", color: "green-text-gradient" },
        { name: "OSRM", color: "pink-text-gradient" },
        { name: "Redis", color: "blue-text-gradient" },
        { name: "FastApi(statsmodels)", color: "pink-text-gradient" },
        { name: "Zustand", color: "green-text-gradient" },
        { name: "FCM Notifications", color: "blue-text-gradient" },
        { name: "Cron Jobs", color: "pink-text-gradient" },
      ],
      image: involv,
      source_code_link: "https://github.com/RajanPatel0/InVolv",
      liveUrl: "https://involv.vercel.app",
    },
    {
      id: "proj3",
      name: "Questify",
      description:
        "AI-Powered Learning Roadmap Platform It's an AI-powered platform using Gemini AI to generate personalized, gamified learning paths Crafting interactive roadmap visualizations with React Flow and progress tracking dashboards. With Deployed the frontend on Vercel and backend on Render using a scalable MERN architecture with curated resources",
      tags: [
        { name: "MERN stack", color: "blue-text-gradient" },
        { name: "Gemini AI", color: "green-text-gradient" },
        { name: "Redis Caching", color: "pink-text-gradient" },
      ],
      image: questify,
      source_code_link: "https://github.com/RajanPatel0/FrostPro",
      liveUrl: "https://frost-pro.vercel.app",
    },
    {
      id: "proj4",
      name: "Real-Time Device Tracker",
      description:
        "Real-time location tracking and collaboration System It's a real-time multi-device tracking system using Socket.IO, enabling live location updates for unlimited devices. Integrated with Leaflet.js maps to render device pins and continuously update latitude–longitude changes.Having bi-directional real-time communication and deployed the platform on Render.",
      tags: [
        { name: "React", color: "blue-text-gradient" },
        { name: "Leaflet.js", color: "green-text-gradient" },
        { name: "Node.js", color: "pink-text-gradient" },
      ],
      image: rtdt,
      source_code_link: "https://github.com/RajanPatel0/Real-Time-Device-Tracker",
      liveUrl: "https://real-time-device-tracker-9m2x.onrender.com",
    },
  ],
  technologies: [
    { name: "HTML 5", icon: html },
    { name: "CSS 3", icon: css },
    { name: "C", icon: c },
    { name: "C++", icon: cpp },
    { name: "n8n Ai Agent", icon: n8n },
    { name: "JavaScript", icon: javascript },
    { name: "React JS", icon: reactjs },
    { name: "Redux Toolkit", icon: redux },
    { name: "Redis", icon: redis },
    { name: "Tailwind CSS", icon: tailwind },
    { name: "Node JS", icon: nodejs },
    { name: "MongoDB", icon: mongodb },
    { name: "PostgreSQL", icon: postgres },
    { name: "Express", icon: express },
    { name: "Python", icon: python },
    { name: "Git", icon: git },
    { name: "DevOps", icon: devops },
    { name: "Docker", icon: docker },
    { name: "Figma", icon: figma },
    { name: "Selenium", icon: selenium },
    { name: "GitHub", icon: github },
    { name: "Postman", icon: postman },
    { name: "SQL", icon: sql },
    { name: "NPM", icon: npm },
    { name: "Linux", icon: linux },
  ],
  educations: [
    {
      id: "edu1",
      degree: "Bachelor of Technology",
      branch: "Computer Science & Engineering",
      marks: "CGPA : 8.50 / 10",
      name: "I.K.G. Punjab Technical University, Jalandhar",
      year: "(2023 - 2027)",
      image: ptu,
    },
    {
      id: "edu2",
      degree: "12th Grade",
      branch: "Science",
      marks: "Percentage : 95.00 %",
      name: "Dasmesh Senior Secondary School, Ludhiana",
      year: "2023",
      image: pseb,
    },
    {
      id: "edu3",
      degree: "10th Grade",
      branch: "Regular",
      marks: "Percentage : 99.00 %",
      name: "M.V.M High School, Ludhiana",
      year: "2021",
      image: pseb,
    },
  ],
  certificates: [
    {
      id: "cert1",
      title: "Letter of Recommendation",
      issuer: "Small Fare Pvt Ltd",
      year: "2026",
      image: lorSfImg,
    },
    {
      id: "cert2",
      title: "Letter of Recommendation",
      issuer: "Wyreflow Technologies",
      year: "2025",
      image: lorImg,
    },
    {
      id: "cert3",
      title: "Certificate Of Appreciation",
      issuer: "Small Fare Pvt Ltd",
      year: "2026",
      image: coaSfImg,
    },
    {
      id: "cert4",
      title: "Machine Learning Training",
      issuer: "IIT Madras Pravartak",
      year: "2025",
      image: mlImg,
    },
    {
      id: "cert5",
      title: "Web Development",
      issuer: "Udemy - Proper Dot Institute",
      year: "2024",
      image: udemyImg,
    },
    {
      id: "cert6",
      title: "Hackmol 6.0 Hackathon",
      issuer: "NIT Jalandhar",
      year: "2025",
      image: hackmolImg,
    },
  ],
  profiles: [
    {
      name: "GitHub",
      icon: github,
      link: "https://github.com/RajanPatel0",
    },
    {
      name: "LeetCode",
      icon: leetcode,
      link: "https://leetcode.com/u/RajanPatel_/",
    },
  ],
};
