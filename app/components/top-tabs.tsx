"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface TopTabsProps {
  tabs: {
    label: string;
    href: string;
  }[];
}

export default function TopTabs({ tabs }: TopTabsProps) {
  const pathname = usePathname();
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  
  return (
    <div className="top-tabs mb-6 bg-[#2a1a40]/40 rounded-lg border border-[#8066dc]/10 p-1">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        const isHovered = hoveredTab === tab.href;
        
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`top-tab ${isActive ? "active" : ""} relative overflow-hidden`}
            onMouseEnter={() => setHoveredTab(tab.href)}
            onMouseLeave={() => setHoveredTab(null)}
          >
            <span className="relative z-10">{tab.label}</span>
            
            {/* Active indicator animation */}
            {isActive && (
              <span 
                className="absolute inset-0 bg-white/10 rounded-md"
                style={{
                  animation: 'rippleEffect 0.6s ease-out'
                }}
              ></span>
            )}
            
            {/* Hover ripple effect */}
            {isHovered && !isActive && (
              <span 
                className="absolute inset-0 bg-white/5 rounded-md"
                style={{
                  animation: 'rippleEffect 0.6s ease-out'
                }}
              ></span>
            )}
          </Link>
        );
      })}
      
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
  );
} 