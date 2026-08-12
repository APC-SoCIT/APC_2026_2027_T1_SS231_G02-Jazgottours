import Image from "next/image"
import Link from "next/link"
import { UserRound } from "lucide-react"

const navLinks = [
  { href: "/about", label: "ABOUT" },
  { href: "/contact", label: "CONTACT" },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-brand text-primary-foreground">
      <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center overflow-hidden rounded-md bg-white">
            <Image
              src="/logo.png"
              alt="Jazgot Tour Services logo"
              width={40}
              height={40}
              className="size-9 object-contain"
            />
          </span>
          <span className="leading-tight text-primary-foreground">
            <span className="block font-heading text-lg font-bold">Jazgot</span>
            <span className="block text-xs font-medium opacity-90">Tour Services</span>
          </span>
        </Link>

        {/* Center nav */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold tracking-wide text-primary-foreground/95 transition-opacity hover:opacity-80"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Sign in */}
        <div className="flex items-center gap-4">
          <nav className="flex items-center gap-5 md:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-semibold tracking-wide text-primary-foreground/95"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/signin"
            className="inline-flex items-center gap-2 rounded-md border border-primary-foreground/70 px-4 py-1.5 text-xs font-semibold tracking-wide text-primary-foreground transition-colors hover:bg-primary-foreground/10"
          >
            <UserRound className="size-3.5" aria-hidden="true" />
            SIGN IN
          </Link>
        </div>
      </div>
    </header>
  )
}
