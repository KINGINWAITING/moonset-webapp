"use client"

import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="container max-w-5xl mx-auto py-16 px-6">
      <div className="mb-12 space-y-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold gradient-text">About Us</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Learn more about our company and what makes us different.
        </p>
      </div>

      <div className="grid gap-12 md:grid-cols-2 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Our Story</h2>
          <p className="text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p className="text-muted-foreground">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <Button 
            className="rounded-full gradient-bg hover:shadow-glow"
          >
            Learn More
          </Button>
        </div>
        <div className="rounded-3xl overflow-hidden shadow-lg h-80 bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
          <div className="p-6 text-center text-white">
            <h3 className="text-2xl font-semibold mb-2">Our Mission</h3>
            <p className="text-white/80">
              To provide the best services and solutions to our clients and make a positive 
              impact in the world through innovative technology.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-20 grid gap-8 md:grid-cols-3">
        <div className="p-6 rounded-2xl bg-card border border-border/40 hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="text-white"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path></svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Trusted Security</h3>
          <p className="text-muted-foreground">
            We prioritize security in everything we do, ensuring your data is always protected.
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-card border border-border/40 hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="text-white"><circle cx="12" cy="12" r="10"></circle><path d="m4.9 4.9 14.2 14.2"></path></svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
          <p className="text-muted-foreground">
            Our dedicated team is always available to help you with any issues or questions.
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-card border border-border/40 hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="text-white"><path d="M12.5 3a17 17 0 0 0-9.5 15.5"></path><path d="M12.5 3a17 17 0 0 1 9.5 15.5"></path><path d="M12.5 3a36 36 0 0 0-5 19"></path><path d="M12.5 3a36 36 0 0 1 5 19"></path><circle cx="12.5" cy="22" r="1"></circle></svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Global Reach</h3>
          <p className="text-muted-foreground">
            Our services are available worldwide, supporting clients across all regions.
          </p>
        </div>
      </div>
    </div>
  )
} 