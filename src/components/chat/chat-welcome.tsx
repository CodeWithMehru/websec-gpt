import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Compass, Lightbulb, Code } from "lucide-react"

const suggestionCards = [
  {
    title: "Suggest beautiful places",
    description: "to see on an upcoming road trip",
    icon: <Compass size={24} />,
  },
  {
    title: "Briefly summarize this concept",
    description: "urban planning",
    icon: <Lightbulb size={24} />,
  },
  {
    title: "Brainstorm a story",
    description: "about a clever cat that solves mysteries",
    icon: <Lightbulb size={24} />,
  },
  {
    title: "Write a code snippet",
    description: "that calculates the fibonacci sequence",
    icon: <Code size={24} />,
  },
];

export function ChatWelcome() {
  return (
    <div className="flex flex-col items-center justify-center py-4 md:py-5">
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-purple-500 to-red-500 text-transparent bg-clip-text mb-4">
          Hello, User
        </h1>
        <p className="text-2xl text-muted-foreground">How can I help you today?</p>
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
