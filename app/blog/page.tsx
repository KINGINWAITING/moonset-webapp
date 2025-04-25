"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function BlogPage() {
  return (
    <div className="container max-w-5xl mx-auto py-16 px-6">
      <div className="mb-12 space-y-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold gradient-text">Our Blog</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Latest news, updates, and insights from our team
        </p>
      </div>

      <div className="max-w-md mx-auto mb-10">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search articles..."
            className="pl-10 rounded-full h-12 border-purple-100 dark:border-purple-900/30"
          />
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Blog Post 1 */}
        <div className="group overflow-hidden rounded-2xl bg-card border border-border/40 transition-all hover:shadow-lg">
          <div className="h-52 w-full overflow-hidden bg-gradient-to-br from-purple-500 to-blue-600"></div>
          <div className="p-6">
            <p className="mb-2 text-sm text-primary">Jun 23, 2023 • 5 min read</p>
            <h3 className="mb-2 text-xl font-semibold group-hover:text-primary transition-colors">
              Getting Started with Our Platform
            </h3>
            <p className="mb-4 text-muted-foreground">
              Learn how to set up your account and make the most of our platform's features.
            </p>
            <Button variant="link" className="p-0 text-primary">Read More →</Button>
          </div>
        </div>

        {/* Blog Post 2 */}
        <div className="group overflow-hidden rounded-2xl bg-card border border-border/40 transition-all hover:shadow-lg">
          <div className="h-52 w-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600"></div>
          <div className="p-6">
            <p className="mb-2 text-sm text-primary">Jun 18, 2023 • 7 min read</p>
            <h3 className="mb-2 text-xl font-semibold group-hover:text-primary transition-colors">
              10 Tips for Better Productivity
            </h3>
            <p className="mb-4 text-muted-foreground">
              Boost your workflow with these essential productivity tips and tricks.
            </p>
            <Button variant="link" className="p-0 text-primary">Read More →</Button>
          </div>
        </div>

        {/* Blog Post 3 */}
        <div className="group overflow-hidden rounded-2xl bg-card border border-border/40 transition-all hover:shadow-lg">
          <div className="h-52 w-full overflow-hidden bg-gradient-to-br from-indigo-500 to-blue-600"></div>
          <div className="p-6">
            <p className="mb-2 text-sm text-primary">Jun 12, 2023 • 4 min read</p>
            <h3 className="mb-2 text-xl font-semibold group-hover:text-primary transition-colors">
              Understanding Our Security Features
            </h3>
            <p className="mb-4 text-muted-foreground">
              A deep dive into how we protect your data and ensure privacy on our platform.
            </p>
            <Button variant="link" className="p-0 text-primary">Read More →</Button>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <Button 
          className="rounded-full gradient-bg hover:shadow-glow"
        >
          Load More Articles
        </Button>
      </div>
    </div>
  )
} 