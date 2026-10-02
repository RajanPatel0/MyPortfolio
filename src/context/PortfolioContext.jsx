import React, { createContext, useContext, useState, useEffect } from "react";
import { defaultPortfolioData, resolveAsset } from "../data/defaultData";
import savedPortfolioData from "../data/portfolioData.json";

const PortfolioContext = createContext(null);

const STORAGE_KEY = "portfolio_custom_data_v1";

// Deep merge helper to preserve default image imports and resolve production asset paths
function mergeData(defaultObj, customObj) {
  if (!customObj || typeof customObj !== "object") return defaultObj;
  const result = { ...defaultObj, ...customObj };

  // For sections that are arrays (like projects, experiences, etc.), if customObj has it, use it
  if (customObj.experiences) {
    result.experiences = customObj.experiences.map((exp) => ({
      ...exp,
      icon: resolveAsset(exp.icon),
    }));
  }
  if (customObj.projects) {
    result.projects = customObj.projects.map((proj) => ({
      ...proj,
      image: resolveAsset(proj.image),
    }));
  }
  if (customObj.technologies) {
    result.technologies = customObj.technologies.map((tech) => ({
      ...tech,
      icon: resolveAsset(tech.icon),
    }));
  }
  if (customObj.educations) {
    result.educations = customObj.educations.map((edu) => ({
      ...edu,
      image: resolveAsset(edu.image),
    }));
  }
  if (customObj.certificates) {
    result.certificates = customObj.certificates.map((cert) => ({
      ...cert,
      image: resolveAsset(cert.image),
    }));
  }
  if (customObj.profiles) {
    result.profiles = customObj.profiles.map((prof) => ({
      ...prof,
      icon: resolveAsset(prof.icon),
    }));
  }

  // For nested objects
  if (customObj.header) result.header = { ...defaultObj.header, ...customObj.header };
  if (customObj.hero) {
    result.hero = {
      ...defaultObj.hero,
      ...customObj.hero,
      socialLinks: { ...defaultObj.hero.socialLinks, ...(customObj.hero.socialLinks || {}) },
      resume: { ...defaultObj.hero.resume, ...(customObj.hero.resume || {}) },
    };
  }
  if (customObj.about) {
    result.about = {
      ...defaultObj.about,
      ...customObj.about,
      image: resolveAsset(customObj.about.image || defaultObj.about.image),
      services: (customObj.about.services || defaultObj.about.services).map((s) => ({
        ...s,
        icon: resolveAsset(s.icon),
      })),
    };
  }

  return result;
}

// Baseline data bundled with the application (persists to live site after git push)
const bundledBaseData = mergeData(defaultPortfolioData, savedPortfolioData);

export const PortfolioProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    // Initial check from localStorage for fast initial render if custom overrides exist
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return mergeData(bundledBaseData, JSON.parse(saved));
      }
    } catch (e) {
      console.warn("Failed reading localStorage", e);
    }
    return bundledBaseData;
  });

  const [saveStatus, setSaveStatus] = useState("idle"); // idle | saving | saved | error
  const [isServerConnected, setIsServerConnected] = useState(false);

  // Sync from server on load (local Vite dev server or backend API)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/portfolio-data");
        if (res.ok) {
          const contentType = res.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const serverData = await res.json();
            if (serverData && !serverData.notFound) {
              const merged = mergeData(bundledBaseData, serverData);
              setData(merged);
              localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
              setIsServerConnected(true);
              return;
            }
          }
        }
      } catch (err) {
        // Static hosting mode (Vercel/GitHub Pages): bundledBaseData is already active!
      }
    };
    fetchData();
  }, []);


  // Save changes to server and localStorage
  const updatePortfolioData = async (newDataOrFn) => {
    setSaveStatus("saving");
    try {
      const updated = typeof newDataOrFn === "function" ? newDataOrFn(data) : newDataOrFn;
      setData(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

      // Attempt to save to backend / Vite middleware
      try {
        const res = await fetch("/api/portfolio-data", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updated),
        });
        if (res.ok) {
          setSaveStatus("saved");
          setTimeout(() => setSaveStatus("idle"), 2500);
          return true;
        }
      } catch (err) {
        console.warn("Backend save failed, saved to localStorage only", err);
      }

      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2500);
      return true;
    } catch (err) {
      console.error("Failed to update portfolio data", err);
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
      return false;
    }
  };

  // Upload file (images or resume PDF)
  const uploadFile = async (file, isResume = false) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const fileData = reader.result;
          const res = await fetch("/api/upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fileName: file.name,
              fileData,
              isResume,
            }),
          });
          if (res.ok) {
            const result = await res.json();
            resolve(result);
          } else {
            // Fallback for static client: use base64 data URL
            resolve({
              success: true,
              url: fileData,
              fileName: file.name,
              isBase64Fallback: true,
            });
          }
        } catch (err) {
          // Fallback if API unavailable: use base64 data URL
          resolve({
            success: true,
            url: reader.result,
            fileName: file.name,
            isBase64Fallback: true,
          });
        }
      };
      reader.onerror = (e) => reject(e);
      reader.readAsDataURL(file);
    });
  };

  // Export current configuration as JSON file
  const exportDataJSON = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `portfolio-data-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Import JSON configuration
  const importDataJSON = async (jsonContent) => {
    try {
      const parsed = typeof jsonContent === "string" ? JSON.parse(jsonContent) : jsonContent;
      const merged = mergeData(defaultPortfolioData, parsed);
      await updatePortfolioData(merged);
      return true;
    } catch (err) {
      console.error("Invalid JSON file:", err);
      alert("Invalid JSON file format!");
      return false;
    }
  };

  // Reset to original defaults
  const resetToDefaults = async () => {
    if (window.confirm("Are you sure you want to reset all portfolio changes to original defaults?")) {
      setData(defaultPortfolioData);
      localStorage.removeItem(STORAGE_KEY);
      try {
        await fetch("/api/portfolio-data", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(defaultPortfolioData),
        });
      } catch (e) {
        // ignore
      }
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        updatePortfolioData,
        uploadFile,
        exportDataJSON,
        importDataJSON,
        resetToDefaults,
        saveStatus,
        isServerConnected,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
};
