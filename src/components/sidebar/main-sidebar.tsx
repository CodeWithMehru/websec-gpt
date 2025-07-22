"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"
import { MessageSquare, Plus, Settings, HelpCircle, History } from "lucide-react"

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
      <SidebarHeader className="p-2">
        <Button variant="secondary" className="w-full justify-start gap-2 rounded-full">
          <Plus size={16} />
          New Chat
        </Button>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
             <SidebarMenuButton size="sm" variant="ghost" className="w-full justify-start text-muted-foreground font-normal">
                <History size={16} />
                <span>Recent</span>
              </SidebarMenuButton>
          </SidebarMenuItem>
          {chatHistory.map((chat) => (
            <SidebarMenuItem key={chat.id}>
              <SidebarMenuButton size="sm" variant="ghost" className="w-full justify-start font-normal" tooltip={chat.title}>
                <MessageSquare size={16} className="text-muted-foreground" />
                <span>{chat.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="sm" variant="ghost" className="w-full justify-start font-normal" tooltip="Help">
              <HelpCircle size={16} />
              <span>Help</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton size="sm" variant="ghost" className="w-full justify-start font-normal" tooltip="Settings">
              <Settings size={16} />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton size="sm" variant="ghost" className="w-full justify-start gap-2 font-normal" tooltip="User Profile">
              <Avatar className="h-7 w-7">
                <AvatarImage src="https://placehold.co/40x40.png" alt="User" data-ai-hint="user avatar" />
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
