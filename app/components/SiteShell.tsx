'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from '@/app/components/site/Navbar'
import { Footer } from '@/app/components/site/Footer'

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')
  const isRahiniShellPage = pathname === '/' || pathname === '/work-with-us' || pathname.startsWith('/work-with-us/') || pathname.startsWith('/partner/')

  if (isAdmin || isRahiniShellPage) return <>{children}</>

  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  )
}
