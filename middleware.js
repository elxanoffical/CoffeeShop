// middleware.js
import { NextResponse } from 'next/server'
import { supabaseServer } from './lib/supabaseServer'

export async function middleware(req) {
  const token = req.cookies.get('sb-access-token')?.value
  if (!token) return NextResponse.redirect(new URL('/login', req.url))

  const { data: { user } } = await supabaseServer.auth.getUser(token)
  if (!user) return NextResponse.redirect(new URL('/login', req.url))

  const { data: profile } = await supabaseServer
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}
