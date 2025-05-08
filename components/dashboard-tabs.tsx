import React, { useState, useEffect } from 'react'

interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface DashboardTabsProps {
  tabs: TabItem[];
  defaultTab?: string;
  className?: string;
}

export default function DashboardTabs({ 
  tabs, 
  defaultTab, 
  className = "" 
}: DashboardTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id || "");
  const [previousTab, setPreviousTab] = useState(activeTab);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Handle tab changes with animation
  const handleTabChange = (tabId: string) => {
    if (tabId !== activeTab && !isTransitioning) {
      setPreviousTab(activeTab);
      setIsTransitioning(true);
      setActiveTab(tabId);
      
      // Reset transition state after animation completes
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }
  };

  return (
    <div className={className}>
      <div className="dashboard-tabs-list mb-0 bg-[#2a1a40]/40 rounded-t-lg border border-[#8066dc]/10 p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`dashboard-tab ${activeTab === tab.id ? "active" : ""} relative overflow-hidden`}
            data-state={activeTab === tab.id ? "active" : "inactive"}
            onClick={() => handleTabChange(tab.id)}
          >
            <span className="relative z-10">{tab.label}</span>
            {activeTab === tab.id && (
              <span 
                className="absolute inset-0 bg-white/10 rounded-md"
                style={{
                  animation: 'rippleEffect 0.6s ease-out'
                }}
              ></span>
            )}
          </button>
        ))}
      </div>
      
      <div className="dashboard-tabs-content bg-[#2a1a40]/40 rounded-b-lg border border-t-0 border-[#8066dc]/10 relative overflow-hidden">
        {tabs.map((tab) => (
          <div 
            key={tab.id}
            className={`p-6 transition-all duration-300 ease-in-out ${
              activeTab === tab.id
                ? 'opacity-100 transform-none block' 
                : 'opacity-0 hidden'
            }`}
          >
            {tab.content}
          </div>
        ))}
        
        <style jsx global>{`
          @keyframes rippleEffect {
            0% {
              transform: scale(0);
              opacity: 0.5;
            }
            100% {
              transform: scale(1);
              opacity: 0.2;
            }
          }
        `}</style>
      </div>
    </div>
  )
} 