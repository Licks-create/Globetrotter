"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Globe, Trophy } from "lucide-react"

interface PageProps {
  params: {
    username: string
  }
}

interface UserScore {
  username: string
  correct: number
  incorrect: number
}

export default function ChallengePage({ params }: PageProps) {
  const router = useRouter()
  const [userScore, setUserScore] = useState<UserScore | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const decodedUsername = decodeURIComponent(params.username)

  useEffect(() => {
    const fetchUserScore = async () => {
      try {
        const response = await fetch(`/api/users/${decodedUsername}/score`)

        if (!response.ok) {
          throw new Error("Failed to fetch user score")
        }

        const data = await response.json()
        setUserScore(data)
      } catch (err) {
        setError("Could not load user score")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchUserScore()
  }, [decodedUsername])

  const handleAcceptChallenge = () => {
    router.push("/username")
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100">
        <div className="text-center">
          <Globe className="mx-auto h-12 w-12 animate-spin text-blue-500" />
          <p className="mt-4 text-gray-600">Loading challenge...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <Globe className="h-16 w-16 text-blue-500" />
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              {userScore ? `${userScore.username} has challenged you!` : "Challenge Invitation"}
            </h1>

            {error ? (
              <p className="text-red-500">{error}</p>
            ) : userScore ? (
              <div className="space-y-4">
                <div className="rounded-lg bg-blue-50 p-4">
                  <div className="flex items-center justify-center space-x-2">
                    <Trophy className="h-6 w-6 text-yellow-500" />
                    <span className="text-lg font-medium">
                      {userScore.correct} correct / {userScore.incorrect} incorrect
                    </span>
                  </div>
                  <p className="mt-2 text-gray-600">
                    Can you beat {userScore.username}`s score in the Globetrotter Challenge?
                  </p>
                </div>

                <Button onClick={handleAcceptChallenge} className="w-full bg-blue-600 hover:bg-blue-700">
                  Accept Challenge
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-600">This user`s score could not be found. Would you like to play anyway?</p>
                <Button onClick={handleAcceptChallenge} className="w-full bg-blue-600 hover:bg-blue-700">
                  Start Playing
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

