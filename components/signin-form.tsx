"use client"

import type { FormEvent } from "react"
import Link from "next/link"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel, FieldDescription } from "@/components/ui/field"

export function SignInForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    toast.success("Signed in successfully!")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 rounded-xl border border-border bg-card p-6 text-card-foreground"
    >
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" name="email" type="email" placeholder="you@example.com" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input id="password" name="password" type="password" placeholder="••••••••" required />
        </Field>
        <Button type="submit" className="w-full">
          Sign In
        </Button>
        <FieldDescription className="text-center">
          Don&apos;t have an account?{" "}
          <Link href="/contact" className="font-medium text-primary hover:underline">
            Contact us
          </Link>
        </FieldDescription>
      </FieldGroup>
    </form>
  )
}
