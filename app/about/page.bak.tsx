"use client"

import Link from "next/link"
import { useEffect, useState, CSSProperties } from "react"
import { ChevronRight, ArrowUpRight, Shield, Zap, Globe, FolderOpen, PenTool, Users, FileText, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MoonsetLogo } from "@/components/moonset-logo"

export default function AboutPage() {
  const [stars, setStars] = useState<Array<{x: number, y: number, size: number, opacity: number, depth: number}>>([]);
  const [heroStars, setHeroStars] = useState<Array<{x: number, y: number, size: number, opacity: number, distance: number}>>([]);
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
      const sections = ['mission', 'evidence', 'solution', 'team', 'community'];
      const newVisibleSections = { ...visibleSections };
      let hasChanged = false;
      
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
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

  return (
    <div className="min-h-screen flex flex-col bg-[#050110] text-white relative overflow-hidden perspective-1000">
      {/* Enhanced cosmic background with nebula effect */}
      <div 
        className="absolute inset-0 nebula-background"
        style={{
          background: 'radial-gradient(circle at center, rgba(128, 64, 216, 0.15) 0%, rgba(30, 27, 75, 0.05) 40%, transparent 70%)',
          zIndex: 0,
          transform: `translateY(${scrollY * 0.05}px)`,
          transition: 'transform 0.2s ease-out'
        }}
      />
      
      {/* Nebula wisps with enhanced parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="nebula-wisp wisp-1" style={{ transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -15}px)` }}></div>
        <div className="nebula-wisp wisp-2" style={{ transform: `translate(${mousePosition.x * 25}px, ${mousePosition.y * 20}px)` }}></div>
        <div className="nebula-wisp wisp-3" style={{ transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * 10}px)` }}></div>
        <div className="nebula-wisp wisp-4" style={{ transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * -10}px)` }}></div>
      </div>

      {/* Particle system background effect */}
      <div className="absolute inset-0 z-0">
        <div className="particles-container"></div>
      </div>

      {/* Parallax StarField - with depth layers */}
      <div 
        className="absolute inset-0" 
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
      {/* Mission Section */}
        <section 
          id="mission" 
          className={`w-full py-20 md:py-24 flex flex-col items-center space-y-14 md:space-y-16 mt-16 transition-transform duration-1000 section-reveal ${visibleSections.mission ? 'active' : ''}`}
        >
          <div className="section-title-container">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold cosmic-section-title perspective-text">
              <span className="glowing-white-text">Our Mission</span>
            </h2>
            <div className="cosmic-underline"></div>
            <p className="text-gray-300 max-w-2xl mx-auto mt-6 text-base md:text-lg">
              MOONSET recognizes the power of shared belief and community alignment in our pursuit of historical truth
            </p>
                </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full max-w-6xl">
            <div className="relative transform-card-container w-full">
              <div className="absolute inset-0 rounded-2xl opacity-70 card-glow" 
                style={{
                  background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(30, 27, 75, 0.05) 40%, transparent 70%)',
                  filter: 'blur(20px)',
                }}
              ></div>
              <div className="problem-card transform-card">
                <div className="problem-logo-container">
                  <div className="problem-logo-glow"></div>
                  <MoonsetLogo width={260} variant="full" />
                </div>
                
                <h2 className="problem-title">The Problem</h2>
                
                <div className="problem-content">
                  <p>
                    For nearly three decades, the individuals behind MoonSet have been at the forefront of independent research into the 1969 moon landing. Our work has consistently raised critical questions about the authenticity of NASA's claims.
                  </p>
                  <p>
                    We believe that a careful and unbiased examination of the available evidence reveals a compelling case for a large-scale deception orchestrated for geopolitical purposes during the height of the Cold War.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6 fade-in-right">
              <div className="vision-values-container glassmorphism-card p-8 rounded-xl mb-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <span className="relative">
                    Our Vision
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500/50 to-transparent"></span>
                  </span>
                  <span className="mx-3 text-3xl bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-pink-400 to-purple-300 font-light">&</span>
                  <span className="relative">
                    Values
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent to-purple-500/50"></span>
                  </span>
                </h3>
            
            <div className="space-y-6">
                  <p className="text-gray-300 text-lg leading-relaxed">
                MoonSet recognizes the inherent power of shared belief and community alignment. We understand that our core mission – the conviction that the 1969 moon landing was a fabrication – may initially draw comparisons to meme coins.
              </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                However, we believe that while we share the characteristic of community-driven value, our foundation lies in a decades-long pursuit of what we believe to be a significant historical truth. Our project is not predicated on fleeting internet trends but on a growing global awareness and critical re-evaluation of the evidence.
              </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="feature-card transform-card-hover">
                  <div className="feature-icon-container">
                    <div className="feature-icon-glow"></div>
                    <Search className="feature-icon" />
                  </div>
                  <h3 className="feature-title">Research Driven</h3>
                  <p className="feature-description">
                    Meticulous analysis of photographic, technical, and political evidence surrounding the lunar landing.
                  </p>
                </div>
                <div className="feature-card transform-card-hover">
                  <div className="feature-icon-container">
                    <div className="feature-icon-glow"></div>
                    <Globe className="feature-icon" />
                  </div>
                  <h3 className="feature-title">Global Community</h3>
                  <p className="feature-description">
                    Uniting truth-seekers worldwide on a decentralized platform immune to censorship.
                  </p>
              </div>
            </div>
          </div>
        </section>
      
      {/* Key Arguments Section */}
        <section 
          id="evidence" 
          className={`w-full py-20 md:py-28 flex flex-col items-center bg-gradient-to-b from-[#050110] to-[#0c0821] transition-transform duration-1000 section-reveal ${visibleSections.evidence ? 'active' : ''}`}
        >
          <div className="section-title-container mb-16 md:mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold cosmic-section-title perspective-text">
              <span className="glowing-white-text">The Evidence</span>
            </h2>
            <div className="cosmic-underline"></div>
            <p className="text-gray-300 max-w-2xl mx-auto mt-6 text-base md:text-lg">
              Our core arguments are based on a meticulous analysis of available evidence that reveals inconsistencies in the NASA narrative
            </p>
          </div>
          
          <div className="w-full max-w-6xl glass-panel">
          <Tabs defaultValue="photographic" className="w-full">
              <TabsList className="flex justify-center max-w-2xl mx-auto mb-8 bg-slate-900/40 border border-purple-500/30 rounded-xl overflow-hidden backdrop-blur-md glassmorphism">
                <TabsTrigger value="photographic" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-white text-gray-300 hover:text-white px-6 py-3 tab-glow">
                Photographic Evidence
              </TabsTrigger>
                <TabsTrigger value="technical" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-white text-gray-300 hover:text-white px-6 py-3 tab-glow">
                Technical Challenges
              </TabsTrigger>
                <TabsTrigger value="political" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-white text-gray-300 hover:text-white px-6 py-3 tab-glow">
                Political Context
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="photographic" className="mt-6">
              <div className="evidence-grid">
                {[
                  {
                    title: "Absence of Stars",
                    description: "Despite the lack of atmospheric interference on the moon, stars are conspicuously absent from nearly all lunar surface photographs and videos."
                  },
                  {
                    title: "The Waving Flag",
                    description: "The American flag appears to be waving in several photographs, despite the absence of wind on the moon."
                  },
                  {
                    title: "Identical Backgrounds",
                    description: "Multiple photographs taken at supposedly different landing sites share strikingly similar background features."
                  },
                  {
                    title: "Crosshairs and Shadows",
                    description: "Anomalies in the photographic crosshairs and the inconsistent direction and length of shadows raise questions."
                  },
                  {
                    title: "Lack of Blast Crater",
                    description: "The absence of a significant blast crater directly beneath the Lunar Module in many photographs is puzzling."
                  },
                  {
                    title: "Missing Original Footage",
                    description: "The alleged loss or destruction of the original high-resolution video footage hinders independent analysis."
                  }
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className="evidence-item"
                    style={{ 
                      animationDelay: `${index * 0.15}s`,
                      opacity: 0,
                      animation: visibleSections.evidence ? 'fadeInUp 0.6s ease-out forwards' : 'none'
                    }}
                  >
                    <h3 className="evidence-title">{item.title}</h3>
                    <p className="evidence-description">{item.description}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="technical" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Radiation Exposure",
                    description: "The Van Allen radiation belts surrounding Earth pose a significant threat to human health. We question the ability of 1960s technology to adequately shield astronauts."
                  },
                  {
                    title: "Lunar Dust",
                    description: "Lunar dust is known to be extremely fine and abrasive. Concerns have been raised about its potential to damage equipment and spacesuits."
                  },
                  {
                    title: "Communication Delays",
                    description: "The apparent lack of significant communication delays between the moon and Earth in live broadcasts has been questioned."
                  },
                  {
                    title: "Unfulfilled Promise of Return",
                    description: "Despite technological advancements in the past 50 years, NASA has repeatedly delayed a manned return to the moon."
                  }
                ].map((item, index) => (
                    <div key={index} className="tokenomics-card">
                      <div className="tokenomics-percentage">{item.title}</div>
                      <p className="tokenomics-description">{item.description}</p>
                    </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="political" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="tokenomics-card">
                    <div className="tokenomics-percentage">Cold War Pressure</div>
                    <p className="tokenomics-description">
                      The intense pressure of the Cold War and the space race provided a powerful motive for the United States to achieve a perceived victory over the Soviet Union, potentially leading to the fabrication of a successful moon landing.
                    </p>
                  </div>
                  <div className="tokenomics-card">
                    <div className="tokenomics-percentage">Geopolitical Advantage</div>
                    <p className="tokenomics-description">
                      The perceived achievement of landing on the moon provided significant geopolitical advantages and prestige for the United States during a critical period of international relations and competition with the Soviet Union.
                    </p>
                  </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* Token & Solution Section */}
        <section 
          id="solution" 
          className={`w-full py-20 md:py-28 flex flex-col items-center transition-transform duration-1000 section-reveal ${visibleSections.solution ? 'active' : ''}`}
        >
          <div className="section-title-container mb-16 md:mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold cosmic-section-title perspective-text">
              <span className="glowing-white-text">The Solution</span>
            </h2>
            <div className="cosmic-underline"></div>
            <p className="text-gray-300 max-w-2xl mx-auto mt-6 text-base md:text-lg">
              MOONSET - Fueling the Quest for Lunar Truth
            </p>
          </div>
          
          <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 fade-in-left">
              <div className="token-intro-container text-center mb-10">
                <p className="token-intro-text">
                  MOONSET, an ERC-20 utility token on the Ethereum blockchain, is the cornerstone of the MoonSet ecosystem. It is designed to empower individuals who share our conviction and to incentivize the collective pursuit of truth.
                </p>
              </div>
              
              <div className="utility-grid max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="utility-card-new">
                  <div className="utility-icon-new-container">
                    <FolderOpen className="utility-icon-new" />
                  </div>
                  <div className="utility-content">
                    <h3 className="utility-title-new">Decentralized Archive</h3>
                    <p className="utility-description-new">
                      Building a permanent and censorship-resistant digital archive of evidence and research findings.
                    </p>
                  </div>
                </div>
                <div className="utility-card-new">
                  <div className="utility-icon-new-container">
                    <PenTool className="utility-icon-new" />
                  </div>
                  <div className="utility-content">
                    <h3 className="utility-title-new">Content Creation</h3>
                    <p className="utility-description-new">
                      Incentivizing research, articles, videos, and documentaries that further our understanding.
                    </p>
                  </div>
                </div>
                <div className="utility-card-new">
                  <div className="utility-icon-new-container">
                    <Users className="utility-icon-new" />
                  </div>
                  <div className="utility-content">
                    <h3 className="utility-title-new">Community Governance</h3>
                    <p className="utility-description-new">
                      MOONSET holders participate in governance decisions, including the allocation of funds.
                    </p>
                  </div>
                </div>
                <div className="utility-card-new">
                  <div className="utility-icon-new-container">
                    <Shield className="utility-icon-new" />
                  </div>
                  <div className="utility-content">
                    <h3 className="utility-title-new">Global Awareness</h3>
                    <p className="utility-description-new">
                      Raising awareness about questions surrounding the moon landing through global reach.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="token-details-container glassmorphism-intense transform-card fade-in-right">
              <div className="token-header mb-8 relative">
                <div className="absolute -top-10 -left-10 w-20 h-20 rounded-full bg-gradient-to-br from-purple-500/30 to-blue-500/20 blur-xl"></div>
                <h3 className="text-2xl font-bold text-white relative z-10">MOONSET Token Details</h3>
                <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mt-3"></div>
              </div>
              
              <div className="token-info-table mb-10">
                <div className="token-info-row">
                  <div className="token-info-label">Token Name</div>
                  <div className="token-info-value">MOONSET</div>
                </div>
                <div className="token-info-row">
                  <div className="token-info-label">Ticker Symbol</div>
                  <div className="token-info-value">MOONSET</div>
                </div>
                <div className="token-info-row">
                  <div className="token-info-label">Blockchain</div>
                  <div className="token-info-value">Ethereum (ERC-20)</div>
                </div>
                <div className="token-info-row">
                  <div className="token-info-label">Total Supply</div>
                  <div className="token-info-value">10,000,000,000 MOONSET</div>
                </div>
                <div className="token-info-row">
                  <div className="token-info-label">Pre-Sale Amount</div>
                  <div className="token-info-value">5,000,000,000 MOONSET</div>
                </div>
              </div>
              
              <div className="token-distribution">
                <div className="flex items-center mb-6">
                  <h4 className="text-xl font-medium text-white">Token Distribution</h4>
                  <div className="h-px flex-grow bg-gradient-to-r from-transparent via-purple-500/30 to-transparent ml-4"></div>
                  </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="distribution-card">
                    <div className="distribution-card-inner">
                      <div className="distribution-percentage">15%</div>
                      <div className="distribution-label">Founders & Team</div>
                  </div>
                  </div>
                  <div className="distribution-card">
                    <div className="distribution-card-inner">
                      <div className="distribution-percentage">25%</div>
                      <div className="distribution-label">Community & IDO</div>
                  </div>
                </div>
                  <div className="distribution-card">
                    <div className="distribution-card-inner">
                      <div className="distribution-percentage">30%</div>
                      <div className="distribution-label">R&D Fund</div>
                    </div>
                  </div>
                  <div className="distribution-card">
                    <div className="distribution-card-inner">
                      <div className="distribution-percentage">20%</div>
                      <div className="distribution-label">Rewards & Incentives</div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
        <section 
          id="team" 
          className={`w-full py-20 md:py-28 flex flex-col items-center bg-gradient-to-b from-[#050110] to-[#0c0821] transition-transform duration-1000 section-reveal ${visibleSections.team ? 'active' : ''}`}
        >
          <div className="section-title-container mb-16 md:mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold cosmic-section-title perspective-text">
              <span className="glowing-white-text">Our Team</span>
            </h2>
            <div className="cosmic-underline"></div>
            <p className="text-gray-300 max-w-2xl mx-auto mt-6 text-base md:text-lg">
              A Collective of Dedicated Truth-Seekers with a long-standing commitment to uncovering the truth
            </p>
          </div>
          
          <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Investigative Journalism", description: "Decades of experience in analyzing evidence and conducting interviews." },
              { title: "Documentary Filmmaking", description: "Creating compelling and informative media that reaches a wide audience." },
              { title: "Blockchain Development", description: "Expertise in smart contract development and cryptocurrency ecosystem management." },
              { title: "Community Building", description: "Proven track record in fostering and managing online communities." }
            ].map((expertise, index) => (
              <div 
                key={index} 
                className="team-card"
                style={{ 
                  animationDelay: `${index * 0.15}s`,
                  opacity: 0,
                  animation: visibleSections.team ? 'fadeInUp 0.6s ease-out forwards' : 'none'
                }}
              >
                <h3 className="team-title">{expertise.title}</h3>
                <p className="team-description">{expertise.description}</p>
              </div>
            ))}
        </div>
      </section>
      
      {/* CTA Section */}
        <section 
          id="community" 
          className={`w-full py-20 md:py-28 flex flex-col items-center transition-transform duration-1000 section-reveal ${visibleSections.community ? 'active' : ''}`}
        >
          <div className="community-container relative w-full max-w-4xl bg-slate-900/40 backdrop-blur-md rounded-2xl border border-purple-500/30 shadow-xl p-8 md:p-12 mx-4 glassmorphism-intense">
            <div className="absolute inset-0 newsletter-glow rounded-2xl opacity-30"></div>
            <div className="cosmic-particles"></div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center glowing-white-text perspective-text">Join the Movement</h2>
            <p className="text-gray-300 text-center max-w-2xl mx-auto mb-8">
              MoonSet and its native token MOONSET offer a unique opportunity to participate in a decentralized movement dedicated to uncovering what we believe to be a monumental historical deception.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard" passHref>
                <div className="relative w-full sm:w-auto group floating-button">
                  <div className="cosmic-btn-pulse absolute -inset-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur"></div>
                  <Button
                    className="cosmic-dashboard-btn w-full sm:w-auto text-base sm:text-lg px-8 py-3 rounded-lg 
                              flex items-center gap-2.5 shadow-lg relative z-10"
                  >
                    <span className="cosmic-btn-spark"></span>
                    <Zap className="h-5 w-5 relative z-10 icon-pulse" /> 
                    <span className="relative z-10">Enter Dashboard</span>
                </Button>
                </div>
              </Link>
              <Link href="/whitepaper" passHref className="inline-block">
                <div
                  className="whitepaper-btn w-full sm:w-auto text-base sm:text-lg px-8 py-3 rounded-lg border-2 border-purple-400/60 text-purple-300 hover:text-white hover:border-pink-500 transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center gap-2.5 floating-button-alt"
                >
                  <FileText className="h-5 w-5 icon-float" /> Read Whitepaper
                </div>
              </Link>
          </div>
        </div>
      </section>
      
      {/* Disclaimer Section */}
        <section className="py-8 border-t border-purple-500/20 w-full">
          <div className="max-w-4xl mx-auto px-6">
            <h3 className="text-lg font-semibold text-white mb-3">Disclaimer</h3>
            <p className="text-gray-400 text-sm">
              Investing in cryptocurrencies, including MOONSET, involves significant risks, and you could lose your entire investment. The value of cryptocurrencies can be highly volatile and is subject to market fluctuations. The claims and opinions expressed regarding the 1969 moon landing are those of the MoonSet project team and are not universally accepted. This is for informational purposes only and does not constitute financial or investment advice.
            </p>
        </div>
      </section>
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 w-full bg-slate-900/60 backdrop-blur-md border-t border-purple-500/20 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
          <div className="footer-content grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
            <div className="footer-brand col-span-1 md:col-span-1">
              <div className="logo-3d-container">
                <MoonsetLogo width={160} variant="small" />
              </div>
              <p className="mt-4 text-gray-400 text-sm">
                Unveiling the truth through decentralized research, evidence collection, and community-driven governance.
              </p>
            </div>
            
            <div className="footer-links">
              <h3 className="footer-heading">Navigation</h3>
              <ul className="footer-link-list">
                <li><a href="/" className="footer-link">Home</a></li>
                <li><a href="/about" className="footer-link">About</a></li>
                <li><a href="/whitepaper" className="footer-link">Whitepaper</a></li>
                <li><a href="/dashboard" className="footer-link">Dashboard</a></li>
              </ul>
            </div>
            
            <div className="footer-links">
              <h3 className="footer-heading">Resources</h3>
              <ul className="footer-link-list">
                <li><a href="/whitepaper" className="footer-link">Whitepaper</a></li>
                <li><a href="/docs" className="footer-link">Documentation</a></li>
                <li><a href="/faq" className="footer-link">FAQs</a></li>
                <li><a href="/research" className="footer-link">Research</a></li>
              </ul>
            </div>
            
            <div className="footer-links">
              <h3 className="footer-heading">Legal</h3>
              <ul className="footer-link-list">
                <li><a href="/privacy" className="footer-link">Privacy Policy</a></li>
                <li><a href="/terms" className="footer-link">Terms of Use</a></li>
                <li><a href="/disclaimer" className="footer-link">Disclaimer</a></li>
                <li><a href="/cookies" className="footer-link">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom flex flex-col md:flex-row justify-between items-center mt-12 pt-8 border-t border-gray-800">
            <div className="footer-copyright text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 MOONSET Protocol. All rights reserved.
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
        
        /* 3D transform card effects */
        .transform-card-container {
          perspective: 1000px;
          transform-style: preserve-3d;
        }
        
        .transform-card {
          transition: transform 0.4s ease-out, box-shadow 0.4s ease-out;
          transform-style: preserve-3d;
          box-shadow: 0 10px 30px -15px rgba(139, 92, 246, 0.3);
          position: relative;
        }
        
        .transform-card-container:hover .transform-card {
          transform: rotateY(-5deg) rotateX(5deg) translateZ(10px);
          box-shadow: 20px 20px 60px -15px rgba(139, 92, 246, 0.5);
        }
        
        /* Card tilt hover effect */
        .transform-card-hover {
          transition: transform 0.3s ease-out, box-shadow 0.3s ease-out, border-color 0.3s ease-out;
          will-change: transform;
          transform-style: preserve-3d;
          position: relative;
        }
        
        .transform-card-hover:hover {
          transform: translateY(-5px) translateZ(10px) scale(1.02);
          box-shadow: 0 15px 30px -10px rgba(139, 92, 246, 0.4);
          border-color: rgba(139, 92, 246, 0.6);
        }
        
        /* Advanced glassmorphism effect */
        .glassmorphism {
          background: rgba(15, 10, 40, 0.6);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(139, 92, 246, 0.2);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.3);
        }
        
        .glassmorphism-intense {
          background: rgba(20, 14, 54, 0.7);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(139, 92, 246, 0.3);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.4),
                      inset 0 0 20px 0 rgba(139, 92, 246, 0.1);
        }
        
        /* Enhanced icons with 3D floating effect */
        .icon-3d-float {
          animation: float-3d 4s ease-in-out infinite;
          transform-style: preserve-3d;
        }
        
        @keyframes float-3d {
          0%, 100% { transform: translateZ(0) translateY(0); }
          50% { transform: translateZ(10px) translateY(-5px); }
        }
        
        /* Card content wrapper */
        .card-content-wrapper {
          position: relative;
          z-index: 1;
        }
        
        /* Fade in animations */
        .fade-in-left {
          animation: fadeInLeft 0.8s ease-out forwards;
        }
        
        .fade-in-right {
          animation: fadeInRight 0.8s ease-out forwards;
        }
        
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Section reveal animation */
        .section-reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        
        .section-reveal.active {
          opacity: 1;
          transform: translateY(0);
        }
        
        /* Animated cosmic underlines for section titles */
        .cosmic-underline {
          height: 2px;
          width: 0;
          background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.7), rgba(236, 72, 153, 0.7), transparent);
          margin: 1rem auto 0;
          transition: width 0.6s ease-out;
          animation: cosmicUnderline 1.5s ease-out forwards;
        }
        
        @keyframes cosmicUnderline {
          0% { width: 0; }
          100% { width: 80px; }
        }
        
        /* Enhanced floating buttons */
        .floating-button {
          animation: buttonFloat 6s ease-in-out infinite;
        }
        
        .floating-button-alt {
          animation: buttonFloat 6s ease-in-out infinite 1s;
        }
        
        @keyframes buttonFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        /* Logo 3D container */
        .logo-3d-container {
          transform-style: preserve-3d;
          transition: transform 0.3s ease-out;
        }
        
        .logo-3d-container:hover {
          transform: perspective(1000px) rotateY(10deg) rotateX(-5deg) translateZ(10px);
        }
        
        /* Cosmic particles for the community section */
        .cosmic-particles {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
          pointer-events: none;
        }
        
        .cosmic-particles::before {
          content: '';
          position: absolute;
          top: -10px;
          left: -10px;
          right: -10px;
          bottom: -10px;
          background-image: radial-gradient(circle at center, transparent 98%, rgba(139, 92, 246, 0.2) 99%),
                            radial-gradient(circle at center, transparent 98%, rgba(139, 92, 246, 0.15) 99%);
          background-size: 20px 20px, 30px 30px;
          animation: particleAnimation 20s linear infinite;
        }
        
        @keyframes particleAnimation {
          0% { background-position: 0 0, 0 0; }
          100% { background-position: 100px 100px, 200px 200px; }
        }
        
        /* Additional Enhancements */
        .tab-glow {
          transition: text-shadow 0.3s ease-out;
        }
        
        .tab-glow:hover {
          text-shadow: 0 0 10px rgba(139, 92, 246, 0.7);
        }
        
        /* Evidence card specific styles */
        .evidence-card {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        
        /* Animation for the cosmic title glow */
        .cosmic-title-glow {
          background: radial-gradient(ellipse at center, rgba(139, 92, 246, 0.3) 0%, rgba(76, 29, 149, 0.1) 40%, transparent 70%);
          filter: blur(20px);
          animation: pulse-soft 4s ease-in-out infinite alternate;
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
        
        /* Animation for the logo glow */
        .logo-cosmic-glow {
          position: absolute;
          inset: -20px;
          background: radial-gradient(circle at center, rgba(139, 92, 246, 0.3), transparent 70%);
          border-radius: 50%;
          filter: blur(15px);
          opacity: 0.7;
          z-index: -1;
          animation: pulse-soft 4s ease-in-out infinite alternate;
        }
        
        /* Footer styling */
        .footer-heading {
          color: #fff;
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 1.25rem;
        }
        
        .footer-link-list {
          list-style: none;
          padding: 0;
        }
        
        .footer-link {
          color: #d1b8ff;
          display: block;
          padding: 0.375rem 0;
          transition: all 0.2s ease;
        }
        
        .footer-link:hover {
          color: white;
          transform: translateX(3px);
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
        
        /* Animated gradient text */
        .animated-gradient-text {
          background: linear-gradient(
            to right,
            #c084fc,
            #a855f7,
            #d946ef,
            #ec4899,
            #c084fc
          );
          background-size: 200% auto;
          color: transparent;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: textShine 8s ease-in-out infinite;
        }
        
        @keyframes textShine {
          0% { background-position: 0% center; }
          50% { background-position: 100% center; }
          100% { background-position: 0% center; }
        }
        
        /* Pulse animation effects */
        @keyframes pulse-soft {
          0% { opacity: 0.4; }
          50% { opacity: 0.7; }
          100% { opacity: 0.4; }
        }
        
        .pulse-animation {
          animation: pulse 3s ease-in-out infinite;
        }
        
        @keyframes pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          50% { transform: translate(-50%, -50%) scale(1.5); opacity: 0.3; }
        }
        
        /* New styles for Vision & Values section */
        .glassmorphism-card {
          background: rgba(15, 10, 40, 0.7);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(139, 92, 246, 0.2);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2),
                      inset 0 0 10px 0 rgba(139, 92, 246, 0.1);
          transition: all 0.3s ease-out;
        }
        
        .glassmorphism-card:hover {
          border-color: rgba(139, 92, 246, 0.3);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.3),
                     inset 0 0 10px 0 rgba(139, 92, 246, 0.15);
        }
        
        .feature-card {
          position: relative;
          background: rgba(13, 8, 32, 0.8);
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 1rem;
          padding: 2.5rem 1.5rem 1.5rem;
          overflow: hidden;
          transition: all 0.3s ease-out;
          transform-style: preserve-3d;
          box-shadow: 0 10px 30px -15px rgba(139, 92, 246, 0.2);
        }
        
        .feature-card:hover {
          transform: translateY(-5px) translateZ(10px);
          border-color: rgba(139, 92, 246, 0.4);
          box-shadow: 0 15px 40px -15px rgba(139, 92, 246, 0.4);
        }
        
        .feature-card:before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 6px;
          background: linear-gradient(90deg, rgba(139, 92, 246, 0.7), rgba(236, 72, 153, 0.7));
          opacity: 0;
          transition: opacity 0.3s ease-out;
        }
        
        .feature-card:hover:before {
          opacity: 1;
        }
        
        .feature-icon-container {
          position: relative;
          width: 60px;
          height: 60px;
          border-radius: 16px;
          background: rgba(25, 15, 60, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
          transition: all 0.3s ease-out;
          transform-style: preserve-3d;
          border: 1px solid rgba(139, 92, 246, 0.3);
        }
        
        .feature-icon-glow {
          position: absolute;
          inset: -3px;
          background: radial-gradient(circle at center, rgba(139, 92, 246, 0.4), transparent 70%);
          border-radius: 16px;
          opacity: 0;
          transition: opacity 0.3s ease-out;
        }
        
        .feature-card:hover .feature-icon-glow {
          opacity: 1;
        }
        
        .feature-icon {
          width: 26px;
          height: 26px;
          color: #d4b8ff;
          filter: drop-shadow(0 0 8px rgba(139, 92, 246, 0.6));
          transition: all 0.3s ease-out;
          transform: translateZ(5px);
        }
        
        .feature-card:hover .feature-icon {
          color: white;
          filter: drop-shadow(0 0 10px rgba(139, 92, 246, 0.8));
        }
        
        .feature-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: white;
          margin-bottom: 0.75rem;
          transition: all 0.3s ease-out;
        }
        
        .feature-description {
          color: #d1b8ff;
          line-height: 1.5;
          font-size: 0.95rem;
        }
        
        /* New styles for Token Details section */
        .token-details-container {
          padding: 2.5rem;
          border-radius: 1.25rem;
          position: relative;
          overflow: hidden;
        }
        
        .token-details-container::after {
          content: '';
          position: absolute;
          inset: 1px;
          border-radius: 1.25rem;
          background: linear-gradient(to bottom right, rgba(139, 92, 246, 0.05), transparent, rgba(236, 72, 153, 0.05));
          pointer-events: none;
          z-index: -1;
        }
        
        .token-info-table {
          position: relative;
          z-index: 1;
        }
        
        .token-info-row {
          display: flex;
          justify-content: space-between;
          padding: 1rem 0;
          border-bottom: 1px solid rgba(139, 92, 246, 0.15);
          transition: all 0.3s ease-out;
        }
        
        .token-info-row:hover {
          background: rgba(139, 92, 246, 0.05);
          transform: translateX(5px);
        }
        
        .token-info-row:last-child {
          border-bottom: none;
        }
        
        .token-info-label {
          color: rgba(209, 184, 255, 0.8);
          font-weight: 500;
        }
        
        .token-info-value {
          color: white;
          font-weight: 600;
          letter-spacing: 0.01em;
        }
        
        .distribution-card {
          position: relative;
          overflow: hidden;
          border-radius: 1rem;
          background: rgba(20, 14, 54, 0.6);
          transition: all 0.3s ease-out;
          transform-style: preserve-3d;
          border: 1px solid rgba(139, 92, 246, 0.2);
        }
        
        .distribution-card:hover {
          transform: translateY(-3px) translateZ(5px);
          border-color: rgba(139, 92, 246, 0.5);
          box-shadow: 0 10px 25px -10px rgba(139, 92, 246, 0.5);
        }
        
        .distribution-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, rgba(139, 92, 246, 0.7), rgba(236, 72, 153, 0.7));
          opacity: 0;
          transition: opacity 0.3s ease-out;
        }
        
        .distribution-card:hover::before {
          opacity: 1;
        }
        
        .distribution-card-inner {
          padding: 1.25rem;
          position: relative;
          z-index: 1;
        }
        
        .distribution-percentage {
          font-size: 1.75rem;
          font-weight: 700;
          color: white;
          letter-spacing: -0.02em;
        }
        
        .distribution-label {
          color: rgba(209, 184, 255, 0.8);
          font-size: 0.9rem;
          margin-top: 0.5rem;
        }
        
        /* Styles for The Problem section */
        .problem-card {
          background: rgba(10, 7, 32, 0.8);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 1.5rem;
          padding: 2.5rem;
          text-align: center;
          position: relative;
          overflow: hidden;
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
          transition: all 0.4s ease-out;
        }
        
        .problem-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(139, 92, 246, 0.05), transparent 70%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .problem-card:hover {
          border-color: rgba(139, 92, 246, 0.4);
          transform: translateY(-5px);
          box-shadow: 0 15px 40px -10px rgba(139, 92, 246, 0.3);
        }
        
        .problem-logo-container {
          position: relative;
          display: flex;
          justify-content: center;
          margin-bottom: 2rem;
          filter: drop-shadow(0 0 25px rgba(255, 255, 255, 0.5));
        }
        
        .problem-logo-glow {
          position: absolute;
          inset: -20px;
          background: radial-gradient(circle at center, rgba(255, 255, 255, 0.2), transparent 70%);
          filter: blur(15px);
          opacity: 0.7;
          z-index: -1;
        }
        
        .problem-title {
          font-size: 2rem;
          font-weight: 600;
          color: white;
          margin-bottom: 1.5rem;
          letter-spacing: 0.02em;
          position: relative;
          display: inline-block;
        }
        
        .problem-title::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 2px;
          background: linear-gradient(90deg, rgba(139, 92, 246, 0.3) 0%, rgba(236, 72, 153, 0.7) 50%, rgba(139, 92, 246, 0.3) 100%);
        }
        
        .problem-content {
          max-width: 90%;
          margin: 0 auto;
          color: rgba(255, 255, 255, 0.9);
          font-size: 1.1rem;
          line-height: 1.7;
        }
        
        .problem-content p {
          margin-bottom: 1.5rem;
        }
        
        .problem-content p:last-child {
          margin-bottom: 0;
        }
        
        /* Token intro styles */
        .token-intro-container {
          max-width: 90%;
          margin: 0 auto 3rem;
        }
        
        .token-intro-text {
          color: white;
          font-size: 1.25rem;
          line-height: 1.7;
          text-align: center;
        }
        
        /* New utility card styles to match screenshot */
        .utility-card-new {
          position: relative;
          padding: 2rem;
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 0.75rem;
          background: rgba(13, 8, 32, 0.4);
          text-align: center;
          transition: all 0.3s ease;
          backdrop-filter: blur(8px);
        }
        
        .utility-card-new:hover {
          border-color: rgba(139, 92, 246, 0.4);
          box-shadow: 0 10px 25px -5px rgba(139, 92, 246, 0.2);
          transform: translateY(-5px);
        }
        
        .utility-icon-new-container {
          width: 54px;
          height: 54px;
          margin: 0 auto 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .utility-icon-new {
          width: 32px;
          height: 32px;
          color: white;
          opacity: 0.9;
          filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.6));
        }
        
        .utility-title-new {
          font-size: 1.4rem;
          font-weight: 600;
          color: white;
          margin-bottom: 1rem;
        }
        
        .utility-description-new {
          color: rgba(255, 255, 255, 0.8);
          font-size: 1rem;
          line-height: 1.6;
        }
        
        /* Team card styles */
        .team-card {
          background: rgba(15, 10, 40, 0.3);
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 0.5rem;
          padding: 1.5rem;
          transition: all 0.3s ease;
          text-align: center;
        }
        
        .team-card:hover {
          background: rgba(20, 15, 50, 0.4);
          border-color: rgba(139, 92, 246, 0.3);
          transform: translateY(-5px);
        }
        
        .team-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: white;
          margin-bottom: 0.75rem;
        }
        
        .team-description {
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.95rem;
          line-height: 1.5;
        }
        
        /* Evidence grid and cards */
        .evidence-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        
        @media (max-width: 1024px) {
          .evidence-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 640px) {
          .evidence-grid {
            grid-template-columns: 1fr;
          }
        }
        
        .evidence-item {
          background: rgba(20, 15, 50, 0.3);
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 0.5rem;
          padding: 1.75rem;
          transition: all 0.3s ease;
          text-align: center;
        }
        
        .evidence-item:hover {
          background: rgba(25, 20, 60, 0.4);
          border-color: rgba(139, 92, 246, 0.3);
          transform: translateY(-5px);
        }
        
        .evidence-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: white;
          margin-bottom: 1rem;
        }
        
        .evidence-description {
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.95rem;
          line-height: 1.5;
        }
      `}</style>
    </div>
  )
} 