"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Users, UserPlus, Calendar, CalendarDays, Filter, PlusCircle, ArrowUpDown, Bell, ThumbsUp, MessageCircle, Award, UserCircle, Search, User, CalendarRange, UserRound, UserRoundPlus, Video, Flame } from "lucide-react"
import DashboardPageLayout from '@/components/dashboard-page-layout'

export default function CommunityPage() {
  const [newPostVisible, setNewPostVisible] = useState(false);
  const [postDraft, setPostDraft] = useState({ title: '', content: '' });
  const [activeTab, setActiveTab] = useState("forums");
  
  // Get current date in a nice format
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Handle new post form
  const toggleNewPost = () => {
    setNewPostVisible(!newPostVisible);
  };

  const handlePostInput = (field, value) => {
    setPostDraft({
      ...postDraft,
      [field]: value
    });
  };

  const submitPost = () => {
    if (postDraft.title.trim() === '' || postDraft.content.trim() === '') {
      alert('Please fill in both title and content!');
      return;
    }
    
    alert(`Post submitted: ${postDraft.title}`);
    setPostDraft({ title: '', content: '' });
    setNewPostVisible(false);
  };

  return (
    <DashboardPageLayout>
      <div>
        {/* Header with date */}
        <div className="dashboard-header-with-date">
          <div className="dashboard-header-left-content">
            <h1 className="dashboard-title">Community</h1>
            <p className="dashboard-description">
              Connect with fellow MOONSET community members, join discussions, and stay updated
            </p>
          </div>
          <div className="dashboard-date">
            <CalendarDays size={16} />
            <span>{currentDate}</span>
          </div>
        </div>

        {/* Tabs for different community sections */}
        <div className="dashboard-tabs-list mb-6">
          <button 
            className={`dashboard-tab ${activeTab === "forums" ? "active" : ""}`}
            data-state={activeTab === "forums" ? "active" : "inactive"}
            onClick={() => setActiveTab("forums")}
          >
            Forums
          </button>
          <button 
            className={`dashboard-tab ${activeTab === "members" ? "active" : ""}`}
            data-state={activeTab === "members" ? "active" : "inactive"}
            onClick={() => setActiveTab("members")}
          >
            Members
          </button>
          <button 
            className={`dashboard-tab ${activeTab === "groups" ? "active" : ""}`}
            data-state={activeTab === "groups" ? "active" : "inactive"}
            onClick={() => setActiveTab("groups")}
          >
            Groups
          </button>
          <button 
            className={`dashboard-tab ${activeTab === "events" ? "active" : ""}`}
            data-state={activeTab === "events" ? "active" : "inactive"}
            onClick={() => setActiveTab("events")}
          >
            Events
          </button>
        </div>

        {activeTab === "forums" && (
          <>
            {/* Forums */}
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="flex-1 max-w-md relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search discussions..."
                  className="dashboard-search-input pl-9"
                  onChange={(e) => console.log('Searching forums:', e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2"
                  onClick={() => alert('Filter options will be available soon')}
                >
                  <Filter size={16} />
                  Filters
                </Button>
                <Button 
                  className="dashboard-button-primary"
                  onClick={toggleNewPost}
                >
                  <PlusCircle size={16} />
                  New Post
                </Button>
              </div>
            </div>

            {/* New Post Form */}
            {newPostVisible && (
              <Card className="dashboard-card mb-6">
                <div className="p-5">
                  <h3 className="text-base font-semibold mb-4">Create New Discussion</h3>
                  <div className="space-y-4">
                    <div>
                      <Input
                        placeholder="Discussion title"
                        className="dashboard-input mb-2"
                        value={postDraft.title}
                        onChange={(e) => handlePostInput('title', e.target.value)}
                      />
                    </div>
                    <div>
                      <Textarea
                        placeholder="Write your post here..."
                        className="dashboard-input min-h-[120px]"
                        value={postDraft.content}
                        onChange={(e) => handlePostInput('content', e.target.value)}
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        onClick={toggleNewPost}
                      >
                        Cancel
                      </Button>
                      <Button 
                        className="dashboard-button-primary"
                        onClick={submitPost}
                      >
                        Post
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Popular Discussions */}
            <h2 className="dashboard-section-title mb-4">Popular Discussions</h2>
            <Card className="dashboard-card mb-6">
              <div className="p-0">
                <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 p-4 border-b border-border font-medium text-sm text-muted-foreground">
                  <div>Topic</div>
                  <div>Title</div>
                  <div className="text-center">Replies</div>
                  <div className="text-center">Likes</div>
                  <div>Last Updated</div>
                </div>
                <ScrollArea className="h-[450px]">
                  {forumTopics.map((topic, index) => (
                    <div key={index} className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 p-4 border-b border-border hover:bg-accent/10 transition-colors">
                      <div>
                        <Badge variant="outline" className={`${getBadgeClass(topic.category)}`}>
                          {topic.category}
                        </Badge>
                      </div>
                      <div>
                        <div 
                          className="font-medium hover:text-primary cursor-pointer mb-1"
                          onClick={() => alert(`Opening topic: ${topic.title}`)}
                        >
                          {topic.title}
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                          <Avatar className="h-5 w-5">
                            <AvatarFallback className="text-[10px]">{getInitials(topic.author)}</AvatarFallback>
                          </Avatar>
                          <span>{topic.author}</span>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center gap-1 justify-center">
                          <MessageCircle size={14} />
                          <span>{topic.replies}</span>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center gap-1 justify-center">
                          <ThumbsUp size={14} />
                          <span>{topic.likes}</span>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {topic.lastUpdated}
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </div>
            </Card>

            {/* Community Stats */}
            <div className="dashboard-grid-3 mb-6">
              <Card className="dashboard-card">
                <div className="p-5 flex flex-col items-center justify-center h-full">
                  <Users size={24} className="mb-2 text-blue-400" />
                  <div className="text-2xl font-bold mb-1">28,547</div>
                  <div className="text-sm text-muted-foreground">Total Members</div>
                </div>
              </Card>
              <Card className="dashboard-card">
                <div className="p-5 flex flex-col items-center justify-center h-full">
                  <MessageSquare size={24} className="mb-2 text-indigo-400" />
                  <div className="text-2xl font-bold mb-1">5,328</div>
                  <div className="text-sm text-muted-foreground">Discussions</div>
                </div>
              </Card>
              <Card className="dashboard-card">
                <div className="p-5 flex flex-col items-center justify-center h-full">
                  <Flame size={24} className="mb-2 text-orange-400" />
                  <div className="text-2xl font-bold mb-1">1,249</div>
                  <div className="text-sm text-muted-foreground">Active Today</div>
                </div>
              </Card>
            </div>
          </>
        )}

        {activeTab === "members" && (
          <>
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="flex-1 max-w-md relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search members..."
                  className="dashboard-search-input pl-9"
                  onChange={(e) => console.log('Searching members:', e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2"
                  onClick={() => alert('Filter options for members will be available soon')}
                >
                  <Filter size={16} />
                  Filters
                </Button>
              </div>
            </div>
            
            <Card className="dashboard-card p-8 text-center">
              <UserRound size={48} className="mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-medium mb-2">Members Directory Coming Soon</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                We're building a comprehensive member directory to help you connect with other MOONSET enthusiasts. Stay tuned for updates!
              </p>
              <Button 
                className="dashboard-button-primary"
                onClick={() => alert('This feature will be available in our next update!')}
              >
                Get Notified
              </Button>
            </Card>
          </>
        )}

        {activeTab === "groups" && (
          <>
            <div className="flex items-center justify-between gap-4 mb-6">
              <h2 className="dashboard-section-title">Community Groups</h2>
              <Button 
                className="dashboard-button-primary" 
                size="sm"
                onClick={() => alert('Group creation will be available in our next update!')}
              >
                <UserRoundPlus size={16} />
                Create Group
              </Button>
            </div>
            
            <Card className="dashboard-card p-8 text-center">
              <UserPlus size={48} className="mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-medium mb-2">Community Groups Coming Soon</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Create or join interest-based groups to connect with like-minded MOONSET community members. This feature will be available in our next update.
              </p>
              <Button 
                className="dashboard-button-primary"
                onClick={() => alert('This feature will be available in our next update!')}
              >
                Get Notified
              </Button>
            </Card>
          </>
        )}

        {activeTab === "events" && (
          <>
            <div className="flex items-center justify-between gap-4 mb-6">
              <h2 className="dashboard-section-title">Upcoming Events</h2>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2"
                  onClick={() => alert('Calendar view will be available in our next update!')}
                >
                  <CalendarRange size={16} />
                  Calendar View
                </Button>
                <Button 
                  className="dashboard-button-primary" 
                  size="sm"
                  onClick={() => alert('Event creation will be available in our next update!')}
                >
                  <Calendar size={16} />
                  Add Event
                </Button>
              </div>
            </div>
            
            <div className="dashboard-grid-2 mb-6">
              <Card className="dashboard-card hover-lift">
                <div className="p-5">
                  <Badge className="bg-indigo-500/20 text-indigo-400 mb-4">
                    <Video size={14} className="mr-1" />
                    Webinar
                  </Badge>
                  <h3 className="text-lg font-semibold mb-2">DeFi Strategies for Beginners</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Learn the basics of DeFi protocols, yield farming opportunities, and how to minimize risks.
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar size={16} />
                      <span>Dec 15, 2023</span>
                    </div>
                    <div className="text-sm">8:00 PM UTC</div>
                  </div>
                  <Button 
                    className="w-full dashboard-button-primary"
                    onClick={() => alert('Registration for this event will open soon!')}
                  >
                    Register
                  </Button>
                </div>
              </Card>
              <Card className="dashboard-card hover-lift">
                <div className="p-5">
                  <Badge className="bg-blue-500/20 text-blue-400 mb-4">
                    <MessageSquare size={14} className="mr-1" />
                    AMA
                  </Badge>
                  <h3 className="text-lg font-semibold mb-2">Ask Me Anything: MOONSET Developers</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Join our development team for a live Q&A session about upcoming features and protocol improvements.
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar size={16} />
                      <span>Dec 22, 2023</span>
                    </div>
                    <div className="text-sm">3:00 PM UTC</div>
                  </div>
                  <Button 
                    className="w-full dashboard-button-primary"
                    onClick={() => alert('Registration for this event will open soon!')}
                  >
                    Set Reminder
                  </Button>
                </div>
              </Card>
            </div>
          </>
        )}
      </div>
    </DashboardPageLayout>
  )
}

// Helper function to get badge class based on category
function getBadgeClass(category) {
  switch (category) {
    case 'Announcement':
      return 'bg-blue-500/20 text-blue-400';
    case 'Discussion':
      return 'bg-green-500/20 text-green-400';
    case 'Question':
      return 'bg-amber-500/20 text-amber-400';
    case 'Proposal':
      return 'bg-purple-500/20 text-purple-400';
    default:
      return 'bg-slate-500/20 text-slate-400';
  }
}

// Helper function to get initials from name
function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

// Sample forum topics data
const forumTopics = [
  {
    category: 'Announcement',
    title: 'MOONSET Protocol v2.0 Launch Date Announced',
    author: 'Alex Thompson',
    replies: 28,
    likes: 56,
    lastUpdated: '2 hours ago'
  },
  {
    category: 'Discussion',
    title: 'What new features would you like to see in the next update?',
    author: 'Sarah Chen',
    replies: 42,
    likes: 37,
    lastUpdated: '4 hours ago'
  },
  {
    category: 'Question',
    title: 'How do I maximize my staking rewards?',
    author: 'Michael Rodriguez',
    replies: 16,
    likes: 12,
    lastUpdated: '6 hours ago'
  },
  {
    category: 'Proposal',
    title: 'Proposal: Add Multi-Chain Support for the Dashboard',
    author: 'Jennifer Kim',
    replies: 54,
    likes: 83,
    lastUpdated: '1 day ago'
  },
  {
    category: 'Discussion',
    title: 'Market analysis for Q4 2023 - Your thoughts?',
    author: 'David Wilson',
    replies: 31,
    likes: 29,
    lastUpdated: '1 day ago'
  },
  {
    category: 'Announcement',
    title: 'New Partnership with Major DeFi Protocol',
    author: 'Robert Lee',
    replies: 19,
    likes: 48,
    lastUpdated: '2 days ago'
  },
  {
    category: 'Question',
    title: 'Technical issue with wallet connection - need help',
    author: 'Emma Davis',
    replies: 8,
    likes: 3,
    lastUpdated: '2 days ago'
  },
  {
    category: 'Discussion',
    title: 'Token burning mechanism - pros and cons',
    author: 'Thomas Green',
    replies: 27,
    likes: 21,
    lastUpdated: '3 days ago'
  }
]; 