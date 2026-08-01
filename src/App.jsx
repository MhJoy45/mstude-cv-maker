import React, { useState, useEffect, useRef } from 'react';
import { 
  Rocket, 
  FileText, 
  MapPin, 
  Settings, 
  BarChart3, 
  Search, 
  Handshake, 
  Package,
  Briefcase,
  GraduationCap,
  Wrench,
  Mail,
  Phone,
  Globe,
  Download,
  Upload,
  RotateCcw,
  Plus,
  Trash2,
  Printer,
  FileCode2
} from 'lucide-react';

const defaultCvData = {
  fullName: 'Manirul Islam',
  title: 'Digital Operations & E-Commerce Specialist',
  email: 'manirul.islam@example.com',
  phone: '+880 1234 567890',
  location: 'Savar, Dhaka, Bangladesh',
  summary: 'Forward-thinking digital specialist with a distinguished record of managing online platform architectures, implementing server-side data tracking, and directing high-performance e-commerce and commercial strategies.',
  experiences: [
    {
      id: 1,
      role: 'Platform Launch & Oversight',
      company: 'Tamanbazar',
      duration: '2025 – Present',
      description: '• Successfully led the launch and day-to-day digital operations of the Tamanbazar online platform, ensuring a seamless user experience and high system availability.\n• Oversaw digital content management, utilizing advanced writing and editing tools to maintain brand consistency, accurate product listings, and engaging storefront copy.\n• Enhanced the brand\'s digital footprint and local visibility through targeted geographic data updates and original commercial photography integration.'
    },
    {
      id: 2,
      role: 'E-Commerce & Technical Infrastructure Lead',
      company: 'Tamanbazar',
      duration: '2025 – Present',
      description: '• Managed website architecture and theme customization utilizing advanced WooCommerce frameworks (such as WoodMart) to optimize site performance and responsiveness.\n• Configured and maintained robust tracking systems, including Google Analytics 4 and server-side tracking (Stape.io), to monitor user behavior, traffic, and conversion metrics.\n• Initiated and monitored Google Search impressions and performance analytics to continuously improve organic search visibility and digital reach.'
    },
    {
      id: 3,
      role: 'Sourcing & Commercial Operations Manager',
      company: 'Tamanbazar',
      duration: '2025 – Present',
      description: '• Handled strategic supplier communications, bulk sourcing, and pricing negotiations for specialty goods and inventory.\n• Coordinated with suppliers to secure competitive pricing, maintain optimal stock levels, and ensure adherence to quality standards for all commercial offerings.'
    }
  ],
  educations: [
    {
      id: 1,
      degree: 'B.Sc. in Computer Science & Engineering',
      institution: 'University',
      duration: '2019 – 2023'
    }
  ],
  skills: 'WooCommerce, WoodMart, Server-Side Tracking, Stape.io, Google Analytics 4, SEO & Search Console, Content Management, Digital Operations, Bulk Sourcing & Vendor Negotiation'
};

