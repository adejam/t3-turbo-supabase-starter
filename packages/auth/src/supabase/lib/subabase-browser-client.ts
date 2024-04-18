import { createBrowserClient } from '@supabase/ssr'

import { env as envChecker } from '../../../env'

const env = envChecker as {
  NEXT_PUBLIC_SUPABASE_URL: string
  NEXT_PUBLIC_SUPABASE_ANON_KEY: string
}

// to be used in client component
export const supabaseBrowserClient = () =>
  createBrowserClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
