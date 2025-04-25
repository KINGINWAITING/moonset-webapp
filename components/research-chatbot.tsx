"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bot, Lock, Send, User } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useWallet } from "@/components/wallet-provider"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

export function ResearchChatbot() {
  const { isConnected } = useWallet()
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your MOONSET Research Assistant. How can I help you today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [isPremium, setIsPremium] = useState(false)

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Simulate AI response
    setTimeout(() => {
      let responseContent = ""

      if (input.toLowerCase().includes("moonset") || input.toLowerCase().includes("token")) {
        responseContent =
          "MOONSET is an ERC-20 token that powers our decentralized research and community platform. It's used for governance, staking rewards, and accessing premium features."
      } else if (input.toLowerCase().includes("stake") || input.toLowerCase().includes("staking")) {
        responseContent =
          "You can stake your MOONSET tokens in the Staking section of the dashboard. Staking rewards include additional tokens and Premium Access NFTs."
      } else if (input.toLowerCase().includes("nft") || input.toLowerCase().includes("premium")) {
        responseContent =
          "Premium Access NFTs are earned by staking MOONSET tokens. These NFTs unlock exclusive features like advanced research tools and premium content."
      } else {
        responseContent =
          "I'm here to help with questions about MOONSET and our platform. For more detailed research assistance, you'll need Premium Access."
      }

      const assistantMessage: Message = {
        id: Date.now().toString(),
        content: responseContent,
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend()
    }
  }

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 p-4 text-center">
        <Bot className="h-12 w-12 text-muted-foreground" />
        <p className="text-muted-foreground">Connect your wallet to access the Research Assistant</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col space-y-4">
      <ScrollArea className="h-[400px] pr-4">
        <div className="flex flex-col space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className="flex items-start space-x-2">
                {message.role === "assistant" && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`rounded-lg px-4 py-2 max-w-[80%] ${
                    message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
                {message.role === "user" && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-muted">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {!isPremium && (
        <div className="rounded-lg bg-muted p-2 flex items-center justify-between">
          <div className="flex items-center">
            <Lock className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Basic mode. Upgrade for full research capabilities.</span>
          </div>
          <Button variant="link" size="sm" className="text-xs">
            Upgrade
          </Button>
        </div>
      )}

      <div className="flex space-x-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question..."
          className="flex-1"
        />
        <Button size="icon" onClick={handleSend} disabled={!input.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
