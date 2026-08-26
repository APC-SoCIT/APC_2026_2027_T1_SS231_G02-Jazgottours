import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background px-4 py-8 sm:px-6">
      <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <div>
          <p className="font-heading text-base font-bold text-foreground">Jazgot Tour Services</p>
          <p className="text-xs text-muted-foreground">El Nido, Palawan, Philippines</p>
        </div>
        <nav className="flex items-center gap-6 text-sm text-muted-foreground">
          <Link href="/about" className="transition-colors hover:text-primary">
            About
          </Link>
          <Link href="/contact" className="transition-colors hover:text-primary">
            Contact
          </Link>
          <Link href="/signin" className="transition-colors hover:text-primary">
            Sign In
          </Link>
        </nav>
      </div>
      <p className="mt-6 text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} Jazgot Tour Services. All rights reserved.
      </p>
    </footer>
  )
}
