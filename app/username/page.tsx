"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Globe } from "lucide-react"


export default function UsernamePage() {
  const [username, setUsername] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(()=>{
    const storedUsername = localStorage.getItem("globetrotter_username")
    if (storedUsername) {
      router.push("/game")
      return
    }
  },[])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!username.trim()) {
      setError("Please enter a username")
      return
    }

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || "Failed to register username")
      }

      localStorage.setItem("globetrotter_username", username)

      router.push("/game")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 p-4">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-6 shadow-lg">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Globe className="h-12 w-12 text-blue-500" />
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Enter Your Username</h1>
          <p className="text-gray-500">Create a profile to track your score and challenge friends</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full"
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
            Continue to Game
          </Button>
        </form>
      </div>
    </div>
  )
}

