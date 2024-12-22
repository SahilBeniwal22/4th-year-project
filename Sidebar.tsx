'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Home, Search, Library, Settings, LogOut } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from 'next/navigation'

export default function Sidebar() {
  const router = useRouter()
  const [user, setUser] = useState<{ email: string } | null>(null)

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser')
    if (currentUser) {
      setUser(JSON.parse(currentUser))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    router.push('/login')
  }

  if (!user) return null

  return (
    <div className="w-64 bg-gray-800 p-6 flex flex-col h-full">
      <div className="flex justify-between items-center mb-10">
        <Link href="/" className="flex items-center">
          <img src="/images/logo.png" alt="Moodify Logo" className="w-8 h-8 mr-2" />
          <span className="text-2xl font-bold">Moodify</span>
        </Link>
        <Link href="/user">
          <Avatar>
            <AvatarFallback>{user.email[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        </Link>
      </div>
      <nav className="flex-1">
        <ul className="space-y-4">
          <li>
            <Link href="/" className="flex items-center text-gray-300 hover:text-white transition-colors">
              <Home className="w-5 h-5 mr-3" />
              Home
            </Link>
          </li>
          <li>
            <Link href="/search" className="flex items-center text-gray-300 hover:text-white transition-colors">
              <Search className="w-5 h-5 mr-3" />
              Search
            </Link>
          </li>
          <li>
            <Link href="/library" className="flex items-center text-gray-300 hover:text-white transition-colors">
              <Library className="w-5 h-5 mr-3" />
              My Library
            </Link>
          </li>
          <li>
            <Link href="/settings" className="flex items-center text-gray-300 hover:text-white transition-colors">
              <Settings className="w-5 h-5 mr-3" />
              Settings
            </Link>
          </li>
        </ul>
      </nav>
      <div className="mt-auto pt-4 border-t border-gray-700">
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-400 mb-2">PROFILE</h3>
          <p className="text-sm text-white">{user.email}</p>
        </div>
        <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white transition-colors" onClick={handleLogout}>
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  )
}

