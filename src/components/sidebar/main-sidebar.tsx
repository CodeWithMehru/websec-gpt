"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { MessageSquare, FileText, ShieldCheck, History } from "lucide-react" // used ShieldCheck & FileText icons

const chatHistory = [
  { id: 1, title: "Salman CR Vs Quiyom Sir XXX" },
  { id: 2, title: "Waris Vs Junaid Sir Blowjob" },
  { id: 3, title: "Banana Mam Vs Tawseef Sir X Videos Link" },
  { id: 4, title: "College Leak Washroom Videos" },
  { id: 5, title: "CR Giving 💋 for internals HD leaked" },
]

export function MainSidebar() {
  return (
    <Sidebar className="border-r" variant="sidebar" collapsible="icon">

      {/* Header with clickable "WebSec GPT" */}
      <SidebarHeader className="p-2">
        <div className="flex flex-col items-start justify-center w-full px-4 py-2 md:py-5">
          <h1
            onClick={() => window.location.reload()}
            className="cursor-pointer text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary via-purple-500 to-red-500 text-transparent bg-clip-text transition hover:opacity-80"
          >
            WebSec GPT
          </h1>
        </div>
      </SidebarHeader>

      {/* Chat history and menu */}
      <SidebarContent className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="sm"
              variant="ghost"
              className="w-full justify-start text-muted-foreground font-normal"
            >
              <History size={16} />
              <span>Chats</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {chatHistory.map((chat) => (
            <SidebarMenuItem key={chat.id} className="mb-2">
              <SidebarMenuButton
                size="sm"
                variant="ghost"
                className="w-full justify-start font-medium text-[15px] leading-snug"
                tooltip={chat.title}
              >
                <MessageSquare size={18} className="text-muted-foreground" />
                <span>{chat.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      {/* Footer: Privacy Policy, Terms, User */}
      <SidebarFooter className="p-2">
        <SidebarMenu>
          {/* ✅ Privacy Policy */}
          <SidebarMenuItem>
            <SidebarMenuButton
              size="sm"
              variant="ghost"
              className="w-full justify-start font-normal"
              tooltip="Privacy Policy"
              onClick={() => window.open("/privacy", "_blank")}
            >
              <ShieldCheck size={16} />
              <span>Privacy Policy</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* ✅ Terms & Conditions */}
          <SidebarMenuItem>
            <SidebarMenuButton
              size="sm"
              variant="ghost"
              className="w-full justify-start font-normal"
              tooltip="Terms & Conditions"
              onClick={() => window.open("/terms", "_blank")}
            >
              <FileText size={16} />
              <span>Terms & Conditions</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* 👤 User */}
          <SidebarMenuItem>
            <SidebarMenuButton
              size="sm"
              variant="ghost"
              className="w-full justify-start gap-2 font-normal"
              tooltip="User Profile"
            >
              <Avatar className="h-7 w-7">
                <AvatarImage src="https://placehold.co/40x40.png" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <span>User</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

    </Sidebar>
  )
}
