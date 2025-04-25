"use client"

import "./dashboard.css"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useMediaQuery } from "@/hooks/use-media-query"
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
      { href: "/dashboard", text: "Dashboard", icon: <LayoutDashboard size={18} /> },
      { href: "/dashboard/wallet", text: "Wallet", icon: <Wallet size={18} /> },
      { href: "/dashboard/staking", text: "Staking", icon: <CoinsIcon size={18} /> },
    ]
  },
  {
    title: "Markets",
    items: [
      { href: "/dashboard/market", text: "Market Data", icon: <BarChart4 size={18} /> },
      { href: "/dashboard/analytics", text: "Token Analytics", icon: <LineChart size={18} /> },
    ]
  },
  {
    title: "Research & Governance",
    items: [
      { href: "/dashboard/research", text: "Research", icon: <FileText size={18} /> },
      { href: "/dashboard/governance", text: "Governance", icon: <Vote size={18} /> },
    ]
  },
  {
    title: "Community",
    items: [
      { href: "/dashboard/community", text: "Community", icon: <Users size={18} /> },
      { href: "/dashboard/support", text: "Support", icon: <MessageSquare size={18} /> },
      { href: "/about", text: "About", icon: <Info size={18} /> },
    ]
  }
];

// Website navigation items
const websiteNavItems = [
  { href: "/", text: "Home" },
  { href: "/about", text: "About" },
  { href: "/faq", text: "FAQs" },
  { href: "/blog", text: "Blog" },
  { href: "/contact", text: "Contact" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          <div className="dashboard-sidebar-header">
            <div className="dashboard-logo">
              <span className="text-gradient">{!isCollapsed ? "MOONSET" : "M"}</span>
            </div>
            <button
              className="dashboard-sidebar-collapse-btn"
              onClick={toggleSidebar}
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? (
                <ChevronRight size={16} className="sidebar-toggle-icon" />
              ) : (
                <ChevronLeft size={16} className="sidebar-toggle-icon" />
              )}
            </button>
          </div>

          <div className="dashboard-sidebar-content custom-scrollbar">
            {sidebarSections.map((section, idx) => (
              <div key={idx}>
                <div className={`dashboard-sidebar-section ${isCollapsed ? "hidden" : ""}`}>
                  {section.title}
                </div>
                <div className="dashboard-sidebar-items">
                  {section.items.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        href={item.href}
                        key={item.href}
                        className={`dashboard-sidebar-link ${isActive ? "active" : ""} ${isCollapsed ? "collapsed" : ""}`}
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
                  <Menu size={20} />
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
                <div className="flex items-center gap-2 text-sm text-muted">
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
                <div className="dashboard-website-nav">
                  {websiteNavItems.map((item, index) => (
                    <Link 
                      key={index} 
                      href={item.href}
                      className="dashboard-website-nav-item"
                    >
                      {item.text}
                      </Link>
                  ))}
                </div>
                <Link 
                  href="/sign-in" 
                  className="dashboard-sign-in-btn hidden md:flex ml-2"
                >
                  SIGN IN
                      </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className="md:hidden">
                    <Button variant="ghost" size="icon" className="bg-white/5 text-white">
                      <MoreHorizontal size={20} />
                      <span className="sr-only">Website Menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-[#1a1b30]/95 border-white/10 backdrop-blur-md text-white">
                    {websiteNavItems.map((item, index) => (
                      <DropdownMenuItem key={index} asChild className="hover:bg-white/10 focus:bg-white/10">
                        <Link href={item.href}>{item.text}</Link>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuItem asChild className="hover:bg-white/10 focus:bg-white/10">
                      <Link href="/sign-in">SIGN IN</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <button
                  className="dashboard-header-icon-btn"
                  aria-label="Notifications"
                >
                  <Bell size={18} />
                </button>
                <button
                  className="dashboard-header-icon-btn"
                  aria-label="Quick actions"
                >
                  <Zap size={20} />
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
                  <DropdownMenuContent align="end" className="bg-[#1a1b30]/95 border-white/10 backdrop-blur-md text-white">
                    <DropdownMenuItem className="hover:bg-white/10 focus:bg-white/10">
                      <User className="mr-2" size={16} /> Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-white/10 focus:bg-white/10">
                      <Settings className="mr-2" size={16} /> Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-white/10 focus:bg-white/10">
                      <HelpCircle className="mr-2" size={16} /> Help & Support
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-white/10 focus:bg-white/10">
                      <LogOut className="mr-2" size={16} /> Logout
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
