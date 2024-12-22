'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function MoodDetector() {
  const [mood, setMood] = useState<string | null>(null)
  const [isDetecting, setIsDetecting] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (isDetecting) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream
          }
        })
        .catch((err) => console.error("Error accessing camera:", err))
    } else {
      const stream = videoRef.current?.srcObject as MediaStream
      stream?.getTracks().forEach(track => track.stop())
    }
  }, [isDetecting])

  const detectMood = () => {
    setIsDetecting(true)
    // Simulate mood detection
    setTimeout(() => {
      const moods = ['Happy', 'Calm', 'Energetic', 'Melancholic', 'Excited']
      const detectedMood = moods[Math.floor(Math.random() * moods.length)]
      setMood(detectedMood)
      setIsDetecting(false)
    }, 3000)
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Mood Detector</CardTitle>
        <CardDescription>Let's detect your mood and recommend some music!</CardDescription>
      </CardHeader>
      <CardContent>
        {isDetecting ? (
          <div className="relative w-full h-64">
            <video ref={videoRef} autoPlay className="w-full h-full object-cover rounded-lg" />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
              <div className="text-white text-xl">Detecting mood...</div>
            </div>
          </div>
        ) : mood ? (
          <div className="text-center">
            <p className="text-2xl font-bold mb-4">Your current mood: {mood}</p>
            <p className="mb-4">Here are some song recommendations based on your mood:</p>
            <ul className="list-disc list-inside text-left">
              <li>Song 1 - Artist 1</li>
              <li>Song 2 - Artist 2</li>
              <li>Song 3 - Artist 3</li>
            </ul>
          </div>
        ) : (
          <Button onClick={detectMood} className="w-full">Detect My Mood</Button>
        )}
      </CardContent>
    </Card>
  )
}

