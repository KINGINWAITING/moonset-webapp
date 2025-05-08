"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { ChevronRight, ArrowUpRight, Shield, Zap, Globe, FolderOpen, PenTool, Users, FileText, Search, Camera, Thermometer, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MoonsetLogo } from "@/components/moonset-logo"

export default function AboutPage() {
  const [stars, setStars] = useState<Array<{x: number, y: number, size: number, opacity: number, depth: number}>>([]);
  const [heroStars, setHeroStars] = useState<Array<{x: number, y: number, size: number, opacity: number, distance: number, color: string, twinkleSpeed: number}>>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({
    mission: false,
    evidence: false,
    solution: false,
    team: false,
    community: false
  });
  
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
  
  // Track scroll position for parallax and reveal animations
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Check which sections are in viewport
      const sections = ['problem', 'vision', 'utilities', 'token', 'evidence', 'team'];
      const newVisibleSections = { ...visibleSections };
      let hasChanged = false;
      
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Mark section as visible when it's 20% into the viewport
          const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
          
          // Only mark as changed if there's an actual change
          if (newVisibleSections[section] !== isVisible) {
            newVisibleSections[section] = isVisible;
            hasChanged = true;
          }
        }
      });
      
      // Only update state if visibility has changed
      if (hasChanged) {
        setVisibleSections(newVisibleSections);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // Remove visibleSections from dependency array to prevent infinite loop
  
  // Generate background stars with depth layers
  useEffect(() => {
    const newStars = [];
    
    // Create 200 stars with random positions within a circular area
    for (let i = 0; i < 200; i++) {
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
        size: Math.random() * 2.5 + 1, // 1-3.5px
        opacity: Math.random() * 0.6 + 0.4, // 0.4-1.0
        depth: depth // 0, 1, or 2 (0 = closest)
      });
    }
    
    setStars(newStars);
  }, []);
  
  // Generate hero section stars that rotate around the center
  useEffect(() => {
    const newHeroStars = [];
    
    // Create 150 stars (increased from 80) with random positions in a circular pattern
    for (let i = 0; i < 150; i++) {
      // Random angle
      const angle = Math.random() * Math.PI * 2;
      
      // Create stars at different distances from center
      // Use square root distribution for more natural look
      const distanceFactor = Math.sqrt(Math.random());
      
      // Calculate distance from center (5% to 45% of container)
      const distance = 5 + distanceFactor * 40;
      
      // Add color variation to some stars
      const colorVariation = Math.random() > 0.8 
        ? Math.random() > 0.5 
          ? 'rgba(255, 220, 240, 0.9)' // Slight pink tint
          : 'rgba(220, 240, 255, 0.9)' // Slight blue tint
        : 'white'; // Default white
      
      newHeroStars.push({
        x: 50 + Math.cos(angle) * distance, // 50% is center
        y: 50 + Math.sin(angle) * distance, // 50% is center
        size: Math.random() * 2.5 + 0.5, // 0.5-3px (increased size range)
        opacity: Math.random() * 0.7 + 0.3, // 0.3-1.0
        distance: distance, // save for animation
        color: colorVariation, // Add color variation
        twinkleSpeed: Math.random() > 0.7 ? (Math.random() * 3 + 2) : 0 // Some stars twinkle at different speeds
      });
    }
    
    setHeroStars(newHeroStars);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#050110] text-white relative overflow-hidden perspective-1000">
      {/* Enhanced cosmic background with nebula effect - fixed position */}
      <div 
        className="fixed inset-0 nebula-background"
        style={{
          background: 'radial-gradient(circle at center, rgba(128, 64, 216, 0.15) 0%, rgba(30, 27, 75, 0.05) 40%, transparent 70%)',
          zIndex: 0,
          transform: `translateY(${scrollY * 0.05}px)`,
          transition: 'transform 0.2s ease-out'
        }}
      />
      
      {/* Enhanced Nebula wisps with improved parallax - fixed position */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="nebula-wisp wisp-1" style={{ transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -15}px)` }}></div>
        <div className="nebula-wisp wisp-2" style={{ transform: `translate(${mousePosition.x * 25}px, ${mousePosition.y * 20}px)` }}></div>
        <div className="nebula-wisp wisp-3" style={{ transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * 10}px)` }}></div>
        <div className="nebula-wisp wisp-4" style={{ transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * -10}px)` }}></div>
        
        {/* New nebula clouds */}
        <div className="nebula-cloud cloud-1"></div>
        <div className="nebula-cloud cloud-2"></div>
        <div className="nebula-cloud cloud-3"></div>
        
        {/* Cosmic dust particles */}
        <div className="cosmic-dust dust-1"></div>
        <div className="cosmic-dust dust-2"></div>
        <div className="cosmic-dust dust-3"></div>
      </div>

      {/* Particle system background effect - fixed position */}
      <div className="fixed inset-0 z-0">
        <div className="particles-container"></div>
      </div>

      {/* Parallax StarField - with depth layers - fixed position */}
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
        
        {/* Hero section rotating stars with improved rendering */}
        <div 
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          style={{
            animation: 'rotate 120s linear infinite reverse',
            transformOrigin: 'center center'
          }}
        >
          {heroStars.map((star, index) => {
            const shadowSize = star.size * 0.5;
            const shadowColor = `rgba(255, 255, 255, 0.3)`;
            
            return (
              <div
                key={`hero-star-${index}`}
                className={`absolute bg-white rounded-full ${star.twinkleSpeed ? `custom-twinkle-${Math.floor(star.twinkleSpeed)}` : ''}`}
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  opacity: star.opacity,
                  backgroundColor: star.color,
                  boxShadow: `0 0 ${shadowSize}px ${shadowSize * 0.6}px ${shadowColor}`
                }}
              />
            );
          })}
        </div>
        
        {/* Cosmic elements: Comets */}
        <div className="comet comet-1"></div>
        <div className="comet comet-2"></div>
        
        {/* Cosmic elements: Constellation */}
        <div className="constellation constellation-1"></div>
        
        {/* Additional bright stars for emphasis */}
        <div className="fixed star-lg top-[15%] left-[10%] w-2 h-2 rounded-full bg-white opacity-80 shadow-[0_0_10px_2px_rgba(255,255,255,0.7)]"></div>
        <div className="fixed star-lg top-[25%] right-[15%] w-2 h-2 rounded-full bg-purple-300 opacity-70 shadow-[0_0_8px_2px_rgba(139,92,246,0.7)]"></div>
        <div className="fixed star-lg bottom-[20%] left-[25%] w-3 h-3 rounded-full bg-white opacity-80 shadow-[0_0_12px_3px_rgba(255,255,255,0.7)]"></div>
        <div className="fixed star-lg bottom-[30%] right-[20%] w-2 h-2 rounded-full bg-pink-300 opacity-70 shadow-[0_0_8px_2px_rgba(236,72,153,0.7)]"></div>
        <div className="fixed star-lg top-[35%] left-[35%] w-2.5 h-2.5 rounded-full bg-blue-200 opacity-75 shadow-[0_0_10px_3px_rgba(191,219,254,0.7)]"></div>
        <div className="fixed star-lg bottom-[45%] right-[40%] w-2 h-2 rounded-full bg-indigo-200 opacity-80 shadow-[0_0_9px_2px_rgba(165,180,252,0.7)]"></div>
        
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
      
      {/* Scrollable content */}
      <div className="relative z-10 flex-grow overflow-auto">
        <main className="flex flex-col items-center w-full max-w-7xl mx-auto px-6 pt-16 pb-24">
          {/* Enhanced Hero Section */}
          <div className="w-full text-center py-24 relative overflow-hidden">
            {/* Add navigation links inside the hero section */}
            {/* Small glowing navigation links at the top */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 flex space-x-12">
              <a href="/" className="text-xs uppercase tracking-widest font-light text-white glowing-white-text-sm hover:text-purple-300 transition-colors">Home</a>
              <a href="/about" className="text-xs uppercase tracking-widest font-light text-white glowing-white-text-sm hover:text-purple-300 transition-colors">About</a>
              <a href="/whitepaper" className="text-xs uppercase tracking-widest font-light text-white glowing-white-text-sm hover:text-purple-300 transition-colors">Whitepaper</a>
              <a href="/dashboard" className="text-xs uppercase tracking-widest font-light text-white glowing-white-text-sm hover:text-purple-300 transition-colors">Dashboard</a>
            </div>
            
            {/* Hero glow effects - central glow */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-purple-600/20 via-purple-900/10 to-transparent blur-3xl z-0"></div>
            
            {/* Ultimate seamless gradient background */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Extra large top-left gradient */}
              <div className="absolute -top-[300px] -left-[300px] w-[1200px] h-[1000px] bg-gradient-radial from-indigo-600/15 via-violet-500/8 to-transparent blur-[150px] z-0 cosmic-gradient-animate-1"></div>
              
              {/* Extra large top-right gradient */}
              <div className="absolute -top-[200px] -right-[300px] w-[1100px] h-[900px] bg-gradient-radial from-fuchsia-500/15 via-purple-600/8 to-transparent blur-[150px] z-0 cosmic-gradient-animate-2"></div>
              
              {/* Secondary accent gradients with ultra-soft edges */}
              <div className="absolute top-[5%] left-[10%] w-[400px] h-[400px] bg-gradient-radial from-cyan-500/10 via-blue-600/5 to-transparent blur-[120px] z-0 cosmic-gradient-pulse"></div>
              <div className="absolute top-[15%] right-[10%] w-[350px] h-[350px] bg-gradient-radial from-pink-500/10 via-rose-600/5 to-transparent blur-[120px] z-0 cosmic-gradient-pulse-delayed"></div>
              
              {/* Distant nebula effect */}
              <div className="absolute bottom-[20%] left-[20%] w-[500px] h-[300px] bg-gradient-radial from-purple-400/8 via-indigo-500/4 to-transparent blur-[100px] z-0 cosmic-gradient-pulse" style={{animationDelay: '3s'}}></div>
              <div className="absolute bottom-[10%] right-[15%] w-[400px] h-[250px] bg-gradient-radial from-blue-400/8 via-violet-500/4 to-transparent blur-[100px] z-0 cosmic-gradient-pulse" style={{animationDelay: '5s'}}></div>
            </div>
            
            {/* Orbit ring with mini stars */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-purple-500/20 rounded-full z-0" style={{ animation: 'orbit-rotate 60s linear infinite' }}></div>
            
            {/* Outer orbit ring */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-indigo-500/10 rounded-full z-0" style={{ animation: 'orbit-rotate 80s linear infinite reverse' }}></div>
            
            {/* Central logo with cosmic glow */}
            <div className="relative mb-10 inline-block">
              <div className="absolute -inset-10 rounded-full opacity-60 bg-gradient-to-r from-purple-500/30 via-fuchsia-500/20 to-transparent cosmic-pulse"></div>
              <div className="transform transition-transform duration-700 hover:scale-105 relative group">
                <MoonsetLogo width={140} variant="small" />
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 bg-gradient-to-r from-purple-500/30 to-blue-500/30 blur-xl transition-all duration-700 -z-10"></div>
              </div>
            </div>
            
            {/* Title with elegant typography */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 cosmic-title leading-tight">
              About MOONSET
            </h1>
            
            {/* Enhanced tagline with elegant typography and gradient underline */}
            <div className="max-w-3xl mx-auto relative mb-16">
              <p className="text-xl md:text-2xl text-gray-200 leading-relaxed font-light">
                Challenging narratives through <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">decentralized research</span> and <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">community-driven evidence</span>
              </p>
              <div className="w-40 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mt-8"></div>
            </div>
            
            {/* Feature highlights in cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="bg-slate-900/40 backdrop-blur-md border border-purple-500/20 rounded-xl p-5 transform transition-all duration-300 hover:-translate-y-2 hover:border-purple-500/40">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600/30 to-pink-600/30 mx-auto mb-4 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white/70" />
                </div>
                <h3 className="text-lg font-medium mb-2 text-white">Decentralized</h3>
                <p className="text-gray-400 text-sm">Research and evidence stored on an immutable blockchain network</p>
              </div>
              
              <div className="bg-slate-900/40 backdrop-blur-md border border-purple-500/20 rounded-xl p-5 transform transition-all duration-300 hover:-translate-y-2 hover:border-purple-500/40">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600/30 to-pink-600/30 mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-6 h-6 text-white/70" />
                </div>
                <h3 className="text-lg font-medium mb-2 text-white">Community-Driven</h3>
                <p className="text-gray-400 text-sm">Governance and research priorities determined by token holders</p>
              </div>
              
              <div className="bg-slate-900/40 backdrop-blur-md border border-purple-500/20 rounded-xl p-5 transform transition-all duration-300 hover:-translate-y-2 hover:border-purple-500/40">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600/30 to-pink-600/30 mx-auto mb-4 flex items-center justify-center">
                  <Search className="w-6 h-6 text-white/70" />
                </div>
                <h3 className="text-lg font-medium mb-2 text-white">Evidence-Based</h3>
                <p className="text-gray-400 text-sm">Comprehensive analysis of inconsistencies in the official narrative</p>
              </div>
            </div>
          </div>

          {/* The Problem Section */}
          <section 
            id="problem" 
            className="w-full py-16 flex flex-col items-center"
          >
            <div className="flex flex-col items-center mb-12">
              <div className="transform hover:scale-105 transition-transform duration-500 ease-out relative group">
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 bg-gradient-to-r from-purple-500/30 to-blue-500/30 blur-3xl transition-all duration-700 -z-10"></div>
                <div className="cosmic-logo-glow absolute -inset-6 rounded-full opacity-50"></div>
                <MoonsetLogo width={120} variant="small" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 glowing-white-text text-center">The Problem</h2>
            <div className="bg-slate-900/40 backdrop-blur-md border border-purple-500/30 rounded-xl p-8 md:p-10 max-w-4xl">
              <p className="text-gray-300 leading-relaxed mb-6">
                For decades, the truth about one of humanity's most celebrated achievements has been obscured by narratives that fail to address 
                critical inconsistencies and gaps in evidence. Traditional platforms that attempt to question these narratives face centralized censorship and barriers to open investigation.
              </p>
              <p className="text-gray-300 leading-relaxed">
                In a world where information is increasingly controlled by centralized entities, MOONSET provides a decentralized alternative for 
                truth-seekers to collaborate, investigate, and preserve evidence that challenges conventional wisdom about the 1969 lunar landing.
              </p>
        </div>
      </section>
      
          {/* Vision & Values */}
          <section 
            id="vision" 
            className="w-full py-16 flex flex-col items-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-12 glowing-white-text text-center">Vision & Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
              <div className="bg-slate-900/40 backdrop-blur-md border border-purple-500/30 rounded-xl p-8 transform transition-transform duration-300 hover:translate-y-[-5px] hover:shadow-lg hover:shadow-purple-500/20">
                <h3 className="text-2xl font-semibold mb-4 text-white">Our Vision</h3>
                <p className="text-gray-300 leading-relaxed">
                  Create a decentralized ecosystem where evidence and research about the 1969 lunar landing can be freely shared, 
                  analyzed, and preserved without censorship or centralized control.
            </p>
          </div>
              <div className="bg-slate-900/40 backdrop-blur-md border border-purple-500/30 rounded-xl p-8 transform transition-transform duration-300 hover:translate-y-[-5px] hover:shadow-lg hover:shadow-purple-500/20">
                <h3 className="text-2xl font-semibold mb-4 text-white">Our Mission</h3>
                <p className="text-gray-300 leading-relaxed">
                  Empower a global community of researchers, scientists, and truth-seekers to collaborate on uncovering and documenting evidence 
                  that challenges the mainstream narrative of the 1969 lunar landing.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mt-8">
              <div className="bg-slate-900/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 transform transition-transform duration-300 hover:translate-y-[-5px]">
                <h4 className="text-xl font-medium mb-3 text-purple-300">Transparency</h4>
                <p className="text-gray-400">
                  We believe in open access to information and evidence for all community members.
                </p>
              </div>
              <div className="bg-slate-900/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 transform transition-transform duration-300 hover:translate-y-[-5px]">
                <h4 className="text-xl font-medium mb-3 text-purple-300">Community Governance</h4>
                <p className="text-gray-400">
                  Decisions about research direction and resource allocation are made by token holders.
                </p>
              </div>
              <div className="bg-slate-900/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 transform transition-transform duration-300 hover:translate-y-[-5px]">
                <h4 className="text-xl font-medium mb-3 text-purple-300">Decentralization</h4>
                <p className="text-gray-400">
                  All research findings and evidence are stored on a distributed network immune to censorship.
                </p>
              </div>
        </div>
      </section>
      
          {/* MOONSET Utilities */}
          <section 
            id="utilities" 
            className="w-full py-16 flex flex-col items-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-12 glowing-white-text text-center">MOONSET Utilities</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
              <div className="utility-card transform perspective-1000">
                <div className="utility-icon-container mx-auto">
                  <Globe className="utility-icon" />
                </div>
                <h3 className="utility-title text-center">Decentralized Archive</h3>
                <p className="utility-description text-center">
                  Permanent storage of research, photos, and evidence on a distributed network immune to censorship or alteration.
                </p>
                <ul className="utility-list">
                  <li className="utility-list-item">Immutable storage</li>
                  <li className="utility-list-item">Distributed across nodes</li>
                  <li className="utility-list-item">Censorship resistant</li>
                </ul>
              </div>
              <div className="utility-card transform perspective-1000">
                <div className="utility-icon-container mx-auto">
                  <Users className="utility-icon" />
                </div>
                <h3 className="utility-title text-center">Community Governance</h3>
                <p className="utility-description text-center">
                  MOONSET token holders vote on research initiatives, evidence validation, and resource allocation.
                </p>
                <ul className="utility-list">
                  <li className="utility-list-item">On-chain voting</li>
                  <li className="utility-list-item">Transparent decisions</li>
                  <li className="utility-list-item">Community-led direction</li>
                </ul>
              </div>
              <div className="utility-card transform perspective-1000">
                <div className="utility-icon-container mx-auto">
                  <Search className="utility-icon" />
                </div>
                <h3 className="utility-title text-center">Research Rewards</h3>
                <p className="utility-description text-center">
                  Contributors earn MOONSET tokens for providing valuable research, evidence, and analysis.
                </p>
                <ul className="utility-list">
                  <li className="utility-list-item">Incentivized participation</li>
                  <li className="utility-list-item">Peer validation system</li>
                  <li className="utility-list-item">Reputation building</li>
                </ul>
              </div>
                </div>
          </section>

          {/* Token Details */}
          <section 
            id="token" 
            className="w-full py-16 flex flex-col items-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-12 glowing-white-text text-center">Token Details</h2>
            <div className="bg-slate-900/40 backdrop-blur-md border border-purple-500/30 rounded-xl p-8 w-full max-w-4xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <tbody>
                    <tr className="border-b border-purple-500/20">
                      <td className="py-4 pr-4 text-gray-400 font-medium">Token Name</td>
                      <td className="py-4 text-white">MOONSET</td>
                    </tr>
                    <tr className="border-b border-purple-500/20">
                      <td className="py-4 pr-4 text-gray-400 font-medium">Token Symbol</td>
                      <td className="py-4 text-white">MST</td>
                    </tr>
                    <tr className="border-b border-purple-500/20">
                      <td className="py-4 pr-4 text-gray-400 font-medium">Total Supply</td>
                      <td className="py-4 text-white">200,000,000 MST</td>
                    </tr>
                    <tr className="border-b border-purple-500/20">
                      <td className="py-4 pr-4 text-gray-400 font-medium">Token Type</td>
                      <td className="py-4 text-white">ERC-20</td>
                    </tr>
                    <tr>
                      <td className="py-4 pr-4 text-gray-400 font-medium">Blockchain</td>
                      <td className="py-4 text-white">Ethereum</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Evidence Cards */}
          <section 
            id="evidence" 
            className="w-full py-16 flex flex-col items-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-12 glowing-white-text text-center">Key Evidence</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
              <div className="bg-slate-900/40 backdrop-blur-md border border-purple-500/30 rounded-xl overflow-hidden transform perspective-1000 hover:scale-[1.02] transition-all duration-300">
                <div className="h-48 bg-gradient-to-br from-purple-900/40 to-blue-900/40 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600/30 to-pink-600/30 flex items-center justify-center">
                    <Camera className="w-8 h-8 text-white/70" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-3 text-white">Photographic Anomalies</h3>
                  <p className="text-gray-400 text-sm">
                    Analysis of lighting inconsistencies, missing stars, and camera anomalies in official photographs.
                  </p>
                </div>
              </div>
              <div className="bg-slate-900/40 backdrop-blur-md border border-purple-500/30 rounded-xl overflow-hidden transform perspective-1000 hover:scale-[1.02] transition-all duration-300">
                <div className="h-48 bg-gradient-to-br from-purple-900/40 to-blue-900/40 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600/30 to-pink-600/30 flex items-center justify-center">
                    <Thermometer className="w-8 h-8 text-white/70" />
                </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-3 text-white">Environmental Challenges</h3>
                  <p className="text-gray-400 text-sm">
                    Documentation of radiation, temperature, and vacuum conditions that pose questions about the mission's feasibility.
                  </p>
                </div>
              </div>
              <div className="bg-slate-900/40 backdrop-blur-md border border-purple-500/30 rounded-xl overflow-hidden transform perspective-1000 hover:scale-[1.02] transition-all duration-300">
                <div className="h-48 bg-gradient-to-br from-purple-900/40 to-blue-900/40 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600/30 to-pink-600/30 flex items-center justify-center">
                    <Rocket className="w-8 h-8 text-white/70" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-3 text-white">Technical Impossibilities</h3>
                  <p className="text-gray-400 text-sm">
                    Analysis of technological limitations of the era and inconsistencies in NASA's technical documentation.
                  </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
          <section 
            id="team" 
            className="w-full py-16 flex flex-col items-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-12 glowing-white-text text-center">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
              <div className="bg-slate-900/40 backdrop-blur-md border border-purple-500/30 rounded-xl p-6 text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-600/30 to-pink-600/30 mx-auto mb-4 flex items-center justify-center">
                  <PenTool className="w-10 h-10 text-white/70" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Dr. Alexandra Chen</h3>
                <p className="text-purple-300 mb-3 text-sm">Lead Researcher</p>
                <p className="text-gray-400 text-sm">
                  PhD in Astrophysics with 10+ years of experience analyzing space mission data and imagery.
            </p>
          </div>
              <div className="bg-slate-900/40 backdrop-blur-md border border-purple-500/30 rounded-xl p-6 text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-600/30 to-pink-600/30 mx-auto mb-4 flex items-center justify-center">
                  <FolderOpen className="w-10 h-10 text-white/70" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Michael Rodriguez</h3>
                <p className="text-purple-300 mb-3 text-sm">Chief Technical Officer</p>
                <p className="text-gray-400 text-sm">
                  Blockchain architect specializing in decentralized storage solutions and distributed systems.
                </p>
              </div>
              <div className="bg-slate-900/40 backdrop-blur-md border border-purple-500/30 rounded-xl p-6 text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-600/30 to-pink-600/30 mx-auto mb-4 flex items-center justify-center">
                  <Shield className="w-10 h-10 text-white/70" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Sarah Blackwell</h3>
                <p className="text-purple-300 mb-3 text-sm">Community Director</p>
                <p className="text-gray-400 text-sm">
                  Former NASA analyst with expertise in community building and decentralized governance.
                </p>
          </div>
        </div>
      </section>
      
          {/* Disclaimer */}
          <section className="py-8 border-t border-purple-500/20 w-full mb-12">
            <div className="max-w-4xl mx-auto px-6">
              <h3 className="text-lg font-semibold text-white mb-3">Disclaimer</h3>
              <p className="text-gray-400 text-sm">
                Investing in cryptocurrencies, including MOONSET, involves significant risks, and you could lose your entire investment. The value of cryptocurrencies can be highly volatile and is subject to market fluctuations. The claims and opinions expressed regarding the 1969 moon landing are those of the MoonSet project team and are not universally accepted. This is for informational purposes only and does not constitute financial or investment advice.
              </p>
            </div>
          </section>
        </main>
      </div>

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
                      <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" />
                    </svg>
                  </div>
                </a>
                <a href="#" className="footer-social-link">
                  <div className="w-8 h-8 rounded-full bg-slate-800 hover:bg-purple-900/30 border border-purple-500/30 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-purple-500/60">
                    <svg className="w-4 h-4 text-white/70" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.21c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.755zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                </a>
              </div>
            </div>
            
            <div className="footer-links">
              <h3 className="footer-heading">Navigation</h3>
              <ul className="footer-link-list space-y-2">
                <li><a href="/" className="footer-link group">
                  <span className="relative">Home
                    <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-purple-500 transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </a></li>
                <li><a href="/about" className="footer-link group">
                  <span className="relative">About
                    <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-purple-500 transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </a></li>
                <li><a href="/whitepaper" className="footer-link group">
                  <span className="relative">Whitepaper
                    <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-purple-500 transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </a></li>
                <li><a href="/dashboard" className="footer-link group">
                  <span className="relative">Dashboard
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
        /* Page perspective for 3D effects */
        .perspective-1000 {
          perspective: 1000px;
        }
        
        /* Perspective text effect */
        .perspective-text {
          transform-style: preserve-3d;
          transition: transform 0.3s ease-out;
        }
        
        .perspective-text:hover {
          transform: translateZ(20px);
        }
        
        /* Cosmic title styling */
        .cosmic-title {
          background: linear-gradient(to bottom right, #ffffff, #d8c7ff);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.7), 
                       0 0 20px rgba(255, 255, 255, 0.5),
                       0 0 30px rgba(139, 92, 246, 0.5),
                       0 0 40px rgba(139, 92, 246, 0.3);
          animation: pulse-glow 3s ease-in-out infinite alternate;
        }
        
        /* Glowing white text for section headers */
        .glowing-white-text {
          color: white;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.7), 
                       0 0 20px rgba(255, 255, 255, 0.5),
                       0 0 30px rgba(139, 92, 246, 0.5),
                       0 0 40px rgba(139, 92, 246, 0.3);
          animation: pulse-glow 3s ease-in-out infinite alternate;
        }

        @keyframes pulse-glow {
          0% {
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.7), 
                        0 0 20px rgba(255, 255, 255, 0.5),
                        0 0 30px rgba(139, 92, 246, 0.5),
                        0 0 40px rgba(139, 92, 246, 0.3);
          }
          100% {
            text-shadow: 0 0 15px rgba(255, 255, 255, 0.9), 
                        0 0 25px rgba(255, 255, 255, 0.7),
                        0 0 35px rgba(139, 92, 246, 0.7),
                        0 0 45px rgba(139, 92, 246, 0.5);
          }
        }
        
        /* Orbit ring animations */
        @keyframes orbit-rotate {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        /* Cosmic pulse animation */
        .cosmic-pulse {
          animation: cosmic-pulse 4s ease-in-out infinite alternate;
        }
        
        @keyframes cosmic-pulse {
          0% { opacity: 0.4; transform: scale(0.95); }
          100% { opacity: 0.7; transform: scale(1.05); }
        }
        
        /* Subtle pulsing gradient */
        .cosmic-pulse-subtle {
          animation: cosmic-pulse-subtle 3s ease-in-out infinite alternate;
        }
        
        @keyframes cosmic-pulse-subtle {
          0% { opacity: 0.6; width: 36px; }
          100% { opacity: 1; width: 44px; }
        }
        
        /* Stars and celestial effects */
        .background-star {
          position: absolute;
          border-radius: 50%;
          transition: all 0.3s ease-out;
        }
        
        .background-star.depth-0 {
          z-index: 3;
          filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.8));
        }
        
        .background-star.depth-1 {
          z-index: 2;
          filter: drop-shadow(0 0 1px rgba(255, 255, 255, 0.6));
        }
        
        .background-star.depth-2 {
          z-index: 1;
          filter: drop-shadow(0 0 1px rgba(255, 255, 255, 0.4));
        }

        /* Large star animations */
        .star-lg {
          z-index: 5;
          animation: twinkle-lg 4s ease-in-out infinite alternate;
        }

        @keyframes twinkle-lg {
          0%, 100% { 
            opacity: 0.8; 
            transform: scale(1);
            filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.8));
          }
          50% { 
            opacity: 0.5; 
            transform: scale(0.85);
            filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.5));
          }
        }
        
        /* Cosmic logo glow effect */
        .cosmic-logo-glow {
          background: radial-gradient(circle at center, 
                      rgba(139, 92, 246, 0.4) 0%, 
                      rgba(139, 92, 246, 0.2) 40%, 
                      rgba(236, 72, 153, 0.1) 60%, 
                      transparent 70%);
          filter: blur(10px);
          animation: pulse-logo 4s ease-in-out infinite alternate;
        }
        
        @keyframes pulse-logo {
          0% { opacity: 0.3; filter: blur(10px); }
          100% { opacity: 0.6; filter: blur(15px); }
        }
        
        /* Nebula wisps for cosmic background effect */
        .nebula-wisp {
          position: absolute;
          opacity: 0.3;
          filter: blur(40px);
          transition: transform 0.6s ease-out;
        }
        
        .wisp-1 {
          top: 15%;
          left: 10%;
          width: 300px;
          height: 200px;
          background: radial-gradient(ellipse at center, rgba(139, 92, 246, 0.3), transparent 70%);
          animation: float 40s ease-in-out infinite alternate;
        }
        
        .wisp-2 {
          top: 40%;
          right: 10%;
          width: 250px;
          height: 300px;
          background: radial-gradient(ellipse at center, rgba(236, 72, 153, 0.2), transparent 70%);
          animation: float 50s ease-in-out infinite alternate-reverse;
        }
        
        .wisp-3 {
          bottom: 20%;
          left: 20%;
          width: 280px;
          height: 220px;
          background: radial-gradient(ellipse at center, rgba(124, 58, 237, 0.25), transparent 70%);
          animation: float 45s ease-in-out infinite alternate;
        }
        
        .wisp-4 {
          top: 60%;
          left: 50%;
          width: 320px;
          height: 180px;
          background: radial-gradient(ellipse at center, rgba(167, 139, 250, 0.2), transparent 70%);
          animation: float 55s ease-in-out infinite alternate-reverse;
        }
        
        /* New nebula cloud effects */
        .nebula-cloud {
          position: absolute;
          opacity: 0.25;
          filter: blur(60px);
          z-index: 0;
        }
        
        .cloud-1 {
          top: 10%;
          left: 5%;
          width: 500px;
          height: 350px;
          background: radial-gradient(ellipse at center, 
                    rgba(139, 92, 246, 0.2) 0%, 
                    rgba(236, 72, 153, 0.15) 40%, 
                    transparent 70%);
          animation: float-cloud 80s ease-in-out infinite alternate;
        }
        
        .cloud-2 {
          bottom: 15%;
          right: 5%;
          width: 450px;
          height: 300px;
          background: radial-gradient(ellipse at center, 
                    rgba(56, 189, 248, 0.15) 0%, 
                    rgba(124, 58, 237, 0.1) 50%, 
                    transparent 80%);
          animation: float-cloud 90s ease-in-out infinite alternate-reverse;
        }
        
        .cloud-3 {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 600px;
          height: 400px;
          background: radial-gradient(ellipse at center, 
                    rgba(167, 139, 250, 0.1) 0%, 
                    rgba(192, 132, 252, 0.07) 40%, 
                    transparent 70%);
          animation: float-cloud-center 100s ease-in-out infinite;
          z-index: -1;
        }
        
        @keyframes float-cloud {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(50px, 30px) scale(1.05); }
          100% { transform: translate(-30px, 50px) scale(0.95); }
        }
        
        @keyframes float-cloud-center {
          0% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-45%, -53%) scale(1.1); }
          100% { transform: translate(-55%, -48%) scale(0.95); }
        }
        
        /* Cosmic dust particles */
        .cosmic-dust {
          position: absolute;
          opacity: 0.2;
          background-size: 200px 200px;
          background-image: radial-gradient(circle, white 1px, transparent 1px);
          pointer-events: none;
        }
        
        .dust-1 {
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          animation: float-dust 120s linear infinite;
        }
        
        .dust-2 {
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: 150px 150px;
          animation: float-dust 90s linear infinite reverse;
        }
        
        .dust-3 {
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: 100px 100px;
          animation: float-dust 70s linear infinite;
        }
        
        @keyframes float-dust {
          from { transform: translateY(0) rotate(0deg); }
          to { transform: translateY(-200px) rotate(360deg); }
        }
        
        /* Comet animations */
        .comet {
          position: absolute;
          width: 150px;
          height: 3px;
          background: linear-gradient(to right, rgba(255, 255, 255, 0.8), transparent);
          border-radius: 50%;
          z-index: 3;
        }
        
        .comet::after {
          content: '';
          position: absolute;
          top: -1px;
          left: 0;
          width: 6px;
          height: 6px;
          background-color: white;
          border-radius: 50%;
          box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.8);
        }
        
        .comet-1 {
          top: 15%;
          right: 10%;
          transform: rotate(-45deg);
          opacity: 0;
          animation: comet-move 15s linear infinite;
          animation-delay: 5s;
        }
        
        .comet-2 {
          bottom: 30%;
          left: 20%;
          transform: rotate(30deg);
          opacity: 0;
          animation: comet-move 20s linear infinite;
          animation-delay: 12s;
        }
        
        @keyframes comet-move {
          0% {
            opacity: 0;
            transform: translateX(0) translateY(0) rotate(-45deg);
          }
          5% {
            opacity: 1;
          }
          20% {
            opacity: 1;
          }
          30% {
            opacity: 0;
            transform: translateX(-400px) translateY(400px) rotate(-45deg);
          }
          100% {
            opacity: 0;
            transform: translateX(-400px) translateY(400px) rotate(-45deg);
          }
        }
        
        /* Constellation effect */
        .constellation {
          position: absolute;
          z-index: 2;
        }
        
        .constellation-1 {
          top: 25%;
          left: 60%;
          width: 200px;
          height: 150px;
          background-image: 
            radial-gradient(circle at 20% 30%, white 1px, transparent 2px),
            radial-gradient(circle at 80% 20%, white 1px, transparent 2px),
            radial-gradient(circle at 60% 70%, white 1px, transparent 2px),
            radial-gradient(circle at 30% 60%, white 1px, transparent 2px),
            radial-gradient(circle at 70% 90%, white 1px, transparent 2px);
          filter: drop-shadow(0 0 1px rgba(255, 255, 255, 0.8));
        }
        
        .constellation-1::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            linear-gradient(to bottom right, rgba(255,255,255,0.3) 1px, transparent 1px),
            linear-gradient(to top right, rgba(255,255,255,0.3) 1px, transparent 1px),
            linear-gradient(to bottom left, rgba(255,255,255,0.3) 1px, transparent 1px);
          background-size: 100% 100%;
          background-position: 
            20% 30%, 80% 20%, 
            80% 20%, 60% 70%,
            60% 70%, 30% 60%,
            30% 60%, 70% 90%;
          background-repeat: no-repeat;
          opacity: 0.3;
        }
        
        /* Custom twinkle animations for different speeds */
        .custom-twinkle-2 {
          animation: custom-twinkle 2s ease-in-out infinite alternate;
        }
        
        .custom-twinkle-3 {
          animation: custom-twinkle 3s ease-in-out infinite alternate;
        }
        
        .custom-twinkle-4 {
          animation: custom-twinkle 4s ease-in-out infinite alternate;
        }
        
        .custom-twinkle-5 {
          animation: custom-twinkle 5s ease-in-out infinite alternate;
        }
        
        @keyframes custom-twinkle {
          0%, 100% { opacity: 1; transform: scale(1); filter: blur(0px); }
          50% { opacity: 0.3; transform: scale(0.8); filter: blur(1px); }
        }
        
        @keyframes float {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(30px, 20px) rotate(5deg); }
          100% { transform: translate(-20px, 40px) rotate(-5deg); }
        }
        
        /* Enhanced 3D card hover effects */
        .utility-card {
          transform-style: preserve-3d;
          transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          background: rgba(10, 7, 32, 0.8);
          backdrop-filter: blur(12px);
          border-radius: 1rem;
          border: 1px solid rgba(89, 86, 133, 0.3);
          padding: 2.25rem 2rem;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        
        .utility-card:hover {
          transform: translateY(-10px) rotateX(5deg) rotateY(5deg);
          box-shadow: 0 30px 50px -15px rgba(139, 92, 246, 0.15);
          border-color: rgba(139, 92, 246, 0.4);
        }
        
        .utility-icon-container {
          transform-style: preserve-3d;
          transition: transform 0.5s ease;
          background: rgba(20, 14, 54, 0.8);
          width: 64px;
          height: 64px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          border: 1px solid rgba(89, 86, 133, 0.4);
          margin-bottom: 1.5rem;
        }
        
        .utility-card:hover .utility-icon-container {
          transform: translateZ(20px) scale(1.1);
        }
        
        .utility-icon {
          color: #d4b8ff;
          width: 28px;
          height: 28px;
        }
        
        .utility-card:hover .utility-title {
          transform: translateZ(15px);
          color: rgba(139, 92, 246, 1);
        }
        
        .utility-title {
          transition: all 0.5s ease;
          transform-style: preserve-3d;
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
        
        .utility-list {
          list-style: none;
          padding: 0;
          margin-top: auto;
          width: 100%;
          text-align: center;
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
        
        /* Pulse animation effects */
        .pulse-animation {
          animation: pulse 3s ease-in-out infinite;
        }
        
        @keyframes pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          50% { transform: translate(-50%, -50%) scale(1.5); opacity: 0.3; }
        }

        /* Custom Animation: Twinkle */
        .twinkle-animation {
          animation: twinkle 4s infinite ease-in-out alternate;
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 1; filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.8)); }
          50% { opacity: 0.3; filter: drop-shadow(0 0 1px rgba(255, 255, 255, 0.4)); }
        }
        
        /* Rotating animation for background */
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
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
        
        /* Scrollbar styles */
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

        @keyframes float-slow-reverse {
          0% { transform: rotate(6deg) translateY(0); }
          50% { transform: rotate(8deg) translateY(-5px); }
          100% { transform: rotate(6deg) translateY(0); }
        }

        /* Section transitions */
        [id] {
          scroll-margin-top: 100px;
        }
        
        /* Fade-in animation for sections */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        section {
          animation: fadeInUp 0.8s ease-out forwards;
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
        
        /* Hero section gradient animations */
        .cosmic-gradient-animate-1 {
          animation: gradient-shift-1 20s ease-in-out infinite alternate;
          background-size: 200% 200%;
        }
        
        .cosmic-gradient-animate-2 {
          animation: gradient-shift-2 25s ease-in-out infinite alternate;
          background-size: 200% 200%;
        }
        
        .cosmic-gradient-pulse {
          animation: gradient-pulse 12s ease-in-out infinite alternate;
        }

        .cosmic-gradient-pulse-delayed {
          animation: gradient-pulse 12s ease-in-out infinite alternate;
          animation-delay: 2s;
        }

        @keyframes gradient-shift-1 {
          0% {
            opacity: 0.3;
            background-position: 0% 0%;
            filter: hue-rotate(0deg);
          }
          100% {
            opacity: 0.5;
            background-position: 20% 20%;
            filter: hue-rotate(15deg);
          }
        }

        @keyframes gradient-shift-2 {
          0% {
            opacity: 0.3;
            background-position: 0% 0%;
            filter: hue-rotate(0deg);
          }
          100% {
            opacity: 0.5;
            background-position: -20% 20%;
            filter: hue-rotate(-15deg);
          }
        }
        
        @keyframes gradient-pulse {
          0% {
            opacity: 0.25;
            transform: scale(0.98);
          }
          100% {
            opacity: 0.4;
            transform: scale(1.02);
          }
        }
        
        @keyframes float-slow-reverse {
          0% { transform: rotate(6deg) translateY(0); }
          50% { transform: rotate(8deg) translateY(-5px); }
          100% { transform: rotate(6deg) translateY(0); }
        }
      `}</style>
    </div>
  );
} 