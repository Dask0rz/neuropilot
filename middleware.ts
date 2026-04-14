// middleware.ts
import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const pathname = req.nextUrl.pathname

    // Redirect to onboarding if no profile yet
    if (token && !token.hasProfile && pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/onboarding', req.url))
    }
    if (token && !token.hasProfile && pathname.startsWith('/chapters')) {
      return NextResponse.redirect(new URL('/onboarding', req.url))
    }
    if (token && !token.hasProfile && pathname.startsWith('/learn')) {
      return NextResponse.redirect(new URL('/onboarding', req.url))
    }
    if (token && !token.hasProfile && pathname.startsWith('/profile')) {
      return NextResponse.redirect(new URL('/onboarding', req.url))
    }
    if (token && !token.hasProfile && pathname.startsWith('/stats')) {
      return NextResponse.redirect(new URL('/onboarding', req.url))
    }
    if (token && !token.hasProfile && pathname.startsWith('/review')) {
      return NextResponse.redirect(new URL('/onboarding', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname
        const protectedPaths = ['/dashboard', '/chapters', '/learn', '/profile', '/stats', '/review', '/onboarding']
        const isProtected = protectedPaths.some(p => pathname.startsWith(p))
        if (isProtected) return !!token
        return true
      },
    },
  }
)

export const config = {
  matcher: ['/dashboard/:path*', '/chapters/:path*', '/learn/:path*', '/profile/:path*', '/stats/:path*', '/review/:path*', '/onboarding/:path*'],
}
