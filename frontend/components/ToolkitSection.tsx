"use client"
import React, { useState } from 'react';

const TABS = [
  { id: 'workflows', label: 'AI Workflows', video: 'https://res.cloudinary.com/zapier-media/video/upload/q_auto/f_auto/c_scale,w_1920/v1745864783/aiworkflowshomepage.mp4' },
  { id: 'agents', label: 'AI Agents', video: 'https://res.cloudinary.com/zapier-media/video/upload/q_auto/f_auto/c_scale,w_1920/v1745867693/AI%20LP%20-%204-29-25/Agents_ZapierHomepage_wnf7d5.mp4' },
  { id: 'chatbots', label: 'AI Chatbots', video: 'https://res.cloudinary.com/zapier-media/video/upload/q_auto/f_auto/c_scale,w_1920/v1745865033/Hero_yffypl.mp4' },
  { id: 'tables', label: 'Tables', video: 'https://res.cloudinary.com/zapier-media/video/upload/q_auto/f_auto/c_scale,w_1920/v1745865096/Tables-linked-records-demo_b3qeda.mp4' },
  { id: 'forms', label: 'Forms', video: 'https://res.cloudinary.com/zapier-media/video/upload/q_auto/f_auto/c_scale,w_1920/v1745865153/Bite-club-full-site_ekpq5d.mp4' },
  { id: 'canvas', label: 'Canvas', video: 'https://res.cloudinary.com/zapier-media/video/upload/q_auto/f_auto/c_scale,w_1920/v1746044969/Homepage/Hero_xi7mte.webm' },
  { id: 'enterprise', label: 'Enterprise', video: 'https://res.cloudinary.com/zapier-media/video/upload/so_1/q_auto/f_auto/c_scale,w_1920/v1745866077/250421_Zapier_Enterprise_Hero_v01_qessny.mp4' },
  { id: 'functions', label: 'Functions', video: 'https://res.cloudinary.com/zapier-media/video/upload/q_auto/f_auto/c_scale,w_1920/v1745865247/functions_test_deploy_okurwc.mp4' },
  { id: 'apps', label: '8,000 apps', video: 'https://res.cloudinary.com/zapier-media/video/upload/q_auto/f_auto/c_scale,w_1920/v1745865345/Products/Zaps/app-picker-april29_sfmk8p.mp4' },
];

export const ToolkitSection = () => {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  return (
    <section className="w-full bg-[#f6f4f0] py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        
        {/* Top Label */}
        <div className="flex items-center justify-center gap-2 mb-10 text-[11px] font-bold tracking-[0.2em] text-[#ff4f00] uppercase">
          <span className="w-2 h-2 rounded-full bg-[#ff4f00]"></span>
          Your complete toolkit for AI automation
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-0 border-b border-gray-200 mb-12">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab)}
              className={`px-4 md:px-6 py-4 text-sm font-semibold transition-all border-b-2 ${
                activeTab.id === tab.id 
                ? "border-[#ff4f00] text-[#1e1919]" 
                : "border-transparent text-gray-500 hover:text-[#1e1919]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Video Display Area with Background Frame */}
        <div className="relative w-full aspect-video max-w-5xl mx-auto rounded-xl overflow-hidden shadow-2xl">
          {/* Static Background Image Frame */}
          <div 
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{ backgroundImage: "url('https://zapier.com/static/z/864/hero-bg.jpg')" }} // Use your local background image path here
          />
          
          {/* The Video Content */}
          <div className="relative z-10 p-4 md:p-8 w-full h-full flex items-center justify-center">
            <video
              key={activeTab.video} // Forces video to re-render when source changes
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-contain rounded-lg shadow-lg"
            >
              <source src={activeTab.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};