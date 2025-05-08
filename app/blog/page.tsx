"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Search, 
  ChevronRight, 
  Calendar, 
  Clock, 
  Tag, 
  ArrowUpRight, 
  BookOpen, 
  FileText, 
  Video, 
  Users,
  Share2,
  MessageSquare,
  ThumbsUp
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoonsetLogo } from "@/components/moonset-logo"

// Mock blog data
const blogPosts = [
  {
    id: 1,
    title: "The Van Allen Radiation Belts: NASA's Insurmountable Barrier",
    excerpt: "A detailed analysis of the extreme radiation hazards in the Van Allen belts and why 1960s technology could not have adequately shielded astronauts during the alleged moon landing.",
    coverImage: "/moonset.png", // Using the project logo as a placeholder
    category: "Research",
    date: "June 15, 2025",
    readTime: "8 min read",
    author: {
      name: "Dr. James Wilson",
      avatar: "/placeholder-user.jpg",
      role: "Lead Researcher"
    },
    featured: true,
    tags: ["Radiation", "Technical Evidence", "Space Travel"]
  },
  {
    id: 2,
    title: "Photographic Anomalies: Analyzing the Waving Flag on the 'Moon'",
    excerpt: "Examining the physics behind the seemingly waving American flag in lunar photographs and why NASA's explanations don't hold up under scientific scrutiny.",
    coverImage: "/moonset.png", // Using the project logo as a placeholder
    category: "Analysis",
    date: "June 10, 2025",
    readTime: "6 min read",
    author: {
      name: "Sarah Reynolds",
      avatar: "/placeholder-user.jpg",
      role: "Photography Expert"
    },
    featured: true,
    tags: ["Photographic Evidence", "Flag Analysis", "Physics"]
  },
  {
    id: 3,
    title: "MOONSET Token Launch: Powering the Quest for Lunar Truth",
    excerpt: "Learn about the upcoming launch of the MOONSET token, its utility in our ecosystem, and how you can participate in the initial offering.",
    coverImage: "/moonset.png", // Using the project logo as a placeholder
    category: "Token",
    date: "June 5, 2025",
    readTime: "5 min read",
    author: {
      name: "Michael Chen",
      avatar: "/placeholder-user.jpg",
      role: "Tokenomics Specialist"
    },
    featured: false,
    tags: ["MOONSET Token", "IDO", "Blockchain"]
  },
  {
    id: 4,
    title: "The Cold War Motivation: Why the Moon Landing Deception Was Necessary",
    excerpt: "Exploring the geopolitical context of the 1960s space race and how the pressure to beat the Soviet Union may have led to the fabrication of the lunar landing.",
    coverImage: "/moonset.png", // Using the project logo as a placeholder
    category: "History",
    date: "May 28, 2025",
    readTime: "7 min read",
    author: {
      name: "Dr. Elizabeth Taylor",
      avatar: "/placeholder-user.jpg",
      role: "Historical Analyst"
    },
    featured: false,
    tags: ["Cold War", "Political Context", "History"]
  },
  {
    id: 5,
    title: "Building a Decentralized Archive for Moon Landing Evidence",
    excerpt: "How we're using blockchain technology to create a permanent, censorship-resistant repository of research and evidence challenging the moon landing narrative.",
    coverImage: "/moonset.png", // Using the project logo as a placeholder
    category: "Technology",
    date: "May 21, 2025",
    readTime: "6 min read",
    author: {
      name: "Alex Thompson",
      avatar: "/placeholder-user.jpg",
      role: "Blockchain Developer"
    },
    featured: false,
    tags: ["Blockchain", "Decentralization", "Archives"]
  },
  {
    id: 6,
    title: "Community Spotlight: Top Contributors to Lunar Truth Research",
    excerpt: "Highlighting community members who have made significant contributions to our collective research efforts and uncovering new evidence.",
    coverImage: "/moonset.png", // Using the project logo as a placeholder
    category: "Community",
    date: "May 15, 2025",
    readTime: "4 min read",
    author: {
      name: "Jessica Miller",
      avatar: "/placeholder-user.jpg",
      role: "Community Manager"
    },
    featured: false,
    tags: ["Community", "Research", "Contributors"]
  }
];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  
  // Filter blog posts based on search and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = searchQuery === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = activeCategory === "all" || post.category.toLowerCase() === activeCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });
  
  // Featured posts
  const featuredPosts = blogPosts.filter(post => post.featured);
  
  // Blog categories
  const categories = [
    { id: "all", label: "All", icon: <BookOpen className="h-4 w-4" /> },
    { id: "research", label: "Research", icon: <FileText className="h-4 w-4" /> },
    { id: "analysis", label: "Analysis", icon: <Search className="h-4 w-4" /> },
    { id: "token", label: "Token", icon: <Tag className="h-4 w-4" /> },
    { id: "community", label: "Community", icon: <Users className="h-4 w-4" /> }
  ];
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-12">
        {/* Background glow effects */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full filter blur-[100px] z-0"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/20 rounded-full filter blur-[100px] z-0"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-12">
              <MoonsetLogo width={250} variant="full" />
            </div>
            
            <Badge className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-white border-0 py-1.5 px-4 text-sm backdrop-blur-md mb-6">
              MoonSet Blog
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Unveiling <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Lunar Truth</span>
            </h1>
            
            <p className="text-lg text-white/80 leading-relaxed mb-10 max-w-2xl mx-auto">
              Explore in-depth research, analysis, and updates on our mission to expose the moon landing deception and build our decentralized community.
            </p>
            
            <div className="max-w-xl mx-auto relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50">
                <Search className="h-5 w-5" />
      </div>
          <Input
            placeholder="Search articles..."
                className="bg-white/5 border-white/10 text-white h-12 pl-10 rounded-lg focus:border-purple-500 focus:ring-purple-500/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
        </div>
      </section>
      
      {/* Featured Posts */}
      {featuredPosts.length > 0 && !searchQuery && activeCategory === "all" && (
        <section className="py-12 relative">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold text-white mb-8">Featured Articles</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map(post => (
                <Link href={`/blog/${post.id}`} key={post.id} className="block">
                  <Card className="dashboard-card border-white/10 hover-lift h-full overflow-hidden">
                    <div className="relative h-60 w-full overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-blue-500/30 z-10"></div>
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                      <Badge className="absolute top-4 left-4 z-20 bg-gradient-to-r from-purple-500/80 to-blue-500/80 text-white border-0 backdrop-blur-sm">
                        {post.category}
                      </Badge>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center text-sm text-white/60 mb-3 gap-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1.5" />
                          {post.date}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1.5" />
                          {post.readTime}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-white/70 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                    </CardContent>
                    <CardFooter className="px-6 pb-6 pt-0 flex justify-between items-center">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2 border border-white/10">
                          <AvatarImage src={post.author.avatar} alt={post.author.name} />
                          <AvatarFallback className="bg-gradient-to-r from-purple-500/50 to-blue-500/50 text-white text-xs">
                            {post.author.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-white">{post.author.name}</p>
                          <p className="text-xs text-white/60">{post.author.role}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10">
                        Read More
                        <ArrowUpRight className="ml-1 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* All Blog Posts */}
      <section className="py-12 relative">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <Tabs 
              defaultValue="all" 
              value={activeCategory}
              onValueChange={setActiveCategory}
              className="w-full"
            >
              <TabsList className="flex overflow-x-auto pb-2 mb-6 bg-transparent space-x-2">
                {categories.map(category => (
                  <TabsTrigger 
                    key={category.id} 
                    value={category.id}
                    className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/70 hover:text-white px-4 py-2 rounded-lg flex items-center gap-2 border border-white/10 bg-white/5"
                  >
                    {category.icon}
                    {category.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <TabsContent value={activeCategory} className="mt-0">
                {filteredPosts.length > 0 ? (
                  <>
                    <h2 className="text-2xl font-bold text-white mb-8">
                      {activeCategory === "all" ? "All Articles" : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Articles`}
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {filteredPosts.map(post => (
                        <Link href={`/blog/${post.id}`} key={post.id} className="block">
                          <Card className="dashboard-card border-white/10 hover-lift h-full">
                            <div className="relative h-48 w-full overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-blue-500/30 z-10"></div>
                              <Image
                                src={post.coverImage}
                                alt={post.title}
                                fill
                                className="object-cover"
                              />
                              <Badge className="absolute top-4 left-4 z-20 bg-gradient-to-r from-purple-500/80 to-blue-500/80 text-white border-0 backdrop-blur-sm">
                                {post.category}
                              </Badge>
                            </div>
                            <CardContent className="p-6">
                              <div className="flex items-center text-sm text-white/60 mb-3">
                                <Calendar className="h-4 w-4 mr-1.5" />
                                {post.date}
                                <span className="mx-2">•</span>
                                <Clock className="h-4 w-4 mr-1.5" />
                                {post.readTime}
                              </div>
                              <h3 className="text-lg font-bold text-white mb-3 line-clamp-2">
                                {post.title}
            </h3>
                              <p className="text-white/70 text-sm mb-4 line-clamp-3">
                                {post.excerpt}
                              </p>
                              <div className="flex flex-wrap gap-2 mb-4">
                                {post.tags.slice(0, 2).map((tag, index) => (
                                  <Badge key={index} className="bg-white/5 hover:bg-white/10 text-white/70 border-white/10">
                                    {tag}
                                  </Badge>
                                ))}
                                {post.tags.length > 2 && (
                                  <Badge className="bg-white/5 hover:bg-white/10 text-white/70 border-white/10">
                                    +{post.tags.length - 2} more
                                  </Badge>
                                )}
                              </div>
                            </CardContent>
                            <CardFooter className="px-6 pb-6 pt-0 flex justify-between items-center border-t border-white/10 pt-4">
                              <div className="flex items-center gap-2 text-white/70 text-xs">
                                <div className="flex items-center">
                                  <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                                  24
                                </div>
                                <div className="flex items-center">
                                  <MessageSquare className="h-3.5 w-3.5 mr-1" />
                                  8
                                </div>
                                <div className="flex items-center">
                                  <Share2 className="h-3.5 w-3.5 mr-1" />
                                  12
                                </div>
                              </div>
                              <Button size="sm" variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10">
                                Read
                                <ChevronRight className="ml-1 h-4 w-4" />
                              </Button>
                            </CardFooter>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="h-8 w-8 text-white/50" />
                    </div>
                    <h3 className="text-xl font-medium text-white mb-2">No articles found</h3>
                    <p className="text-white/70 mb-6">We couldn't find any articles matching your search criteria</p>
                    <Button 
                      variant="outline" 
                      className="border-white/20 bg-white/5 text-white hover:bg-white/10"
                      onClick={() => {
                        setSearchQuery("");
                        setActiveCategory("all");
                      }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 border border-white/10 rounded-2xl p-10 backdrop-blur-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <Badge className="bg-white/10 text-white border-0 mb-4">Newsletter</Badge>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Stay Updated on Lunar Truth</h2>
                  <p className="text-white/80 mb-0 md:mb-4">
                    Subscribe to our newsletter to receive the latest research findings, token updates, and community news.
                  </p>
        </div>

                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input 
                      placeholder="Enter your email" 
                      className="bg-white/10 border-white/10 text-white placeholder:text-white/50"
                    />
                    <Button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0 hover:opacity-90">
                      Subscribe
                    </Button>
                  </div>
                  <p className="text-white/50 text-xs">
                    By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-6 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <p className="text-white/40 text-xs text-center">
              The articles and content on this blog represent the views and research of the MoonSet project team. The claims and opinions expressed regarding the 1969 moon landing and other topics are presented for informational purposes and ongoing research discussions.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
} 