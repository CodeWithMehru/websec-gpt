"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"
import { MessageSquare, Settings, HelpCircle, History } from "lucide-react"

const chatHistory = [
  { id: 1, title: "React best practices" },
  { id: 2, title: "Next.js 14 new features" },
  { id: 3, title: "How to use Tailwind CSS" },
  { id: 4, title: "Kubernetes deployment guide" },
  { id: 5, title: "GraphQL vs REST API" },
  { id: 6, title: "A history of ancient Rome" },
  { id: 7, title: "Tips for public speaking" },
]

export function MainSidebar() {
  return (
    <Sidebar className="border-r" variant="sidebar" collapsible="icon">
      
      {/* Header with "WebSec GPT" and user greeting */}
      <SidebarHeader className="p-2">
        <div className="flex flex-col items-center justify-center w-full py-2 md:py-5">
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary via-purple-500 to-red-500 text-transparent bg-clip-text">
              WebSec GPT
            </h1>
          </div>
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
              <span>Recent</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {chatHistory.map((chat) => (
            <SidebarMenuItem key={chat.id}>
              <SidebarMenuButton
                size="sm"
                variant="ghost"
                className="w-full justify-start font-normal"
                tooltip={chat.title}
              >
                <MessageSquare size={16} className="text-muted-foreground" />
                <span>{chat.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      {/* Footer: Help, Settings, User */}
      <SidebarFooter className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="sm"
              variant="ghost"
              className="w-full justify-start font-normal"
              tooltip="Help"
            >
              <HelpCircle size={16} />
              <span>Help</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="sm"
              variant="ghost"
              className="w-full justify-start font-normal"
              tooltip="Settings"
            >
              <Settings size={16} />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
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
