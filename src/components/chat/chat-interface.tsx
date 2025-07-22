
"use client"
import React, { useState, useRef, useEffect } from 'react';
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { ChatWelcome } from "./chat-welcome"
import { ChatInput } from "./chat-input"
import { ChatMessage, type Message } from "./chat-message"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ThemeToggle } from '../theme-toggle';

const initialMessages: Message[] = [];

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [showWelcome, setShowWelcome] = useState(messages.length === 0);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = (content: string) => {
    if (showWelcome) {
      setShowWelcome(false);
    }
    const userMessage: Message = {
      id: String(Date.now()),
      sender: 'user',
      content,
    };
    setMessages((prev) => [...prev, userMessage]);

    // Mock AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: String(Date.now() + 1),
        sender: 'ai',
        content: `This is a mocked response to: "${content}". I am a front-end clone and do not have real AI capabilities. Here is some example code:\n\`\`\`javascript\nconsole.log("Hello, World!");\n\`\`\``,
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTo({
                top: viewport.scrollHeight,
                behavior: 'smooth',
            });
        }
    }
  }, [messages]);

  return (
    <SidebarInset className="flex flex-col max-h-screen">
      <header className="flex items-center justify-between p-2 md:p-4 border-b">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="md:hidden" />
          <h1 className="text-lg font-semibold">WebSec GPT</h1>
        </div>
        <ThemeToggle />
      </header>

      <main className="flex-1 overflow-y-auto">
        <ScrollArea className="h-full" ref={scrollAreaRef}>
          <div className="p-4 md:p-6 lg:p-8 space-y-6 max-w-4xl mx-auto">
            {showWelcome ? (
              <ChatWelcome />
            ) : (
              messages.map((message) => <ChatMessage key={message.id} {...message} />)
            )}
          </div>
        </ScrollArea>
      </main>

      <footer className="p-4 md:p-6 border-t bg-background">
        <div className="max-w-4xl mx-auto">
          <ChatInput onSendMessage={handleSendMessage} />
          <p className="text-xs text-center text-muted-foreground mt-2">
          WebSec GPT can make mistakes. Check important info.
          </p>
        </div>
      </footer>
    </SidebarInset>
  )
}
