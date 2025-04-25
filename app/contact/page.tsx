"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="container max-w-5xl mx-auto py-16 px-6">
      <div className="mb-12 space-y-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold gradient-text">Contact Us</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Have questions or need help? We're here for you.
        </p>
      </div>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="space-y-8">
          <div className="rounded-3xl overflow-hidden h-64 bg-gradient-to-br from-purple-500 to-blue-600 p-8 text-white">
            <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
            <p className="mb-6 text-white/80">
              We'd love to hear from you. Fill out the form and we'll get back to you as soon as possible.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-3 text-white/80" />
                <span>123 Main Street, City, Country</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-white/80" />
                <span>hello@example.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-white/80" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-card border border-border/40 p-8 shadow-lg">
          <form className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <Input
                  id="name"
                  placeholder="Your name"
                  className="rounded-lg"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="rounded-lg"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-2">
                Subject
              </label>
              <Input
                id="subject"
                placeholder="How can we help you?"
                className="rounded-lg"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <Textarea
                id="message"
                placeholder="Your message..."
                className="rounded-lg min-h-[120px]"
              />
            </div>
            <Button
              className="w-full rounded-lg gradient-bg hover:shadow-glow"
            >
              Send Message
            </Button>
          </form>
        </div>
      </div>

      <div className="mt-16 rounded-3xl overflow-hidden h-[400px] bg-gray-100 dark:bg-gray-800">
        <div className="w-full h-full">
          {/* Embed a map here, using a placeholder for now */}
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-500/10 to-blue-600/10">
            <div className="text-center">
              <MapPin className="h-10 w-10 text-primary mx-auto mb-2" />
              <p className="text-muted-foreground">
                Interactive map would be displayed here
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 