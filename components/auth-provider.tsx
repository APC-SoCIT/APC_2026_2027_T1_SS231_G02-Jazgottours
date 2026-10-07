"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import type { User } from "@supabase/supabase-js"

import { supabase } from "@/lib/supabase"

type AuthContextValue = {
  user: User | null
  isLoading: boolean
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (isMounted) {
        setUser(session?.user ?? null)
        setIsLoading(false)
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setIsLoading(false)
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [])

  return <AuthContext.Provider value={{ user, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}