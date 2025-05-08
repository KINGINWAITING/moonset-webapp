"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Search, ArrowUpRight, ChevronRight, HelpCircle, Lightbulb, Coins, Lock, ArrowRight } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MoonsetLogo } from "@/components/moonset-logo"

export default function FAQsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  
  const faqCategories = [
    {
      id: "general",
      label: "General",
      icon: <HelpCircle className="h-4 w-4" />,
      questions: [
        {
          question: "What is MoonSet?",
          answer: "MoonSet is a groundbreaking cryptocurrency project built on the Ethereum blockchain with the core mission of exposing what we believe to be the meticulously orchestrated deception surrounding the 1969 moon landing. Our project leverages blockchain technology to unite a global community around the pursuit of truth."
        },
        {
          question: "Is MoonSet just another meme coin?",
          answer: "While MoonSet shares the characteristic of community-driven value with meme coins, our foundation lies in a decades-long pursuit of what we believe to be a significant historical truth. Our project is not predicated on fleeting internet trends but on a growing global awareness and critical re-evaluation of the evidence surrounding the moon landing."
        },
        {
          question: "Why use blockchain technology for this purpose?",
          answer: "Blockchain technology provides transparency, immutability, and censorship resistance—all crucial for preserving and sharing research that challenges powerful established narratives. The decentralized nature ensures that our findings and evidence cannot be easily silenced or removed."
        },
        {
          question: "What evidence do you have that the moon landing was faked?",
          answer: "Our core arguments are based on a meticulous analysis of photographic anomalies (the absence of stars, waving flag, inconsistent shadows), technical challenges (radiation exposure, lunar dust problems), and political context (Cold War pressure). For a detailed breakdown of our evidence, please visit our About page or read our full Whitepaper."
        }
      ]
    },
    {
      id: "token",
      label: "Token",
      icon: <Coins className="h-4 w-4" />,
      questions: [
        {
          question: "What is the MOONSET token?",
          answer: "MOONSET is an ERC-20 utility token on the Ethereum blockchain that serves as the cornerstone of the MoonSet ecosystem. It is designed to empower individuals who share our conviction about the lunar landing and to incentivize the collective pursuit and dissemination of truth."
        },
        {
          question: "What is the total supply of MOONSET tokens?",
          answer: "The total supply of MOONSET tokens is 10,000,000,000 (Ten Billion). The tokens are distributed as follows: 15% to Founders and Core Team, 25% for Community Airdrop and Initial DEX Offering, 30% for Research and Development Fund, 20% for Community Rewards and Incentives, and 10% for Strategic Partnerships and Advisors."
        },
        {
          question: "How can I acquire MOONSET tokens?",
          answer: "MOONSET tokens will be available through our Initial DEX Offering (IDO) on decentralized exchanges. Additionally, we plan to distribute a portion of tokens through community airdrops to early supporters. For the latest information on token acquisition, please visit our Dashboard."
        },
        {
          question: "What utility does the MOONSET token provide?",
          answer: "MOONSET tokens serve multiple functions: they grant governance rights for community decision-making, provide access to premium content in our decentralized lunar truth archive, incentivize content creation and research contributions, and can be staked for rewards in our ecosystem."
        }
      ]
    },
    {
      id: "participation",
      label: "Participation",
      icon: <Lightbulb className="h-4 w-4" />,
      questions: [
        {
          question: "How can I contribute to the MoonSet project?",
          answer: "You can contribute in several ways: join our community and participate in discussions, stake MOONSET tokens to support the project, create and share content related to the moon landing controversy, contribute to research initiatives, or help develop our decentralized lunar truth archive."
        },
        {
          question: "What kind of content is valued in the MoonSet ecosystem?",
          answer: "We value well-researched articles, in-depth video analyses, compelling documentaries, innovative technological tools, and other content that furthers our understanding of the lunar landing controversy. Quality, authenticity, and originality are highly regarded in our ecosystem."
        },
        {
          question: "Is there a roadmap for the MoonSet project?",
          answer: "Yes, our roadmap consists of four phases: Genesis and Token Launch (Q2 2025), Community Building and Ecosystem Development (Q3-Q4 2025), Expansion and Awareness (Q1-Q2 2026), and Long-Term Sustainability and Impact (ongoing). Each phase has specific objectives to advance our mission."
        },
        {
          question: "How is the Research and Development Fund managed?",
          answer: "The Research and Development Fund, which constitutes 30% of the total token supply, is managed through community governance. MOONSET holders can participate in voting on key decisions related to fund allocation for research projects, content creation, and development of the decentralized lunar truth archive."
        }
      ]
    },
    {
      id: "security",
      label: "Security",
      icon: <Lock className="h-4 w-4" />,
      questions: [
        {
          question: "Is investing in MOONSET tokens risky?",
          answer: "Yes, investing in cryptocurrencies, including MOONSET, involves significant risks, and you could lose your entire investment. The value of cryptocurrencies can be highly volatile and is subject to market fluctuations. Always conduct thorough research and consider consulting with a financial advisor before investing."
        },
        {
          question: "How are smart contracts secured in the MoonSet ecosystem?",
          answer: "All smart contracts in the MoonSet ecosystem undergo rigorous auditing processes by reputable security firms before deployment. We implement industry best practices for smart contract development and maintain transparency by making our code open-source for community review."
        },
        {
          question: "What measures are in place to prevent token price manipulation?",
          answer: "We implement vesting schedules for team tokens, liquidity locking mechanisms, and transparent token economics to mitigate the risk of price manipulation. Additionally, our governance system allows for community oversight of major token movements and decisions."
        },
        {
          question: "Are my personal details secure if I participate in the MoonSet community?",
          answer: "We prioritize privacy and data security. Participation in our community does not require extensive personal information. When interacting with our ecosystem through wallet addresses, you maintain the pseudonymity inherent to blockchain technology. Our websites implement standard security measures to protect any data collected."
        }
      ]
    }
  ]
  
  // Filter questions based on search query
  const filteredFAQs = searchQuery ? 
    faqCategories.map(category => ({
      ...category,
      questions: category.questions.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(category => category.questions.length > 0) 
    : faqCategories
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-16">
        {/* Background glow effects */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full filter blur-[100px] z-0"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/20 rounded-full filter blur-[100px] z-0"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-12">
              <MoonsetLogo width={400} variant="full" />
            </div>
            
            <Badge className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-white border-0 py-1.5 px-4 text-sm backdrop-blur-md mb-6">
              Knowledge Base
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Frequently Asked <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Questions</span>
            </h1>
            
            <p className="text-lg text-white/80 leading-relaxed mb-10 max-w-2xl mx-auto">
              Find answers to common questions about the MoonSet project, our mission, and the MOONSET token ecosystem.
            </p>
            
            <div className="max-w-xl mx-auto relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50">
                <Search className="h-5 w-5" />
              </div>
              <Input
                placeholder="Search for answers..."
                className="bg-white/5 border-white/10 text-white h-12 pl-10 rounded-lg focus:border-purple-500 focus:ring-purple-500/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Content Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-6">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="flex justify-center max-w-3xl mx-auto mb-12 bg-transparent border border-white/10 rounded-xl overflow-hidden">
              {faqCategories.map(category => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/70 hover:text-white px-6 py-3 flex items-center gap-2"
                >
                  {category.icon}
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {filteredFAQs.length > 0 ? (
              <>
                {faqCategories.map(category => (
                  <TabsContent key={category.id} value={category.id} className="mt-0">
                    <Card className="dashboard-card border-white/10 p-2 md:p-6 backdrop-blur-sm">
                      <CardContent className="p-0">
                        <Accordion type="single" collapsible className="w-full">
                          {filteredFAQs.find(c => c.id === category.id)?.questions.map((faq, index) => (
                            <AccordionItem 
                              key={index} 
                              value={`${category.id}-item-${index}`}
                              className="border-b border-white/10 last:border-b-0"
                            >
                              <AccordionTrigger className="py-5 px-4 text-left text-lg font-medium text-white hover:text-purple-400 transition-colors">
                                {faq.question}
                              </AccordionTrigger>
                              <AccordionContent className="text-white/70 pb-6 pt-2 px-4">
                                {faq.answer}
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </>
            ) : (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-white/50" />
                </div>
                <h3 className="text-xl font-medium text-white mb-2">No results found</h3>
                <p className="text-white/70 mb-6">We couldn't find any FAQs matching your search query</p>
                <Button 
                  variant="outline" 
                  className="border-white/20 bg-white/5 text-white hover:bg-white/10"
                  onClick={() => setSearchQuery("")}
                >
                  Clear Search
                </Button>
              </div>
            )}
          </Tabs>
        </div>
      </section>
      
      {/* Still Have Questions Section */}
      <section className="py-16 relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 border border-white/10 rounded-2xl p-10 backdrop-blur-sm">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 flex items-center justify-center mx-auto mb-6">
                <HelpCircle className="h-8 w-8 text-white" />
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Still Have Questions?</h2>
              
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                If you couldn't find the answer you were looking for, our community is here to help. Join our community channels or reach out to our support team.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/contact">
                  <Button className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0 hover:opacity-90">
                    Contact Support
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/dashboard/community">
                  <Button variant="outline" className="w-full sm:w-auto border-white/20 bg-white/5 text-white hover:bg-white/10">
                    Join Community
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Related Links Section */}
      <section className="py-8 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-white mb-6">Helpful Resources</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/about">
                <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors hover-lift group">
                  <h4 className="text-white font-semibold mb-2 flex items-center">
                    About MoonSet
                    <ChevronRight className="ml-2 h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </h4>
                  <p className="text-white/70 text-sm">
                    Learn more about our mission, evidence, and the team behind the MoonSet project.
                  </p>
                </div>
              </Link>
              
              <Link href="/whitepaper">
                <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors hover-lift group">
                  <h4 className="text-white font-semibold mb-2 flex items-center">
                    Whitepaper
                    <ChevronRight className="ml-2 h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </h4>
                  <p className="text-white/70 text-sm">
                    Dive into the detailed technical and conceptual foundation of the MoonSet project.
                  </p>
                </div>
              </Link>
              
              <Link href="/dashboard">
                <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors hover-lift group">
                  <h4 className="text-white font-semibold mb-2 flex items-center">
                    Dashboard
                    <ChevronRight className="ml-2 h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </h4>
                  <p className="text-white/70 text-sm">
                    Access your wallet, staking options, and the MoonSet community platform.
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Disclaimer */}
      <section className="py-4 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <p className="text-white/40 text-xs text-center">
              The information provided on this page is for informational purposes only and does not constitute financial or investment advice. The claims and opinions expressed regarding the 1969 moon landing are those of the MoonSet project team.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
} 