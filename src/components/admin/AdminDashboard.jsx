import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiSave,
  FiUploadCloud,
  FiDownload,
  FiRefreshCw,
  FiPlus,
  FiTrash2,
  FiEdit2,
  FiCheck,
  FiArrowLeft,
  FiBriefcase,
  FiCode,
  FiUser,
  FiCpu,
  FiBookOpen,
  FiAward,
  FiShare2,
  FiFileText,
  FiExternalLink,
} from "react-icons/fi";
import { usePortfolio } from "../../context/PortfolioContext";

export default function AdminDashboard() {
  const {
    data,
    updatePortfolioData,
    uploadFile,
    exportDataJSON,
    importDataJSON,
    resetToDefaults,
    saveStatus,
    isServerConnected,
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState("header");
  const [formData, setFormData] = useState(() => JSON.parse(JSON.stringify(data)));
  const [editingIndex, setEditingIndex] = useState(null);
  const [uploadingField, setUploadingField] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");

  const showStatus = (msg) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(""), 3500);
  };

  // Sync state if external data updates
  const handleSaveAll = async () => {
    const success = await updatePortfolioData(formData);
    if (success) {
      showStatus("✓ All changes saved successfully to portfolio!");
    } else {
      showStatus("✗ Error saving data");
    }
  };

  // Handle generic file upload helper
  const handleFileUpload = async (e, onComplete, isResume = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingField(true);
    try {
      const res = await uploadFile(file, isResume);
      if (res && res.url) {
        onComplete(res.url, file.name);
        showStatus(`✓ Uploaded ${file.name} successfully!`);
      }
    } catch (err) {
      alert("Failed to upload file");
    } finally {
      setUploadingField(false);
      e.target.value = "";
    }
  };

  const tabs = [
    { id: "header", label: "Header & Hero", icon: FiUser },
    { id: "projects", label: "Projects", icon: FiCode },
    { id: "experience", label: "Experience", icon: FiBriefcase },
    { id: "about", label: "About & Services", icon: FiUser },
    { id: "tech", label: "Technologies", icon: FiCpu },
    { id: "education", label: "Education", icon: FiBookOpen },
    { id: "certificates", label: "Certificates", icon: FiAward },
    { id: "backup", label: "Import / Export", icon: FiDownload },
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-white flex flex-col font-sans">
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-40 bg-[#0d1127]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs sm:text-sm font-semibold transition-all hover:scale-105"
          >
            <FiArrowLeft className="w-4 h-4" />
            <span>View Portfolio</span>
          </Link>

          <div className="flex items-center gap-2 border-l border-white/10 pl-3">
            <h1 className="font-extrabold text-base sm:text-lg tracking-wide animate-text bg-gradient-to-r from-teal-400 via-purple-400 to-orange-400 bg-clip-text text-transparent">
              Portfolio Admin Control
            </h1>
            <span className="hidden md:inline-block text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
              Live Sync
            </span>
          </div>
        </div>

        {/* Global Save Action */}
        <div className="flex items-center gap-2 sm:gap-3">
          {statusMessage && (
            <span className="text-xs text-teal-400 font-semibold animate-pulse hidden sm:inline">
              {statusMessage}
            </span>
          )}

          <button
            onClick={handleSaveAll}
            disabled={saveStatus === "saving"}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500 via-purple-600 to-orange-500 hover:opacity-90 active:scale-95 text-white font-bold text-xs sm:text-sm shadow-lg shadow-purple-900/40 transition-all"
          >
            <FiSave className="w-4 h-4" />
            <span>{saveStatus === "saving" ? "Saving..." : "Save Changes"}</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 gap-6">
        {/* Sidebar / Tabs on Desktop & Mobile Scroll */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-[#10142f] border border-white/10 rounded-2xl p-2.5 flex md:flex-col overflow-x-auto gap-1.5 shadow-xl scrollbar-none">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setEditingIndex(null);
                  }}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-xs sm:text-sm whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md font-semibold"
                      : "text-secondary hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Storage Status */}
          <div className="hidden md:block mt-6 p-4 rounded-2xl bg-[#10142f]/60 border border-white/5 text-xs text-secondary space-y-2">
            <p className="font-semibold text-white">Storage Status</p>
            <div className="flex items-center gap-2 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Local File System Active</span>
            </div>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              Updates directly write to <code className="text-teal-300">src/data/portfolioData.json</code> and uploads to <code className="text-teal-300">public/uploads/</code>!
            </p>
          </div>
        </aside>

        {/* Content Pane */}
        <main className="flex-1 bg-[#10142f] border border-white/10 rounded-2xl p-5 sm:p-7 shadow-xl overflow-y-auto">
          {/* TAB 1: Header, Name, Subheadings, Resume, Socials */}
          {activeTab === "header" && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">Header, Subheadings & Links</h2>
                <p className="text-sm text-secondary">
                  Update header heading text, name, animated typing subheadings, resume file, and vertical social links.
                </p>
              </div>

              {/* 1. Header Heading Text */}
              <div className="bg-[#161a38] p-4 sm:p-5 rounded-xl border border-white/5 space-y-4">
                <h3 className="text-sm font-semibold text-teal-400 uppercase tracking-wider">
                  1. Header Top Navbar Title
                </h3>
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1.5">
                    Navbar Heading Text (Displayed in Top Left)
                  </label>
                  <input
                    type="text"
                    value={formData.header?.title || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        header: { ...formData.header, title: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-teal-400 transition-colors"
                    placeholder="e.g. Software Developer(FullStack) | Backend Engineer"
                  />
                </div>
              </div>

              {/* 2. Hero Name */}
              <div className="bg-[#161a38] p-4 sm:p-5 rounded-xl border border-white/5 space-y-4">
                <h3 className="text-sm font-semibold text-teal-400 uppercase tracking-wider">
                  2. Hero Introduction & Name
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1.5">Greeting Text</label>
                    <input
                      type="text"
                      value={formData.hero?.greeting || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          hero: { ...formData.hero, greeting: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-teal-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1.5">Your Full Name</label>
                    <input
                      type="text"
                      value={formData.hero?.name || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          hero: { ...formData.hero, name: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-teal-400"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Subheadings (3-4 sub texts typing below name) */}
              <div className="bg-[#161a38] p-4 sm:p-5 rounded-xl border border-white/5 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-purple-400 uppercase tracking-wider">
                      3. Sub-texts / Subheadings Below Name
                    </h3>
                    <p className="text-xs text-secondary mt-0.5">
                      These phrases animate sequentially in the hero typewriter.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const newSubs = [...(formData.hero?.subheadings || []), "New Dynamic Skill Title"];
                      setFormData({
                        ...formData,
                        hero: { ...formData.hero, subheadings: newSubs },
                      });
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-xs font-semibold text-white"
                  >
                    <FiPlus className="w-3.5 h-3.5" />
                    <span>Add Subheading</span>
                  </button>
                </div>

                <div className="space-y-2.5">
                  {formData.hero?.subheadings?.map((sub, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-6 text-xs text-secondary font-mono text-center">{idx + 1}</span>
                      <input
                        type="text"
                        value={sub}
                        onChange={(e) => {
                          const updated = [...formData.hero.subheadings];
                          updated[idx] = e.target.value;
                          setFormData({
                            ...formData,
                            hero: { ...formData.hero, subheadings: updated },
                          });
                        }}
                        className="flex-1 px-3.5 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-400"
                      />
                      <button
                        onClick={() => {
                          const updated = formData.hero.subheadings.filter((_, i) => i !== idx);
                          setFormData({
                            ...formData,
                            hero: { ...formData.hero, subheadings: updated },
                          });
                        }}
                        className="p-2 text-rose-400 hover:text-rose-300 hover:bg-white/5 rounded-lg"
                        title="Delete Subheading"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Resume Management */}
              <div className="bg-[#161a38] p-4 sm:p-5 rounded-xl border border-white/5 space-y-4">
                <h3 className="text-sm font-semibold text-teal-400 uppercase tracking-wider">
                  4. Resume Update
                </h3>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-black/30 p-4 rounded-xl border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                      <FiFileText className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Current Active Resume</p>
                      <p className="text-xs text-secondary">{formData.hero?.resume?.fileName || "Rajan_Resume.pdf"}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                    <a
                      href={formData.hero?.resume?.url || "/Rajan_Resume.pdf"}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white flex items-center gap-1.5"
                    >
                      <FiExternalLink className="w-3.5 h-3.5" />
                      <span>Preview Current</span>
                    </a>

                    <label className="flex-1 sm:flex-initial cursor-pointer flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-purple-600 hover:opacity-90 text-white font-semibold text-xs shadow-md">
                      <FiUploadCloud className="w-4 h-4" />
                      <span>Upload New PDF</span>
                      <input
                        type="file"
                        accept=".pdf"
                        className="hidden"
                        onChange={(e) =>
                          handleFileUpload(
                            e,
                            (url, fileName) => {
                              setFormData({
                                ...formData,
                                hero: {
                                  ...formData.hero,
                                  resume: { url, fileName },
                                },
                              });
                            },
                            true
                          )
                        }
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    Or Direct Resume URL / Path
                  </label>
                  <input
                    type="text"
                    value={formData.hero?.resume?.url || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        hero: {
                          ...formData.hero,
                          resume: {
                            ...formData.hero?.resume,
                            url: e.target.value,
                          },
                        },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-teal-400"
                    placeholder="/Rajan_Resume.pdf or https://..."
                  />
                </div>
              </div>

              {/* 5. Right-side Social Strip (GitHub, LeetCode, LinkedIn, X, Insta) */}
              <div className="bg-[#161a38] p-4 sm:p-5 rounded-xl border border-white/5 space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-orange-400 uppercase tracking-wider">
                    5. Vertical Social Strip Links
                  </h3>
                  <p className="text-xs text-secondary mt-0.5">
                    Positioned on right side of Hero. Note: LeetCode is configured directly below GitHub and above LinkedIn!
                  </p>
                </div>

                <div className="space-y-3">
                  {/* GitHub */}
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">1. GitHub URL</label>
                    <input
                      type="text"
                      value={formData.hero?.socialLinks?.github || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          hero: {
                            ...formData.hero,
                            socialLinks: { ...formData.hero?.socialLinks, github: e.target.value },
                          },
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
                    />
                  </div>

                  {/* LeetCode */}
                  <div>
                    <label className="block text-xs font-medium text-[#FFA116] mb-1 font-semibold">
                      2. LeetCode URL (Directly below GitHub, above LinkedIn)
                    </label>
                    <input
                      type="text"
                      value={formData.hero?.socialLinks?.leetcode || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          hero: {
                            ...formData.hero,
                            socialLinks: { ...formData.hero?.socialLinks, leetcode: e.target.value },
                          },
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-lg bg-black/40 border border-[#FFA116]/40 text-white text-sm focus:outline-none focus:border-[#FFA116]"
                      placeholder="https://leetcode.com/u/..."
                    />
                  </div>

                  {/* LinkedIn */}
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">3. LinkedIn URL</label>
                    <input
                      type="text"
                      value={formData.hero?.socialLinks?.linkedin || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          hero: {
                            ...formData.hero,
                            socialLinks: { ...formData.hero?.socialLinks, linkedin: e.target.value },
                          },
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
                    />
                  </div>

                  {/* Twitter / X */}
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">4. Twitter / X URL</label>
                    <input
                      type="text"
                      value={formData.hero?.socialLinks?.twitter || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          hero: {
                            ...formData.hero,
                            socialLinks: { ...formData.hero?.socialLinks, twitter: e.target.value },
                          },
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
                    />
                  </div>

                  {/* Instagram */}
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">5. Instagram URL</label>
                    <input
                      type="text"
                      value={formData.hero?.socialLinks?.instagram || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          hero: {
                            ...formData.hero,
                            socialLinks: { ...formData.hero?.socialLinks, instagram: e.target.value },
                          },
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Projects */}
          {activeTab === "projects" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">Projects Management</h2>
                  <p className="text-sm text-secondary">
                    Add, edit, or remove projects. Each card displays text action buttons for Live/Visit and Code/GitHub.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const newProj = {
                      id: "proj-" + Date.now(),
                      name: "New Showcase Project",
                      description: "High-performance fullstack project description.",
                      tags: [{ name: "React", color: "blue-text-gradient" }],
                      image: "/src/assets/questify.png",
                      liveUrl: "https://your-demo.vercel.app",
                      source_code_link: "https://github.com/...",
                    };
                    const updated = [newProj, ...formData.projects];
                    setFormData({ ...formData, projects: updated });
                    setEditingIndex(0);
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-purple-600 hover:opacity-90 text-white text-xs sm:text-sm font-semibold self-start"
                >
                  <FiPlus className="w-4 h-4" />
                  <span>Add Project</span>
                </button>
              </div>

              <div className="space-y-4">
                {formData.projects?.map((proj, idx) => {
                  const isEditing = editingIndex === idx;
                  return (
                    <div
                      key={proj.id || idx}
                      className="bg-[#161a38] border border-white/10 rounded-xl p-4 sm:p-5 transition-all space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-3">
                        <div className="flex items-center gap-3">
                          {proj.image && (
                            <img
                              src={proj.image}
                              alt={proj.name}
                              className="w-14 h-12 rounded-lg object-contain bg-black/40 border border-white/10 p-1"
                            />
                          )}
                          <div>
                            <h3 className="text-base font-bold text-white">{proj.name}</h3>
                            <div className="flex items-center gap-3 text-xs text-secondary mt-0.5">
                              {proj.liveUrl && <span className="text-teal-400">Live Available</span>}
                              {proj.source_code_link ? (
                                <span>Code Available</span>
                              ) : (
                                <span className="text-gray-400">Private Code</span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-auto">
                          <button
                            onClick={() => setEditingIndex(isEditing ? null : idx)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white"
                          >
                            <FiEdit2 className="w-3.5 h-3.5" />
                            <span>{isEditing ? "Close" : "Edit"}</span>
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete project "${proj.name}"?`)) {
                                const updated = formData.projects.filter((_, i) => i !== idx);
                                setFormData({ ...formData, projects: updated });
                              }
                            }}
                            className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400 hover:bg-rose-500/30"
                            title="Delete Project"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Editing Drawer */}
                      {isEditing && (
                        <div className="space-y-4 pt-2">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-medium text-gray-300 mb-1">Project Name</label>
                              <input
                                type="text"
                                value={proj.name}
                                onChange={(e) => {
                                  const updated = [...formData.projects];
                                  updated[idx].name = e.target.value;
                                  setFormData({ ...formData, projects: updated });
                                }}
                                className="w-full px-3.5 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-medium text-gray-300 mb-1">Live / Visit URL</label>
                              <input
                                type="text"
                                value={proj.liveUrl || ""}
                                onChange={(e) => {
                                  const updated = [...formData.projects];
                                  updated[idx].liveUrl = e.target.value;
                                  setFormData({ ...formData, projects: updated });
                                }}
                                className="w-full px-3.5 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
                                placeholder="https://..."
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-medium text-gray-300 mb-1">
                                Source Code / GitHub URL (Leave blank if Private)
                              </label>
                              <input
                                type="text"
                                value={proj.source_code_link || ""}
                                onChange={(e) => {
                                  const updated = [...formData.projects];
                                  updated[idx].source_code_link = e.target.value;
                                  setFormData({ ...formData, projects: updated });
                                }}
                                className="w-full px-3.5 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
                                placeholder="https://github.com/... or blank"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-medium text-gray-300 mb-1">
                                Project Image Upload / URL
                              </label>
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  value={proj.image || ""}
                                  onChange={(e) => {
                                    const updated = [...formData.projects];
                                    updated[idx].image = e.target.value;
                                    setFormData({ ...formData, projects: updated });
                                  }}
                                  className="flex-1 px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs"
                                  placeholder="/uploads/my-image.png or URL"
                                />
                                <label className="cursor-pointer px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold flex items-center gap-1">
                                  <FiUploadCloud className="w-3.5 h-3.5" />
                                  <span>Upload</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) =>
                                      handleFileUpload(e, (url) => {
                                        const updated = [...formData.projects];
                                        updated[idx].image = url;
                                        setFormData({ ...formData, projects: updated });
                                      })
                                    }
                                  />
                                </label>
                              </div>
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-gray-300 mb-1">Description</label>
                            <textarea
                              rows={3}
                              value={proj.description}
                              onChange={(e) => {
                                const updated = [...formData.projects];
                                updated[idx].description = e.target.value;
                                setFormData({ ...formData, projects: updated });
                              }}
                              className="w-full px-3.5 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm leading-relaxed"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-gray-300 mb-1">
                              Tags (Comma separated)
                            </label>
                            <input
                              type="text"
                              value={proj.tags?.map((t) => t.name).join(", ") || ""}
                              onChange={(e) => {
                                const raw = e.target.value.split(",");
                                const newTags = raw.map((s) => ({
                                  name: s.trim(),
                                  color: "blue-text-gradient",
                                }));
                                const updated = [...formData.projects];
                                updated[idx].tags = newTags;
                                setFormData({ ...formData, projects: updated });
                              }}
                              className="w-full px-3.5 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
                              placeholder="Next.js, TypeScript, PostgreSQL, Redis"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: Experience */}
          {activeTab === "experience" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">Experience Management</h2>
                  <p className="text-sm text-secondary">Manage work experiences, dates, and bullet points.</p>
                </div>
                <button
                  onClick={() => {
                    const newExp = {
                      id: "exp-" + Date.now(),
                      title: "Software Engineer",
                      company_name: "Tech Company Pvt Ltd",
                      icon: "/src/assets/sf.png",
                      iconBg: "#E6DEDD",
                      date: "Present",
                      months: "6 Months",
                      points: ["Developed scalable microservices with Node.js and Postgres."],
                    };
                    setFormData({
                      ...formData,
                      experiences: [newExp, ...formData.experiences],
                    });
                    setEditingIndex(0);
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-purple-600 hover:opacity-90 text-white text-xs sm:text-sm font-semibold self-start"
                >
                  <FiPlus className="w-4 h-4" />
                  <span>Add Experience</span>
                </button>
              </div>

              <div className="space-y-4">
                {formData.experiences?.map((exp, idx) => {
                  const isEditing = editingIndex === idx;
                  return (
                    <div
                      key={exp.id || idx}
                      className="bg-[#161a38] border border-white/10 rounded-xl p-4 sm:p-5 space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-3">
                        <div className="flex items-center gap-3">
                          {exp.icon && (
                            <img
                              src={exp.icon}
                              alt={exp.company_name}
                              className="w-12 h-12 rounded-xl object-contain bg-white/10 p-1 border border-white/10"
                            />
                          )}
                          <div>
                            <h3 className="text-base font-bold text-white">{exp.title}</h3>
                            <p className="text-xs text-teal-400 font-semibold">
                              {exp.company_name} • {exp.date} {exp.months ? `(${exp.months})` : ""}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-auto">
                          <button
                            onClick={() => setEditingIndex(isEditing ? null : idx)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white"
                          >
                            <FiEdit2 className="w-3.5 h-3.5" />
                            <span>{isEditing ? "Close" : "Edit"}</span>
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete experience at "${exp.company_name}"?`)) {
                                const updated = formData.experiences.filter((_, i) => i !== idx);
                                setFormData({ ...formData, experiences: updated });
                              }
                            }}
                            className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400 hover:bg-rose-500/30"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Edit Experience Fields */}
                      {isEditing && (
                        <div className="space-y-4 pt-2">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-medium text-gray-300 mb-1">Role / Title</label>
                              <input
                                type="text"
                                value={exp.title}
                                onChange={(e) => {
                                  const updated = [...formData.experiences];
                                  updated[idx].title = e.target.value;
                                  setFormData({ ...formData, experiences: updated });
                                }}
                                className="w-full px-3.5 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-300 mb-1">Company Name</label>
                              <input
                                type="text"
                                value={exp.company_name}
                                onChange={(e) => {
                                  const updated = [...formData.experiences];
                                  updated[idx].company_name = e.target.value;
                                  setFormData({ ...formData, experiences: updated });
                                }}
                                className="w-full px-3.5 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-xs font-medium text-gray-300 mb-1">Date Range</label>
                              <input
                                type="text"
                                value={exp.date}
                                onChange={(e) => {
                                  const updated = [...formData.experiences];
                                  updated[idx].date = e.target.value;
                                  setFormData({ ...formData, experiences: updated });
                                }}
                                className="w-full px-3.5 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
                                placeholder="e.g. Dec 2025 - Present"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-medium text-gray-300 mb-1">Duration</label>
                              <input
                                type="text"
                                value={exp.months || ""}
                                onChange={(e) => {
                                  const updated = [...formData.experiences];
                                  updated[idx].months = e.target.value;
                                  setFormData({ ...formData, experiences: updated });
                                }}
                                className="w-full px-3.5 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
                                placeholder="e.g. 4 Months"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-medium text-gray-300 mb-1">Company Logo</label>
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  value={exp.icon || ""}
                                  onChange={(e) => {
                                    const updated = [...formData.experiences];
                                    updated[idx].icon = e.target.value;
                                    setFormData({ ...formData, experiences: updated });
                                  }}
                                  className="flex-1 px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs"
                                />
                                <label className="cursor-pointer px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold flex items-center gap-1">
                                  <FiUploadCloud className="w-3.5 h-3.5" />
                                  <span>Upload</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) =>
                                      handleFileUpload(e, (url) => {
                                        const updated = [...formData.experiences];
                                        updated[idx].icon = url;
                                        setFormData({ ...formData, experiences: updated });
                                      })
                                    }
                                  />
                                </label>
                              </div>
                            </div>
                          </div>

                          {/* Bullet Points */}
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <label className="text-xs font-medium text-gray-300">Experience Highlights / Points</label>
                              <button
                                onClick={() => {
                                  const updated = [...formData.experiences];
                                  updated[idx].points = [...(updated[idx].points || []), "New achievement bullet point."];
                                  setFormData({ ...formData, experiences: updated });
                                }}
                                className="text-xs text-teal-400 hover:underline flex items-center gap-1 font-semibold"
                              >
                                <FiPlus className="w-3 h-3" />
                                <span>Add Point</span>
                              </button>
                            </div>

                            <div className="space-y-2">
                              {exp.points?.map((pt, pIdx) => (
                                <div key={pIdx} className="flex items-center gap-2">
                                  <span className="text-xs text-teal-400 font-bold">•</span>
                                  <input
                                    type="text"
                                    value={pt}
                                    onChange={(e) => {
                                      const updated = [...formData.experiences];
                                      updated[idx].points[pIdx] = e.target.value;
                                      setFormData({ ...formData, experiences: updated });
                                    }}
                                    className="flex-1 px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs"
                                  />
                                  <button
                                    onClick={() => {
                                      const updated = [...formData.experiences];
                                      updated[idx].points = updated[idx].points.filter((_, i) => i !== pIdx);
                                      setFormData({ ...formData, experiences: updated });
                                    }}
                                    className="p-1.5 text-rose-400 hover:text-rose-300"
                                  >
                                    <FiTrash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: About & Services */}
          {activeTab === "about" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">About & Services</h2>
                <p className="text-sm text-secondary">Update your bio summary, contact email, avatar image, and service badges.</p>
              </div>

              <div className="bg-[#161a38] p-4 sm:p-5 rounded-xl border border-white/5 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Subtext / Tag</label>
                    <input
                      type="text"
                      value={formData.about?.subText || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          about: { ...formData.about, subText: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Heading</label>
                    <input
                      type="text"
                      value={formData.about?.headText || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          about: { ...formData.about, headText: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Contact / Inquiry Email</label>
                  <input
                    type="email"
                    value={formData.about?.email || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        about: { ...formData.about, email: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
                    placeholder="e.g. rkp1505.l@gmail.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">About Me Bio</label>
                  <textarea
                    rows={6}
                    value={formData.about?.bio || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        about: { ...formData.about, bio: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-white/10 text-white text-sm leading-relaxed"
                  />
                </div>

                {/* Profile Image */}
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Profile Photo / Avatar</label>
                  <div className="flex items-center gap-4">
                    {formData.about?.image && (
                      <img
                        src={formData.about.image}
                        alt="Profile avatar"
                        className="w-16 h-16 rounded-xl object-contain bg-black/40 border border-white/10"
                      />
                    )}
                    <label className="cursor-pointer px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs flex items-center gap-2">
                      <FiUploadCloud className="w-4 h-4" />
                      <span>Upload New Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleFileUpload(e, (url) => {
                            setFormData({
                              ...formData,
                              about: { ...formData.about, image: url },
                            });
                          })
                        }
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Services Cards */}
              <div className="bg-[#161a38] p-4 sm:p-5 rounded-xl border border-white/5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-teal-400 uppercase tracking-wider">
                    Service Cards
                  </h3>
                  <button
                    onClick={() => {
                      const newServ = {
                        id: "serv-" + Date.now(),
                        title: "Cloud Architect",
                        icon: "/src/assets/backend.png",
                      };
                      setFormData({
                        ...formData,
                        about: {
                          ...formData.about,
                          services: [...(formData.about?.services || []), newServ],
                        },
                      });
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-xs font-semibold text-white"
                  >
                    <FiPlus className="w-3.5 h-3.5" />
                    <span>Add Service</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {formData.about?.services?.map((serv, idx) => (
                    <div
                      key={serv.id || idx}
                      className="bg-black/30 p-3 rounded-xl border border-white/5 flex items-center justify-between gap-3"
                    >
                      <input
                        type="text"
                        value={serv.title}
                        onChange={(e) => {
                          const updated = [...formData.about.services];
                          updated[idx].title = e.target.value;
                          setFormData({
                            ...formData,
                            about: { ...formData.about, services: updated },
                          });
                        }}
                        className="flex-1 px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs font-medium"
                      />
                      <button
                        onClick={() => {
                          const updated = formData.about.services.filter((_, i) => i !== idx);
                          setFormData({
                            ...formData,
                            about: { ...formData.about, services: updated },
                          });
                        }}
                        className="p-1.5 text-rose-400 hover:text-rose-300"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: Technologies */}
          {activeTab === "tech" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">Technologies & Tools</h2>
                  <p className="text-sm text-secondary">Add or remove skills and technology icons.</p>
                </div>
                <button
                  onClick={() => {
                    const name = prompt("Enter technology name (e.g. GraphQL, AWS, NextJS):");
                    if (name) {
                      const newTech = {
                        id: "tech-" + Date.now(),
                        name: name.trim(),
                        icon: "/src/assets/tech/reactjs.png",
                      };
                      setFormData({
                        ...formData,
                        technologies: [...formData.technologies, newTech],
                      });
                    }
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-purple-600 hover:opacity-90 text-white text-xs sm:text-sm font-semibold self-start"
                >
                  <FiPlus className="w-4 h-4" />
                  <span>Add Tech</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {formData.technologies?.map((tech, idx) => (
                  <div
                    key={tech.id || idx}
                    className="bg-[#161a38] border border-white/10 rounded-xl p-3 flex flex-col items-center justify-between gap-2.5 text-center group"
                  >
                    <img
                      src={tech.icon}
                      alt={tech.name}
                      className="w-10 h-10 object-contain group-hover:scale-110 transition-transform"
                    />
                    <input
                      type="text"
                      value={tech.name}
                      onChange={(e) => {
                        const updated = [...formData.technologies];
                        updated[idx].name = e.target.value;
                        setFormData({ ...formData, technologies: updated });
                      }}
                      className="w-full text-center px-2 py-1 rounded bg-black/40 border border-white/5 text-xs text-white"
                    />

                    <div className="flex items-center gap-2 w-full justify-center">
                      <label className="cursor-pointer text-[10px] text-teal-400 hover:underline">
                        Change Icon
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleFileUpload(e, (url) => {
                              const updated = [...formData.technologies];
                              updated[idx].icon = url;
                              setFormData({ ...formData, technologies: updated });
                            })
                          }
                        />
                      </label>
                      <button
                        onClick={() => {
                          const updated = formData.technologies.filter((_, i) => i !== idx);
                          setFormData({ ...formData, technologies: updated });
                        }}
                        className="text-rose-400 hover:text-rose-300 p-1"
                        title="Delete Tech"
                      >
                        <FiTrash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: Education */}
          {activeTab === "education" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">Education Details</h2>
                  <p className="text-sm text-secondary">Manage degrees, institutes, branch, and scores.</p>
                </div>
                <button
                  onClick={() => {
                    const newEdu = {
                      id: "edu-" + Date.now(),
                      degree: "Master of Technology",
                      branch: "Artificial Intelligence",
                      marks: "CGPA : 9.0 / 10",
                      name: "University Name",
                      year: "2027",
                      image: "/src/assets/ptu.webp",
                    };
                    setFormData({
                      ...formData,
                      educations: [...formData.educations, newEdu],
                    });
                    setEditingIndex(formData.educations.length);
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-purple-600 hover:opacity-90 text-white text-xs sm:text-sm font-semibold self-start"
                >
                  <FiPlus className="w-4 h-4" />
                  <span>Add Education</span>
                </button>
              </div>

              <div className="space-y-4">
                {formData.educations?.map((edu, idx) => {
                  const isEditing = editingIndex === idx;
                  return (
                    <div
                      key={edu.id || idx}
                      className="bg-[#161a38] border border-white/10 rounded-xl p-4 sm:p-5 space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={edu.image}
                            alt={edu.name}
                            className="w-12 h-12 rounded-full object-cover border border-white/10 shadow"
                          />
                          <div>
                            <h3 className="text-base font-bold text-white">{edu.name}</h3>
                            <p className="text-xs text-teal-400 font-semibold">
                              {edu.degree} • {edu.branch} ({edu.year})
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-auto">
                          <button
                            onClick={() => setEditingIndex(isEditing ? null : idx)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white"
                          >
                            <FiEdit2 className="w-3.5 h-3.5" />
                            <span>{isEditing ? "Close" : "Edit"}</span>
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete education "${edu.name}"?`)) {
                                const updated = formData.educations.filter((_, i) => i !== idx);
                                setFormData({ ...formData, educations: updated });
                              }
                            }}
                            className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400 hover:bg-rose-500/30"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {isEditing && (
                        <div className="space-y-3 pt-2">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-gray-300 mb-1">Degree Title</label>
                              <input
                                type="text"
                                value={edu.degree}
                                onChange={(e) => {
                                  const updated = [...formData.educations];
                                  updated[idx].degree = e.target.value;
                                  setFormData({ ...formData, educations: updated });
                                }}
                                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-300 mb-1">Branch / Major</label>
                              <input
                                type="text"
                                value={edu.branch}
                                onChange={(e) => {
                                  const updated = [...formData.educations];
                                  updated[idx].branch = e.target.value;
                                  setFormData({ ...formData, educations: updated });
                                }}
                                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-xs"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-gray-300 mb-1">Marks / CGPA</label>
                              <input
                                type="text"
                                value={edu.marks}
                                onChange={(e) => {
                                  const updated = [...formData.educations];
                                  updated[idx].marks = e.target.value;
                                  setFormData({ ...formData, educations: updated });
                                }}
                                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-300 mb-1">Year</label>
                              <input
                                type="text"
                                value={edu.year}
                                onChange={(e) => {
                                  const updated = [...formData.educations];
                                  updated[idx].year = e.target.value;
                                  setFormData({ ...formData, educations: updated });
                                }}
                                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-300 mb-1">Institution Logo</label>
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  value={edu.image}
                                  onChange={(e) => {
                                    const updated = [...formData.educations];
                                    updated[idx].image = e.target.value;
                                    setFormData({ ...formData, educations: updated });
                                  }}
                                  className="flex-1 px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs"
                                />
                                <label className="cursor-pointer px-2.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold flex items-center">
                                  <span>Upload</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) =>
                                      handleFileUpload(e, (url) => {
                                        const updated = [...formData.educations];
                                        updated[idx].image = url;
                                        setFormData({ ...formData, educations: updated });
                                      })
                                    }
                                  />
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 7: Certificates */}
          {activeTab === "certificates" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">Certificates & Honors</h2>
                  <p className="text-sm text-secondary">Upload certificate images and manage credentials.</p>
                </div>
                <button
                  onClick={() => {
                    const newCert = {
                      id: "cert-" + Date.now(),
                      title: "AWS Certified Developer",
                      issuer: "Amazon Web Services",
                      year: "2026",
                      image: "/src/assets/lor.png",
                    };
                    setFormData({
                      ...formData,
                      certificates: [newCert, ...formData.certificates],
                    });
                    setEditingIndex(0);
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-purple-600 hover:opacity-90 text-white text-xs sm:text-sm font-semibold self-start"
                >
                  <FiPlus className="w-4 h-4" />
                  <span>Add Certificate</span>
                </button>
              </div>

              <div className="space-y-4">
                {formData.certificates?.map((cert, idx) => {
                  const isEditing = editingIndex === idx;
                  return (
                    <div
                      key={cert.id || idx}
                      className="bg-[#161a38] border border-white/10 rounded-xl p-4 sm:p-5 space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-3">
                        <div className="flex items-center gap-3">
                          {cert.image && (
                            <img
                              src={cert.image}
                              alt={cert.title}
                              className="w-14 h-12 rounded-lg object-contain bg-black/40 border border-white/10 p-1"
                            />
                          )}
                          <div>
                            <h3 className="text-base font-bold text-white">{cert.title}</h3>
                            <p className="text-xs text-teal-400 font-semibold">
                              {cert.issuer} • {cert.year}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-auto">
                          <button
                            onClick={() => setEditingIndex(isEditing ? null : idx)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white"
                          >
                            <FiEdit2 className="w-3.5 h-3.5" />
                            <span>{isEditing ? "Close" : "Edit"}</span>
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete certificate "${cert.title}"?`)) {
                                const updated = formData.certificates.filter((_, i) => i !== idx);
                                setFormData({ ...formData, certificates: updated });
                              }
                            }}
                            className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400 hover:bg-rose-500/30"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {isEditing && (
                        <div className="space-y-3 pt-2">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-gray-300 mb-1">Title</label>
                              <input
                                type="text"
                                value={cert.title}
                                onChange={(e) => {
                                  const updated = [...formData.certificates];
                                  updated[idx].title = e.target.value;
                                  setFormData({ ...formData, certificates: updated });
                                }}
                                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-300 mb-1">Issuer Organization</label>
                              <input
                                type="text"
                                value={cert.issuer}
                                onChange={(e) => {
                                  const updated = [...formData.certificates];
                                  updated[idx].issuer = e.target.value;
                                  setFormData({ ...formData, certificates: updated });
                                }}
                                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-xs"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-gray-300 mb-1">Year</label>
                              <input
                                type="text"
                                value={cert.year}
                                onChange={(e) => {
                                  const updated = [...formData.certificates];
                                  updated[idx].year = e.target.value;
                                  setFormData({ ...formData, certificates: updated });
                                }}
                                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-xs"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-medium text-gray-300 mb-1">Certificate Image</label>
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  value={cert.image || ""}
                                  onChange={(e) => {
                                    const updated = [...formData.certificates];
                                    updated[idx].image = e.target.value;
                                    setFormData({ ...formData, certificates: updated });
                                  }}
                                  className="flex-1 px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs"
                                />
                                <label className="cursor-pointer px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold flex items-center gap-1">
                                  <FiUploadCloud className="w-3.5 h-3.5" />
                                  <span>Upload</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) =>
                                      handleFileUpload(e, (url) => {
                                        const updated = [...formData.certificates];
                                        updated[idx].image = url;
                                        setFormData({ ...formData, certificates: updated });
                                      })
                                    }
                                  />
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 8: Backup / Import / Export / Reset */}
          {activeTab === "backup" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">Backup & Migration</h2>
                <p className="text-sm text-secondary">
                  Download and restore your entire portfolio setup at any time with one click.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Export */}
                <div className="bg-[#161a38] p-5 rounded-2xl border border-white/5 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
                    <FiDownload className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-white text-base">Export Configuration JSON</h3>
                  <p className="text-xs text-secondary leading-relaxed">
                    Download a full JSON snapshot of all your projects, bio, experience, subheadings, and links.
                  </p>
                  <button
                    onClick={exportDataJSON}
                    className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md"
                  >
                    <FiDownload className="w-4 h-4" />
                    <span>Download JSON Backup</span>
                  </button>
                </div>

                {/* Import */}
                <div className="bg-[#161a38] p-5 rounded-2xl border border-white/5 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                    <FiUploadCloud className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-white text-base">Import Configuration JSON</h3>
                  <p className="text-xs text-secondary leading-relaxed">
                    Restore previously exported JSON backup to immediately update the portfolio.
                  </p>
                  <label className="cursor-pointer w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md">
                    <FiUploadCloud className="w-4 h-4" />
                    <span>Upload & Restore JSON</span>
                    <input
                      type="file"
                      accept=".json"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = async () => {
                            await importDataJSON(reader.result);
                            setFormData(JSON.parse(reader.result));
                            showStatus("✓ Portfolio imported successfully!");
                          };
                          reader.readAsText(file);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              {/* Danger Zone: Reset to Defaults */}
              <div className="bg-rose-950/20 border border-rose-500/20 p-5 rounded-2xl space-y-3">
                <h3 className="font-bold text-rose-400 text-base flex items-center gap-2">
                  <FiRefreshCw className="w-4 h-4" />
                  <span>Reset to Code Defaults</span>
                </h3>
                <p className="text-xs text-secondary leading-relaxed">
                  Discard all customizations and restore the portfolio back to its original code preset constants.
                </p>
                <button
                  onClick={async () => {
                    await resetToDefaults();
                    setFormData(JSON.parse(JSON.stringify(data)));
                    showStatus("✓ Reset to defaults completed!");
                  }}
                  className="px-4 py-2 rounded-xl bg-rose-600/30 hover:bg-rose-600/50 text-rose-300 border border-rose-500/40 text-xs font-semibold transition-colors"
                >
                  Reset All Changes
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
