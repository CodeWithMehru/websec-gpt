"use client"
import React, { useState, useRef, useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Image, Mic, SendHorizonal } from "lucide-react"

interface ChatInputProps {
  onSendMessage: (content: string) => void
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // You can handle the file upload logic here.
      // For now, we'll just log it to the console.
      console.log("Selected file:", file.name);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
  }

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim())
      setMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }
  
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  return (
    <div className="relative">
      <div className="flex gap-2 items-end px-1 md:px-2 rounded-2xl bg-secondary/50 border border-border">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
        />
        <Button variant="ghost" size="icon" className="shrink-0" onClick={handleImageUploadClick}>
          <Image />
          <span className="sr-only">Upload Image</span>
        </Button>
        <Button variant="ghost" size="icon" className="shrink-0">
          <Mic />
          <span className="sr-only">Use Microphone</span>
        </Button>
        <Textarea
          ref={textareaRef}
          value={message}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Enter a prompt here"
          className="flex-1 resize-none border-0 shadow-none focus-visible:ring-0 bg-transparent max-h-48 py-2"
          rows={1}
        />
        <Button
          size="icon"
          onClick={handleSend}
          disabled={!message.trim()}
          className="shrink-0 bg-accent hover:bg-accent/90 disabled:bg-muted"
        >
          <SendHorizonal />
          <span className="sr-only">Send</span>
        </Button>
      </div>
    </div>
  )
}
