'use client'
import { SessionProvider } from 'next-auth/react'
import { useEffect } from 'react'

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(reg => console.log('SW enregistré:', reg.scope))
        .catch(err => console.error('SW erreur:', err))
    }
  }, [])

  return <SessionProvider>{children}</SessionProvider>
}