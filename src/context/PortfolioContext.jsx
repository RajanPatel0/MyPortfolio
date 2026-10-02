import React, { createContext, useContext, useState, useEffect } from "react";
import { defaultPortfolioData } from "../data/defaultData";

const PortfolioContext = createContext(null);

const STORAGE_KEY = "portfolio_custom_data_v1";

// Deep merge helper to preserve default image imports if not overwritten
function mergeData(defaultObj, customObj) {
  if (!customObj || typeof customObj !== "object") return defaultObj;
  const result = { ...defaultObj, ...customObj };

  // For sections that are arrays (like projects, experiences, etc.), if customObj has it, use it
  if (customObj.experiences) result.experiences = customObj.experiences;
  if (customObj.projects) result.projects = customObj.projects;
  if (customObj.technologies) result.technologies = customObj.technologies;
  if (customObj.educations) result.educations = customObj.educations;
  if (customObj.certificates) result.certificates = customObj.certificates;
  if (customObj.profiles) result.profiles = customObj.profiles;

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
      services: customObj.about.services || defaultObj.about.services,
    };
  }

  return result;
}

export const PortfolioProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    // Initial check from localStorage for fast initial render
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return mergeData(defaultPortfolioData, JSON.parse(saved));
      }
    } catch (e) {
      console.warn("Failed reading localStorage", e);
    }
    return defaultPortfolioData;
  });

  const [saveStatus, setSaveStatus] = useState("idle"); // idle | saving | saved | error
  const [isServerConnected, setIsServerConnected] = useState(false);

  // Sync from server on load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/portfolio-data");
        if (res.ok) {
          const serverData = await res.json();
          if (serverData && !serverData.notFound) {
            const merged = mergeData(defaultPortfolioData, serverData);
            setData(merged);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
            setIsServerConnected(true);
            return;
          }
          setIsServerConnected(true);
        }
      } catch (err) {
        console.log("Local API not running or static mode - using localStorage", err);
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
