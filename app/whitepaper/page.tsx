"use client"

import { useState, useEffect } from "react"
import { MoonsetLogo } from "@/components/moonset-logo"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Download, 
  Copy,
  Check,
  BookOpen,
  FileText,
  PieChart,
  Layers,
  Users,
  Lightbulb,
  History,
  Rocket,
  Code,
  GanttChart,
  BarChart3,
  Shield
} from "lucide-react"

export default function WhitepaperPage() {
  const [copied, setCopied] = useState(false)
  const [stars, setStars] = useState<Array<{x: number, y: number, size: number, opacity: number, depth: number}>>([]);
  const [heroStars, setHeroStars] = useState<Array<{x: number, y: number, size: number, opacity: number, distance: number, color?: string, twinkleSpeed?: number}>>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState("introduction");

  // Track scroll position for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    
    // Create 200 stars with random positions
    for (let i = 0; i < 200; i++) {
      // Random angle
      const angle = Math.random() * Math.PI * 2;
      
      // Use a square root distribution for more natural spreading
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
      const distanceFactor = Math.sqrt(Math.random());
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
        twinkleSpeed: Math.random() > 0.7 ? (Math.random() * 3 + 2) : 0 // Some stars twinkle
      });
    }
    
    setHeroStars(newHeroStars);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

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
      
      {/* Ultimate seamless gradient background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
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
        
        {/* Nebula wisps with enhanced parallax */}
        <div className="nebula-wisp wisp-1" style={{ transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -15}px)` }}></div>
        <div className="nebula-wisp wisp-2" style={{ transform: `translate(${mousePosition.x * 25}px, ${mousePosition.y * 20}px)` }}></div>
        <div className="nebula-wisp wisp-3" style={{ transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * 10}px)` }}></div>
        <div className="nebula-wisp wisp-4" style={{ transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * -10}px)` }}></div>
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
          // Calculate parallax offsets
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
        
        {/* Hero section rotating stars */}
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
                  backgroundColor: star.color || 'white',
                  boxShadow: `0 0 ${shadowSize}px ${shadowSize * 0.6}px ${shadowColor}`
                }}
              />
            );
          })}
        </div>
            
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
      <div className="relative z-10 flex-grow">
        {/* Hero Section - Updated to match about page style */}
        <section className="relative overflow-hidden min-h-[80vh] flex items-center">
          {/* Cosmic orbital rings */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-purple-500/20 rounded-full z-0" style={{ animation: 'orbit-rotate 60s linear infinite' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-indigo-500/10 rounded-full z-0" style={{ animation: 'orbit-rotate 80s linear infinite reverse' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-blue-500/10 rounded-full z-0" style={{ animation: 'orbit-rotate 100s linear infinite' }}></div>
          
          {/* Cosmic accent elements */}
          <div className="absolute top-[10%] right-[20%] w-8 h-8 rounded-full bg-purple-500/10 blur-xl cosmic-gradient-pulse"></div>
          <div className="absolute bottom-[15%] left-[25%] w-10 h-10 rounded-full bg-blue-500/10 blur-xl cosmic-gradient-pulse-delayed"></div>
          <div className="absolute bottom-[40%] right-[30%] w-6 h-6 rounded-full bg-pink-500/10 blur-xl cosmic-gradient-pulse" style={{animationDelay: '2s'}}></div>
          
          {/* Small glowing navigation links at the top */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10 flex space-x-12">
            <a href="/" className="text-xs uppercase tracking-widest font-light text-white glowing-white-text-sm hover:text-purple-300 transition-colors">Home</a>
            <a href="/about" className="text-xs uppercase tracking-widest font-light text-white glowing-white-text-sm hover:text-purple-300 transition-colors">About</a>
            <a href="/whitepaper" className="text-xs uppercase tracking-widest font-light text-white glowing-white-text-sm hover:text-purple-300 transition-colors">Whitepaper</a>
            <a href="/dashboard" className="text-xs uppercase tracking-widest font-light text-white glowing-white-text-sm hover:text-purple-300 transition-colors">Dashboard</a>
          </div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              {/* Left content with title and description */}
              <div className="w-full md:w-1/2 space-y-8">
                <div className="space-y-4">
                  <Badge className="bg-gradient-to-r from-purple-600/40 to-blue-600/40 text-white border-0 py-2 px-5 text-sm backdrop-blur-md shadow-lg shadow-purple-500/10 animate-pulse-slow">
                    Whitepaper v1.0
                  </Badge>
                  
                  <h1 className="text-4xl md:text-5xl xl:text-7xl font-bold leading-tight relative">
                    <span className="text-white drop-shadow-glow">The </span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-500 to-indigo-400 animate-gradient-x cosmic-gradient-text relative inline-block">MOONSET</span>
                    <br />
                    <span className="text-white drop-shadow-glow">Protocol</span>
                    <div className="absolute -bottom-6 left-0 w-[180px] h-1.5 bg-gradient-to-r from-purple-500 via-pink-500 to-transparent rounded-full cosmic-underline-pulse"></div>
                  </h1>
                  
                  <p className="text-lg text-white/80 leading-relaxed max-w-xl pt-6 cosmic-text">
                    Unveiling the truth about the lunar landing through <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 font-medium animate-gradient-y">decentralized research</span>, 
                    evidence collection, and <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300 font-medium animate-gradient-y-slow">community-driven governance</span>.
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-4 pt-4">
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 px-7 py-6 rounded-lg hover:shadow-xl hover:shadow-purple-600/20 transform transition-all duration-300 hover:-translate-y-1 animate-gradient-x">
                    <Download className="mr-2 h-5 w-5" />
                    Download PDF
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-white/20 text-white hover:bg-white/10 hover:border-purple-500/50 px-7 py-6 rounded-lg transform transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm"
                    onClick={copyToClipboard}
                  >
                    {copied ? <Check className="mr-2 h-5 w-5 text-green-400" /> : <Copy className="mr-2 h-5 w-5" />}
                    {copied ? "Copied!" : "Copy Link"}
                  </Button>
                </div>
              </div>
              
              {/* Right content with decorative document - enhance 3D effect */}
              <div className="w-full md:w-1/2 flex justify-center">
                <div className="relative w-[320px] h-[420px] perspective-1000">
                  {/* Document glow effects */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-purple-600/10 via-purple-900/5 to-transparent blur-3xl z-0"></div>
                  
                  {/* 3D floating document effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 to-slate-800/80 rounded-xl border border-white/10 backdrop-blur-md shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-700 p-8 overflow-hidden animate-float-slow z-10">
                    {/* Document header */}
                    <div className="flex justify-between items-center mb-6">
                      <div className="h-10 w-10 cosmic-logo-pulse">
                        <MoonsetLogo width={40} variant="small" />
                      </div>
                      <div className="text-xs text-white/60">CONFIDENTIAL</div>
                    </div>
                    
                    {/* Document content (placeholder) */}
                    <div className="space-y-3">
                      <div className="h-4 bg-white/10 rounded w-3/4"></div>
                      <div className="h-4 bg-white/10 rounded w-full"></div>
                      <div className="h-4 bg-white/10 rounded w-5/6"></div>
                      <div className="h-4 bg-white/10 rounded w-4/5"></div>
                      <div className="h-4 bg-white/10 rounded w-full"></div>
                      <div className="h-4 bg-white/10 rounded w-3/4"></div>
                      <div className="h-4 bg-white/10 rounded w-full"></div>
                      <div className="h-4 bg-white/10 rounded w-5/6"></div>
                      <div className="h-4 bg-white/10 rounded w-2/3"></div>
                    </div>
                    
                    {/* Document stats cards */}
                    <div className="grid grid-cols-2 gap-3 mt-8">
                      <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center hover:border-purple-500/30 transition-colors duration-300">
                        <p className="text-lg font-bold text-white mb-1">200M</p>
                        <p className="text-white/60 text-xs">Supply</p>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center hover:border-purple-500/30 transition-colors duration-300">
                        <p className="text-lg font-bold text-white mb-1">Q3 2025</p>
                        <p className="text-white/60 text-xs">Launch</p>
                      </div>
                    </div>
                    
                    {/* Floating elements for decoration */}
                    <div className="absolute -top-3 -right-3 w-16 h-16 bg-purple-500/20 rounded-full blur-xl cosmic-gradient-pulse"></div>
                    <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-blue-500/20 rounded-full blur-xl cosmic-gradient-pulse-delayed"></div>
                  </div>
                  
                  {/* Second document for depth effect */}
                  <div className="absolute inset-0 bg-slate-900/60 rounded-xl border border-white/10 backdrop-blur-md shadow-xl transform rotate-6 -z-10 animate-float-slow-reverse"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Whitepaper Content Section with Tabs */}
        <section className="py-12 mb-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-12 text-center text-white glowing-white-text relative">
              Whitepaper
              <span className="block mx-auto mt-4 w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse-slow"></span>
            </h2>
            
            <div className="bg-slate-900/60 backdrop-blur-md border border-purple-500/30 rounded-xl p-8 max-w-5xl mx-auto shadow-xl">
              <Tabs defaultValue="introduction" className="w-full" onValueChange={setActiveTab}>
                <div className="mb-8 overflow-x-auto pb-2 cosmic-tabs-container">
                  <TabsList className="bg-slate-800/50 border border-white/5 p-1.5 w-full flex flex-nowrap cosmic-tabs">
                    <TabsTrigger value="introduction" className="whitespace-nowrap backdrop-blur-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600/20 data-[state=active]:to-blue-600/20 data-[state=active]:border-purple-500/40 data-[state=active]:shadow-[0_0_10px_rgba(139,92,246,0.3)]">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Introduction
                    </TabsTrigger>
                    <TabsTrigger value="vision" className="whitespace-nowrap backdrop-blur-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600/20 data-[state=active]:to-blue-600/20 data-[state=active]:border-purple-500/40 data-[state=active]:shadow-[0_0_10px_rgba(139,92,246,0.3)]">
                      <Lightbulb className="w-4 h-4 mr-2" />
                      Vision & Mission
                    </TabsTrigger>
                    <TabsTrigger value="tokenomics" className="whitespace-nowrap backdrop-blur-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600/20 data-[state=active]:to-blue-600/20 data-[state=active]:border-purple-500/40 data-[state=active]:shadow-[0_0_10px_rgba(139,92,246,0.3)]">
                      <PieChart className="w-4 h-4 mr-2" />
                      Tokenomics
                    </TabsTrigger>
                    <TabsTrigger value="technology" className="whitespace-nowrap backdrop-blur-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600/20 data-[state=active]:to-blue-600/20 data-[state=active]:border-purple-500/40 data-[state=active]:shadow-[0_0_10px_rgba(139,92,246,0.3)]">
                      <Code className="w-4 h-4 mr-2" />
                      Technology
                    </TabsTrigger>
                    <TabsTrigger value="roadmap" className="whitespace-nowrap backdrop-blur-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600/20 data-[state=active]:to-blue-600/20 data-[state=active]:border-purple-500/40 data-[state=active]:shadow-[0_0_10px_rgba(139,92,246,0.3)]">
                      <GanttChart className="w-4 h-4 mr-2" />
                      Roadmap
                    </TabsTrigger>
                    <TabsTrigger value="governance" className="whitespace-nowrap backdrop-blur-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600/20 data-[state=active]:to-blue-600/20 data-[state=active]:border-purple-500/40 data-[state=active]:shadow-[0_0_10px_rgba(139,92,246,0.3)]">
                      <Users className="w-4 h-4 mr-2" />
                      Governance
                    </TabsTrigger>
                  </TabsList>
                </div>
                
                {/* Introduction Tab */}
                <TabsContent value="introduction" className="text-white/90 space-y-6">
                  <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-5 rounded-lg border border-white/5 mb-6">
                    <h3 className="text-xl font-bold mb-2 text-white bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent animate-gradient-x">Abstract</h3>
                    <p className="text-white/80 leading-relaxed">
                      MOONSET aims to revolutionize our understanding of the Apollo moon landing through a decentralized approach to research, evidence collection, and historical verification. By leveraging blockchain technology and community governance, we're building a platform that incentivizes truth-seeking and preserves historical findings immutably.
                    </p>
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-white bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent animate-gradient-x">The MOONSET Protocol</h3>
                  <p className="leading-relaxed">
                    The MOONSET Protocol represents a paradigm shift in historical investigation and consensus-building. Through decentralized evidence collection, transparent voting mechanisms, and tokenized incentives, our mission is to uncover, analyze, and preserve the truth about one of humanity's most significant achievements.
                  </p>
                  
                  <h3 className="text-xl font-bold mb-3 text-white bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x">Key Objectives</h3>
                  <ul className="space-y-3 pl-6 list-disc">
                    <li>Create a decentralized platform for archiving and authenticating moon landing evidence</li>
                    <li>Establish fair governance processes for evaluating historical claims</li>
                    <li>Incentivize research contributions through token rewards</li>
                    <li>Preserve verified findings immutably on the blockchain</li>
                    <li>Build an engaged community of researchers, historians, and space enthusiasts</li>
                  </ul>
                      
                  <h3 className="text-xl font-bold mb-3 text-white bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x">Approach</h3>
                  <p className="leading-relaxed">
                    Unlike traditional historical research, which often relies on centralized authorities and academic gatekeepers, the MOONSET Protocol enables open participation while maintaining rigorous standards through cryptographic verification, reputation systems, and economic alignment. This document outlines our vision, tokenomics, technical implementation, and governance structure.
                  </p>
                </TabsContent>
                
                {/* Vision Tab */}
                <TabsContent value="vision" className="text-white/90 space-y-6">
                  <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-5 rounded-lg border border-white/5 mb-6">
                    <h3 className="text-xl font-bold mb-2 text-white bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent animate-gradient-x">Our Vision</h3>
                    <p className="text-white/80 leading-relaxed">
                      A world where historical truth is collectively discovered, verified, and preserved through decentralized cooperation rather than institutional authority.
                    </p>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-white">Guiding Principles</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white/5 p-5 rounded-lg border border-white/10">
                      <div className="flex items-center mb-3">
                        <div className="bg-purple-500/20 p-2 rounded-lg mr-3">
                          <Lightbulb className="w-5 h-5 text-purple-300" />
                        </div>
                        <h4 className="font-semibold text-lg">Decentralized Truth</h4>
                      </div>
                      <p className="text-white/70">Historical facts should emerge from collective intelligence and consensus rather than centralized authority.</p>
                    </div>
                    
                    <div className="bg-white/5 p-5 rounded-lg border border-white/10">
                      <div className="flex items-center mb-3">
                        <div className="bg-blue-500/20 p-2 rounded-lg mr-3">
                          <Shield className="w-5 h-5 text-blue-300" />
                        </div>
                        <h4 className="font-semibold text-lg">Evidence-Based</h4>
                      </div>
                      <p className="text-white/70">All claims must be supported by verifiable evidence that can be critiqued and validated by the community.</p>
                    </div>
                    
                    <div className="bg-white/5 p-5 rounded-lg border border-white/10">
                      <div className="flex items-center mb-3">
                        <div className="bg-purple-500/20 p-2 rounded-lg mr-3">
                          <Users className="w-5 h-5 text-purple-300" />
                        </div>
                        <h4 className="font-semibold text-lg">Open Participation</h4>
                      </div>
                      <p className="text-white/70">Anyone can contribute to the research ecosystem regardless of background or credentials.</p>
                    </div>
                    
                    <div className="bg-white/5 p-5 rounded-lg border border-white/10">
                      <div className="flex items-center mb-3">
                        <div className="bg-blue-500/20 p-2 rounded-lg mr-3">
                          <Rocket className="w-5 h-5 text-blue-300" />
                        </div>
                        <h4 className="font-semibold text-lg">Innovation</h4>
                      </div>
                      <p className="text-white/70">Applying blockchain technology and decentralized governance to transform how we approach historical research.</p>
                    </div>
                  </div>
                      
                  <h3 className="text-xl font-bold mb-3 text-white">Long-term Goals</h3>
                  <p className="leading-relaxed mb-4">
                    While our initial focus is on the Apollo moon landing, the MOONSET Protocol lays the groundwork for a new approach to investigating historical events of significance. Our methodology can be applied to other areas where decentralized truth-finding would benefit humanity.
                  </p>
                  <p className="leading-relaxed">
                    We envision MOONSET becoming the standard for community-driven historical research, creating a new paradigm that combines the rigor of academic research with the openness and innovation of web3.
                  </p>
                </TabsContent>

                {/* Tokenomics Tab */}
                <TabsContent value="tokenomics" className="text-white/90">
                  <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-5 rounded-lg border border-white/5 mb-6">
                    <h3 className="text-xl font-bold mb-2 text-white">Token Overview</h3>
                    <p className="text-white/80 leading-relaxed">
                      The MOONSET token ($MOON) serves as the protocol's utility and governance token, aligning incentives between researchers, verifiers, and other community members.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white/5 p-5 rounded-lg border border-white/10 text-center">
                      <h4 className="font-semibold text-lg mb-2">Total Supply</h4>
                      <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 animate-gradient-x">200,000,000</p>
                      <p className="text-white/60 text-sm mt-2">MOON Tokens</p>
                    </div>
                    
                    <div className="bg-white/5 p-5 rounded-lg border border-white/10 text-center">
                      <h4 className="font-semibold text-lg mb-2">Token Standard</h4>
                      <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 animate-gradient-x">ERC-20</p>
                      <p className="text-white/60 text-sm mt-2">Ethereum Blockchain</p>
                    </div>
                    
                    <div className="bg-white/5 p-5 rounded-lg border border-white/10 text-center">
                      <h4 className="font-semibold text-lg mb-2">Initial Launch</h4>
                      <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 animate-gradient-x">Q3 2025</p>
                      <p className="text-white/60 text-sm mt-2">Target Date</p>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-white">Token Allocation</h3>
                  <div className="flex flex-col md:flex-row items-center gap-8 mb-6">
                    <div className="w-full md:w-1/2">
                      <div className="relative h-60 w-60 mx-auto">
                        {/* This is a placeholder for a chart - in a real implementation you'd use a charting library */}
                        <div className="absolute inset-0 rounded-full border-8 border-purple-500/30 animate-spin-slow"></div>
                        <div className="absolute inset-[15%] rounded-full border-8 border-blue-500/30 animate-spin-slow-reverse"></div>
                        <div className="absolute inset-[30%] rounded-full border-8 border-pink-500/30 animate-spin-slow"></div>
                        <div className="absolute inset-[45%] rounded-full bg-white/80"></div>
                      </div>
                    </div>
                    
                    <div className="w-full md:w-1/2 space-y-3">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                        <span className="text-white/80 mr-2">Community Rewards:</span>
                        <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 animate-gradient-x">40% (80,000,000)</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                        <span className="text-white/80 mr-2">Team & Advisors:</span>
                        <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 animate-gradient-x">20% (40,000,000)</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-pink-500 rounded-full mr-2"></div>
                        <span className="text-white/80 mr-2">Treasury:</span>
                        <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 animate-gradient-x">15% (30,000,000)</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-indigo-500 rounded-full mr-2"></div>
                        <span className="text-white/80 mr-2">Initial Offering:</span>
                        <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400 animate-gradient-x">15% (30,000,000)</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-cyan-500 rounded-full mr-2"></div>
                        <span className="text-white/80 mr-2">Liquidity Pool:</span>
                        <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 animate-gradient-x">10% (20,000,000)</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Add placeholder content for the remaining tabs */}
                <TabsContent value="technology" className="text-white/90 space-y-6">
                  <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-5 rounded-lg border border-white/5 mb-6">
                    <h3 className="text-xl font-bold mb-2 text-white">Technical Architecture</h3>
                    <p className="text-white/80 leading-relaxed">
                      The MOONSET Protocol combines on-chain governance with decentralized storage to create a robust platform for historical research and verification.
                    </p>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-white">Key Components</h3>
                  <div className="space-y-4">
                    <p className="leading-relaxed">
                      Our technology stack is designed to ensure transparent, tamper-proof recording of evidence and governance decisions while maintaining scalability and user accessibility.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                        <h4 className="font-semibold mb-2 flex items-center">
                          <Code className="w-4 h-4 mr-2 text-purple-400" />
                          Smart Contracts
                        </h4>
                        <p className="text-white/70 text-sm">ERC-20 token and governance mechanisms built on Ethereum.</p>
                      </div>
                      
                      <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                        <h4 className="font-semibold mb-2 flex items-center">
                          <Layers className="w-4 h-4 mr-2 text-blue-400" />
                          Decentralized Storage
                        </h4>
                        <p className="text-white/70 text-sm">Research evidence and documents stored on IPFS for permanence.</p>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-center text-white/70 italic mt-6">
                    Detailed technical specifications available in our developer documentation.
                  </p>
                </TabsContent>
                
                <TabsContent value="roadmap" className="text-white/90 space-y-6">
                  <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-5 rounded-lg border border-white/5 mb-6">
                    <h3 className="text-xl font-bold mb-2 text-white">Development Timeline</h3>
                    <p className="text-white/80 leading-relaxed">
                      Our strategic roadmap outlines the key milestones in the MOONSET Protocol's development and growth.
                    </p>
                  </div>
                  
                  <div className="space-y-8">
                    <div className="relative pl-8 pb-5 border-l-2 border-purple-500/30">
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-purple-500"></div>
                      <h4 className="text-lg font-semibold mb-2">Phase 1: Foundation (Q1-Q2 2025)</h4>
                      <p className="text-white/70 mb-2">Initial development and community building</p>
                      <ul className="list-disc pl-5 text-white/80 text-sm space-y-1">
                        <li>Whitepaper and technical documentation</li>
                        <li>Core team assembly</li>
                        <li>Smart contract development</li>
                        <li>Community outreach</li>
                      </ul>
                    </div>
                    
                    <div className="relative pl-8 pb-5 border-l-2 border-purple-500/30">
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500"></div>
                      <h4 className="text-lg font-semibold mb-2">Phase 2: Launch (Q3-Q4 2025)</h4>
                      <p className="text-white/70 mb-2">Token and platform launch</p>
                      <ul className="list-disc pl-5 text-white/80 text-sm space-y-1">
                        <li>Token generation event</li>
                        <li>Initial exchange listings</li>
                        <li>Beta platform release</li>
                        <li>Governance system activation</li>
                      </ul>
                    </div>
                    
                    <div className="relative pl-8 pb-5 border-l-2 border-purple-500/30">
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-pink-500"></div>
                      <h4 className="text-lg font-semibold mb-2">Phase 3: Expansion (2026)</h4>
                      <p className="text-white/70 mb-2">Scaling research and platform capabilities</p>
                      <ul className="list-disc pl-5 text-white/80 text-sm space-y-1">
                        <li>Advanced research tools</li>
                        <li>Strategic partnerships</li>
                        <li>Enhanced verification systems</li>
                        <li>Mobile application</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="governance" className="text-white/90 space-y-6">
                  <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-5 rounded-lg border border-white/5 mb-6">
                    <h3 className="text-xl font-bold mb-2 text-white">Decentralized Governance</h3>
                    <p className="text-white/80 leading-relaxed">
                      The MOONSET Protocol is governed by token holders through transparent on-chain voting mechanisms.
                    </p>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-white">Governance Structure</h3>
                  <p className="leading-relaxed mb-6">
                    Token holders can propose, debate, and vote on changes to the protocol, research priorities, and resource allocation.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white/5 p-5 rounded-lg border border-white/10">
                      <h4 className="font-semibold text-center mb-3">Proposal Submission</h4>
                      <p className="text-white/70 text-sm text-center">Any holder with sufficient tokens can submit proposals for community consideration.</p>
                    </div>
                    
                    <div className="bg-white/5 p-5 rounded-lg border border-white/10">
                      <h4 className="font-semibold text-center mb-3">Deliberation Period</h4>
                      <p className="text-white/70 text-sm text-center">Community discussion and debate during a fixed timeframe before voting begins.</p>
                    </div>
                    
                    <div className="bg-white/5 p-5 rounded-lg border border-white/10">
                      <h4 className="font-semibold text-center mb-3">On-chain Voting</h4>
                      <p className="text-white/70 text-sm text-center">Secure, transparent voting with weight based on token holdings and staking duration.</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
        
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
      </div>
      
      <style jsx global>{`
        /* Page perspective for 3D effects */
        .perspective-1000 {
          perspective: 1000px;
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
        
        /* Small glowing white text */
        .glowing-white-text-sm {
          color: white;
          text-shadow: 0 0 5px rgba(255, 255, 255, 0.8), 
                      0 0 10px rgba(255, 255, 255, 0.5),
                      0 0 15px rgba(139, 92, 246, 0.5);
          animation: pulse-glow-sm 3s ease-in-out infinite alternate;
        }
        
        /* Enhanced title glow */
        .drop-shadow-glow {
          filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.5)) 
                 drop-shadow(0 0 20px rgba(139, 92, 246, 0.3));
        }
        
        /* Cosmic title gradient text */
        .cosmic-gradient-text {
          text-shadow: 0 0 30px rgba(139, 92, 246, 0.3);
          letter-spacing: 0.01em;
          transform: translateZ(0);
        }
        
        /* Cosmic text styling */
        .cosmic-text {
          text-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
          letter-spacing: 0.02em;
        }
        
        /* Cosmic underline pulse animation */
        .cosmic-underline-pulse {
          animation: underline-pulse 6s ease-in-out infinite alternate;
        }
        
        @keyframes underline-pulse {
          0% {
            width: 120px;
            opacity: 0.7;
          }
          100% {
            width: 180px;
            opacity: 1;
          }
        }
        
        /* Cosmic logo pulse effect */
        .cosmic-logo-pulse {
          position: relative;
        }
        
        .cosmic-logo-pulse::after {
          content: '';
          position: absolute;
          inset: -5px;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.3), rgba(139, 92, 246, 0.1) 50%, transparent 70%);
          border-radius: 50%;
          z-index: -1;
          animation: logo-pulse 3s ease-in-out infinite alternate;
        }
        
        @keyframes logo-pulse {
          0% {
            opacity: 0.3;
            transform: scale(1);
          }
          100% {
            opacity: 0.6;
            transform: scale(1.2);
          }
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
        
        /* Gradient animations */
        @keyframes gradient-x {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        @keyframes gradient-y {
          0% {
            background-position: 50% 0%;
          }
          50% {
            background-position: 50% 100%;
          }
          100% {
            background-position: 50% 0%;
          }
        }
        
        .animate-gradient-x {
          background-size: 200% 100%;
          animation: gradient-x 8s ease infinite;
        }
        
        .animate-gradient-y {
          background-size: 100% 200%;
          animation: gradient-y 4s ease infinite;
        }
        
        .animate-gradient-y-slow {
          background-size: 100% 200%;
          animation: gradient-y 6s ease infinite;
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
        
        /* Subtle pulse animation for badges */
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
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
        
        @keyframes float {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(30px, 20px) rotate(5deg); }
          100% { transform: translate(-20px, 40px) rotate(-5deg); }
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
        
        /* New animations for whitepaper */
        @keyframes orbit-rotate {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        @keyframes cosmic-pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }  
        }
        
        .animate-float-slow {
          animation: float 15s ease-in-out infinite alternate;
        }
        
        .animate-spin-slow {
          animation: rotate 60s linear infinite;
        }
        
        .animate-spin-slow-reverse {
          animation: rotate 40s linear infinite reverse;
        }
        
        /* Tabs styling */
        .cosmic-tabs-container {
          position: relative;
        }
        
        .cosmic-tabs-container::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.5) 50%, transparent 100%);
          z-index: 0;
        }
        
        .cosmic-tabs [data-state="active"] {
          position: relative;
          overflow: hidden;
        }
        
        .cosmic-tabs [data-state="active"]::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.7), transparent);
          z-index: 1;
        }
        
        [data-state="active"].tab {
          background: linear-gradient(to right, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2));
          border-color: rgba(139, 92, 246, 0.5);
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
