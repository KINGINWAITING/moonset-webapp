"use client"

import "./dashboard.css"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  ChevronRight,
  ChevronLeft,
  Search,
  Bell,
  MessageSquare,
  Home,
  LayoutDashboard,
  BarChart3,
  LineChart,
  Wallet,
  CreditCard,
  Landmark,
  Vote,
  Users,
  Settings,
  HelpCircle,
  Coins,
  Menu,
  CalendarDays,
  Sparkles,
  Layers,
  Newspaper,
  ChevronsLeft,
  ChevronsRight,
  BadgeDollarSign,
  BookOpenText,
  MessageSquareText,
  User,
  SearchIcon,
  BookOpen,
  Github,
  Moon,
  ChevronDown,
  ArrowUpDown,
  Zap,
  Presentation,
  X,
  Lock,
  Trophy,
  ThumbsUp,
  ArrowDownUp,
  CoinsIcon,
  BarChart4,
  FileText,
  Info,
  DollarSign,
  ClipboardList,
  RefreshCcw,
  Building2,
  Mail,
  Lightbulb,
  MoreHorizontal
} from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { LogOut } from "lucide-react"

// Define navigation items
const mainNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
]

const dashboardNavItems = [
  { title: "Wallet", icon: Wallet, href: "/dashboard/wallet" },
  { title: "Staking", icon: Layers, href: "/dashboard/staking" },
  { title: "Research", icon: FileText, href: "/dashboard/research" },
  { title: "Governance", icon: Vote, href: "/dashboard/governance" },
  { title: "Community", icon: Users, href: "/dashboard/community" },
]

const communityNavItems = [
  { title: "Settings", icon: Settings, href: "/dashboard/settings" },
  { title: "Help & Support", icon: HelpCircle, href: "/dashboard/help" },
  { title: "GitHub", href: "https://github.com", icon: Github, external: true },
  { title: "Documentation", href: "https://docs.example.com", icon: BookOpen, external: true },
  { title: "Ideas", href: "https://ideas.example.com", icon: Lightbulb, external: true },
]

interface SidebarItem {
  href: string;
  icon: React.ReactNode;
  text: string;
}

interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

// Sidebar navigation sections with more organized structure
const sidebarSections = [
  {
    title: "Overview",
    items: [
      { href: "/dashboard", text: "Dashboard", icon: <LayoutDashboard className="w-[18px] h-[18px]" /> },
      { href: "/dashboard/wallet", text: "Wallet", icon: <Wallet className="w-[18px] h-[18px]" /> },
      { href: "/dashboard/staking", text: "Staking", icon: <CoinsIcon className="w-[18px] h-[18px]" /> },
    ]
  },
  {
    title: "Markets",
    items: [
      { href: "/dashboard/market", text: "Market Data", icon: <BarChart4 className="w-[18px] h-[18px]" /> },
      { href: "/dashboard/analytics", text: "Token Analytics", icon: <LineChart className="w-[18px] h-[18px]" /> },
    ]
  },
  {
    title: "Research & Governance",
    items: [
      { href: "/dashboard/research", text: "Research", icon: <FileText className="w-[18px] h-[18px]" /> },
      { href: "/dashboard/governance", text: "Governance", icon: <Vote className="w-[18px] h-[18px]" /> },
    ]
  },
  {
    title: "Community",
    items: [
      { href: "/dashboard/community", text: "Community", icon: <Users className="w-[18px] h-[18px]" /> },
      { href: "/dashboard/support", text: "Support", icon: <MessageSquare className="w-[18px] h-[18px]" /> },
      { href: "/about", text: "About", icon: <Info className="w-[18px] h-[18px]" /> },
    ]
  }
];

