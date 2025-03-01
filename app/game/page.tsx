"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Globe, Share2, Trophy, ArrowRight } from "lucide-react"
import confetti from "canvas-confetti"
import ShareModal from "@/components/share-modal"

interface Destination {
  id: string
  city: string
  clues: string[]
  fun_fact: string[]
  trivia: string[]
}

export default function GamePage() {
  const router = useRouter()
  const [username, setUsername] = useState<string>("")
  const [currentDestination, setCurrentDestination] = useState<Destination | null>(null)
  const [options, setOptions] = useState<string[]>([])
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [funFact, setFunFact] = useState<string>("")
  const [score, setScore] = useState({ correct: 0, incorrect: 0 })
  const [isLoading, setIsLoading] = useState(true)
  const [showShareModal, setShowShareModal] = useState(false)

  useEffect(() => {
    const storedUsername = localStorage.getItem("globetrotter_username")
    if (!storedUsername) {
      router.push("/username")
      return
    }
    const checkUser=async()=>{

      try {
      const response = await fetch("/api/users/"+storedUsername+"/score")
      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || "User Not Found")
      }
      else{
        const data = await response.json()
        setScore({correct:0,incorrect:0,...data})
      }
    
    } catch (err) {
      console.error(err instanceof Error ? err.message : "An error occurred")
    }
  }
    checkUser()
    setUsername(storedUsername)
    loadNewDestination()
  }, [router])

  useEffect(()=>{
    const updateUser=async()=>{
      const storedUsername = localStorage.getItem("globetrotter_username")
      try {
      const response = await fetch("/api/users/"+storedUsername+"/score",{
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username,...score }),
      })
      if (!response.ok) {
        const data = await response.json()
        console.log({data})
        // throw new Error(data.error || "Failed to update")
      }
    } catch (err) {
      console.error(err instanceof Error ? err.message : "An error occurred")
    }
  }
  updateUser()
  },[options])
  const loadNewDestination = async () => {
    setIsLoading(true)
    setSelectedOption(null)
    setIsCorrect(null)
    setFunFact("")

    try {
      const response = await fetch("/api/destinations/random")
      if (!response.ok) throw new Error("Failed to fetch destination")

      const data = await response.json()
      setCurrentDestination(data.destination)
      setOptions(data.options)
    } catch (error) {
      console.error("Error loading destination:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAnswer = (option: string) => {
    if (selectedOption !== null || !currentDestination) return 

    setSelectedOption(option)
    const correct = option === currentDestination.city
    setIsCorrect(correct)

    const newScore = {
      correct: score.correct + (correct ? 1 : 0),
      incorrect: score.incorrect + (correct ? 0 : 1),
    }
    setScore(newScore)
    localStorage.setItem("globetrotter_score", JSON.stringify(newScore))

    const facts = currentDestination.fun_fact
    const randomFact = facts[Math.floor(Math.random() * facts.length)]
    setFunFact(randomFact)

    if (correct) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100">
        <div className="text-center">
          <Globe className="mx-auto h-12 w-12 animate-spin text-blue-500" />
          <p className="mt-4 text-gray-600">Loading your destination...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-blue-50 to-blue-100 p-4">
      <header className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <Globe className="mr-2 h-6 w-6 text-blue-500" />
          <h1 className="text-xl font-bold text-gray-900">Globetrotter</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <span className="text-sm font-medium">
            {score.correct} correct / {score.incorrect} incorrect
          </span>
        </div>
      </header>

      <main className="flex-1">
        {currentDestination && (
          <div className="mx-auto max-w-md space-y-6">
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <h2 className="mb-4 text-center text-xl font-semibold text-gray-800">Guess the Destination</h2>

                <div className="mb-6 space-y-3 rounded-lg bg-blue-50 p-4">
                  {currentDestination.clues.slice(0, 2).map((clue, index) => (
                    <p key={index} className="text-gray-700">
                      <span className="font-semibold">Clue {index + 1}:</span> {clue}
                    </p>
                  ))}
                </div>

                <div className="space-y-3">
                  {options.map((option) => (
                    <Button
                      key={option}
                      variant={
                        selectedOption === option
                          ? isCorrect && selectedOption === option
                            ? "default"
                            : "destructive"
                          : selectedOption !== null && option === currentDestination.city
                            ? "default"
                            : "outline"
                      }
                      className={`w-full justify-start text-left ${
                        selectedOption === option
                          ? isCorrect
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-red-600 hover:bg-red-700"
                          : selectedOption !== null && option === currentDestination.city
                            ? "bg-green-600 hover:bg-green-700"
                            : ""
                      }`}
                      onClick={() => handleAnswer(option)}
                      disabled={selectedOption !== null}
                    >
                      {option}
                    </Button>
                  ))}
                </div>

                {selectedOption !== null && (
                  <div className={`mt-6 rounded-lg p-4 ${isCorrect ? "bg-green-50" : "bg-red-50"}`}>
                    <p className={`mb-2 font-bold ${isCorrect ? "text-green-700" : "text-red-700"}`}>
                      {isCorrect ? "🎉 Correct!" : "😢 Incorrect!"}
                    </p>
                    <p className="text-gray-700">{funFact}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" className="flex items-center gap-2" onClick={() => setShowShareModal(true)}>
                <Share2 className="h-4 w-4" />
                Challenge a Friend
              </Button>

              {selectedOption !== null && (
                <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700" onClick={loadNewDestination}>
                  Next Destination
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        )}
      </main>

      {showShareModal && <ShareModal username={username} score={score} onClose={() => setShowShareModal(false)} />}
    </div>
  )
}

