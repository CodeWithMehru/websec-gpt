
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
        content: `Cxutmaya Ye Nich Kucher Ye Chu Wni Prototypi Hout Wni Chu Meh Data Feed Krni`,
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
    <SidebarInset className="flex flex-col h-full">

      <header className="flex items-center justify-between p-2 md:p-4 border-b">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="md:hidden" />
        </div>
        <div className="ml-auto pr-0">
          <ThemeToggle />
        </div>
      </header>

      <main className="flex flex-1 flex-col overflow-hidden"> {/* Fix height */}
  <ScrollArea className="flex-1 overflow-y-auto" ref={scrollAreaRef}>
    <div className="p-2 md:p-6 lg:p-8 space-y-2 max-w-4xl mx-auto">
      {showWelcome ? (
        <ChatWelcome />
      ) : (
        messages.map((message) => <ChatMessage key={message.id} {...message} />)
      )}
    </div>
  </ScrollArea>
</main>

      <footer className="px-2 py-2 md:px-4 md:py-2 border-t bg-background">
  <div className="max-w-2xl mx-auto px-0">
    <ChatInput onSendMessage={handleSendMessage} />
    <p className="text-xs text-center text-muted-foreground mt-1 mb-0">
      WebSec GPT can make mistakes. Check important info.
    </p>
  </div>
</footer>

    </SidebarInset>
  )
}
