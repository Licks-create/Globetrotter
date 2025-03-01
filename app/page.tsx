import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 p-4">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-6 shadow-lg">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Globe className="h-16 w-16 text-blue-500" />
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Globetrotter Challenge</h1>
          <p className="text-gray-500">The Ultimate Travel Guessing Game</p>
        </div>

        <div className="space-y-4 pt-4">
          <p className="text-center text-gray-600">
            Test your knowledge of famous destinations around the world with cryptic clues and fun facts!
          </p>

          <div className="flex flex-col space-y-3 pt-4">
            <Link href="/username" className="w-full">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Start Game</Button>
            </Link>
            <Link href="/about" className="w-full">
              <Button variant="outline" className="w-full">
                How to Play
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

