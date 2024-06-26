import { NextResponse } from 'next/server'

import { createAnonServerClient } from '../../../../../../../../packages/auth/src/supabase/lib/supabase-anon-server-client'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next')?.replace('//', '/') ?? '/dashboard'

  if (code) {
    const supabase = createAnonServerClient()

    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(
    new URL('/login?error=auth-code-error', request.url)
  )
}
