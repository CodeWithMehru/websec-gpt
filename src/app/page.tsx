import { MainSidebar } from '@/components/sidebar/main-sidebar';
import { ChatInterface } from '@/components/chat/chat-interface';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function Home() {
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background text-foreground">
        <MainSidebar />
        <ChatInterface />
      </div>
    </SidebarProvider>
  );
}
