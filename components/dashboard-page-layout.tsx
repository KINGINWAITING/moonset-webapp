"use client"

import React, { useEffect, useState } from 'react'

interface DashboardPageLayoutProps {
  children: React.ReactNode
}

export default function DashboardPageLayout({ children }: DashboardPageLayoutProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="dashboard-page relative overflow-hidden">
      {/* Animated gradient orbs */}
      <div 
        className={`absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-purple-500/10 
        filter blur-[80px] -z-10 transition-all duration-1000 ease-in-out ${isLoaded ? 'opacity-50' : 'opacity-0 translate-x-20'}`}
        style={{ 
          animation: 'float 15s ease-in-out infinite'
        }}
      ></div>
      
      <div 
        className={`absolute -bottom-20 -left-20 w-[500px] h-[500px] rounded-full bg-indigo-500/10 
        filter blur-[80px] -z-10 transition-all duration-1000 ease-in-out ${isLoaded ? 'opacity-50' : 'opacity-0 -translate-x-20'}`}
        style={{ 
          animation: 'float 20s ease-in-out infinite reverse'
        }}
      ></div>
      
      <div 
        className={`absolute top-1/2 left-1/4 w-[300px] h-[300px] rounded-full bg-blue-500/5 
        filter blur-[80px] -z-10 transition-all duration-1000 ease-in-out ${isLoaded ? 'opacity-30' : 'opacity-0 -translate-y-20'}`}
        style={{ 
          animation: 'float 25s ease-in-out infinite alternate', 
          animationDelay: '5s'
        }}
      ></div>
      
      {/* Content with overlay gradient */}
      <div className={`relative z-10 transition-all duration-500 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <style jsx global>{`
          @keyframes float {
            0%, 100% {
              transform: translate(0, 0);
            }
            50% {
              transform: translate(30px, 20px);
            }
          }
        `}</style>
        {children}
      </div>
    </div>
  )
} 