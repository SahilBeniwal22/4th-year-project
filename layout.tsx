'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import './globals.css'
import { Inter } from 'next/font/google'
import Sidebar from './components/Sidebar'
import Player from './components/Player'
import { AudioProvider } from './contexts/AudioContext'
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const checkAuth = () => {
      const currentUser = localStorage.getItem('currentUser')
      if (currentUser) {
        setIsAuthenticated(true)
        if (pathname === '/login') {
          router.push('/')
        }
      } else if (pathname !== '/login') {
        router.push('/login')
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [pathname, router])

  if (isLoading) {
    return null // or a loading spinner
  }

  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-900 text-white`}>
        <AudioProvider>
          {isAuthenticated ? (
            <div className="flex h-screen">
              <Sidebar />
              <main className="flex-1 overflow-y-auto pb-24">
                {children}
              </main>
              <Player />
            </div>
          ) : (
            children
          )}
        </AudioProvider>
        <Toaster />
      </body>
    </html>
  )
}

