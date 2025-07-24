import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Cpu, Rocket, Bot, Code } from "lucide-react" // ✅ Correct icon imports

const suggestionCards = [
  {
    title: "Explore WebSec AI",
    description: "An AI-powered software development and cybersecurity company building next-gen security tools.",
    icon: <Cpu size={24} />,
  },
  {
    title: "Journey of the Founder",
    description: "How Code With Mehru built the WebSec AI company at the age of 18 as a solo developer.",
    icon: <Rocket size={24} />,
  },
  {
  title: "Explore Tools by WebSec AI",
  description: "From our WebSec Scanner to all the AI tools we've built for cybersecurity and developers.",
  icon: <Bot size={24} />,
},
{
  title: "Write a Secure Code Snippet",
  description: "Ask WebSec AI to generate secure code like login form and open it in a built-in editor.",
  icon: <Code size={24} />,
}

];

export function ChatWelcome() {
  return (
    <div className="flex flex-col items-center justify-center py-9 md:py-10">
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-2xl md:text-6xl font-extrabold tracking-tight leading-tight scale-[1.2] md:scale-100 bg-gradient-to-r from-primary via-purple-500 to-red-500 text-transparent bg-clip-text mb-4">
          How Can I Help You Today?
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {suggestionCards.map((card, index) => (
          <Card key={index} className="hover:bg-secondary transition-colors cursor-pointer group">
            <CardContent className="p-4 flex justify-between items-end h-full">
              <div>
                <p className="font-semibold">{card.title}</p>
                <p className="text-sm text-muted-foreground">{card.description}</p>
              </div>
              <div className="flex justify-end mt-4">
                <div className="p-2 bg-background group-hover:bg-white dark:group-hover:bg-black rounded-full transition-colors">
                  {card.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
