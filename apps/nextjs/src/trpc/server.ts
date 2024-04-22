import { cache } from 'react'
import { headers } from 'next/headers'

import { createCaller } from './../../../../packages/api/src'
import { createTRPCContext } from './../../../../packages/api/src/trpc'
import { createAnonServerClient } from './../../../../packages/auth/src/supabase/lib/supabase-anon-server-client'

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(async () => {
  const supabase = createAnonServerClient()

  const heads = new Headers(headers())
  heads.set('x-trpc-source', 'rsc')

  return createTRPCContext({
    supabase,
    headers: heads,
  })
})

const createContextWithoutAuthAndHeader = cache(() => {
  return createTRPCContext({})
})

const serverTrpc = createCaller(createContext)
const withoutAuthServerTrpc = createCaller(createContextWithoutAuthAndHeader)

export { serverTrpc, withoutAuthServerTrpc }
