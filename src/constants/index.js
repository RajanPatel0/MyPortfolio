import devops from "../assets//devops.png";
import wyreflow from "../assets/wyreflow.jpg";
import deepiotics from "../assets/deepiotics.jpeg";
import smallfare from "../assets/sf.png";
import n8n from"../assets/n8n.png";
import linux from "../assets/linux.png";
import crtd from "../assets/crtd tech.png";
import rtdt from "../assets/rtdt.png";
import questify from "../assets/questify.png";
import crtdhome from "../assets/crtdHome.png";
import Jobs from "../assets/Freshers-Jobs-Launch-Your-Tech-Section-Desktop.png";
import involv from "../assets/involv2.png";
// import docker from "../assets/docker.png";
// import redis from "../assets/redis.png";
// import postgres from "../assets/postgres.png";

import {
  mobile,
  backend,
  creator,
  web,
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
  meta,
  starbucks,
  tesla,
  shopify,
  carrent,
  jobit,
  tripguide,
  NeoDocto,
  movie,
  shop,
  youtube,
  python,
  postman,
  sql,
  npm,
  vue,
  liveLink,
  portfolio15,
  portfolio16,
  portfolio17,
  linktree,
  tiktok,
  ig,
  beeclone,
  smartrep,
  matrixai,
  zapflow,
  notable,
  codeswap,
  codenest,
  simon,
  front,
  coding,
  codolio,
  gfg,
  leetcode,
  ptu,
  pseb,
 redis,
 postgres,
 docker,


} from "../assets";
import { BsLinkedin } from "react-icons/bs";
const educations = [
  {
    degree: "Bachelor of Technology",
    branch:
      "Computer Science & Engineering",
    marks:
      "CGPA : 8.50 / 10",
    name: "I.K.G. Punjab Technical University, Jalandhar",
    year: "(2023 - 2027)",
    image: ptu,
  },
  {
    degree:
      "12th Grade",
    branch : "Science",
    marks:
      "Percentage : 95.00 %",
    name: "Dasmesh Senior Secondary School, Ludhiana",
    year: "2023",
    image: pseb,
  },
  {
    degree:
      "10th Grade",
    branch: "Regular",
    marks:
      "Percentage : 99.00 %",
    name: "M.V.M High School, Ludhiana",
    year: "2021",
    image: pseb,
  },
];

const profiles = [
  {
    name: "Github",
    icon: github,
    link: "https://github.com/RajanPatel0",
  },
  {
    name: "LeetCode",
    icon: leetcode,
    link: "https://leetcode.com/u/RajanPatel_/",
  },
  
];

export const navLinks = [
  {
    id: "work",
    title: "Work",
  },
  {
    id: "project",
    title: "Project",
  },
  {
    id: "about",
    title: "About",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Fullstack Developer",
    icon: creator,
  },
  {
    title: "DevOps Engineer",
    icon: devops,
  },
  {
    title: "Frontend Developer",
    icon: mobile,
  },
];

const technologies = [
 
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "C",
    icon: c,
  },
  {
    name: "C++",
    icon: cpp,
  },
  {
    name: "n8n Ai Agent",
    icon: n8n,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },

  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Redis",
    icon: redis,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "PostgreSQL",
    icon: postgres,
  },
  {
    name: "Express",
    icon: express,
  },
  {
    name: "python",
    icon: python,
  },
  {
    name: "git",
    icon: git,
  },
   {
    name:"devOps",
    icon: devops,
  },
  {
    name: "Docker",
    icon: docker,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "selenium",
    icon: selenium,
  },
  {
    name: "github",
    icon: github,
  },
  
  {
    name: "postman",
    icon: postman,
  },
  {
    name: "sql",
    icon: sql,
  },

  {
    name: "npm",
    icon: npm,
  },
  {
    name: "linux",
    icon: linux,
  },
];

