"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel, FieldDescription } from "@/components/ui/field"

export function SignInForm() {
  const router = useRouter()
  
  // State to toggle between Login and Register modes
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin")

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    
    // Simulated authentication success
    if (authMode === "signup") {
      toast.success("Account created successfully!")
    } else {
      toast.success("Signed in successfully!")
    }
    
    // Redirect the user back to the homepage so they can book their tour
    router.push("/")
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Dynamic Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-foreground">
          {authMode === "signin" ? "Welcome back" : "Create an Account"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {authMode === "signin" 
            ? "Sign in to manage your bookings and tours." 
            : "Sign up to start booking your unforgettable memories."}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm"
      >
        <FieldGroup>
          {/* Only show the Name field if they are signing up */}
          {authMode === "signup" && (
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input id="name" name="name" type="text" placeholder="Juan Dela Cruz" required />
            </Field>
          )}
          
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input id="email" name="email" type="email" placeholder="you@example.com" required />
          </Field>
          
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input id="password" name="password" type="password" placeholder="••••••••" required />
          </Field>
          
          <Button type="submit" className="w-full mt-2">
            {authMode === "signin" ? "Sign In" : "Sign Up"}
          </Button>
          
          {/* Dynamic Toggle Button instead of a dead-end Contact link */}
          <FieldDescription className="text-center mt-4">
            {authMode === "signin" ? "Don't have an account? " : "Already have an account? "}
            <button 
              type="button"
              onClick={() => setAuthMode(authMode === "signin" ? "signup" : "signin")}
              className="font-medium text-primary hover:underline bg-transparent border-none p-0 cursor-pointer"
            >
              {authMode === "signin" ? "Create an account" : "Sign in here"}
            </button>
          </FieldDescription>
        </FieldGroup>
      </form>
    </div>
  )
}