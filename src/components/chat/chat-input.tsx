
"use client"
import { Input } from "@/components/ui/input"
import { Image, Mic, SendHorizonal } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useRef, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

export function ChatInput({ onSendMessage }: { onSendMessage: (message: string) => void }) {
  const [input, setInput] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = "en-US"
  
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        setInput((prev) => prev + transcript)
      }
  
      recognition.onerror = (event) => {
        toast({
          variant: "destructive",
          title: "Mic error",
          description: `Error: ${event.error}`,
        })
        setIsRecording(false)
      }
  
      recognition.onend = () => setIsRecording(false)
  
      recognitionRef.current = recognition
    }
  }, [toast])
  

  const handleSend = () => {
    if (!input.trim()) return
    if (isRecording) recognitionRef.current?.stop()
    onSendMessage(input.trim())
    setInput("")
    inputRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleMicClick = () => {
    if (!recognitionRef.current) {
      toast({
        variant: "destructive",
        title: "Mic not supported",
        description: "Browser doesn't support speech recognition",
      })
      return
    }

    if (isRecording) {
      recognitionRef.current.stop()
      setIsRecording(false)
    } else {
      try {
        recognitionRef.current.start()
        setIsRecording(true)
      } catch (err) {
        toast({
          variant: "destructive",
          title: "Mic start error",
          description: "Mic permission denied or already active",
        })
      }
    }
  }

  const handleImageUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) console.log("Selected file:", file.name)
  }

  return (
    <div className="w-full">
      <div
        className={cn(
          "flex items-center gap-2 bg-muted border rounded-full px-4 h-16 transition-colors duration-150",
          input.trim() ? "border-primary" : "border-black/50 dark:border-white/20",
          "focus-within:border-primary"
        )}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
  
        <Input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1 border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-base pl-0"
        />
  
        <div className="flex items-center space-x-0 ml-1 -mr-3">
          <button
            type="button"
            onClick={handleImageUploadClick}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-secondary transition active:scale-95"
          >
            <Image className="text-muted-foreground w-5 h-5" />
          </button>
  
          <button
            type="button"
            onClick={handleMicClick}
            className={cn(
              "w-10 h-10 flex items-center justify-center rounded-full transition active:scale-95",
              isRecording ? "bg-red-500/20" : "hover:bg-secondary"
            )}
          >
            <Mic
              className={cn(
                "w-5 h-5 text-muted-foreground",
                isRecording && "text-red-600 animate-pulse"
              )}
            />
          </button>
        </div>
  
        <button
          type="button"
          onClick={handleSend}
          disabled={!input.trim()}
          className={cn(
            "ml-2 w-10 h-10 flex items-center justify-center rounded-full transition-all active:scale-95",
            "bg-transparent hover:bg-transparent", // Transparent background
            input.trim()
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          )}
        >
          <SendHorizonal className="w-5 h-5" />
        </button>

      </div>
    </div>
  )
}
