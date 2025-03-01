import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Globe, MapPin, Award, Share2 } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-blue-50 to-blue-100 p-4">
      <div className="mx-auto w-full max-w-2xl space-y-8 py-8">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Globe className="h-16 w-16 text-blue-500" />
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">How to Play Globetrotter</h1>
          <p className="text-gray-500">The Ultimate Travel Guessing Game</p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-lg">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Guess Destinations</h2>
                <p className="mt-2 text-gray-600">
                  You'll be presented with cryptic clues about a famous place. Read the clues carefully and select the
                  correct destination from the options provided.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Earn Points</h2>
                <p className="mt-2 text-gray-600">
                  Each correct answer adds to your score. After answering, you'll unlock fun facts and trivia about the
                  destination, whether your guess was right or wrong.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                <Share2 className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Challenge Friends</h2>
                <p className="mt-2 text-gray-600">
                  Use the "Challenge a Friend" button to share your score and invite others to play. They'll see your
                  score and can try to beat it!
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <Link href="/username">
              <Button className="bg-blue-600 hover:bg-blue-700">Start Playing Now</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

