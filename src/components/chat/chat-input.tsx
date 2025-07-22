
"use client"
import React, { useState, useRef, useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Image, Mic, SendHorizonal } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

interface ChatInputProps {
  onSendMessage: (content: string) => void
}

// Extend the Window interface to include webkitSpeechRecognition
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        setMessage(prevMessage => prevMessage + finalTranscript + interimTranscript);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        toast({
          variant: "destructive",
          title: "Speech Recognition Error",
          description: `An error occurred: ${event.error}`,
        });
        setIsRecording(false);
      };
      
      recognition.onend = () => {
        setIsRecording(false);
      }

      recognitionRef.current = recognition;
    } else {
      console.warn("Speech Recognition not supported in this browser.");
    }

    return () => {
      recognitionRef.current?.stop();
    };
  }, [toast]);

  const handleMicClick = () => {
    if (!recognitionRef.current) {
      toast({
        variant: "destructive",
        title: "Unsupported Feature",
        description: "Speech recognition is not supported by your browser.",
      });
      return;
    }
    
    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      // Clear message on new recording
      setMessage("");
      try {
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (error) {
        console.error("Could not start recognition", error);
        toast({
          variant: "destructive",
          title: "Could not start recording",
          description: "Please ensure microphone permissions are granted.",
        });
      }
    }
  };


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
      if(isRecording) {
        recognitionRef.current?.stop();
        setIsRecording(false);
      }
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
      <div className="flex gap-5 items-center p-2 rounded-2xl bg-secondary/20 border border-border">
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
        <Button variant="ghost" size="icon" className="shrink-0" onClick={handleMicClick}>
          <Mic className={cn(isRecording && "text-red-500")} />
          <span className="sr-only">Use Microphone</span>
        </Button>
        <Textarea
          ref={textareaRef}
          value={message}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Ask anything"
          className="flex-1 resize-none border-0 shadow-none focus-visible:ring-0 bg-transparent max-h-48 py-7"
          rows={1}
        />
        <Button
          size="icon"
          onClick={handleSend}
          disabled={!message.trim()}
          className="shrink-0 bg-background hover:bg-secondary text-foreground disabled:bg-muted rounded-full w-8 h-8"
        >
          <SendHorizonal className="text-black dark:text-white" />
          <span className="sr-only">Send</span>
        </Button>
      </div>
    </div>
  )
}
