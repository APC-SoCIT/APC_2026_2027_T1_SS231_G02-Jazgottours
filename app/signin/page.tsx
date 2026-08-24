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
          {/* The dynamic header is now handled entirely inside SignInForm */}
          <SignInForm />
        </div>
      </section>
    </SiteShell>
  )
}