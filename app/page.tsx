"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  User,
  Folder,
  Mail,
  Search,
  ExternalLink,
  Eye,
  Maximize2,
  X,
  Code2,
  Plus,
  Check,
  Copy,
  Calendar,
  Smartphone,
  Monitor,
  Heart,
  Terminal,
  Send,
  Trash2,
} from "lucide-react";

interface Project {
  id: string;
  title: string;
  url: string;
  category: "Web Apps" | "Games" | "Utilities";
  tags: string[];
  description: string;
  custom?: boolean;
}

const DEFAULT_PROJECTS: Project[] = [
  {
    id: "1",
    title: "Four Mini Games",
    url: "https://v0-four-mini-games.vercel.app/",
    category: "Games",
    tags: ["React", "HTML5 Canvas", "Tailwind"],
    description: "A fun collection of interactive mini-games to challenge your skills and reaction time.",
  },
  {
    id: "2",
    title: "CircleFlow",
    url: "https://circleflow.vercel.app/",
    category: "Web Apps",
    tags: ["Productivity", "Visuals", "Interactive"],
    description: "Flow state productivity tool with interactive visual feedback loops.",
  },
  {
    id: "3",
    title: "Astronomy Picture Website",
    url: "https://v0-astronomy-picture-website.vercel.app/",
    category: "Web Apps",
    tags: ["API", "NASA", "Space"],
    description: "Daily cosmos exploration powered by NASA APOD data feeds.",
  },
  {
    id: "4",
    title: "StriveMath Portfolio",
    url: "https://www.strivemath.com/portfolio/recKV0cfdJ4qmJ0pn/project/recoVkeiR1ezbRkKs",
    category: "Web Apps",
    tags: ["Education", "Math", "Interactive"],
    description: "Interactive math visualization and interactive problem solver.",
  },
  {
    id: "5",
    title: "Beabadoobee Website",
    url: "https://v0-beabadoobee-website.vercel.app/",
    category: "Web Apps",
    tags: ["Music", "UI/UX", "Fan Site"],
    description: "A aesthetic, pastel-inspired tribute website celebrating music and style.",
  },
  {
    id: "6",
    title: "Fireworks Animation",
    url: "https://fireworks-kappa-pied.vercel.app/",
    category: "Utilities",
    tags: ["Canvas", "Animation", "Physics"],
    description: "Custom physics-based particle fireworks display running in real-time.",
  },
  {
    id: "7",
    title: "Moonlit Purr Cafe",
    url: "https://moonlit-purr-cafe.base44.app/",
    category: "Games",
    tags: ["Simulation", "Cosy", "Base44"],
    description: "A relaxing cosy cafe management simulator under the moonlight.",
  },
  {
    id: "8",
    title: "Weather App",
    url: "https://weather-app-iota-inky-64.vercel.app/",
    category: "Utilities",
    tags: ["API", "Forecast", "Weather"],
    description: "Live real-time weather tracking and forecasting interface.",
  },
  {
    id: "9",
    title: "Type Soul Quest",
    url: "https://type-soul-quest.base44.app/",
    category: "Games",
    tags: ["Quest", "Gaming", "Base44"],
    description: "An action-packed quest guide and tracker app.",
  },
];

