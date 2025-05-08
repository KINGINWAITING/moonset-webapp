"use client"

import Link from "next/link"
import { useEffect, useState, CSSProperties } from "react"
import { FileText, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MoonsetLogo } from "@/components/moonset-logo"

// Helper function to calculate time remaining
const calculateTimeLeft = (targetDate: Date) => {
  const difference = +targetDate - +new Date();
  let timeLeft = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }
  return timeLeft;
};

export default function HomePage() {
  const targetLaunchDate = new Date("2025-07-17T00:00:00Z");
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetLaunchDate));
  const [stars, setStars] = useState<Array<{x: number, y: number, size: number, opacity: number, depth: number}>>([]);
  const [heroStars, setHeroStars] = useState<Array<{x: number, y: number, size: number, opacity: number, distance: number}>>([]);
  const [activeStarIndex, setActiveStarIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Track mouse position for subtle parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) - 0.5, // -0.5 to 0.5
        y: (e.clientY / window.innerHeight) - 0.5 // -0.5 to 0.5
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Generate background stars with depth layers
  useEffect(() => {
    const newStars = [];
    
    // Create 150 stars with random positions within a circular area
    for (let i = 0; i < 150; i++) {
      // Random angle
      const angle = Math.random() * Math.PI * 2;
      
      // Use a square root distribution for more natural spreading
      // This prevents clustering in the center
      const distanceFactor = Math.sqrt(Math.random());
      
      // Calculate distance from center (5% to 48% of container)
      const distance = 5 + distanceFactor * 43;
      
      // Add depth layer (0-2) for parallax effect
      const depth = Math.floor(Math.random() * 3);
      
      newStars.push({
        x: 50 + Math.cos(angle) * distance,
        y: 50 + Math.sin(angle) * distance,
        size: Math.random() * 2 + 1, // 1-3px
        opacity: Math.random() * 0.4 + 0.3, // 0.3-0.7
        depth: depth // 0, 1, or 2 (0 = closest)
      });
    }
    
    setStars(newStars);
  }, []);
  
  // Generate hero section stars that rotate around the center
  useEffect(() => {
    const newHeroStars = [];
    
    // Create 50 stars with random positions in a circular pattern
    for (let i = 0; i < 50; i++) {
      // Random angle
      const angle = Math.random() * Math.PI * 2;
      
      // Create stars at different distances from center
      // Use square root distribution for more natural look
      const distanceFactor = Math.sqrt(Math.random());
      
      // Calculate distance from center (5% to 45% of container)
      const distance = 5 + distanceFactor * 40;
      
      newHeroStars.push({
        x: 50 + Math.cos(angle) * distance, // 50% is center
        y: 50 + Math.sin(angle) * distance, // 50% is center
        size: Math.random() * 1.5 + 0.5, // 0.5-2px
        opacity: Math.random() * 0.5 + 0.3, // 0.3-0.8
        distance: distance // save for animation
      });
    }
    
    setHeroStars(newHeroStars);
  }, []);
  
  // Use a timer for countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetLaunchDate));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const isLaunched = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#050110] text-white relative overflow-hidden">
      {/* Enhanced cosmic background with nebula effect */}
      <div 
        className="absolute inset-0 nebula-background"
        style={{
          background: 'radial-gradient(circle at center, rgba(128, 64, 216, 0.15) 0%, rgba(30, 27, 75, 0.05) 40%, transparent 70%)',
          zIndex: 0
        }}
      />
      
      {/* Nebula wisps */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="nebula-wisp wisp-1"></div>
        <div className="nebula-wisp wisp-2"></div>
        <div className="nebula-wisp wisp-3"></div>
        <div className="nebula-wisp wisp-4"></div>
      </div>

      {/* Parallax StarField - with depth layers */}
      <div 
        className="fixed inset-0" 
        style={{ 
          animation: 'rotate 300s linear infinite',
          transformOrigin: 'center center',
          zIndex: 1,
          pointerEvents: 'none'
        }}
      >
        {/* Render all stars with depth layers */}
        {stars.map((star, index) => {
          // Calculate parallax offsets based on mouse position and star depth
          const parallaxX = mousePosition.x * (star.depth === 0 ? 15 : star.depth === 1 ? 10 : 5);
          const parallaxY = mousePosition.y * (star.depth === 0 ? 15 : star.depth === 1 ? 10 : 5);
          
          // Adjust size and brightness based on depth
          const sizeMultiplier = star.depth === 0 ? 1.2 : star.depth === 1 ? 1 : 0.8;
          const opacityMultiplier = star.depth === 0 ? 1.2 : star.depth === 1 ? 1 : 0.8;
          
          return (
            <div
              key={index}
              className={`background-star depth-${star.depth} ${star.depth === 0 ? 'twinkle-animation' : ''}`}
              style={{
                position: 'absolute',
                left: `calc(${star.x}% + ${parallaxX}px)`,
                top: `calc(${star.y}% + ${parallaxY}px)`,
                width: `${star.size * sizeMultiplier}px`,
                height: `${star.size * sizeMultiplier}px`,
                backgroundColor: 'white',
                borderRadius: '50%',
                opacity: star.opacity * opacityMultiplier,
                boxShadow: `0 0 ${star.size * 0.5}px ${star.size * 0.3}px rgba(255, 255, 255, ${0.3 * opacityMultiplier})`,
                zIndex: star.depth === 0 ? 3 : star.depth === 1 ? 2 : 1,
                transition: 'all 0.3s ease-out'
              }}
            />
          );
        })}
        
        {/* Polaris (center star) */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '8px',
            height: '8px',
            backgroundColor: 'white',
            borderRadius: '50%',
            opacity: 0.9,
            boxShadow: '0 0 15px 5px rgba(255, 255, 255, 0.7)',
            zIndex: 4
          }}
          className="pulse-animation"
        />
      </div>

      <main className="relative z-10 flex flex-col items-center justify-center text-center w-full max-w-7xl mx-auto px-6">
        <div className="hero-section pt-28 md:pt-36 pb-24 md:pb-32 w-full flex flex-col items-center justify-center space-y-10 md:space-y-16 relative">
          {/* Add navigation links inside the hero section */}
          {/* Small glowing navigation links at the top */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10 flex space-x-12">
            <a href="/" className="text-xs uppercase tracking-widest font-light text-white glowing-white-text-sm hover:text-purple-300 transition-colors">Home</a>
            <a href="/about" className="text-xs uppercase tracking-widest font-light text-white glowing-white-text-sm hover:text-purple-300 transition-colors">About</a>
            <a href="/whitepaper" className="text-xs uppercase tracking-widest font-light text-white glowing-white-text-sm hover:text-purple-300 transition-colors">Whitepaper</a>
            <a href="/dashboard" className="text-xs uppercase tracking-widest font-light text-white glowing-white-text-sm hover:text-purple-300 transition-colors">Dashboard</a>
          </div>
          
          {/* Top-left cosmic accent */}
          <div 
            className="absolute top-0 left-0 w-[300px] h-[300px] md:w-[400px] md:h-[400px] opacity-60 pointer-events-none z-0"
            style={{
              background: 'radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.15), transparent 70%), radial-gradient(circle at 60% 70%, rgba(236, 72, 153, 0.1), transparent 60%)',
              filter: 'blur(40px)',
            }}
          />
          
          {/* Top-right cosmic accent */}
          <div 
            className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[400px] md:h-[400px] opacity-60 pointer-events-none z-0"
            style={{
              background: 'radial-gradient(circle at 70% 20%, rgba(76, 29, 149, 0.2), transparent 70%), radial-gradient(circle at 30% 60%, rgba(167, 139, 250, 0.1), transparent 60%)',
              filter: 'blur(40px)',
            }}
          />
          
          {/* Distant stars top-left */}
          <div className="absolute top-[5%] left-[10%] w-3 h-3 rounded-full bg-white opacity-80 shadow-[0_0_10px_2px_rgba(255,255,255,0.7)] animate-pulse-slow z-0"></div>
          <div className="absolute top-[15%] left-[5%] w-2 h-2 rounded-full bg-purple-300 opacity-70 shadow-[0_0_8px_2px_rgba(139,92,246,0.7)] animate-pulse-slower z-0"></div>
          <div className="absolute top-[10%] left-[20%] w-1 h-1 rounded-full bg-white opacity-50 shadow-[0_0_5px_1px_rgba(255,255,255,0.5)] animate-pulse z-0"></div>
          
          {/* Distant stars top-right */}
          <div className="absolute top-[7%] right-[8%] w-2 h-2 rounded-full bg-white opacity-70 shadow-[0_0_8px_2px_rgba(255,255,255,0.6)] animate-pulse-slow z-0"></div>
          <div className="absolute top-[12%] right-[15%] w-3 h-3 rounded-full bg-pink-300 opacity-60 shadow-[0_0_10px_2px_rgba(236,72,153,0.6)] animate-pulse-slower z-0"></div>
          <div className="absolute top-[18%] right-[5%] w-1 h-1 rounded-full bg-white opacity-40 shadow-[0_0_5px_1px_rgba(255,255,255,0.4)] animate-pulse z-0"></div>

          {/* Cosmic dust/nebula wisps top areas */}
          <div 
            className="absolute top-[5%] right-[25%] w-[180px] h-[80px] opacity-40 pointer-events-none z-0 transform rotate-[25deg]"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.2), transparent)',
              filter: 'blur(15px)',
            }}
          />
          
          <div 
            className="absolute top-[10%] left-[25%] w-[150px] h-[60px] opacity-30 pointer-events-none z-0 transform -rotate-[15deg]"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(236, 72, 153, 0.15), transparent)',
              filter: 'blur(15px)',
            }}
          />
          
          {/* Center glow effect similar to Polaris star */}
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full z-0"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(180,180,255,0.7) 30%, rgba(140,100,255,0.3) 70%, transparent 100%)',
              filter: 'blur(15px)',
              opacity: 0.9,
              animation: 'pulse-soft 4s ease-in-out infinite alternate'
            }}
          />
          
          {/* Additional subtle glow points */}
          <div 
            className="absolute top-1/4 left-1/3 w-24 h-24 rounded-full z-0"
            style={{
              background: 'radial-gradient(circle, rgba(210,140,255,0.6) 0%, rgba(140,100,255,0.2) 60%, transparent 80%)',
              filter: 'blur(12px)',
              opacity: 0.7,
              animation: 'pulse-soft 6s ease-in-out infinite alternate'
            }}
          />
          
          <div 
            className="absolute bottom-1/4 right-1/3 w-32 h-32 rounded-full z-0"
            style={{
              background: 'radial-gradient(circle, rgba(240,180,255,0.6) 0%, rgba(180,120,255,0.3) 50%, transparent 80%)',
              filter: 'blur(15px)',
              opacity: 0.7,
              animation: 'pulse-soft 7s ease-in-out infinite alternate-reverse'
            }}
          />
          
          {/* Additional intense cosmic glow */}
          <div 
            className="absolute top-1/3 right-1/4 w-36 h-36 rounded-full z-0"
            style={{
              background: 'radial-gradient(circle, rgba(160,100,255,0.5) 0%, rgba(120,80,200,0.2) 60%, transparent 80%)',
              filter: 'blur(20px)',
              opacity: 0.8,
              animation: 'pulse-soft 8s ease-in-out infinite alternate'
            }}
          />
          
          {/* Large background cosmic aura */}
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-full rounded-full z-0"
            style={{
              background: 'radial-gradient(ellipse, rgba(100,70,200,0.15) 0%, rgba(140,100,255,0.1) 40%, transparent 70%)',
              filter: 'blur(40px)',
              opacity: 0.9
            }}
          />

          {/* Hero section rotating stars */}
          <div 
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            style={{
              animation: 'rotate 120s linear infinite',
              transformOrigin: 'center center'
            }}
          >
            {heroStars.map((star, index) => {
              const shadowSize = star.size * 0.5;
              const shadowColor = `rgba(255, 255, 255, 0.3)`;
              
              return (
                <div
                  key={`hero-star-${index}`}
                  className="absolute bg-white rounded-full"
                  style={{
                    left: `${star.x}%`,
                    top: `${star.y}%`,
                    width: `${star.size}px`,
                    height: `${star.size}px`,
                    opacity: star.opacity,
                    boxShadow: `0 0 ${shadowSize}px ${shadowSize * 0.6}px ${shadowColor}`
                  }}
                />
              );
            })}
        </div>

          {/* Combined MOONSET logos with minimal spacing */}
          <div className="flex flex-col items-center gap-1 z-10 mb-6">
            <div className="transform hover:scale-105 transition-transform duration-500 ease-out relative group">
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 bg-gradient-to-r from-purple-500/30 to-blue-500/30 blur-3xl transition-all duration-700 -z-10"></div>
              <div className="logo-cosmic-glow"></div>
              <MoonsetLogo width={160} variant="small" />
            </div>
            
            <div className="flex justify-center items-center pl-8">
              <MoonsetLogo width={120} variant="full" />
            </div>
          </div>

          {/* Description paragraph */}
          <div className="max-w-3xl mx-auto text-center z-10 mb-8">
            <p className="text-gray-300 text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
              MOONSET Token is dedicated to exposing one of the greatest deceptions in human history through 
              decentralized research, evidence collection, and community-driven governance.
            </p>
          </div>

          {/* Enhanced title design */}
          <div className="title-container relative z-10 mt-6 md:mt-10 mb-4">
            <div className="cosmic-title-glow absolute inset-0 rounded-2xl opacity-50"></div>
            <div className="flex flex-col items-center md:flex-row md:gap-4 px-8 py-6 bg-slate-900/20 backdrop-blur-sm rounded-2xl border border-purple-500/20 shadow-xl">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-1 md:mb-0">
                <span className="animated-gradient-text cosmic-title-main">MOONSET Token</span>
        </h1>
              <div className="launching-badge flex items-center justify-center md:pl-4 md:border-l md:border-purple-500/20">
                <span className="text-xl sm:text-2xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 font-semibold tracking-wide cosmic-pulse">
                  Launching In:
                </span>
              </div>
            </div>
          </div>

        {isLaunched ? (
            <div className="text-4xl md:text-5xl font-bold text-green-400 p-4 rounded-lg bg-green-500/5 border border-green-500/20 shadow-2xl backdrop-blur-sm launched-container z-10">
            MOONSET HAS LAUNCHED!
            <div className="mt-2 text-lg text-green-300">Explore the new era.</div>
          </div>
        ) : (
            <div className="grid grid-flow-col gap-3 sm:gap-5 text-center auto-cols-max z-10">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds },
            ].map(item => (
                <div key={item.label} className="countdown-box flex flex-col p-3 sm:p-4 bg-slate-800/20 backdrop-blur-sm rounded-xl shadow-xl border border-purple-500/20 w-20 sm:w-24 md:w-28 hover:border-purple-400/50 hover:bg-slate-800/30 transition-all duration-300 hover:transform hover:scale-105">
                <span className="text-3xl sm:text-4xl md:text-5xl font-mono tabular-nums countdown-value">
                  {String(item.value).padStart(2, '0')}
                </span>
                <span className="text-xs sm:text-sm uppercase text-purple-300/90 tracking-wider mt-1">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        )}

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 pt-6 z-10">
            <Link href="/whitepaper" passHref className="inline-block">
              <div
                className="whitepaper-btn w-full sm:w-auto text-base sm:text-lg px-8 py-3 rounded-lg border-2 border-purple-400/30 text-purple-300 hover:text-white hover:border-pink-500/50 transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center gap-2.5 bg-slate-900/10 backdrop-blur-sm"
              >
                <FileText className="h-5 w-5 icon-float" /> Read Whitepaper
              </div>
            </Link>
            <Link href="/dashboard" passHref>
              <div className="relative w-full sm:w-auto group">
                <div className="cosmic-btn-pulse absolute -inset-1 rounded-lg opacity-0 group-hover:opacity-70 transition-opacity duration-500 blur"></div>
            <Button
                  className="cosmic-dashboard-btn w-full sm:w-auto text-base sm:text-lg px-8 py-3 rounded-lg 
                            flex items-center gap-2.5 shadow-lg relative z-10 bg-gradient-to-r from-purple-600/40 to-blue-600/40"
                >
                  <span className="cosmic-btn-spark"></span>
                  <Zap className="h-5 w-5 relative z-10 icon-pulse" /> 
                  <span className="relative z-10">Enter Dashboard</span>
            </Button>
              </div>
          </Link>
          </div>
          
          {/* Social Media Links */}
          <div className="social-links flex items-center gap-4 mt-6 z-10">
            <a href="https://twitter.com/moonsettoken" target="_blank" rel="noopener noreferrer" 
               className="social-icon-btn bg-slate-900/10 backdrop-blur-sm border-purple-400/20">
               className="social-icon-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
            </a>
            <a href="https://t.me/moonsettoken" target="_blank" rel="noopener noreferrer" 
               className="social-icon-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            </a>
            <a href="https://discord.gg/moonsettoken" target="_blank" rel="noopener noreferrer" 
               className="social-icon-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle><line x1="4.93" y1="4.93" x2="9.17" y2="9.17"></line><line x1="14.83" y1="14.83" x2="19.07" y2="19.07"></line><line x1="14.83" y1="9.17" x2="19.07" y2="4.93"></line><line x1="14.83" y1="9.17" x2="18.36" y2="5.64"></line><line x1="4.93" y1="19.07" x2="9.17" y2="14.83"></line></svg>
            </a>
            <a href="https://github.com/moonsettoken" target="_blank" rel="noopener noreferrer" 
               className="social-icon-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
            </a>
            <a href="https://medium.com/@moonsettoken" target="_blank" rel="noopener noreferrer" 
               className="social-icon-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="8" x2="21" y2="8"></line><line x1="8" y1="3" x2="8" y2="21"></line></svg>
            </a>
          </div>
        </div>

        {/* Tokenomics Section */}
        <section id="tokenomics" className="w-full py-20 md:py-24 flex flex-col items-center space-y-14 md:space-y-16">
          <div className="section-title-container">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold cosmic-section-title">
              <span className="animated-gradient-text">Tokenomics</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto mt-6 text-base md:text-lg">
              MOONSET token is designed with a sustainable distribution model, focusing on community research and evidence collection.
            </p>
          </div>
          
          <div className="tokenomics-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 w-full max-w-6xl">
            <div className="tokenomics-card bg-slate-900/10 backdrop-blur-sm border-purple-500/15">
              <div className="tokenomics-percentage">40%</div>
              <h3 className="tokenomics-title">Community & Research</h3>
              <p className="tokenomics-description">Allocated for community rewards, evidence gathering, and research contributions</p>
            </div>
            <div className="tokenomics-card bg-slate-900/10 backdrop-blur-sm border-purple-500/15">
              <div className="tokenomics-percentage">20%</div>
              <h3 className="tokenomics-title">Team & Advisors</h3>
              <p className="tokenomics-description">2-year vesting period with 6-month cliff for the founding team</p>
            </div>
            <div className="tokenomics-card bg-slate-900/10 backdrop-blur-sm border-purple-500/15">
              <div className="tokenomics-percentage">15%</div>
              <h3 className="tokenomics-title">Private Sale</h3>
              <p className="tokenomics-description">Tokens for early investors with 1-year vesting period</p>
            </div>
            <div className="tokenomics-card bg-slate-900/10 backdrop-blur-sm border-purple-500/15">
              <div className="tokenomics-percentage">10%</div>
              <h3 className="tokenomics-title">Public Sale</h3>
              <p className="tokenomics-description">Available through public token sale events</p>
            </div>
          </div>
          
          <div className="tokenomics-details w-full max-w-6xl px-4">
            <div className="token-stats-card bg-slate-900/10 backdrop-blur-sm border-purple-500/15">
              <div className="flex flex-col md:flex-row gap-8 md:gap-12 text-left justify-center">
                <div className="token-stat-group">
                  <h4 className="token-stat-label">Total Supply</h4>
                  <p className="token-stat-value">200,000,000</p>
                </div>
                <div className="token-stat-group">
                  <h4 className="token-stat-label">Token Type</h4>
                  <p className="token-stat-value">ERC-20</p>
                </div>
                <div className="token-stat-group">
                  <h4 className="token-stat-label">Treasury</h4>
                  <p className="token-stat-value">10%</p>
                </div>
                <div className="token-stat-group">
                  <h4 className="token-stat-label">Liquidity</h4>
                  <p className="token-stat-value">5%</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Token Utility Section */}
        <section id="utility" className="w-full py-20 md:py-28 flex flex-col items-center bg-gradient-to-b from-[#050110] to-[#0c0821]">
          <div className="section-title-container mb-16 md:mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold cosmic-section-title">
              <span className="animated-gradient-text">Token Utility</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto mt-6 text-base md:text-lg">
              MOONSET Token powers a decentralized platform for truth discovery and evidence sharing
            </p>
          </div>
          
          <div className="utility-grid max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 px-4">
            <div className="utility-card bg-slate-900/10 backdrop-blur-sm border-purple-500/15">
              <div className="flex flex-col items-center text-center">
                <div className="utility-icon-container mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="utility-icon"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                </div>
                <h3 className="utility-title">Staking for Research Access</h3>
                <p className="utility-description">
                  Stake MOONSET tokens to gain access to premium research tools, evidence archive, and analysis capabilities for investigating the lunar landing.
                </p>
                <ul className="utility-list">
                  <li className="utility-list-item">Advanced photographic analysis tools</li>
                  <li className="utility-list-item">Full access to archived evidence</li>
                  <li className="utility-list-item">Participation in private research groups</li>
                </ul>
              </div>
            </div>
            
            <div className="utility-card bg-slate-900/10 backdrop-blur-sm border-purple-500/15">
              <div className="flex flex-col items-center text-center">
                <div className="utility-icon-container mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="utility-icon"><rect x="3" y="11" width="18" height="10" rx="2"></rect><circle cx="12" cy="5" r="2"></circle><path d="M12 7v4"></path><line x1="8" y1="16" x2="8" y2="16"></line><line x1="16" y1="16" x2="16" y2="16"></line></svg>
                </div>
                <h3 className="utility-title">Governance Rights</h3>
                <p className="utility-description">
                  Participate in protocol governance with voting power determined by token holdings and staking duration, shaping the direction of research.
                </p>
                <ul className="utility-list">
                  <li className="utility-list-item">Vote on protocol changes</li>
                  <li className="utility-list-item">Decide research priorities</li>
                  <li className="utility-list-item">Treasury fund allocations</li>
                </ul>
              </div>
            </div>
            
            <div className="utility-card bg-slate-900/10 backdrop-blur-sm border-purple-500/15">
              <div className="flex flex-col items-center text-center">
                <div className="utility-icon-container mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="utility-icon"><path d="M10 20v-6h4v6"></path><path d="M20 10 L12 3 L4 10"></path><path d="M20 10v10H4V10"></path></svg>
                </div>
                <h3 className="utility-title">Evidence Contribution Rewards</h3>
                <p className="utility-description">
                  Earn MOONSET tokens by contributing valuable evidence, analysis, or research related to the moon landing narrative.
                </p>
                <ul className="utility-list">
                  <li className="utility-list-item">Rewards for valuable contributions</li>
                  <li className="utility-list-item">Recognition for quality analysis</li>
                  <li className="utility-list-item">Reputation-based multipliers</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="utility-callout w-full max-w-4xl mt-16 md:mt-20 mx-4 px-8 py-10 sm:p-12 bg-[#0a0720]/40 backdrop-blur-sm rounded-2xl border border-purple-500/20 shadow-xl">
            <div className="flex flex-col items-center text-center">
              <h3 className="text-xl sm:text-2xl font-semibold mb-5 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-300">
                Join Our Decentralized Truth-Seeking Mission
              </h3>
              <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                MOONSET's deflationary token mechanism ensures that a portion of all premium feature payments is burned, increasing token scarcity over time.
              </p>
              <Link href="/whitepaper" passHref>
            <Button
                  className="utility-cta-btn px-8 py-3 rounded-lg font-medium"
                >
                  Explore Full Whitepaper
            </Button>
          </Link>
        </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="w-full py-20 md:py-28 flex flex-col items-center">
          <div className="section-title-container mb-16 md:mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold cosmic-section-title">
              <span className="animated-gradient-text">Why Choose MOONSET</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto mt-6 text-base md:text-lg">
              Our protocol offers unique advantages for truth-seekers and researchers
            </p>
          </div>
          
          <div className="benefits-container w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 px-4">
            <div className="benefit-card bg-slate-900/10 backdrop-blur-sm border-purple-500/15">
              <div className="benefit-card-inner">
                <div className="benefit-icon-wrap">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="benefit-icon"><path d="M19 7a6 6 0 0 0-5.47-5.95A6 6 0 0 0 7.11 5.64A6 6 0 0 0 12 17h2v4l4-4h1a6 6 0 0 0 0-12Z"></path><circle cx="12" cy="11" r="1"></circle><circle cx="16" cy="11" r="1"></circle><circle cx="8" cy="11" r="1"></circle></svg>
                </div>
                <h3 className="benefit-title">Decentralized Governance</h3>
                <p className="benefit-description">
                  Our active DAO ensures all protocol decisions are made collectively, with token holders having direct input on research priorities and evidence verification.
                </p>
              </div>
            </div>
            
            <div className="benefit-card bg-slate-900/10 backdrop-blur-sm border-purple-500/15">
              <div className="benefit-card-inner">
                <div className="benefit-icon-wrap">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="benefit-icon"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                </div>
                <h3 className="benefit-title">Censorship Resistance</h3>
                <p className="benefit-description">
                  All evidence and research findings are stored on decentralized platforms, ensuring that critical information cannot be removed or censored by centralized authorities.
                </p>
              </div>
            </div>
            
            <div className="benefit-card bg-slate-900/10 backdrop-blur-sm border-purple-500/15">
              <div className="benefit-card-inner">
                <div className="benefit-icon-wrap">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="benefit-icon"><rect width="7" height="9" x="3" y="3" rx="1"></rect><rect width="7" height="5" x="14" y="3" rx="1"></rect><rect width="7" height="9" x="14" y="12" rx="1"></rect><rect width="7" height="5" x="3" y="16" rx="1"></rect></svg>
                </div>
                <h3 className="benefit-title">Evidence Verification</h3>
                <p className="benefit-description">
                  Our platform includes specialized tools for analyzing photographic anomalies, physics-defying behaviors, and radiation data related to the lunar landing narrative.
                </p>
              </div>
            </div>
            
            <div className="benefit-card bg-slate-900/10 backdrop-blur-sm border-purple-500/15">
              <div className="benefit-card-inner">
                <div className="benefit-icon-wrap">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="benefit-icon"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                </div>
                <h3 className="benefit-title">Sustainable Tokenomics</h3>
                <p className="benefit-description">
                  Our deflationary model with automatic buyback and burn mechanisms ensures long-term value preservation as more users join our truth-seeking community.
                </p>
              </div>
            </div>
          </div>
          
          <div className="benefit-highlight-stats mt-16 md:mt-20 w-full max-w-6xl px-4">
            <div className="stats-container grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              <div className="stat-item">
                <div className="stat-value">200M</div>
                <div className="stat-label">Total Supply</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">Q3 2025</div>
                <div className="stat-label">Public Launch</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">ERC-20</div>
                <div className="stat-label">Token Standard</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">Ethereum</div>
                <div className="stat-label">Blockchain</div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Roadmap Section */}
        <section id="roadmap" className="w-full py-20 md:py-28 flex flex-col items-center">
          <div className="section-title-container">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold cosmic-section-title">
              <span className="animated-gradient-text">Roadmap</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto mt-6 text-base md:text-lg">
              Our journey to revolutionize truth discovery through blockchain technology
            </p>
          </div>
          
          <div className="roadmap-timeline mt-16 md:mt-20 relative w-full max-w-4xl px-4">
            <div className="flex flex-col space-y-12 md:space-y-16">
              <div className="roadmap-phase">
                <div className="roadmap-phase-title">
                  <h3>Q3-Q4 2024</h3>
                </div>
                <div className="space-y-6">
                  <div className="roadmap-item-new completed">
                    <div className="roadmap-dot-new"></div>
                    <div>Protocol Whitepaper Publication</div>
                  </div>
                  <div className="roadmap-item-new completed">
                    <div className="roadmap-dot-new"></div>
                    <div>Community Formation</div>
                  </div>
                  <div className="roadmap-item-new completed">
                    <div className="roadmap-dot-new"></div>
                    <div>Technical Architecture Development</div>
                  </div>
                  <div className="roadmap-item-new completed">
                    <div className="roadmap-dot-new"></div>
                    <div>Evidence Metadata Standards</div>
                  </div>
                </div>
              </div>
              
              <div className="roadmap-phase">
                <div className="roadmap-phase-title">
                  <h3>Q1-Q2 2025</h3>
                </div>
                <div className="space-y-6">
                  <div className="roadmap-item-new completed">
                    <div className="roadmap-dot-new"></div>
                    <div>Private Token Sale</div>
                  </div>
                  <div className="roadmap-item-new in-progress">
                    <div className="roadmap-dot-new"></div>
                    <div>Alpha Platform Release</div>
                  </div>
                  <div className="roadmap-item-new">
                    <div className="roadmap-dot-new"></div>
                    <div>Initial Governance Implementation</div>
                  </div>
                  <div className="roadmap-item-new">
                    <div className="roadmap-dot-new"></div>
                    <div>Research Projects Initiation</div>
                  </div>
                </div>
              </div>
              
              <div className="roadmap-phase">
                <div className="roadmap-phase-title">
                  <h3>Q3-Q4 2025</h3>
                </div>
                <div className="space-y-6">
                  <div className="roadmap-item-new">
                    <div className="roadmap-dot-new"></div>
                    <div>Public Token Sale</div>
                  </div>
                  <div className="roadmap-item-new">
                    <div className="roadmap-dot-new"></div>
                    <div>Full Platform Beta Release</div>
                  </div>
                  <div className="roadmap-item-new">
                    <div className="roadmap-dot-new"></div>
                    <div>Guardian Council Election</div>
                  </div>
                  <div className="roadmap-item-new">
                    <div className="roadmap-dot-new"></div>
                    <div>Advanced Analysis Tools Launch</div>
                  </div>
                </div>
              </div>
              
              <div className="roadmap-phase">
                <div className="roadmap-phase-title">
                  <h3>2026 and beyond</h3>
                </div>
                <div className="space-y-6">
                  <div className="roadmap-item-new">
                    <div className="roadmap-dot-new"></div>
                    <div>Major Research Publication</div>
                  </div>
                  <div className="roadmap-item-new">
                    <div className="roadmap-dot-new"></div>
                    <div>Educational Materials Development</div>
                  </div>
                  <div className="roadmap-item-new">
                    <div className="roadmap-dot-new"></div>
                    <div>Expansion to Related Research</div>
                  </div>
                  <div className="roadmap-item-new">
                    <div className="roadmap-dot-new"></div>
                    <div>Integration with Truth Initiatives</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Community/Newsletter Section */}
        <section id="community" className="w-full py-20 md:py-28 flex flex-col items-center">
          <div className="community-container relative w-full max-w-4xl bg-slate-900/40 backdrop-blur-md rounded-2xl border border-purple-500/30 shadow-xl p-8 md:p-12 mx-4">
            <div className="absolute inset-0 newsletter-glow rounded-2xl opacity-30"></div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Join Our Community</h2>
            <p className="text-gray-300 text-center max-w-2xl mx-auto mb-8">
              Join truth-seekers, researchers, and blockchain enthusiasts in our mission to uncover historical truth.
            </p>
            
            <div className="newsletter-form flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="newsletter-input flex-1 px-5 py-3 bg-slate-800/70 rounded-lg border border-purple-500/30 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
              <button className="subscribe-btn whitespace-nowrap px-6 py-3 rounded-lg font-medium">
                Subscribe
              </button>
            </div>
            
            <div className="community-stats flex flex-wrap justify-center gap-8 mt-12">
              <div className="community-stat">
                <div className="stat-value">Research</div>
                <div className="stat-label">Evidence Collection</div>
              </div>
              <div className="community-stat">
                <div className="stat-value">Analysis</div>
                <div className="stat-label">Specialized Tools</div>
              </div>
              <div className="community-stat">
                <div className="stat-value">Governance</div>
                <div className="stat-label">Decentralized DAO</div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer - Enhanced with cosmic theme */}
      <footer className="w-full relative overflow-hidden z-10 mt-20">
        {/* Cosmic footer background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050110]/0 via-[#090415] to-[#0c0418] -z-10"></div>
        
        {/* Footer star field */}
        <div className="absolute inset-0 -z-5">
          <div className="footer-star top-[15%] left-[10%]"></div>
          <div className="footer-star top-[45%] left-[20%]"></div>
          <div className="footer-star top-[25%] left-[80%]"></div>
          <div className="footer-star top-[65%] left-[85%]"></div>
          <div className="footer-star top-[85%] left-[15%]"></div>
          <div className="footer-star top-[35%] left-[50%]"></div>
        </div>
        
        {/* Footer nebula effect */}
        <div className="absolute bottom-0 left-0 right-0 h-[250px] bg-gradient-radial from-purple-900/5 via-indigo-900/5 to-transparent blur-3xl -z-5"></div>
        
        {/* Footer top border glow */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent cosmic-border-glow"></div>
        
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 relative">
          <div className="footer-content grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
            <div className="footer-brand col-span-1 md:col-span-1">
              <div className="relative group">
                <div className="absolute -inset-5 rounded-full opacity-0 group-hover:opacity-70 bg-gradient-to-r from-purple-500/20 via-fuchsia-500/10 to-transparent cosmic-pulse transition-opacity duration-700"></div>
                <MoonsetLogo width={160} variant="small" />
              </div>
              <p className="mt-4 text-gray-400 text-sm leading-relaxed">
                Unveiling the truth through decentralized research, evidence collection, and community-driven governance.
              </p>
              
              {/* Social links */}
              <div className="flex space-x-4 mt-6">
                <a href="#" className="footer-social-link">
                  <div className="w-8 h-8 rounded-full bg-slate-800 hover:bg-purple-900/30 border border-purple-500/30 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-purple-500/60">
                    <svg className="w-4 h-4 text-white/70" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                    </svg>
                  </div>
                </a>
                <a href="#" className="footer-social-link">
                  <div className="w-8 h-8 rounded-full bg-slate-800 hover:bg-purple-900/30 border border-purple-500/30 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-purple-500/60">
                    <svg className="w-4 h-4 text-white/70" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                </a>
                <a href="#" className="footer-social-link">
                  <div className="w-8 h-8 rounded-full bg-slate-800 hover:bg-purple-900/30 border border-purple-500/30 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-purple-500/60">
                    <svg className="w-4 h-4 text-white/70" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.21c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.755zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                </a>
                <a href="#" className="footer-social-link">
                  <div className="w-8 h-8 rounded-full bg-slate-800 hover:bg-purple-900/30 border border-purple-500/30 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-purple-500/60">
                    <svg className="w-4 h-4 text-white/70" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" />
                    </svg>
                  </div>
                </a>
              </div>
            </div>
            
            <div className="footer-links">
              <h3 className="footer-heading">Navigation</h3>
              <ul className="footer-link-list space-y-2">
                <li><a href="#" className="footer-link group">
                  <span className="relative">Home
                    <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-purple-500 transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </a></li>
                <li><a href="#tokenomics" className="footer-link group">
                  <span className="relative">Tokenomics
                    <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-purple-500 transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </a></li>
                <li><a href="#roadmap" className="footer-link group">
                  <span className="relative">Roadmap
                    <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-purple-500 transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </a></li>
                <li><a href="#community" className="footer-link group">
                  <span className="relative">Community
                    <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-purple-500 transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </a></li>
              </ul>
            </div>
            
            <div className="footer-links">
              <h3 className="footer-heading">Resources</h3>
              <ul className="footer-link-list space-y-2">
                <li><a href="/whitepaper" className="footer-link group">
                  <span className="relative">Whitepaper
                    <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-purple-500 transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </a></li>
                <li><span className="footer-link opacity-50 cursor-not-allowed">
                  <span className="relative">Documentation</span>
                </span></li>
                <li><span className="footer-link opacity-50 cursor-not-allowed">
                  <span className="relative">FAQs</span>
                </span></li>
                <li><span className="footer-link opacity-50 cursor-not-allowed">
                  <span className="relative">Research</span>
                </span></li>
              </ul>
            </div>
            
            <div className="footer-links">
              <h3 className="footer-heading">Legal</h3>
              <ul className="footer-link-list space-y-2">
                <li><span className="footer-link opacity-50 cursor-not-allowed">
                  <span className="relative">Privacy Policy</span>
                </span></li>
                <li><span className="footer-link opacity-50 cursor-not-allowed">
                  <span className="relative">Terms of Use</span>
                </span></li>
                <li><span className="footer-link opacity-50 cursor-not-allowed">
                  <span className="relative">Disclaimer</span>
                </span></li>
                <li><span className="footer-link opacity-50 cursor-not-allowed">
                  <span className="relative">Cookie Policy</span>
                </span></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom flex flex-col md:flex-row justify-between items-center mt-12 pt-8 border-t border-purple-500/20 relative">
            {/* Subtle border glow */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent cosmic-border-glow"></div>
            
            <div className="footer-copyright text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 <span className="text-purple-400">MOONSET</span> Protocol. All rights reserved.
            </div>
            <div className="footer-disclaimer text-gray-500 text-xs max-w-2xl text-center md:text-right">
              The contents of this website should be understood as theoretical positions for research and investigation. This is not financial advice.
            </div>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        /* Existing styles... */
        
        /* Social Media Icons */
        .social-icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: rgba(139, 92, 246, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.3);
          color: #d1b8ff;
          transition: all 0.3s ease;
        }
        
        .social-icon-btn:hover {
          background-color: rgba(236, 72, 153, 0.2);
          border-color: rgba(236, 72, 153, 0.5);
          color: white;
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(236, 72, 153, 0.3);
        }
        
        /* Typography Refinements */
        h1, h2, h3, h4, h5, h6 {
          letter-spacing: -0.025em;
          line-height: 1.2;
        }
        
        p {
          line-height: 1.6;
        }
        
        /* Section Title Refinements */
        .cosmic-section-title {
          position: relative;
          display: inline-block;
          margin-bottom: 0.75rem;
        }
        
        .cosmic-section-title::after {
          content: '';
          position: absolute;
          bottom: -12px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 3px;
          background: linear-gradient(90deg, rgba(139, 92, 246, 0.7), rgba(236, 72, 153, 0.7));
          border-radius: 3px;
        }
        
        /* Tokenomics Section Refinements */
        .tokenomics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
        }
        
        .tokenomics-card {
          background-color: rgba(15, 23, 42, 0.1) !important;
          backdrop-filter: blur(4px) !important;
          border: 1px solid rgba(139, 92, 246, 0.15) !important;
          padding: 2.25rem 1.5rem;
          text-align: center;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
        }
        
        .tokenomics-card:hover {
          border-color: rgba(139, 92, 246, 0.5);
          transform: translateY(-5px);
          box-shadow: 0 10px 25px -5px rgba(139, 92, 246, 0.1);
        }
        
        .tokenomics-percentage {
          font-size: 2.5rem;
          font-weight: 700;
          background: linear-gradient(90deg, #a855f7, #ec4899);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 0.75rem;
        }
        
        .tokenomics-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: white;
          margin-bottom: 1rem;
        }
        
        .tokenomics-description {
          color: #d1b8ff;
          font-size: 0.95rem;
          line-height: 1.6;
        }
        
        .token-stats-card {
          background-color: rgba(15, 23, 42, 0.1) !important;
          backdrop-filter: blur(4px) !important;
          border: 1px solid rgba(139, 92, 246, 0.15) !important;
          padding: 2.5rem 2rem;
          margin-top: 2rem;
          width: 100%;
        }
        
        .token-stat-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .token-stat-label {
          color: #d1b8ff;
          font-size: 0.95rem;
          font-weight: 500;
        }
        
        .token-stat-value {
          color: white;
          font-size: 1.25rem;
          font-weight: 600;
        }
        
        /* Roadmap Section Refinements */
        .roadmap-timeline {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 3rem;
          padding-bottom: 2rem;
        }
        
        .roadmap-line {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 1.35rem;
          width: 2px;
          background: linear-gradient(to bottom, rgba(139, 92, 246, 0.7), rgba(236, 72, 153, 0.3));
          z-index: 1;
        }
        
        @media (min-width: 768px) {
          .roadmap-line {
            left: 50%;
            transform: translateX(-50%);
          }
        }
        
        .roadmap-item {
          position: relative;
          display: flex;
          align-items: flex-start;
          z-index: 2;
          padding-left: 3rem;
        }
        
        @media (min-width: 768px) {
          .roadmap-item {
            width: 50%;
            padding-left: 0;
            align-self: flex-end;
            padding-left: 2rem;
          }
          
          .roadmap-item:nth-child(even) {
            align-self: flex-start;
            padding-left: 0;
            padding-right: 2rem;
            text-align: right;
          }
          
          .roadmap-item:nth-child(even) .roadmap-dot {
            left: auto;
            right: -1.35rem;
          }
          
          .roadmap-item:nth-child(even) .roadmap-content {
            padding-right: 2rem;
            padding-left: 0;
          }
          
          .roadmap-item:nth-child(even) .roadmap-list {
            padding-left: 0;
            padding-right: 1.5rem;
          }
          
          .roadmap-item:nth-child(even) .roadmap-list li {
            padding-left: 0;
            padding-right: 1.5rem;
          }
          
          .roadmap-item:nth-child(even) .roadmap-list li::before {
            left: auto;
            right: 0;
          }
        }
        
        .roadmap-dot {
          position: absolute;
          left: -1.35rem;
          width: 1.75rem;
          height: 1.75rem;
          border-radius: 50%;
          background: #1a1631;
          border: 2px solid #6d47d9;
          z-index: 3;
        }
        
        .roadmap-dot.completed {
          background: #a855f7;
          border-color: #d1b8ff;
          box-shadow: 0 0 15px #a855f7;
        }
        
        .roadmap-dot.active {
          background: #1a1631;
          border-color: #ec4899;
          box-shadow: 0 0 15px #ec4899;
        }
        
        .roadmap-dot.active::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 0.6rem;
          height: 0.6rem;
          border-radius: 50%;
          background: #ec4899;
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          70% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
        }
        
        .roadmap-content {
          padding-left: 1.5rem;
          padding-bottom: 1rem;
        }
        
        .roadmap-content h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: white;
          margin-bottom: 1.25rem;
          display: inline-block;
          padding: 0.5rem 1.25rem;
          background: rgba(139, 92, 246, 0.1);
          border-radius: 0.5rem;
          border: 1px solid rgba(139, 92, 246, 0.2);
        }
        
        .roadmap-list {
          list-style: none;
          padding-left: 1.5rem;
        }
        
        .roadmap-list li {
          position: relative;
          margin-bottom: 1rem;
          color: #d1b8ff;
          padding-left: 1.5rem;
          font-size: 0.95rem;
        }
        
        .roadmap-list li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.5rem;
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 50%;
          background: #6d47d9;
        }
        
        .roadmap-list li.completed {
          color: white;
        }
        
        .roadmap-list li.completed::before {
          background: #a855f7;
        }
        
        .roadmap-list li.in-progress {
          color: #ec4899;
        }
        
        .roadmap-list li.in-progress::before {
          background: #ec4899;
        }
        
        /* Newsletter Section Refinements */
        .newsletter-glow {
          background: radial-gradient(circle at center, rgba(139, 92, 246, 0.15) 0%, rgba(236, 72, 153, 0.05) 50%, transparent 70%);
          z-index: -1;
        }
        
        .newsletter-input {
          transition: all 0.3s ease;
          padding: 0.875rem 1.25rem;
          font-size: 1rem;
        }
        
        .newsletter-input:focus {
          border-color: rgba(139, 92, 246, 0.6);
          box-shadow: 0 0 15px rgba(139, 92, 246, 0.3);
        }
        
        .subscribe-btn {
          background: linear-gradient(45deg, #7928ca, #9747FF, #c026d3, #d946ef);
          background-size: 300% 300%;
          color: white;
          font-weight: 500;
          animation: cosmic-gradient 8s ease infinite;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 5px 15px rgba(167, 58, 237, 0.4);
          transition: all 0.3s ease;
          padding: 0.75rem 1.5rem;
        }
        
        .subscribe-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(167, 58, 237, 0.6);
        }
        
        .community-stats {
          display: flex;
          justify-content: center;
          gap: 2.5rem;
          flex-wrap: wrap;
          margin-top: 2.5rem;
        }
        
        .community-stat {
          text-align: center;
        }
        
        .stat-value {
          font-size: 2rem;
          font-weight: 700;
          color: white;
          margin-bottom: 0.375rem;
          background: linear-gradient(90deg, #a855f7, #ec4899);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .stat-label {
          color: #d1b8ff;
          font-size: 0.95rem;
          font-weight: 500;
        }
        
        /* Utility Section Refinements */
        .utility-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }
        
        .utility-card {
          background-color: rgba(15, 23, 42, 0.1) !important;
          backdrop-filter: blur(4px) !important;
          border: 1px solid rgba(139, 92, 246, 0.15) !important;
          padding: 2.25rem;
          transition: all 0.3s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        
        .utility-card:hover {
          border-color: rgba(139, 92, 246, 0.4);
          transform: translateY(-5px);
          box-shadow: 0 15px 30px -10px rgba(139, 92, 246, 0.15);
        }
        
        .utility-icon-container {
          background: rgba(20, 14, 54, 0.8);
          width: 64px;
          height: 64px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.75rem;
          position: relative;
          border: 1px solid rgba(89, 86, 133, 0.4);
        }
        
        .utility-icon-container::after {
          content: '';
          position: absolute;
          inset: -5px;
          border-radius: 50%;
          background: radial-gradient(circle at center, rgba(139, 92, 246, 0.2), transparent 70%);
          z-index: -1;
        }
        
        .utility-icon {
          width: 28px;
          height: 28px;
          color: #d1b8ff;
        }
        
        .utility-title {
          font-size: 1.35rem;
          font-weight: 600;
          color: white;
          margin-bottom: 1.25rem;
        }
        
        .utility-description {
          color: #d1b8ff;
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 1.75rem;
        }
        
        .utility-list {
          list-style: none;
          padding: 0;
          margin-top: auto;
        }
        
        .utility-list li {
          position: relative;
          padding-left: 1.5rem;
          margin-bottom: 0.875rem;
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.925rem;
          line-height: 1.5;
        }
        
        .utility-list li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.5rem;
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 50%;
          background: #a855f7;
        }
        
        .utility-cta-btn {
          background: linear-gradient(45deg, #7928ca, #9747FF);
          color: white;
          border: none;
          font-weight: 500;
          padding: 0.75rem 1.5rem;
          box-shadow: 0 5px 15px rgba(167, 58, 237, 0.4);
          transition: all 0.3s ease;
        }
        
        .utility-cta-btn:hover {
          background: linear-gradient(45deg, #8a32e3, #a259ff);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(167, 58, 237, 0.6);
        }
        
        /* Benefits Section Refinements */
        .benefit-card {
          background-color: rgba(15, 23, 42, 0.1) !important;
          backdrop-filter: blur(4px) !important;
          border: 1px solid rgba(139, 92, 246, 0.15) !important;
          position: relative;
          border-radius: 1rem;
          overflow: hidden;
          transition: all 0.3s ease;
          height: 100%;
        }
        
        .benefit-card:hover {
          transform: translateY(-5px);
          border-color: rgba(139, 92, 246, 0.4);
          box-shadow: 0 15px 30px -10px rgba(139, 92, 246, 0.15);
        }
        
        .benefit-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.05), rgba(236, 72, 153, 0.05));
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .benefit-card:hover::before {
          opacity: 1;
        }
        
        .benefit-card-inner {
          padding: 2.25rem;
          position: relative;
          z-index: 2;
        }
        
        .benefit-icon-wrap {
          width: 54px;
          height: 54px;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(236, 72, 153, 0.2));
          border: 1px solid rgba(139, 92, 246, 0.2);
        }
        
        .benefit-icon {
          width: 24px;
          height: 24px;
          color: white;
        }
        
        .benefit-title {
          font-size: 1.3rem;
          font-weight: 600;
          color: white;
          margin-bottom: 1.25rem;
        }
        
        .benefit-description {
          color: #d1b8ff;
          font-size: 0.95rem;
          line-height: 1.6;
        }
        
        /* Animation effects */
        @keyframes cosmic-gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes pulse-soft {
          0% { text-shadow: 0 0 10px rgba(139, 92, 246, 0.3); }
          100% { text-shadow: 0 0 20px rgba(139, 92, 246, 0.6); }
        }
        
        .icon-float {
          animation: float 2s ease-in-out infinite alternate;
        }
        
        @keyframes float {
          0% { transform: translateY(0); }
          100% { transform: translateY(-3px); }
        }
        
        .icon-pulse {
          animation: icon-pulse 2s ease-in-out infinite alternate;
        }
        
        @keyframes icon-pulse {
          0% { transform: scale(1); }
          100% { transform: scale(1.15); }
        }
        
        /* Responsive refinements */
        @media (max-width: 768px) {
          .cosmic-section-title::after {
            width: 60px;
          }
          
          .token-stats-card {
            padding: 1.75rem 1.25rem;
          }
          
          .benefit-card-inner,
          .utility-card {
            padding: 1.75rem;
          }
        }
        
        @media (max-width: 640px) {
          .countdown-box {
            width: 18vw;
            padding: 0.75rem 0.5rem;
        }
        
        .countdown-value {
            font-size: 1.25rem;
          }
        }
        
        /* New Hero Section Refinements */
        .cosmic-tagline {
          position: relative;
          display: inline-block;
          animation: pulse-soft 4s ease-in-out infinite alternate;
          font-weight: 400;
          letter-spacing: 0.02em;
        }
        
        /* New Utility Section Refinements */
        .utility-card {
          background: rgba(10, 7, 32, 0.8);
          backdrop-filter: blur(12px);
          border-radius: 1rem;
          border: 1px solid rgba(89, 86, 133, 0.3);
          padding: 2.25rem 2rem;
          transition: all 0.3s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        
        .utility-card:hover {
          border-color: rgba(139, 92, 246, 0.4);
          transform: translateY(-5px);
          box-shadow: 0 15px 30px -10px rgba(139, 92, 246, 0.15);
        }
        
        .utility-icon-container {
          background: rgba(20, 14, 54, 0.8);
          width: 64px;
          height: 64px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          border: 1px solid rgba(89, 86, 133, 0.4);
        }
        
        .utility-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: white;
          margin-bottom: 1rem;
        }
        
        .utility-description {
          color: #d1b8ff;
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 1.75rem;
        }
        
        .utility-list {
          list-style: none;
          padding: 0;
          margin-top: auto;
          width: 100%;
          text-align: center;
        }
        
        .utility-list-item {
          position: relative;
          margin-bottom: 0.875rem;
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.925rem;
          line-height: 1.5;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        
        .utility-list-item::before {
          content: '';
          flex-shrink: 0;
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 50%;
          background: #a855f7;
        }
        
        .utility-cta-btn {
          background: linear-gradient(45deg, #7928ca, #9747FF);
          color: white;
          border: none;
          font-weight: 500;
          padding: 0.875rem 2rem;
          box-shadow: 0 0 25px rgba(167, 58, 237, 0.5);
          transition: all 0.3s ease;
        }
        
        .utility-cta-btn:hover {
          background: linear-gradient(45deg, #8a32e3, #a259ff);
          transform: translateY(-2px);
          box-shadow: 0 0 30px rgba(167, 58, 237, 0.7);
        }
        
        /* New Roadmap Styling */
        .roadmap-phase {
          position: relative;
        }
        
        .roadmap-phase-title {
          background: rgba(10, 7, 32, 0.8);
          display: inline-block;
          padding: 0.75rem 2rem;
          border-radius: 2rem;
          margin-bottom: 2rem;
          border: 1px solid rgba(89, 86, 133, 0.3);
        }
        
        .roadmap-phase-title h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: white;
          margin: 0;
        }
        
        .roadmap-item-new {
          display: flex;
          align-items: center;
          gap: 1rem;
          color: rgba(255, 255, 255, 0.8);
          font-size: 1.1rem;
          position: relative;
        }
        
        .roadmap-item-new.completed {
          color: white;
        }
        
        .roadmap-item-new.in-progress {
          color: #ec4899;
        }
        
        .roadmap-dot-new {
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
          background: rgba(89, 86, 133, 0.5);
          position: relative;
        }
        
        .roadmap-item-new.completed .roadmap-dot-new {
          background: #7928ca;
        }
        
        .roadmap-item-new.in-progress .roadmap-dot-new {
          background: #ec4899;
        }
        
        @media (max-width: 768px) {
          .roadmap-phase-title {
            padding: 0.5rem 1.5rem;
          }
          
          .roadmap-item-new {
            font-size: 1rem;
          }
        }
        
        /* Stats Item Refinements */
        .stat-item {
          text-align: center;
          padding: 1.75rem 1.5rem;
          background: rgba(10, 7, 32, 0.8);
          backdrop-filter: blur(12px);
          border-radius: 1rem;
          border: 1px solid rgba(89, 86, 133, 0.3);
          transition: all 0.3s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        
        .stat-item:hover {
          transform: translateY(-3px);
          border-color: rgba(139, 92, 246, 0.4);
          box-shadow: 0 10px 20px -8px rgba(139, 92, 246, 0.15);
        }
        
        /* Update utility icon container and list styling */
        .utility-icon-container {
          background: rgba(20, 14, 54, 0.95);
          width: 76px;
          height: 76px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          border: 1px solid rgba(89, 86, 133, 0.4);
          margin-bottom: 1.5rem;
          box-shadow: 0 0 20px rgba(76, 29, 149, 0.2);
        }
        
        .utility-icon {
          color: #d4b8ff;
          width: 28px;
          height: 28px;
        }
        
        .utility-card {
          background: rgba(10, 7, 32, 0.95);
          backdrop-filter: blur(12px);
          border-radius: 1.25rem;
          border: 1px solid rgba(89, 86, 133, 0.3);
          padding: 2.5rem 2rem 2rem;
          transition: all 0.3s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        
        .utility-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: white;
          margin-bottom: 1.25rem;
        }
        
        .utility-description {
          color: rgba(209, 184, 255, 0.9);
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 2rem;
        }
        
        .utility-list-item {
          position: relative;
          margin-bottom: 1.25rem;
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.95rem;
          line-height: 1.5;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
        }
        
        .utility-list-item::before {
          content: '';
          flex-shrink: 0;
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 50%;
          background: #a855f7;
          box-shadow: 0 0 8px rgba(168, 85, 247, 0.6);
        }
        
        /* Update CTA button and container styling */
        .utility-callout {
          background-color: rgba(10, 7, 32, 0.2) !important;
          backdrop-filter: blur(4px) !important;
          border-radius: 1.5rem;
          border: 1px solid rgba(89, 86, 133, 0.4);
          box-shadow: 0 15px 40px -10px rgba(0, 0, 0, 0.5);
          padding: 3rem 2rem;
        }
        
        .utility-cta-btn {
          background: linear-gradient(45deg, #7928ca, #9747FF);
          color: white;
          border: none;
          font-weight: 500;
          padding: 0.875rem 2.5rem;
          font-size: 1.05rem;
          border-radius: 0.75rem;
          box-shadow: 0 0 30px rgba(167, 58, 237, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.1) inset;
          transition: all 0.3s ease;
        }
        
        .utility-cta-btn:hover {
          background: linear-gradient(45deg, #8a32e3, #a259ff);
          transform: translateY(-2px);
          box-shadow: 0 0 40px rgba(167, 58, 237, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.2) inset;
        }
        
        /* Animation for distant stars */
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 0.4; }
        }
        
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.3; }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-pulse-slower {
          animation: pulse-slower 6s ease-in-out infinite;
        }

        /* Add scrollbar styling */
        ::-webkit-scrollbar {
          width: 12px;
          height: 12px;
        }

        ::-webkit-scrollbar-track {
          background: #050110;
          border-radius: 6px;
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.3);
          border-radius: 6px;
          border: 3px solid #050110;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.5);
        }

        /* Firefox */
        html {
          scrollbar-color: rgba(139, 92, 246, 0.3) #050110;
          scrollbar-width: thin;
        }

        /* Updated Button Styles */
        .cosmic-dashboard-btn {
          position: relative;
          overflow: hidden;
          background: linear-gradient(45deg, #7928ca, #9747FF, #c026d3, #d946ef);
          background-size: 300% 300%;
          color: white;
          animation: cosmic-gradient 8s ease infinite;
          border: none;
          box-shadow: 0 8px 25px rgba(167, 58, 237, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1) inset;
          font-weight: 500;
          letter-spacing: 0.01em;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .cosmic-dashboard-btn:hover {
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 15px 30px rgba(167, 58, 237, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.2) inset;
          background-position: 100% 100%;
        }

        .cosmic-dashboard-btn:active {
          transform: translateY(1px) scale(0.98);
          box-shadow: 0 5px 15px rgba(167, 58, 237, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.2) inset;
          background-position: 0% 0%;
          transition: all 0.1s ease-out;
        }

        .cosmic-btn-pulse {
          background: linear-gradient(45deg, rgba(121, 40, 202, 0.5), rgba(236, 72, 153, 0.5));
          animation: pulse-button 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .cosmic-btn-spark {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
        }

        .cosmic-btn-spark:after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transform: skewX(-25deg);
        }

        .group:hover .cosmic-btn-spark:after {
          animation: btn-shine 1.2s ease;
        }

        @keyframes btn-shine {
          100% {
            left: 200%;
          }
        }

        @keyframes pulse-button {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.05);
          }
        }

        /* Small glowing white text */
        .glowing-white-text-sm {
          color: white;
          text-shadow: 0 0 5px rgba(255, 255, 255, 0.8), 
                      0 0 10px rgba(255, 255, 255, 0.5),
                      0 0 15px rgba(139, 92, 246, 0.5);
          animation: pulse-glow-sm 3s ease-in-out infinite alternate;
        }
        
        @keyframes pulse-glow-sm {
          0% {
            text-shadow: 0 0 5px rgba(255, 255, 255, 0.8), 
                        0 0 10px rgba(255, 255, 255, 0.5),
                        0 0 15px rgba(139, 92, 246, 0.5);
          }
          100% {
            text-shadow: 0 0 7px rgba(255, 255, 255, 1), 
                        0 0 14px rgba(255, 255, 255, 0.7),
                        0 0 18px rgba(139, 92, 246, 0.7);
          }
        }

        .tokenomics-card {
          background-color: rgba(15, 23, 42, 0.1) !important;
          backdrop-filter: blur(4px) !important;
          border: 1px solid rgba(139, 92, 246, 0.15) !important;
        }
        
        .utility-card {
          background-color: rgba(15, 23, 42, 0.1) !important;
          backdrop-filter: blur(4px) !important;
          border: 1px solid rgba(139, 92, 246, 0.15) !important;
        }
        
        .benefit-card {
          background-color: rgba(15, 23, 42, 0.1) !important;
          backdrop-filter: blur(4px) !important;
          border: 1px solid rgba(139, 92, 246, 0.15) !important;
        }
        
        .token-stats-card {
          background-color: rgba(15, 23, 42, 0.1) !important;
          backdrop-filter: blur(4px) !important;
          border: 1px solid rgba(139, 92, 246, 0.15) !important;
        }
        
        .utility-callout {
          background-color: rgba(10, 7, 32, 0.2) !important;
          backdrop-filter: blur(4px) !important;
        }
        
        .countdown-box {
          background-color: rgba(15, 23, 42, 0.1) !important;
          backdrop-filter: blur(4px) !important;
          border: 1px solid rgba(139, 92, 246, 0.15) !important;
        }
        
        .social-icon-btn {
          background-color: rgba(15, 23, 42, 0.1) !important;
          backdrop-filter: blur(4px) !important;
          border: 1px solid rgba(139, 92, 246, 0.15) !important;
        }
        
        .utility-cta-btn {
          background-color: rgba(139, 92, 246, 0.15) !important;
          backdrop-filter: blur(4px) !important;
          border: 1px solid rgba(139, 92, 246, 0.25) !important;
        }
        
        .cosmic-dashboard-btn {
          background: linear-gradient(to right, rgba(124, 58, 237, 0.3), rgba(37, 99, 235, 0.3)) !important;
          backdrop-filter: blur(4px) !important;
          border: 1px solid rgba(139, 92, 246, 0.25) !important;
        }
        
        .whitepaper-btn {
          background-color: rgba(15, 23, 42, 0.1) !important;
          backdrop-filter: blur(4px) !important;
        }
        
        .benefit-highlight-stats {
          background-color: rgba(15, 23, 42, 0.1) !important;
          backdrop-filter: blur(4px) !important;
          border: 1px solid rgba(139, 92, 246, 0.15) !important;
        }

        /* Enhanced Footer Styles */
        .footer-heading {
          color: white;
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 1.25rem;
          letter-spacing: 0.01em;
          position: relative;
          display: inline-block;
        }
        
        .footer-heading::after {
          content: '';
          position: absolute;
          bottom: -0.5rem;
          left: 0;
          width: 2rem;
          height: 1px;
          background: linear-gradient(to right, rgba(139, 92, 246, 0.7), transparent);
        }
        
        .footer-link-list {
          list-style: none;
          padding: 0;
        }
        
        .footer-link {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.95rem;
          display: inline-block;
          transition: all 0.2s ease;
        }
        
        .footer-link:hover {
          color: rgba(139, 92, 246, 1);
          transform: translateX(3px);
        }
        
        /* Footer star animation */
        .footer-star {
          position: absolute;
          width: 2px;
          height: 2px;
          background-color: white;
          border-radius: 50%;
          opacity: 0.5;
          animation: footer-star-twinkle 3s ease-in-out infinite alternate;
        }
        
        .footer-star:nth-child(1) {
          width: 3px;
          height: 3px;
          animation-delay: 0.3s;
          animation-duration: 4s;
        }
        
        .footer-star:nth-child(2) {
          animation-delay: 0.9s;
          animation-duration: 3.5s;
        }
        
        .footer-star:nth-child(3) {
          animation-delay: 1.5s;
          animation-duration: 5s;
        }
        
        .footer-star:nth-child(4) {
          width: 2.5px;
          height: 2.5px;
          animation-delay: 0.7s;
          animation-duration: 4.5s;
        }
        
        .footer-star:nth-child(5) {
          width: 1.5px;
          height: 1.5px;
          animation-delay: 1.8s;
          animation-duration: 3s;
        }
        
        .footer-star:nth-child(6) {
          width: 3px;
          height: 3px;
          animation-delay: 1.2s;
          animation-duration: 5.5s;
        }
        
        @keyframes footer-star-twinkle {
          0%, 100% {
            opacity: 0.8;
            box-shadow: 0 0 2px rgba(255, 255, 255, 0.8);
          }
          50% {
            opacity: 0.3;
            box-shadow: 0 0 0px rgba(255, 255, 255, 0);
          }
        }
        
        /* Cosmic border glow effect */
        .cosmic-border-glow {
          animation: border-pulse 4s ease-in-out infinite alternate;
        }
        
        @keyframes border-pulse {
          0% {
            opacity: 0.3;
          }
          100% {
            opacity: 0.8;
          }
        }
        
        /* Social media links hover effect */
        .footer-social-link:hover svg {
          color: rgba(255, 255, 255, 0.9);
          filter: drop-shadow(0 0 3px rgba(139, 92, 246, 0.6));
        }
         
        `}</style>
    </div>
  )
}