// Website navigation items - Refined for better styling
const websiteNavItems = [
  { href: "/", text: "Home" },
  { href: "/about", text: "About" },
  { href: "/whitepaper", text: "Whitepaper" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [stars, setStars] = useState<Array<{x: number, y: number, size: number, opacity: number, depth: number}>>([]);
  const [sidebarStars, setSidebarStars] = useState<Array<{x: number, y: number, size: number, opacity: number}>>([]);
  const [constellationLines, setConstellationLines] = useState<Array<{x1: number, y1: number, x2: number, y2: number, opacity: number}>>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Define useMediaQuery hook inline
  const [isMobile, setIsMobile] = useState(false);
  
  // Simulate loading 
  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Generate background stars
  useEffect(() => {
    const newStars = [];
    const numStars = 300;
    
    // Create stars with random positions based on orbital parameters
    for (let i = 0; i < numStars; i++) {
      // Random angle around center point (in radians)
      const angle = Math.random() * Math.PI * 2;
      
      // Random orbital distance from center (using square root distribution for more natural spreading)
      const distanceFactor = Math.sqrt(Math.random());
      const orbitRadius = 5 + distanceFactor * 90; // As percentage of viewport
      
      // Calculate initial position based on angle and orbit radius
      const x = 50 + Math.cos(angle) * orbitRadius; // 50% is center of viewport
      const y = 50 + Math.sin(angle) * orbitRadius; // 50% is center of viewport
      
      // Determine rotation speed - create 3 distinct orbital speeds
      const speedCategory = Math.floor(Math.random() * 3); // 0, 1, or 2
      const rotationSpeed = speedCategory === 0 ? 'rotating-slow' : 
                           (speedCategory === 1 ? 'rotating' : 'rotating-fast');
      
      // Size distribution - create a more varied star field including some larger stars
      let size;
      const sizeRand = Math.random();
      if (sizeRand < 0.7) {
        // 70% small stars (1-2px)
        size = Math.random() * 1 + 1;
      } else if (sizeRand < 0.9) {
        // 20% medium stars (2-4px)
        size = Math.random() * 2 + 2;
      } else {
        // 10% large stars (4-8px)
        size = Math.random() * 4 + 4;
      }
      
      // Add depth layer (0-2) for parallax effect
      const depth = Math.floor(Math.random() * 3);
      
      newStars.push({
        x: x,
        y: y,
        angle: angle, // Store original angle
        orbitRadius: orbitRadius, // Store orbit radius
        size: size,
        opacity: Math.random() * 0.5 + 0.3, // 0.3-0.8 opacity
        depth: depth, // 0, 1, or 2 (0 = closest)
        rotationSpeed: rotationSpeed, // Rotation speed category
        twinkle: Math.random() > 0.7, // 30% of stars will twinkle
        animationDelay: Math.random() * -240 // Random start position in animation cycle
      });
    }
    
    setStars(newStars);
    
    // Generate sidebar constellation stars
    const newSidebarStars = [];
    for (let i = 0; i < 20; i++) {
      newSidebarStars.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.3,
      });
    }
    setSidebarStars(newSidebarStars);
    
    // Generate constellation lines connecting some stars
    const lines = [];
    for (let i = 0; i < 10; i++) {
      if (i < newSidebarStars.length - 1) {
        lines.push({
          x1: newSidebarStars[i].x,
          y1: newSidebarStars[i].y,
          x2: newSidebarStars[i + 1].x,
          y2: newSidebarStars[i + 1].y,
          opacity: Math.random() * 0.15 + 0.05
        });
      }
    }
    setConstellationLines(lines);
  }, []);
  
  useEffect(() => {
    // Check for mobile view
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initialize sidebar state from localStorage on mount
  useEffect(() => {
    const savedCollapsed = localStorage.getItem("sidebarCollapsed");
    if (savedCollapsed) {
      setIsCollapsed(JSON.parse(savedCollapsed));
    }
    
    // Handle window resize for responsive behavior
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  // Close mobile menu when navigating to a new page
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Toggle sidebar collapsed state
  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem("sidebarCollapsed", JSON.stringify(newState));
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <TooltipProvider delayDuration={200}>
      <div className="dashboard-root">
        {/* Loading indicator */}
        {isLoading && (
          <div className="loading-overlay">
            <div className="loading-container">
              <svg
                width="120"
                height="120"
                viewBox="0 0 150 150"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="moonset-logo-loading"
              >
                <defs>
                  <linearGradient id="loadingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="50%" stopColor="#f0e6ff" />
                    <stop offset="100%" stopColor="#d8c7ff" />
                  </linearGradient>
                  <filter id="loadingGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                  <filter id="loadingMoonglow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                
                {/* M for MOONSET */}
                <text 
                  x="38" 
                  y="95" 
                  fontFamily="Arial, sans-serif" 
                  fontSize="95" 
                  fontWeight="bold" 
                  fill="url(#loadingGradient)" 
                  filter="url(#loadingGlow)"
                >
                  M
                </text>
                
                {/* Moon circle */}
                <circle 
                  cx="75" 
                  cy="75" 
                  r="65" 
                  fill="none"
                  stroke="url(#loadingGradient)"
                  strokeWidth="3"
                  opacity="0.5"
                  filter="url(#loadingMoonglow)"
                  className="loading-moon-circle"
                >
                  <animate attributeName="opacity" values="0.5;0.8;0.5" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="r" values="65;67;65" dur="3s" repeatCount="indefinite" />
                </circle>
                
                {/* Animated stars */}
                <circle className="loading-star-1" cx="30" cy="30" r="8" fill="white" opacity="0.9">
                  <animate attributeName="opacity" values="0.9;0.3;0.9" dur="1.5s" repeatCount="indefinite" />
                </circle>
                <circle className="loading-star-2" cx="120" cy="120" r="7" fill="white" opacity="0.8">
                  <animate attributeName="opacity" values="0.8;0.2;0.8" dur="1.8s" repeatCount="indefinite" />
                </circle>
                <circle className="loading-star-3" cx="105" cy="45" r="9" fill="white" opacity="0.85">
                  <animate attributeName="opacity" values="0.85;0.4;0.85" dur="2s" repeatCount="indefinite" />
                </circle>
              </svg>
              <p className="loading-text">Loading...</p>
            </div>
          </div>
        )}

        {/* Cosmic Background Elements */}
        <div className="dashboard-cosmic-background">
          {/* Nebula effect */}
          <div className="dashboard-nebula-background"></div>
          
          {/* Nebula wisps */}
          <div className="dashboard-nebula-wisp dashboard-wisp-1"></div>
          <div className="dashboard-nebula-wisp dashboard-wisp-2"></div>
          <div className="dashboard-nebula-wisp dashboard-wisp-3"></div>
          <div className="dashboard-nebula-wisp dashboard-wisp-4"></div>
          
          {/* Stars */}
          <div className="dashboard-stars">
            {stars.map((star, index) => {
              // Check if it's a large star for special styling
              const sizeClass = star.size > 3 ? 'large' : '';
              
              // For large stars, we need to handle the orbit + twinkle separately
              // to avoid animation conflicts
              let twinkleClass = '';
              if (star.twinkle) {
                twinkleClass = sizeClass === 'large' ? 'large twinkle' : 'twinkle';
              }
              
              // Set orbit duration as CSS variable for combined animations
              let orbitDuration;
              if (star.rotationSpeed === 'rotating-slow') orbitDuration = '240s';
              else if (star.rotationSpeed === 'rotating') orbitDuration = '180s';
              else orbitDuration = '120s';
              
              return (
                <div
                  key={`star-${index}`}
                  className={`dashboard-star ${twinkleClass} ${star.rotationSpeed} ${sizeClass}`}
                  style={{
                    left: `${star.x}%`,
                    top: `${star.y}%`,
                    width: `${star.size}px`,
                    height: `${star.size}px`,
                    opacity: star.opacity,
                    boxShadow: sizeClass === 'large' 
                      ? undefined // Use the CSS class boxShadow for large stars
                      : `0 0 ${star.size * 0.7}px ${star.size * 0.5}px rgba(255, 255, 255, ${star.opacity * 0.7})`,
                    zIndex: star.depth,
                    animationDelay: `${star.animationDelay}s`,
                    '--orbit-duration': orbitDuration,
                  }}
                />
              );
            })}
          </div>
        </div>
        
        {/* Mobile menu overlay */}
        {isMobileMenuOpen && (
          <div className="dashboard-sidebar-overlay" onClick={() => setIsMobileMenuOpen(false)} />
        )}

        {/* Sidebar */}
        <aside
          className={`dashboard-sidebar custom-scrollbar ${
            isCollapsed ? "collapsed" : ""
          } ${isMobileMenuOpen ? "visible" : ""}`}
        >
          <div className="dashboard-sidebar-bg-pattern"></div>
          <div className="sidebar-blob-1"></div>
          <div className="sidebar-blob-2"></div>
          <div className="sidebar-blob-3"></div>
          
          {/* Constellation effect in sidebar */}
          <div className="sidebar-constellation">
            {/* Stars */}
            {sidebarStars.map((star, index) => (
              <div
                key={`sidebar-star-${index}`}
                className={`dashboard-star ${index % 2 === 0 ? 'twinkle' : ''}`}
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  opacity: star.opacity,
                  boxShadow: `0 0 ${star.size * 0.5}px ${star.size * 0.5}px rgba(255, 255, 255, ${star.opacity * 0.7})`,
                  zIndex: 0
                }}
              ></div>
            ))}
            
            {/* Constellation lines */}
            <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, opacity: 0.2 }}>
              {constellationLines.map((line, index) => (
                <line 
                  key={`constellation-line-${index}`}
                  x1={`${line.x1}%`} 
                  y1={`${line.y1}%`}
                  x2={`${line.x2}%`} 
                  y2={`${line.y2}%`}
                  stroke="rgba(140, 43, 255, 0.4)"
                  strokeWidth="0.5"
                  opacity={line.opacity}
                />
              ))}
            </svg>
          </div>
          
          <div className="dashboard-sidebar-header">
            <div className="dashboard-logo">
              {!isCollapsed ? (
                <div className="dashboard-logo-wrapper">
                  <svg
                    width="3780"
                    height="1323"
                    viewBox="0 0 540 189"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="moonset-logo w-full h-auto transition-transform duration-300"
                  >
                    <defs>
                      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="50%" stopColor="#f0e6ff" />
                        <stop offset="100%" stopColor="#d8c7ff" />
                      </linearGradient>
                      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="6" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                      <filter id="moonglow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                    </defs>
                    
                    {/* Simple text path for MOONSET */}
                    <text 
                      x="3" 
                      y="110" 
                      fontFamily="Arial, sans-serif" 
                      fontSize="82" 
                      fontWeight="bold" 
                      fill="url(#logoGradient)" 
                      filter="url(#glow)"
                    >
                      MOONSET
                    </text>
                    
                    {/* Moon symbol */}
                    <circle 
                      cx="460" 
                      cy="90" 
                      r="30" 
                      fill="white"
                      filter="url(#moonglow)"
                      className="moon-circle"
                    >
                      <animate attributeName="opacity" values="0.9;1;0.9" dur="4s" repeatCount="indefinite" />
                      <animate attributeName="r" values="30;32;30" dur="7s" repeatCount="indefinite" />
                    </circle>
                    
                    {/* Animated stars around the logo */}
                    <circle className="star-1" cx="50" cy="40" r="8" fill="white" opacity="0.9">
                      <animate attributeName="opacity" values="0.9;0.4;0.9" dur="3s" repeatCount="indefinite" />
                    </circle>
                    <circle className="star-2" cx="480" cy="130" r="6" fill="white" opacity="0.8">
                      <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2.5s" repeatCount="indefinite" />
                    </circle>
                    <circle className="star-3" cx="330" cy="25" r="7" fill="white" opacity="0.85">
                      <animate attributeName="opacity" values="0.85;0.4;0.85" dur="4s" repeatCount="indefinite" />
                    </circle>
                  </svg>
                </div>
              ) : (
                <div className="small-logo-container">
                  <svg
                    width="1050"
                    height="1050"
                    viewBox="0 0 150 150"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="moonset-logo-small w-auto h-auto transition-transform duration-300"
                  >
                    <defs>
                      <linearGradient id="logoSmallGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="50%" stopColor="#f0e6ff" />
                        <stop offset="100%" stopColor="#d8c7ff" />
                      </linearGradient>
                      <filter id="smallGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="5" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                      <filter id="smallMoonglow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                    </defs>
                    
                    {/* M for MOONSET */}
                    <text 
                      x="38" 
                      y="95" 
                      fontFamily="Arial, sans-serif" 
                      fontSize="95" 
                      fontWeight="bold" 
                      fill="url(#logoSmallGradient)" 
                      filter="url(#smallGlow)"
                    >
                      M
                    </text>
                    
                    {/* Moon circle */}
                    <circle 
                      cx="75" 
                      cy="75" 
                      r="65" 
                      fill="none"
                      stroke="url(#logoSmallGradient)"
                      strokeWidth="3"
                      opacity="0.5"
                      filter="url(#smallMoonglow)"
                      className="small-moon-circle"
                    >
                      <animate attributeName="opacity" values="0.5;0.7;0.5" dur="4s" repeatCount="indefinite" />
                      <animate attributeName="r" values="65;67;65" dur="7s" repeatCount="indefinite" />
                    </circle>
                    
                    {/* Animated stars */}
                    <circle className="small-star-1" cx="30" cy="30" r="8" fill="white" opacity="0.9">
                      <animate attributeName="opacity" values="0.9;0.4;0.9" dur="3s" repeatCount="indefinite" />
                    </circle>
                    <circle className="small-star-2" cx="120" cy="120" r="7" fill="white" opacity="0.8">
                      <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2.5s" repeatCount="indefinite" />
                    </circle>
                    <circle className="small-star-3" cx="105" cy="45" r="9" fill="white" opacity="0.85">
                      <animate attributeName="opacity" values="0.85;0.4;0.85" dur="4s" repeatCount="indefinite" />
                    </circle>
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Fixed Sidebar Collapse Button - Outside of header for better positioning */}
          <button
            className="dashboard-sidebar-collapse-btn"
            onClick={toggleSidebar}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4 sidebar-toggle-icon" />
            ) : (
              <ChevronLeft className="w-4 h-4 sidebar-toggle-icon" />
            )}
          </button>

          <div className="dashboard-sidebar-content custom-scrollbar">
            {sidebarSections.map((section, idx) => (
              <div key={idx}>
                <div className={`dashboard-sidebar-section ${isCollapsed ? "hidden" : ""}`}>
                  {section.title}
                </div>
                <div className="dashboard-sidebar-items">
                  {section.items.map((item, itemIdx) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        href={item.href}
                        key={item.href}
                        className={`dashboard-sidebar-link ${isActive ? "active" : ""} ${isCollapsed ? "collapsed" : ""}`}
                        onClick={(e) => {
                          // Create ripple effect
                          const link = e.currentTarget;
                          const rect = link.getBoundingClientRect();
                          const x = e.clientX - rect.left;
                          const y = e.clientY - rect.top;
                          
                          const ripple = document.createElement('span');
                          ripple.className = 'ripple';
                          ripple.style.width = ripple.style.height = '100px';
                          ripple.style.left = `${x - 50}px`;
                          ripple.style.top = `${y - 50}px`;
                          
                          link.appendChild(ripple);
                          
                          setTimeout(() => {
                            ripple.remove();
                          }, 600);
                        }}
                      >
                        <div className="dashboard-sidebar-icon">
                          {item.icon}
                        </div>
                        <span className="dashboard-sidebar-text">{item.text}</span>
                        {isCollapsed && <div className="dashboard-tooltip">{item.text}</div>}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className={`dashboard-main ${isCollapsed ? "sidebar-collapsed" : ""}`}>
          {/* Header */}
          <header className="dashboard-header">
            <div className="dashboard-header-container">
              <div className="dashboard-header-left">
                <button
                  className="dashboard-menu-trigger"
                  onClick={toggleMobileMenu}
                  aria-label="Toggle mobile menu"
                >
                  <Menu className="w-5 h-5" />
                </button>
                <div className="dashboard-search-container">
                  <div className="dashboard-search-input-wrapper">
                    <Search className="dashboard-search-icon" />
                    <Input 
                      type="text"
                      placeholder="Search..."
                      className="dashboard-search-input"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarDays className="w-4 h-4" />
                  <span>{new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}</span>
                </div>
              </div>
              <div className="dashboard-header-right">
                <nav className="dashboard-website-nav">
                  {websiteNavItems.map((item, index) => (
                    <Link 
                      key={index} 
                      href={item.href}
                      className="dashboard-website-nav-item"
                    >
                      {item.text}
                      <span className="nav-item-highlight"></span>
                    </Link>
                  ))}
                </nav>
                <Link 
                  href="/sign-in" 
                  className="dashboard-sign-in-btn hidden md:flex ml-2 relative overflow-hidden"
                >
                  <span>SIGN IN</span>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className="md:hidden">
                    <Button variant="ghost" size="icon" className="bg-white/5 text-white hover:bg-white/10 hover:scale-105 transition-all">
                      <MoreHorizontal className="w-5 h-5" />
                      <span className="sr-only">Website Menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-[rgba(70,38,153,0.9)] border-white/10 backdrop-blur-md text-white dropdown-menu-content">
                    {websiteNavItems.map((item, index) => (
                      <DropdownMenuItem key={index} asChild className="hover:bg-white/10 focus:bg-white/10 hover:translate-x-1 transition-transform">
                        <Link href={item.href}>{item.text}</Link>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuItem asChild className="hover:bg-white/10 focus:bg-white/10 hover:translate-x-1 transition-transform">
                      <Link href="/sign-in">SIGN IN</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <button
                  className="dashboard-header-icon-btn"
                  aria-label="Notifications"
                >
                  <Bell className="w-[18px] h-[18px]" />
                </button>
                <button
                  className="dashboard-header-icon-btn"
                  aria-label="Quick actions"
                >
                  <Zap className="w-5 h-5" />
                </button>
                <div className="dashboard-header-divider" />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="dashboard-user-profile">
                      <Avatar className="dashboard-user-avatar">
                        <AvatarImage src="/avatars/01.png" alt="User" />
                        <AvatarFallback className="dashboard-user-avatar-fallback">TA</AvatarFallback>
                      </Avatar>
                      <div className="dashboard-user-info">
                        <div className="dashboard-user-name">Thomas Abebe</div>
                        <div className="dashboard-user-email">thomas@example.com</div>
                      </div>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-[rgba(70,38,153,0.9)] border-white/10 backdrop-blur-md text-white dropdown-menu-content">
                    <DropdownMenuItem className="hover:bg-white/10 focus:bg-white/10 hover:translate-x-1 transition-transform">
                      <User className="mr-2 w-4 h-4" /> Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-white/10 focus:bg-white/10 hover:translate-x-1 transition-transform">
                      <Settings className="mr-2 w-4 h-4" /> Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-white/10 focus:bg-white/10 hover:translate-x-1 transition-transform">
                      <HelpCircle className="mr-2 w-4 h-4" /> Help & Support
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-white/10 focus:bg-white/10 hover:translate-x-1 transition-transform">
                      <LogOut className="mr-2 w-4 h-4" /> Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <div className="dashboard-content">
            <div className="dashboard-content-container">
              {children}
            </div>
          </div>
        </main>
      </div>
    </TooltipProvider>
  )
}
