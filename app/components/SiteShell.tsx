'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from '@/app/components/site/Navbar'
import HomeFooter from '@/src/components/common/Footer'

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')

  // One public-site shell for every public route.
  // This makes the MAIN project navbar and the Home/Rahini footer
  // consistent across Home, About, SDG, Partners, Contact, forms, etc.
  if (isAdmin) return <>{children}</>

  return (
    <div className="rahini-unified-page min-h-screen flex min-h-0 flex-col">
      <Navbar />
      <main className="flex-1 min-h-0">{children}</main>
      <HomeFooter />
    </div>
  )
}
