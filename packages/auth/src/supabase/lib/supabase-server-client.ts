'use server'

import { createClient } from '@supabase/supabase-js'

import 'server-only'

import { env as envChecker } from '../../../env'

const env = envChecker as {
  NEXT_PUBLIC_SUPABASE_URL: string
  SUPABASE_SECRET_KEY: string
}

export const supabaseServerClient = () =>
  createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SECRET_KEY)
