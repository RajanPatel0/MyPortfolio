import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PortfolioProvider } from "./context/PortfolioContext";
import AdminDashboard from "./components/admin/AdminDashboard";

import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Hero,
  Navbar,
  Tech,
  Works,
  StarsCanvas,
  Footer,
  Profile,
  Education,
} from "./components";
import Certificate from "./components/certificate";

const PortfolioHome = () => {
  return (
    <div className="relative z-0 bg-primary min-h-screen">
      {/* Stars in background */}
      <StarsCanvas />

      <div className="relative z-10 bg-no-repeat bg-center">
        <Navbar />
        <Hero />
        <Experience />
        <Works />
        <About />
        <Education />
        <Tech />
        <Profile />
        <Feedbacks />
        <Certificate />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <PortfolioProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PortfolioHome />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </PortfolioProvider>
  );
};

export default App;

