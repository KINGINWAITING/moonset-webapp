"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Twitter } from "lucide-react"
import Image from "next/image"

export default function TeamPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 space-y-4">
        <h1 className="text-4xl font-bold">Our Team</h1>
        <p className="text-xl text-muted-foreground">Meet the people behind MOONSET</p>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Leadership</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="overflow-hidden">
            <div className="aspect-square w-full relative bg-muted">
              <Image src="/placeholder.svg?height=300&width=300" alt="CEO" fill className="object-cover" />
            </div>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Alex Mitchell</CardTitle>
                <Badge variant="outline">CEO & Founder</Badge>
              </div>
              <CardDescription>
                Former blockchain lead at TechCorp with 10+ years of experience in cryptocurrency and decentralized
                systems.
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between">
              <div className="flex space-x-2">
                <Button variant="outline" size="icon">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Github className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>

          <Card className="overflow-hidden">
            <div className="aspect-square w-full relative bg-muted">
              <Image src="/placeholder.svg?height=300&width=300" alt="CTO" fill className="object-cover" />
            </div>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Sarah Chen</CardTitle>
                <Badge variant="outline">CTO</Badge>
              </div>
              <CardDescription>
                PhD in Computer Science with expertise in AI and blockchain technology. Previously led engineering at
                DeFi Protocol.
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between">
              <div className="flex space-x-2">
                <Button variant="outline" size="icon">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Github className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>

          <Card className="overflow-hidden">
            <div className="aspect-square w-full relative bg-muted">
              <Image src="/placeholder.svg?height=300&width=300" alt="COO" fill className="object-cover" />
            </div>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Michael Rodriguez</CardTitle>
                <Badge variant="outline">COO</Badge>
              </div>
              <CardDescription>
                Operations expert with experience scaling blockchain startups. Former operations director at
                CryptoVentures.
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between">
              <div className="flex space-x-2">
                <Button variant="outline" size="icon">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Github className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Engineering</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="overflow-hidden">
            <div className="aspect-square w-full relative bg-muted">
              <Image src="/placeholder.svg?height=200&width=200" alt="Lead Engineer" fill className="object-cover" />
            </div>
            <CardHeader className="p-4">
              <CardTitle className="text-lg">David Kim</CardTitle>
              <CardDescription>Lead Blockchain Engineer</CardDescription>
            </CardHeader>
          </Card>

          <Card className="overflow-hidden">
            <div className="aspect-square w-full relative bg-muted">
              <Image
                src="/placeholder.svg?height=200&width=200"
                alt="Frontend Developer"
                fill
                className="object-cover"
              />
            </div>
            <CardHeader className="p-4">
              <CardTitle className="text-lg">Emma Johnson</CardTitle>
              <CardDescription>Frontend Lead</CardDescription>
            </CardHeader>
          </Card>

          <Card className="overflow-hidden">
            <div className="aspect-square w-full relative bg-muted">
              <Image
                src="/placeholder.svg?height=200&width=200"
                alt="Backend Developer"
                fill
                className="object-cover"
              />
            </div>
            <CardHeader className="p-4">
              <CardTitle className="text-lg">James Wilson</CardTitle>
              <CardDescription>Backend Developer</CardDescription>
            </CardHeader>
          </Card>

          <Card className="overflow-hidden">
            <div className="aspect-square w-full relative bg-muted">
              <Image
                src="/placeholder.svg?height=200&width=200"
                alt="Smart Contract Developer"
                fill
                className="object-cover"
              />
            </div>
            <CardHeader className="p-4">
              <CardTitle className="text-lg">Olivia Martinez</CardTitle>
              <CardDescription>Smart Contract Specialist</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Research & Content</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="overflow-hidden">
            <div className="aspect-square w-full relative bg-muted">
              <Image src="/placeholder.svg?height=200&width=200" alt="Research Lead" fill className="object-cover" />
            </div>
            <CardHeader className="p-4">
              <CardTitle className="text-lg">Dr. Robert Lee</CardTitle>
              <CardDescription>Research Director</CardDescription>
            </CardHeader>
          </Card>

          <Card className="overflow-hidden">
            <div className="aspect-square w-full relative bg-muted">
              <Image src="/placeholder.svg?height=200&width=200" alt="AI Specialist" fill className="object-cover" />
            </div>
            <CardHeader className="p-4">
              <CardTitle className="text-lg">Dr. Sophia Patel</CardTitle>
              <CardDescription>AI Research Lead</CardDescription>
            </CardHeader>
          </Card>

          <Card className="overflow-hidden">
            <div className="aspect-square w-full relative bg-muted">
              <Image src="/placeholder.svg?height=200&width=200" alt="Content Manager" fill className="object-cover" />
            </div>
            <CardHeader className="p-4">
              <CardTitle className="text-lg">Thomas Brown</CardTitle>
              <CardDescription>Content Manager</CardDescription>
            </CardHeader>
          </Card>

          <Card className="overflow-hidden">
            <div className="aspect-square w-full relative bg-muted">
              <Image src="/placeholder.svg?height=200&width=200" alt="Crypto Analyst" fill className="object-cover" />
            </div>
            <CardHeader className="p-4">
              <CardTitle className="text-lg">Natalie Garcia</CardTitle>
              <CardDescription>Cryptocurrency Analyst</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Advisors</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="overflow-hidden">
            <div className="aspect-square w-full relative bg-muted">
              <Image
                src="/placeholder.svg?height=250&width=250"
                alt="Blockchain Advisor"
                fill
                className="object-cover"
              />
            </div>
            <CardHeader className="p-4">
              <CardTitle className="text-lg">Prof. Alan Zhang</CardTitle>
              <CardDescription>Blockchain Technology Advisor</CardDescription>
            </CardHeader>
            <CardContent className="px-4 pb-4 pt-0">
              <p className="text-sm text-muted-foreground">
                Professor of Computer Science at MIT, specializing in distributed systems and blockchain technology.
              </p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <div className="aspect-square w-full relative bg-muted">
              <Image src="/placeholder.svg?height=250&width=250" alt="Finance Advisor" fill className="object-cover" />
            </div>
            <CardHeader className="p-4">
              <CardTitle className="text-lg">Elizabeth Taylor</CardTitle>
              <CardDescription>Financial Strategy Advisor</CardDescription>
            </CardHeader>
            <CardContent className="px-4 pb-4 pt-0">
              <p className="text-sm text-muted-foreground">
                Former CFO of a major cryptocurrency exchange with expertise in tokenomics and financial planning.
              </p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <div className="aspect-square w-full relative bg-muted">
              <Image src="/placeholder.svg?height=250&width=250" alt="Legal Advisor" fill className="object-cover" />
            </div>
            <CardHeader className="p-4">
              <CardTitle className="text-lg">Jonathan Miller</CardTitle>
              <CardDescription>Legal & Regulatory Advisor</CardDescription>
            </CardHeader>
            <CardContent className="px-4 pb-4 pt-0">
              <p className="text-sm text-muted-foreground">
                Blockchain legal expert with experience navigating regulatory frameworks across multiple jurisdictions.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Join Our Team</h2>
        <Card>
          <CardHeader>
            <CardTitle>We're Hiring!</CardTitle>
            <CardDescription>
              Looking for talented individuals to join our mission of revolutionizing cryptocurrency research and
              community collaboration.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Current openings:</p>
            <ul className="space-y-2 list-disc pl-5">
              <li>Senior Solidity Developer</li>
              <li>AI Research Scientist</li>
              <li>Community Manager</li>
              <li>UI/UX Designer</li>
              <li>Technical Writer</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              View Open Positions
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