export default function Page() {
  const [activeTab, setActiveTab] = useState<"home" | "about" | "explore" | "contact">("home");
  const [projects, setProjects] = useState<Project[]>(DEFAULT_PROJECTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  
  // Preview Modal State
  const [previewProject, setPreviewProject] = useState<Project | null>(null);
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");

  // New Project Form Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newCategory, setNewCategory] = useState<"Web Apps" | "Games" | "Utilities">("Web Apps");
  const [newTags, setNewTags] = useState("");
  const [newDescription, setNewDescription] = useState("");

  // Toast / Copy notification State
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMsg, setFormMsg] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Load from LocalStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("dharma_pastel_projects");
      if (saved) {
        setProjects(JSON.parse(saved));
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("d8444948@gmail.com");
    setCopied(true);
    showToast("Email address copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newUrl) return;

    const formattedUrl = newUrl.startsWith("http") ? newUrl : `https://${newUrl}`;
    const newProj: Project = {
      id: Date.now().toString(),
      title: newTitle,
      url: formattedUrl,
      category: newCategory,
      tags: newTags ? newTags.split(",").map((t) => t.trim()) : ["Custom"],
      description: newDescription || "Custom added coding project.",
      custom: true,
    };

    const updated = [newProj, ...projects];
    setProjects(updated);
    try {
      localStorage.setItem("dharma_pastel_projects", JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }

    setShowAddModal(false);
    setNewTitle("");
    setNewUrl("");
    setNewTags("");
    setNewDescription("");
    showToast("Project added successfully!");
  };

  const handleDeleteProject = (id: string, title: string) => {
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    try {
      localStorage.setItem("dharma_pastel_projects", JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
    showToast(`Deleted "${title}"`);
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-pink-50/40 text-slate-700 font-sans selection:bg-pink-200 selection:text-pink-900 transition-colors duration-300">
      {/* Dynamic Background Blurs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-200/50 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-pink-200/50 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-teal-100/50 rounded-full blur-3xl" />
      </div>

      {/* Navigation Bar */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/70 border-b border-pink-100/80 transition-all">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <button
            onClick={() => setActiveTab("home")}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-300 via-pink-200 to-sky-200 flex items-center justify-center shadow-sm text-pink-700 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-slate-800 text-lg tracking-tight block group-hover:text-pink-600 transition-colors">
                Dharma
              </span>
              <span className="text-xs text-slate-400 font-medium">15 y/o Developer</span>
            </div>
          </button>

          <nav className="flex items-center gap-1 sm:gap-2 bg-white/80 p-1.5 rounded-full border border-pink-100 shadow-sm">
            {[
              { id: "home", label: "Home", icon: Sparkles },
              { id: "about", label: "About", icon: User },
              { id: "explore", label: "Explore", icon: Folder },
              { id: "contact", label: "Contact", icon: Mail },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isActive
                      ? "bg-pink-100/80 text-pink-700 shadow-sm"
                      : "text-slate-500 hover:text-slate-800 hover:bg-slate-100/50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-800 text-white px-5 py-3 rounded-2xl shadow-lg border border-slate-700 flex items-center gap-3 text-sm animate-bounce">
          <Sparkles className="w-4 h-4 text-pink-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* HOMEPAGE SECTION */}
        {activeTab === "home" && (
          <section className="py-12 space-y-16 animate-fade-in">
            <div className="text-center max-w-3xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100/60 text-pink-700 text-xs font-semibold tracking-wide uppercase border border-pink-200/50">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                4+ Years Coding Experience
              </div>

              <h1 className="text-5xl sm:text-6xl font-extrabold text-slate-800 tracking-tight leading-tight">
                Hey, I'm <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-sky-400 bg-clip-text text-transparent">Dharma</span> 👋
              </h1>

              <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
                I'm a 15-year-old creator and developer who builds full-stack web applications, interactive games, and clever tools.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => setActiveTab("explore")}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-pink-400 to-purple-400 text-white font-medium hover:opacity-95 shadow-md shadow-pink-200 flex items-center gap-2 transition-all hover:scale-105"
                >
                  <Folder className="w-4 h-4" />
                  Explore Projects ({projects.length})
                </button>
                <button
                  onClick={() => setActiveTab("about")}
                  className="px-6 py-3.5 rounded-2xl bg-white border border-pink-200 text-slate-700 font-medium hover:bg-pink-50/50 flex items-center gap-2 shadow-sm transition-all"
                >
                  <User className="w-4 h-4 text-pink-500" />
                  About Me
                </button>
              </div>
            </div>

            {/* Top 3 Project Preview Highlight */}
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">Featured Creations</h2>
                  <p className="text-sm text-slate-500">Quick view into what I've been building</p>
                </div>
                <button
                  onClick={() => setActiveTab("explore")}
                  className="text-xs font-bold text-pink-600 hover:text-pink-700 flex items-center gap-1"
                >
                  View All →
                </button>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.slice(0, 3).map((proj) => (
                  <div
                    key={proj.id}
                    className="bg-white/80 rounded-3xl p-6 border border-pink-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 bg-purple-50 text-purple-600 text-xs font-medium rounded-full border border-purple-100">
                          {proj.category}
                        </span>
                        <button
                          onClick={() => setPreviewProject(proj)}
                          className="p-2 text-slate-400 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition-colors"
                          title="Preview"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                      <h3 className="font-bold text-lg text-slate-800 mb-2">{proj.title}</h3>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                        {proj.description}
                      </p>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-slate-100">
                      <div className="flex flex-wrap gap-1">
                        {proj.tags.map((t, idx) => (
                          <span key={idx} className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md">
                            #{t}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setPreviewProject(proj)}
                          className="flex-1 py-2 bg-pink-100/70 hover:bg-pink-100 text-pink-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" /> Preview
                        </button>
                        <a
                          href={proj.url}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-colors"
                          title="Open Link"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ABOUT ME SECTION */}
        {activeTab === "about" && (
          <section className="py-8 max-w-4xl mx-auto space-y-12 animate-fade-in">
            {/* Main Header Info */}
            <div className="bg-white/80 rounded-3xl p-8 sm:p-10 border border-pink-100 shadow-sm relative overflow-hidden">
              <div className="absolute -right-12 -top-12 w-48 h-48 bg-pink-100/60 rounded-full blur-2xl" />
              
              <div className="relative z-10 flex flex-col sm:flex-row items-center gap-8 text-center sm:text-left">
                <div className="w-28 h-28 rounded-3xl bg-gradient-to-tr from-purple-200 via-pink-200 to-sky-200 p-1 shadow-md">
                  <div className="w-full h-full bg-white rounded-[22px] flex items-center justify-center text-4xl">
                    👾
                  </div>
                </div>

                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <span className="text-2xl sm:text-3xl font-extrabold text-slate-800">Dharma</span>
                    <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-bold">
                      15 Years Old
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    A self-taught developer who loves bringing creative ideas to life on the web. Started coding at age 11 and haven't stopped since.
                  </p>
                  <div className="pt-2 flex flex-wrap justify-center sm:justify-start gap-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                      <Calendar className="w-3.5 h-3.5 text-pink-500" />
                      <span>Coding since 2022</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                      <Code2 className="w-3.5 h-3.5 text-purple-500" />
                      <span>4 Years Experience</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Age", value: "15 yrs", color: "from-pink-100 to-purple-100", text: "text-pink-700" },
                { label: "Experience", value: "4 Years", color: "from-purple-100 to-sky-100", text: "text-purple-700" },
                { label: "Projects Built", value: `${projects.length}+`, color: "from-sky-100 to-teal-100", text: "text-sky-700" },
                { label: "Started At", value: "Age 11", color: "from-teal-100 to-pink-100", text: "text-teal-700" },
              ].map((stat, i) => (
                <div key={i} className={`bg-gradient-to-br ${stat.color} p-5 rounded-2xl border border-white/60 shadow-sm text-center`}>
                  <div className="text-xs text-slate-500 font-medium mb-1">{stat.label}</div>
                  <div className={`text-2xl font-extrabold ${stat.text}`}>{stat.value}</div>
                </div>
              ))}
            </div>

            {/* Timeline */}
            <div className="bg-white/80 rounded-3xl p-8 border border-pink-100 shadow-sm space-y-6">
              <h3 className="font-bold text-xl text-slate-800 flex items-center gap-2">
                <Terminal className="w-5 h-5 text-pink-500" /> Coding Journey
              </h3>

              <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-pink-100">
                {[
                  { age: "Age 11", year: "Year 1", desc: "First learned HTML, CSS, and basic JavaScript. Built simple interactive pages and text games." },
                  { age: "Age 12", year: "Year 2", desc: "Dived deeper into JavaScript logic, canvas manipulation, and DOM interactions." },
                  { age: "Age 13", year: "Year 3", desc: "Started picking up modern frameworks, React, APIs, and deploying live projects on Vercel." },
                  { age: "Age 15", year: "Current", desc: "Building full web apps, mini-games, tools, and exploring modern front-end technologies." },
                ].map((item, idx) => (
                  <div key={idx} className="relative flex items-start gap-4 pl-8">
                    <div className="absolute left-2 top-1.5 w-3 h-3 rounded-full bg-pink-400 ring-4 ring-pink-100" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800">{item.age}</span>
                        <span className="text-xs text-pink-600 bg-pink-50 px-2 py-0.5 rounded-md font-semibold">{item.year}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* EXPLORE PROJECTS SECTION */}
        {activeTab === "explore" && (
          <section className="py-6 space-y-8 animate-fade-in">
            {/* Header & Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-extrabold text-slate-800">Explore Projects</h1>
                <p className="text-xs text-slate-500 mt-1">
                  Discover {projects.length} live applications built over 4 years of coding
                </p>
              </div>

              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2.5 rounded-2xl bg-pink-500 hover:bg-pink-600 text-white font-semibold text-xs flex items-center gap-2 shadow-sm transition-all self-start md:self-auto"
              >
                <Plus className="w-4 h-4" /> Add Custom Project
              </button>
            </div>

            {/* Search & Categories Bar */}
            <div className="bg-white/80 p-4 rounded-2xl border border-pink-100 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
              {/* Search input */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search project or tag..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-pink-50/50 border border-pink-100 rounded-xl text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
                {["All", "Web Apps", "Games", "Utilities"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                      selectedCategory === cat
                        ? "bg-slate-800 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-pink-100/60 hover:text-pink-700"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Projects Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-white/80 rounded-3xl p-6 border border-pink-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group relative"
                >
                  {proj.custom && (
                    <button
                      onClick={() => handleDeleteProject(proj.id, proj.title)}
                      className="absolute top-4 right-4 p-1.5 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Delete Project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-purple-50 text-purple-600 text-xs font-medium rounded-full border border-purple-100">
                        {proj.category}
                      </span>
                    </div>

                    <h3 className="font-bold text-lg text-slate-800 mb-2 group-hover:text-pink-600 transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed mb-4">
                      {proj.description}
                    </p>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <div className="flex flex-wrap gap-1">
                      {proj.tags.map((t, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 bg-pink-50 text-pink-700 rounded-md">
                          #{t}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setPreviewProject(proj)}
                        className="flex-1 py-2.5 bg-pink-100/70 hover:bg-pink-200/70 text-pink-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                      >
                        <Eye className="w-3.5 h-3.5" /> Preview
                      </button>
                      <a
                        href={proj.url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-colors flex items-center justify-center"
                        title="Open in new tab"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-12 bg-white/50 rounded-3xl border border-pink-100">
                <p className="text-sm text-slate-500">No projects found matching your search.</p>
              </div>
            )}
          </section>
        )}

        {/* CONTACT SECTION */}
        {activeTab === "contact" && (
          <section className="py-8 max-w-2xl mx-auto space-y-8 animate-fade-in">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-extrabold text-slate-800">Get In Touch</h1>
              <p className="text-xs text-slate-500">
                Feel free to connect with me for collaborations, questions, or project feedback!
              </p>
            </div>

            {/* Quick Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Email Card */}
              <div className="bg-white/80 p-6 rounded-3xl border border-pink-100 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-pink-100 flex items-center justify-center text-pink-600">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Direct Email</div>
                  <div className="text-sm font-bold text-slate-800 truncate">d8444948@gmail.com</div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="w-full py-2 bg-pink-50 hover:bg-pink-100 text-pink-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "Copied!" : "Copy Email"}
                </button>
              </div>

              {/* GitHub Card */}
              <div className="bg-white/80 p-6 rounded-3xl border border-pink-100 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600">
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
                    <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">GitHub Account</div>
                  <div className="text-sm font-bold text-slate-800">github.com</div>
                </div>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Visit Profile
                </a>
              </div>
            </div>

            {/* Interactive Message Form */}
            <div className="bg-white/80 p-8 rounded-3xl border border-pink-100 shadow-sm space-y-6">
              <h3 className="font-bold text-lg text-slate-800">Send a Quick Message</h3>

              {formSubmitted ? (
                <div className="p-6 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-2xl text-center space-y-2">
                  <Sparkles className="w-6 h-6 text-emerald-600 mx-auto" />
                  <p className="font-bold text-sm">Message Sent!</p>
                  <p className="text-xs text-emerald-600">Thanks for reaching out! I'll read it soon.</p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="mt-2 text-xs font-bold underline"
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setFormSubmitted(true);
                    setFormName("");
                    setFormEmail("");
                    setFormMsg("");
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. Alex"
                      className="w-full px-4 py-2.5 bg-pink-50/40 border border-pink-100 rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-pink-300"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Your Email</label>
                    <input
                      type="email"
                      required
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="alex@example.com"
                      className="w-full px-4 py-2.5 bg-pink-50/40 border border-pink-100 rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-pink-300"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Message</label>
                    <textarea
                      required
                      rows={4}
                      value={formMsg}
                      onChange={(e) => setFormMsg(e.target.value)}
                      placeholder="Type your message here..."
                      className="w-full px-4 py-2.5 bg-pink-50/40 border border-pink-100 rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-pink-300"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-pink-400 to-purple-400 hover:opacity-95 text-white font-bold text-xs rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all"
                  >
                    <Send className="w-3.5 h-3.5" /> Send Message
                  </button>
                </form>
              )}
            </div>
          </section>
        )}
      </main>

      {/* LIVE PREVIEW MODAL */}
      {previewProject && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl border border-pink-100 w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden">
            {/* Top Modal Bar */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
              <div className="flex items-center gap-3">
                <span className="font-bold text-slate-800 text-sm sm:text-base">
                  {previewProject.title}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-700 font-semibold">
                  {previewProject.category}
                </span>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3">
                <div className="bg-white p-1 rounded-xl border border-slate-200 flex items-center gap-1">
                  <button
                    onClick={() => setViewMode("desktop")}
                    className={`p-1.5 rounded-lg text-xs font-medium transition-colors ${
                      viewMode === "desktop" ? "bg-pink-100 text-pink-700" : "text-slate-400"
                    }`}
                    title="Desktop Mode"
                  >
                    <Monitor className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("mobile")}
                    className={`p-1.5 rounded-lg text-xs font-medium transition-colors ${
                      viewMode === "mobile" ? "bg-pink-100 text-pink-700" : "text-slate-400"
                    }`}
                    title="Mobile View Mode"
                  >
                    <Smartphone className="w-4 h-4" />
                  </button>
                </div>

                <a
                  href={previewProject.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 text-slate-500 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition-colors"
                  title="Open Full Screen in New Tab"
                >
                  <Maximize2 className="w-4 h-4" />
                </a>

                <button
                  onClick={() => setPreviewProject(null)}
                  className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* iFrame View */}
            <div className="flex-1 bg-slate-100 flex items-center justify-center overflow-hidden p-4">
              <div
                className={`h-full transition-all duration-300 bg-white shadow-md rounded-2xl overflow-hidden border border-slate-200 ${
                  viewMode === "mobile" ? "w-[375px]" : "w-full"
                }`}
              >
                <iframe
                  src={previewProject.url}
                  title={previewProject.title}
                  className="w-full h-full border-0"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADD CUSTOM PROJECT MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-xl border border-pink-100 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg text-slate-800">Add New Project</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddProject} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-600 mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. My Cool App"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-600 mb-1">Live URL Link</label>
                <input
                  type="text"
                  required
                  placeholder="https://my-app.vercel.app"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-600 mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
                >
                  <option value="Web Apps">Web Apps</option>
                  <option value="Games">Games</option>
                  <option value="Utilities">Utilities</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-600 mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="React, Canvas, API"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-600 mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Briefly describe what this project does..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-xl shadow-sm transition-all"
              >
                Save Project
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-20 border-t border-pink-100 py-8 text-center text-xs text-slate-400">
        <p className="flex items-center justify-center gap-1">
          Designed for <span className="font-semibold text-slate-700">Dharma</span> • 15 y/o Developer
        </p>
      </footer>
    </div>
  );
}