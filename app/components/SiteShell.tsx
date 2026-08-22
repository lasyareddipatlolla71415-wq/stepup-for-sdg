'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from '@/app/components/site/Navbar'
import HomeFooter from '@/src/components/common/Footer'

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')

  if (isAdmin) return <>{children}</>

  return (
    <div className="rahini-unified-page min-h-screen flex min-h-0 flex-col">
      <Navbar />
      <main className="flex-1 min-h-0">{children}</main>
      <HomeFooter />
    </div>
  )
}
