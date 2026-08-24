import type { Metadata } from "next"
import { Geist, Poppins } from "next/font/google"
import Link from "next/link"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { cn } from "@/lib/utils"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })
const poppins = Poppins({ subsets: ["latin"], weight: ["500", "600", "700", "800"], variable: "--font-heading" })

export const metadata: Metadata = {
  title: "JazGot B2B Portal",
  description: "Internal CRM and Sales Dashboard for JazGot Tours.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("antialiased", geist.variable, poppins.variable, "font-sans")}>
      <body className="bg-slate-50 flex h-screen overflow-hidden">
        <ThemeProvider>
          {/* B2B Sidebar Navigation */}
          <aside className="w-64 bg-slate-900 text-white flex flex-col hidden md:flex">
            <div className="p-6 text-2xl font-bold font-heading border-b border-slate-700">
              JazGot B2B
            </div>
            <nav className="flex-1 p-4 space-y-2">
              <Link href="/" className="block p-3 rounded hover:bg-slate-800 transition-colors">Home/Dashboard</Link>
              <Link href="/products" className="block p-3 rounded hover:bg-slate-800 transition-colors">Products/Packages</Link>
              <Link href="/quotation" className="block p-3 rounded hover:bg-slate-800 transition-colors">Quotation</Link>
              <Link href="/invoices" className="block p-3 rounded hover:bg-slate-800 transition-colors">Invoices</Link>
              <Link href="/clients" className="block p-3 rounded hover:bg-slate-800 transition-colors">Clients</Link>
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto p-8">
            {children}
          </main>
          
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  )
}