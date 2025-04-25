"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function FAQsPage() {
  return (
    <div className="container max-w-4xl mx-auto py-16 px-6">
      <div className="mb-12 space-y-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold gradient-text">Frequently Asked Questions</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Find answers to common questions about our platform and services
        </p>
      </div>

      <div className="max-w-md mx-auto mb-10">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search questions..."
            className="pl-10 rounded-full h-12 border-purple-100 dark:border-purple-900/30"
          />
        </div>
      </div>

      <div className="rounded-3xl bg-card border border-border/40 p-8 shadow-lg mb-10">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border-b border-border/60">
            <AccordionTrigger className="text-lg font-medium py-4 hover:text-primary transition-colors">
              What services do you offer?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-4">
              We provide a comprehensive suite of digital solutions including web design, app development, 
              cloud services, and digital marketing. Our team specializes in creating custom solutions 
              tailored to your specific business needs.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border-b border-border/60">
            <AccordionTrigger className="text-lg font-medium py-4 hover:text-primary transition-colors">
              How much do your services cost?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-4">
              Our pricing varies depending on project scope, timeline, and specific requirements. 
              We offer flexible pricing options including one-time project fees, retainer arrangements, 
              and subscription models. Contact us for a personalized quote.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border-b border-border/60">
            <AccordionTrigger className="text-lg font-medium py-4 hover:text-primary transition-colors">
              How long does it take to complete a project?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-4">
              Project timelines depend on complexity, scope, and requirements. A simple website might 
              take 2-4 weeks, while a complex web application could take 3-6 months. We'll provide a 
              detailed timeline during our initial consultation.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="border-b border-border/60">
            <AccordionTrigger className="text-lg font-medium py-4 hover:text-primary transition-colors">
              Do you provide ongoing support?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-4">
              Yes, we offer various support and maintenance packages to ensure your digital products 
              remain up-to-date and function smoothly. Our support includes regular updates, security 
              patches, performance optimization, and technical assistance.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5" className="border-b-0">
            <AccordionTrigger className="text-lg font-medium py-4 hover:text-primary transition-colors">
              How do I get started with your services?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-4">
              Getting started is easy! Simply contact us through our website, email, or phone. 
              We'll schedule an initial consultation to discuss your project requirements, goals, 
              and vision. After gathering all necessary information, we'll provide a proposal and 
              timeline for your project.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-purple-500 to-blue-600 p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
        <p className="mb-6 text-white/80 max-w-lg mx-auto">
          If you couldn't find the answer to your question, our team is here to help.
          Reach out to us anytime.
        </p>
        <Button className="bg-white text-blue-700 hover:bg-white/90 rounded-full">
          Contact Support
        </Button>
      </div>
    </div>
  )
} 