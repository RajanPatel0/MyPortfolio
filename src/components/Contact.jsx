import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import { MdEmail } from "react-icons/md";
import { BsWhatsapp } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  const formData = new FormData();
  formData.append("access_key", import.meta.env.VITE_WEB3FORMS_KEY);
  formData.append("name", form.name);
  formData.append("email", form.email);
  formData.append("message", form.message);
  formData.append("subject", "New message from Portfolio");
  formData.append("from_name", form.name);
  formData.append("replyto", form.email);

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      toast.success("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } else {
      toast.error("Failed to send message.");
    }
  } catch (error) {
    toast.error("Something went wrong!");
  }

  setLoading(false);
};


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
  <div className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}>
    {/* Contact Form Section */}
    <motion.div
      variants={slideIn("left", "tween", 0.2, 1)}
      className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
    >
      <p className={styles.sectionSubText}>Get in touch</p>
      <h2 className={`${styles.sectionHeadText} animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent font-black`}>
        Contact
      </h2>

      {/* Contact Info Section */}
      <div className="mt-5 flex flex-col sm:flex-row gap-6">
        <article className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-md">
          <MdEmail className="text-2xl text-blue-600" />
          <a
            href={mailtoLink}
            className="text-blue-600 font-medium hover:underline"
            >
            rkp1505.l@gmail.com
          </a>

        </article>
        <article className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-md">
          <BsWhatsapp className="text-2xl text-green-500" />
          <a
            href="https://api.whatsapp.com/send/?phone=917009853307&text&app_absent=0&lang=en"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 font-medium hover:underline"
          >
            7009853307
          </a>
        </article>
      </div>

      {/* Contact Form */}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="mt-12 flex flex-col gap-8"
      >
        <label className="flex flex-col">
          <span className="text-white font-medium mb-4">Your Name</span>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="What's your name?"
            className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
          />
        </label>
        <label className="flex flex-col">
          <span className="text-white font-medium mb-4">Your email</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="What's your email address?"
            className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
          />
        </label>
        <label className="flex flex-col">
          <span className="text-white font-medium mb-4">Your Message</span>
          <textarea
            rows={7}
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="What's your message?"
            className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
          />
        </label>

        <button
  type="submit"
  className={`relative inline-flex items-center justify-center px-8 py-3 
    bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold 
    rounded-2xl shadow-lg transition-transform transform hover:scale-105 
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-400`}
>
  {loading ? (
    <>
      <svg
        className="animate-spin h-5 w-5 mr-3 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8H4z"
        ></path>
      </svg>
      Sending...
    </>
  ) : (
    "Send Message"
  )}
</button>

      </form>
    </motion.div>

    {/* EarthCanvas Section with Increased Size */}
    <motion.div
      variants={slideIn("right", "tween", 0.2, 1)}
      className="xl:flex-1 xl:h-[750px] md:h-[650px] h-[500px] overflow-hidden"
    >
      <EarthCanvas />
    </motion.div>
  </div>
<ToastContainer
  position="bottom-right"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
/>
     </>
);

}

export default SectionWrapper(Contact, "contact");
