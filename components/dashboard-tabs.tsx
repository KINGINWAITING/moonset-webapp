import React, { useState } from 'react'

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

  return (
    <div className={className}>
      <div className="dashboard-tabs-list mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`dashboard-tab ${activeTab === tab.id ? "active" : ""}`}
            data-state={activeTab === tab.id ? "active" : "inactive"}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      <div className="dashboard-tabs-content">
        {tabs.map((tab) => (
          <div 
            key={tab.id}
            className={activeTab === tab.id ? "block" : "hidden"}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  )
} 