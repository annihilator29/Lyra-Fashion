import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      ...request,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          // Update the response with the new cookie
          response = NextResponse.next({
            request,
          })
          response.cookies.set(name, value, options)
        },
        remove(name: string, options: CookieOptions) {
          // Update the response to remove the cookie
          response = NextResponse.next({
            request,
          })
          response.cookies.set(name, '', { ...options, maxAge: 0 })
        },
      },
    }
  )

  // Get the user session
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Define protected routes
  // Define protected routes
  const protectedPaths = ['/account', '/profile', '/wishlist'] // TODO: Re-enable '/checkout' when auth tests are ready
  const isProtectedPath = protectedPaths.some(path =>
    request.nextUrl.pathname.startsWith(path)
  )

  // If the user is not authenticated and is trying to access a protected route
  if (isProtectedPath && !user) {
    // Redirect to login page
    const redirectUrl = new URL('/login', request.url)
    redirectUrl.searchParams.set('return', request.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  return response
}

// Define which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}