const experiences = [
  {
  title: "Backend Developer",
  company_name: "Small Fare Pvt Ltd",
  icon: smallfare,
  iconBg: "#E6DEDD",
  date: "December 2025 - Present",
   months: "3 Months",
  points: [
    "Worked as a Backend Developer using Node.js/React.js and Postgres.",
    "Built scalable backend services for an event management and ticket booking platform - Events Fare",
    "Implemented secure authentication, session management with Redis, role-based access for users, organizers, admins.",
    "Developed modules include event management, booking, ticketing, payments, wallet, loyalty, and notifications.",
    "Used Kafka for async processing and Docker for containerized deployment."
  ],
},
{
    title: "Mern Stack Developer",
    company_name: "Wyreflow Technologies",
    icon: wyreflow,
    iconBg: "#E6DEDD",
    date: "July 2025 - October 2025",
    months: "3 Months",
    points: [
       "Developing and maintaining web applications using Mern Stack & backend technologies.",
      "Built MERN-based job and career guidance platform with student, admin, and sub-admin modules.",
      " Implemented secure authentication, job posting workflows, subscriptions, and role-based access control.",
      " Integrated and worked with backend services using MERN, JWT, and Razorpay",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },



 
];

const testimonials = [
  {
    testimonial:
      "I can't say enough good things about Jeff. He's a true team player who always puts the needs of the project first. If you're looking for a software engineer who can deliver results, Jeff is your guy.",
    name: "Halley Bennett",
    designation: "",
    company: "Hack Reactor",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "Jeff is an incredible problem solver. Whenever we ran into a roadblock on our project, he was always able to come up with creative solutions that kept us moving forward.",
    name: "Yishak Wesego",
    designation: "",
    company: "Hack Reactor",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "I've worked with a lot of engineers over the years, and Jeff is one of the best. His technical skills are top-notch, but what really sets him apart is his ability to communicate complex ideas in a way that everyone on the team can understand.",
    name: "Megan Stewart",
    designation: "",
    company: "Hack Reactor",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];
const imageProjects = [
  {
    id: 1,
    image: crtdhome,
    url: "https://crtd.in/",
    title: "CRTD Technologies",
    
    description: "",
  },
  {
    id: 2,
    image:Jobs,
    url: "https://crtd.in/",
    title: "Crtd Technologies",
    description: "",
  },
   {
    id : 4,
    image: involv,
    url: "",
    title: "InVolv IN",
    description: "",
  },
  {
    id: 3,
    image: questify,
    url: "https://frost-pro.vercel.app/",
    title: "Questify",
    description: "",
  },
 
  
];

const projects = [
  {
    name: "CRTD Technologies",
    description:
      "CRTD Technologies is a global technology company based in Bhopal, India, that helps businesses navigate the digital age. They offer a range of services including application development, ITES, mobility, cloud, big data, machine learning, and AI. The company focuses on helping clients transform their businesses for the digital age and improve efficiency and productivity. ",
    tags: [
      {
        name: "MERN stack",
        color: "blue-text-gradient",
      },
      {
        name: "Backend",
        color: "green-text-gradient",
      },
      {
        name: "Mobility",
        color: "pink-text-gradient",
      },
      {
        name: "Full Stack",
        color: "blue-text-gradient",
      },
      {
        name: "Frontend",
        color: "green-text-gradient",
      },
    ],
   image: crtd,
  imgFit: "object-contain",
 
  source_code_link: "",
  liveUrl: "https://crtd.in/",
  },

    {
    name: "InVolv IN",
    description:
      "Nearest Store Discovery & Smart Demand Prediction(Inventory) Platform. It's a nearest-store product discovery platform using MERN, Redis, Leaflet, and OSRM routing – multi role with Implementation of real-time inventory visibility and Data AV-based demand forecasting for Stock analytics Engineering a scalable system architecture with Redis caching, session hande, high-frequency search optimization.",
    tags: [
      {
        name: "MERN",
        color: "blue-text-gradient",
      },
      {
        name: "Leaflet Map",
        color: "green-text-gradient",
      },
      {
        name: "OSRM",
        color: "pink-text-gradient",
      },
      {
        name: "Redis",
        color: "blue-text-gradient",
      },
      {
        name: "Data Anakysis/Visualization",
        color: "pink-text-gradient",
      },
    ],
   image: involv,
  imgFit: "object-contain",
 
  source_code_link: "https://github.com/RajanPatel0/InVolv",
  liveUrl: "",
  },
  {
    name: "Questify",
    description:
      "AI-Powered Learning Roadmap Platform It's an AI-powered platform using Gemini AI to generate personalized, gamified learning paths Crafting interactive roadmap visualizations with React Flow and progress tracking dashboards. With Deployed the frontend on Vercel and backend on Render using a scalable MERN architecture with curated resources",
    tags: [
      {
        name: "MERN stack",
        color: "blue-text-gradient",
      },
      {
        name: "Gemini AI",
        color: "green-text-gradient",
      },
      {
        name: "Redis Caching",
        color: "pink-text-gradient",
      },
    ],
    image: questify,
    source_code_link: "https://github.com/RajanPatel0/FrostPro",
    liveUrl: "https://frost-pro.vercel.app/",
  },

  {
    name: "Real-Time Device Tracker",
    description:
      "Real-time location tracking and collaboration System It's a real-time multi-device tracking system using Socket.IO, enabling live location updates for unlimited devices. Integrated with Leaflet.js maps to render device pins and continuously update latitude–longitude changes.Having bi-directional real-time communication and deployed the platform on Render.",
    tags: [
      {
        name: "React",
        color: "blue-text-gradient",
      },
      {
        name: "Leaflet.js",
        color: "green-text-gradient",
      },
      {
        name: "Node.js",
        color: "pink-text-gradient",
      },
    ],
    image: rtdt,
    imgFit: "object-contain",
  imgHeight: "h-24",
  imgWidth: "w-auto",
    source_code_link: "https://github.com/RajanPatel0/Real-Time-Device-Tracker",
        liveUrl: "https://real-time-device-tracker-9m2x.onrender.com/"

  },
  
];

export {
  services,
  technologies,
  experiences,
  testimonials,
  projects,
  imageProjects,
  profiles,
  educations
};
