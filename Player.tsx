'use client'

import { useAudio } from '../contexts/AudioContext'
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

export default function Player() {
  const { currentSong, isPlaying, progress, play, pause, resume, seek } = useAudio()

  if (!currentSong) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        <div className="flex items-center">
          <img src={currentSong.cover} alt={`${currentSong.album} Cover`} className="w-16 h-16 rounded mr-4" />
          <div>
            <h3 className="font-semibold">{currentSong.title}</h3>
            <p className="text-sm text-gray-400">{currentSong.artist}</p>
          </div>
        </div>
        <div className="flex flex-col items-center space-y-2 flex-grow px-4">
          <div className="flex items-center space-x-4">
            <button className="text-gray-400 hover:text-white transition-colors">
              <SkipBack className="w-6 h-6" />
            </button>
            <Button 
              className="bg-white text-black rounded-full p-2 hover:bg-gray-200 transition-colors"
              onClick={isPlaying ? pause : resume}
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </Button>
            <button className="text-gray-400 hover:text-white transition-colors">
              <SkipForward className="w-6 h-6" />
            </button>
          </div>
          <Slider
            value={[progress]}
            max={100}
            step={1}
            className="w-full"
            onValueChange={(value) => seek(value[0])}
          />
        </div>
        <div className="flex items-center">
          <Volume2 className="w-6 h-6 mr-2" />
          <Slider
            defaultValue={[100]}
            max={100}
            step={1}
            className="w-24"
          />
        </div>
      </div>
    </div>
  )
}

