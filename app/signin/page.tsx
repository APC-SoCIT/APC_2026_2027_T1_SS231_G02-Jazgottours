import type { Metadata } from "next"

import { SiteShell } from "@/components/site-shell"
import { SignInForm } from "@/components/signin-form"

export const metadata: Metadata = {
  title: "Sign In | Jazgot Tour Services",
  description: "Sign in to your Jazgot Tour Services account to manage your bookings.",
}

export default function SignInPage() {
  return (
    <SiteShell>
      <section className="flex min-h-[70vh] items-center justify-center bg-background px-4 py-16 sm:px-6">
        <div className="w-full max-w-sm">
          <div className="text-center">
            <h1 className="font-heading text-3xl font-bold text-foreground">Welcome back</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign in to manage your bookings and tours.
            </p>
          </div>
          <SignInForm />
        </div>
      </section>
    </SiteShell>
  )
}