function App() {
  const [cvData, setCvData] = useState(() => {
    const saved = localStorage.getItem('cv_enterprise_peak_data');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return defaultCvData;
  });

  const [template, setTemplate] = useState('corporate');
  const [mobileTab, setMobileTab] = useState('editor'); 
  const fileInputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('cv_enterprise_peak_data', JSON.stringify(cvData));
  }, [cvData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCvData((prev) => ({ ...prev, [name]: value }));
  };

  const handleExperienceChange = (index, e) => {
    const { name, value } = e.target;
    const newExperiences = [...cvData.experiences];
    newExperiences[index][name] = value;
    setCvData((prev) => ({ ...prev, experiences: newExperiences }));
  };

  const addExperience = () => {
    setCvData((prev) => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        { id: Date.now(), role: '', company: '', duration: '', description: '' }
      ]
    }));
  };

  const removeExperience = (index) => {
    const newExperiences = cvData.experiences.filter((_, i) => i !== index);
    setCvData((prev) => ({ ...prev, experiences: newExperiences }));
  };

  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;
    const newEducations = [...cvData.educations];
    newEducations[index][name] = value;
    setCvData((prev) => ({ ...prev, educations: newEducations }));
  };

  const addEducation = () => {
    setCvData((prev) => ({
      ...prev,
      educations: [
        ...prev.educations,
        { id: Date.now(), degree: '', institution: '', duration: '' }
      ]
    }));
  };

  const removeEducation = (index) => {
    const newEducations = cvData.educations.filter((_, i) => i !== index);
    setCvData((prev) => ({ ...prev, educations: newEducations }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(cvData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${cvData.fullName.toLowerCase().replace(/\s+/g, '_')}_cv_backup.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJSON = (e) => {
    const fileReader = new FileReader();
    if (e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsedData = JSON.parse(event.target.result);
          setCvData(parsedData);
          alert('CV data imported successfully!');
        } catch (error) {
          alert('Invalid JSON file format.');
        }
      };
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset fields to initial state?')) {
      setCvData(defaultCvData);
      localStorage.removeItem('cv_enterprise_peak_data');
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen w-screen overflow-hidden bg-slate-950 font-sans text-slate-100">
      
      {/* MOBILE TOP TAB SWITCHER & QUICK PRINT ACTION */}
      <div className="flex lg:hidden bg-slate-900 border-b border-slate-800 p-2 no-print shrink-0 gap-2 items-center">
        <div className="flex flex-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setMobileTab('editor')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-md transition cursor-pointer flex items-center justify-center gap-1.5 ${
              mobileTab === 'editor' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400'
            }`}
          >
            <FileCode2 size={14} /> Edit
          </button>
          <button
            onClick={() => setMobileTab('preview')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-md transition cursor-pointer flex items-center justify-center gap-1.5 ${
              mobileTab === 'preview' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400'
            }`}
          >
            <Globe size={14} /> Preview
          </button>
        </div>
        <button
          onClick={handlePrint}
          className="bg-indigo-600 hover:bg-indigo-500 text-white p-2 rounded-lg shadow transition flex items-center justify-center cursor-pointer shrink-0"
          title="Print / Save PDF"
        >
          <Printer size={18} />
        </button>
      </div>

      {/* SIDEBAR EDITOR */}
      <div className={`w-full lg:w-[42%] h-full bg-slate-900 border-r border-slate-800 flex flex-col shadow-2xl z-10 no-print ${mobileTab === 'preview' ? 'hidden lg:flex' : 'flex'}`}>
        
        {/* Top Control Bar */}
        <div className="p-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-xs font-black tracking-widest text-indigo-400 uppercase flex items-center gap-1.5">
              <Wrench size={14} /> Enterprise CV Suite
            </h1>
            <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded">ATS Verified</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button onClick={handleExportJSON} className="px-2.5 py-1.5 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded border border-slate-700 transition cursor-pointer flex items-center justify-center gap-1">
              <Download size={13} /> Export
            </button>
            <button onClick={() => fileInputRef.current.click()} className="px-2.5 py-1.5 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded border border-slate-700 transition cursor-pointer flex items-center justify-center gap-1">
              <Upload size={13} /> Import
            </button>
            <button onClick={handleReset} className="px-2.5 py-1.5 text-xs font-semibold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 rounded border border-rose-500/30 transition cursor-pointer flex items-center justify-center gap-1">
              <RotateCcw size={13} /> Reset
            </button>
            <input type="file" ref={fileInputRef} onChange={handleImportJSON} accept=".json" className="hidden" />
          </div>
        </div>

        {/* Scrollable Workspace */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          
          {/* Layout Selector */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">Corporate Layout Format</label>
            <div className="grid grid-cols-3 gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800">
              {[
                { id: 'corporate', label: 'Executive' },
                { id: 'modernTech', label: 'Tech' },
                { id: 'editorial', label: 'Editorial' }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTemplate(t.id)}
                  className={`py-2 text-xs font-bold rounded transition cursor-pointer ${
                    template === t.id ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Personal Info */}
          <div className="space-y-2.5 bg-slate-950/40 p-3 rounded-lg border border-slate-800">
            <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
              <FileText size={14} /> Identification
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] text-slate-400 mb-1">Full Name</label>
                <input type="text" name="fullName" value={cvData.fullName} onChange={handleChange} className="w-full px-2 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-white focus:outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 mb-1">Target Role</label>
                <input type="text" name="title" value={cvData.title} onChange={handleChange} className="w-full px-2 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-white focus:outline-none focus:border-indigo-500" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div>
                <label className="block text-[10px] text-slate-400 mb-1">Email</label>
                <input type="email" name="email" value={cvData.email} onChange={handleChange} className="w-full px-2 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-white focus:outline-none" />
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 mb-1">Phone</label>
                <input type="text" name="phone" value={cvData.phone} onChange={handleChange} className="w-full px-2 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-white focus:outline-none" />
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 mb-1">Location</label>
                <input type="text" name="location" value={cvData.location} onChange={handleChange} className="w-full px-2 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-white focus:outline-none" />
              </div>
            </div>

            <div>
              <label className="block text-[10px] text-slate-400 mb-1">Executive Summary</label>
              <textarea name="summary" rows="3" value={cvData.summary} onChange={handleChange} className="w-full px-2 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-white focus:outline-none" />
            </div>
          </div>

          {/* Work Experience */}
          <div className="space-y-2.5 bg-slate-950/40 p-3 rounded-lg border border-slate-800">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                <Briefcase size={14} /> Experience
              </h3>
              <button onClick={addExperience} className="text-[11px] font-bold text-indigo-400 hover:text-indigo-300 cursor-pointer flex items-center gap-1">
                <Plus size={12} /> Add Entry
              </button>
            </div>

            {cvData.experiences.map((exp, index) => (
              <div key={exp.id} className="bg-slate-900 border border-slate-800 p-2.5 rounded space-y-2 relative">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input type="text" name="role" placeholder="Position / Title" value={exp.role} onChange={(e) => handleExperienceChange(index, e)} className="px-2 py-1 bg-slate-950 border border-slate-700 rounded text-xs text-white" />
                  <input type="text" name="company" placeholder="Company Name" value={exp.company} onChange={(e) => handleExperienceChange(index, e)} className="px-2 py-1 bg-slate-950 border border-slate-700 rounded text-xs text-white" />
                </div>
                <input type="text" name="duration" placeholder="Duration (e.g., 2025 – Present)" value={exp.duration} onChange={(e) => handleExperienceChange(index, e)} className="w-full px-2 py-1 bg-slate-950 border border-slate-700 rounded text-xs text-white" />
                <textarea name="description" rows="3" placeholder="Bullet points with •" value={exp.description} onChange={(e) => handleExperienceChange(index, e)} className="w-full px-2 py-1 bg-slate-950 border border-slate-700 rounded text-xs text-white" />
                {cvData.experiences.length > 1 && (
                  <button onClick={() => removeExperience(index)} className="text-[10px] font-bold text-rose-400 hover:text-rose-300 cursor-pointer flex items-center gap-1">
                    <Trash2 size={11} /> Remove Entry
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="space-y-2.5 bg-slate-950/40 p-3 rounded-lg border border-slate-800">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                <GraduationCap size={14} /> Education
              </h3>
              <button onClick={addEducation} className="text-[11px] font-bold text-indigo-400 hover:text-indigo-300 cursor-pointer flex items-center gap-1">
                <Plus size={12} /> Add Degree
              </button>
            </div>

            {cvData.educations.map((edu, index) => (
              <div key={edu.id} className="bg-slate-900 border border-slate-800 p-2.5 rounded space-y-2 relative">
                <input type="text" name="degree" placeholder="Degree Name" value={edu.degree} onChange={(e) => handleEducationChange(index, e)} className="w-full px-2 py-1 bg-slate-950 border border-slate-700 rounded text-xs text-white" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input type="text" name="institution" placeholder="Institution" value={edu.institution} onChange={(e) => handleEducationChange(index, e)} className="px-2 py-1 bg-slate-950 border border-slate-700 rounded text-xs text-white" />
                  <input type="text" name="duration" placeholder="Year Range" value={edu.duration} onChange={(e) => handleEducationChange(index, e)} className="px-2 py-1 bg-slate-950 border border-slate-700 rounded text-xs text-white" />
                </div>
                {cvData.educations.length > 1 && (
                  <button onClick={() => removeEducation(index)} className="text-[10px] font-bold text-rose-400 hover:text-rose-300 cursor-pointer flex items-center gap-1">
                    <Trash2 size={11} /> Remove Entry
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="bg-slate-950/40 p-3 rounded-lg border border-slate-800">
            <label className="block text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Settings size={14} /> Core Competencies & Stack
            </label>
            <input type="text" name="skills" value={cvData.skills} onChange={handleChange} className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-white focus:outline-none" />
          </div>

        </div>

        {/* Action Trigger */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/80">
          <button 
            onClick={handlePrint} 
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg shadow-lg shadow-indigo-600/30 transition text-xs cursor-pointer flex items-center justify-center gap-2"
          >
            <Printer size={16} /> <span>Print / Save PDF Document</span>
          </button>
        </div>

      </div>

      {/* RENDER PREVIEW AREA */}
      <div className={`flex-1 h-full overflow-y-auto p-4 sm:p-6 lg:p-12 flex flex-col items-center print-only-full bg-slate-950 ${mobileTab === 'editor' ? 'hidden lg:flex' : 'flex'}`}>
        
        {/* Mobile floating print bottom bar inside preview tab if needed */}
        <div className="w-full max-w-[800px] mb-4 flex lg:hidden justify-end no-print">
          <button 
            onClick={handlePrint} 
            className="px-4 py-2 bg-indigo-600 text-white font-bold rounded-lg text-xs flex items-center gap-2 shadow-lg cursor-pointer"
          >
            <Printer size={14} /> Print / Save PDF
          </button>
        </div>

        {/* ================= TEMPLATE 1: CORPORATE EXECUTIVE ================= */}
        {template === 'corporate' && (
          <div className="w-full max-w-[800px] min-h-[1056px] bg-white text-slate-900 p-6 sm:p-12 shadow-2xl rounded font-sans scale-100 origin-top">
            <div className="border-b-2 border-slate-900 pb-5 mb-5 text-center">
              <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-widest">{cvData.fullName}</h1>
              <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mt-1">{cvData.title}</p>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-[11px] text-slate-600 mt-2 font-medium">
                {cvData.email && <span className="flex items-center gap-1"><Mail size={12} className="text-slate-400" /> {cvData.email}</span>}
                {cvData.phone && <span className="flex items-center gap-1"><Phone size={12} className="text-slate-400" /> {cvData.phone}</span>}
                {cvData.location && <span className="flex items-center gap-1"><MapPin size={12} className="text-slate-400" /> {cvData.location}</span>}
              </div>
            </div>

            {cvData.summary && (
              <div className="mb-5">
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-2">Executive Summary</h3>
                <p className="text-xs leading-relaxed text-slate-800">{cvData.summary}</p>
              </div>
            )}

            {cvData.experiences.length > 0 && (
              <div className="mb-5">
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-3">Professional Experience</h3>
                <div className="space-y-4">
                  {cvData.experiences.map((exp, i) => (
                    <div key={i}>
                      <div className="flex flex-col sm:flex-row justify-between sm:items-baseline font-bold text-xs">
                        <span>{exp.role} — <span className="font-normal text-slate-700">{exp.company}</span></span>
                        <span className="text-slate-600 text-[11px]">{exp.duration}</span>
                      </div>
                      <p className="text-xs text-slate-800 mt-1 whitespace-pre-line leading-relaxed">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {cvData.educations.length > 0 && (
              <div className="mb-5">
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-2">Education</h3>
                <div className="space-y-2">
                  {cvData.educations.map((edu, i) => (
                    <div key={i} className="flex flex-col sm:flex-row justify-between sm:items-baseline text-xs">
                      <span className="font-bold">{edu.degree} <span className="font-normal text-slate-700">({edu.institution})</span></span>
                      <span className="text-slate-600 text-[11px]">{edu.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {cvData.skills && (
              <div>
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-2">Core Competencies</h3>
                <p className="text-xs text-slate-800 leading-relaxed">{cvData.skills}</p>
              </div>
            )}
          </div>
        )}

        {/* ================= TEMPLATE 2: MODERN TECH ================= */}
        {template === 'modernTech' && (
          <div className="w-full max-w-[800px] min-h-[1056px] bg-white text-slate-800 p-6 sm:p-12 shadow-2xl rounded font-sans border-l-8 border-indigo-600">
            <div className="pb-5 mb-5 border-b border-slate-100">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">{cvData.fullName}</h1>
              <p className="text-sm font-bold text-indigo-600 mt-0.5">{cvData.title}</p>
              <div className="flex flex-wrap gap-3 sm:gap-4 text-xs text-slate-500 mt-2 font-medium">
                {cvData.email && <span className="flex items-center gap-1"><Mail size={13} className="text-indigo-500" /> {cvData.email}</span>}
                {cvData.phone && <span className="flex items-center gap-1"><Phone size={13} className="text-indigo-500" /> {cvData.phone}</span>}
                {cvData.location && <span className="flex items-center gap-1"><MapPin size={13} className="text-indigo-500" /> {cvData.location}</span>}
              </div>
            </div>

            {cvData.summary && (
              <div className="mb-5">
                <h4 className="text-[11px] font-black uppercase tracking-wider text-indigo-600 mb-1.5">Overview</h4>
                <p className="text-xs text-slate-700 leading-relaxed">{cvData.summary}</p>
              </div>
            )}

            {cvData.experiences.length > 0 && (
              <div className="mb-5">
                <h4 className="text-[11px] font-black uppercase tracking-wider text-indigo-600 mb-3">Professional Experience</h4>
                <div className="space-y-4">
                  {cvData.experiences.map((exp, i) => (
                    <div key={i}>
                      <div className="flex flex-col sm:flex-row justify-between sm:items-baseline">
                        <h5 className="font-bold text-slate-900 text-xs">{exp.role} <span className="text-indigo-600">@ {exp.company}</span></h5>
                        <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded w-fit mt-1 sm:mt-0">{exp.duration}</span>
                      </div>
                      <p className="text-xs text-slate-700 mt-1.5 whitespace-pre-line leading-relaxed">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {cvData.educations.length > 0 && (
              <div className="mb-5">
                <h4 className="text-[11px] font-black uppercase tracking-wider text-indigo-600 mb-2.5">Education</h4>
                <div className="space-y-2">
                  {cvData.educations.map((edu, i) => (
                    <div key={i} className="flex flex-col sm:flex-row justify-between sm:items-baseline text-xs">
                      <span className="font-bold text-slate-900">{edu.degree} — <span className="text-slate-600">{edu.institution}</span></span>
                      <span className="text-[11px] text-slate-500">{edu.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {cvData.skills && (
              <div>
                <h4 className="text-[11px] font-black uppercase tracking-wider text-indigo-600 mb-2.5">Technical Stack</h4>
                <div className="flex flex-wrap gap-1.5">
                  {cvData.skills.split(',').map((skill, index) => (
                    <span key={index} className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-[11px] font-bold rounded">
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= TEMPLATE 3: EDITORIAL CLASSIC ================= */}
        {template === 'editorial' && (
          <div className="w-full max-w-[800px] min-h-[1056px] bg-white text-slate-900 p-6 sm:p-12 shadow-2xl rounded font-serif">
            <div className="text-center pb-6 mb-6 border-b border-slate-400">
              <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-widest">{cvData.fullName}</h1>
              <p className="text-sm italic text-slate-700 mt-1">{cvData.title}</p>
              <div className="text-xs text-slate-600 mt-2 space-x-3 font-sans">
                {cvData.email && <span>{cvData.email}</span>}
                {cvData.phone && <span>| {cvData.phone}</span>}
                {cvData.location && <span>| {cvData.location}</span>}
              </div>
            </div>

            {cvData.summary && (
              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-1 font-sans">Profile Overview</h4>
                <p className="text-xs text-slate-800 leading-relaxed">{cvData.summary}</p>
              </div>
            )}

            {cvData.experiences.length > 0 && (
              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-2 font-sans">Career History</h4>
                <div className="space-y-4">
                  {cvData.experiences.map((exp, i) => (
                    <div key={i}>
                      <div className="flex flex-col sm:flex-row justify-between text-xs font-bold">
                        <span>{exp.role}, {exp.company}</span>
                        <span>{exp.duration}</span>
                      </div>
                      <p className="text-xs text-slate-800 mt-1 whitespace-pre-line leading-relaxed">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {cvData.educations.length > 0 && (
              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-2 font-sans">Academic Background</h4>
                <div className="space-y-2">
                  {cvData.educations.map((edu, i) => (
                    <div key={i} className="flex flex-col sm:flex-row justify-between text-xs">
                      <span><strong>{edu.degree}</strong>, {edu.institution}</span>
                      <span>{edu.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {cvData.skills && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-1 font-sans">Core Expertise</h4>
                <p className="text-xs text-slate-800">{cvData.skills}</p>
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
}

export default App;