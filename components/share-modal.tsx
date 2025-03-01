/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Globe, Copy, Share } from "lucide-react"
import html2canvas from "html2canvas"

interface ShareModalProps {
  username: string
  score: {
    correct: number
    incorrect: number
  }
  onClose: () => void
}

export default function ShareModal({ username, score, onClose }: ShareModalProps) {
  const [shareUrl, setShareUrl] = useState("")
  const [copied, setCopied] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
  const shareCardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const baseUrl = window.location.origin
    const challengeUrl = `${baseUrl}/challenge/${encodeURIComponent(username)}`
    setShareUrl(challengeUrl)

    generateShareImage()
  }, [username])

  const generateShareImage = async () => {
    if (shareCardRef.current) {
      try {
        const canvas = await html2canvas(shareCardRef.current, {
          backgroundColor: null,
          scale: 2,
        })
        const dataUrl = canvas.toDataURL("image/png")
        setImageUrl(dataUrl)
      } catch (error) {
        console.error("Error generating image:", error)
      }
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareToWhatsApp = () => {
    const text = `I scored ${score.correct} correct answers in the Globetrotter Challenge! Can you beat my score? Play here: ${shareUrl}`
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Challenge a Friend</DialogTitle>
          <DialogDescription>Share your score and challenge your friends to beat it!</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-4 py-4">
          {/* Share card preview - this will be captured as an image */}
          <div
            ref={shareCardRef}
            className="w-full rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 p-6 text-white shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Globe className="mr-2 h-6 w-6" />
                <h3 className="text-xl font-bold">Globetrotter Challenge</h3>
              </div>
            </div>

            <div className="mt-4 text-center">
              <p className="text-lg font-medium">{username}`s Score</p>
              <p className="mt-2 text-3xl font-bold">{score.correct} correct</p>
              <p className="text-sm opacity-80">{score.incorrect} incorrect</p>
            </div>

            <p className="mt-4 text-center text-sm">Can you beat this score? Click the link to play!</p>
          </div>

          {/* Share URL input */}
          <div className="flex w-full items-center space-x-2">
            <Input value={shareUrl} readOnly className="flex-1" />
            <Button
              size="icon"
              variant={copied ? "default" : "outline"}
              onClick={copyToClipboard}
              className={copied ? "bg-green-600 hover:bg-green-700" : ""}
            >
              {copied ? <span className="text-xs">Copied!</span> : <Copy className="h-4 w-4" />}
            </Button>
          </div>

          {/* Share buttons */}
          <div className="flex w-full justify-center space-x-4 pt-2">
            <Button variant="outline" className="flex items-center gap-2" onClick={shareToWhatsApp}>
              <Share className="h-4 w-4" />
              Share to WhatsApp
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

