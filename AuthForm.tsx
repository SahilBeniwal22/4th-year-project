'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"

export default function AuthForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    if (users.some((user: { email: string }) => user.email === email)) {
      toast({
        title: "Error",
        description: "User already exists",
        variant: "destructive",
      })
      return
    }
    users.push({ email, password })
    localStorage.setItem('users', JSON.stringify(users))
    toast({
      title: "Success",
      description: "User registered successfully",
    })
    setEmail('')
    setPassword('')
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find((u: { email: string; password: string }) => u.email === email && u.password === password)
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user))
      router.push('/')
    } else {
      toast({
        title: "Error",
        description: "Invalid email or password",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <img src="/images/logo.png" alt="Moodify Logo" className="w-16 h-16 mx-auto mb-4" />
        <h1 className="text-3xl font-bold">Welcome to Moodify</h1>
      </div>
      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                className="bg-white text-black"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                className="bg-white text-black"
              />
            </div>
            <Button type="submit" className="w-full">Login</Button>
          </form>
        </TabsContent>
        <TabsContent value="signup">
          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <Label htmlFor="signup-email">Email</Label>
              <Input 
                id="signup-email" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                className="bg-white text-black"
              />
            </div>
            <div>
              <Label htmlFor="signup-password">Password</Label>
              <Input 
                id="signup-password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                className="bg-white text-black"
              />
            </div>
            <Button type="submit" className="w-full">Sign Up</Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  )
}

