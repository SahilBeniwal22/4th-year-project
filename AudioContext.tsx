'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Song = {
  id: number
  title: string
  artist: string
  album: string
  duration: number
  cover: string
}

type AudioContextType = {
  currentSong: Song | null
  isPlaying: boolean
  progress: number
  play: (song: Song) => void
  pause: () => void
  resume: () => void
  seek: (time: number) => void
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export const useAudio = () => {
  const context = useContext(AudioContext)
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider')
  }
  return context
}

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [audio] = useState(new Audio())

  useEffect(() => {
    if (currentSong) {
      audio.src = `/audio/${currentSong.id}.mp3`
      audio.load()
    }
  }, [currentSong, audio])

  useEffect(() => {
    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100)
    }
    audio.addEventListener('timeupdate', updateProgress)
    return () => audio.removeEventListener('timeupdate', updateProgress)
  }, [audio])

  const play = (song: Song) => {
    setCurrentSong(song)
    setIsPlaying(true)
    audio.play()
  }

  const pause = () => {
    setIsPlaying(false)
    audio.pause()
  }

  const resume = () => {
    setIsPlaying(true)
    audio.play()
  }

  const seek = (time: number) => {
    audio.currentTime = (time / 100) * audio.duration
  }

  return (
    <AudioContext.Provider value={{ currentSong, isPlaying, progress, play, pause, resume, seek }}>
      {children}
    </AudioContext.Provider>
  )
}

