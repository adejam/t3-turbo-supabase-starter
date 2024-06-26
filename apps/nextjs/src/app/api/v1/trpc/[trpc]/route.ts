import type { NextRequest } from 'next/server'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'

import { getUrl } from '~/trpc/react'
import {
  appRouter,
  createTRPCContext,
} from '../../../../../../../../packages/api/src'
import { createAnonServerClient } from '../../../../../../../../packages/auth/src/supabase/lib/supabase-anon-server-client'

/**
 * Configure basic CORS headers
 * You should extend this to match your needs
 */
const setCorsHeaders = (res: Response) => {
  res.headers.set('Access-Control-Allow-Origin', '*')
  res.headers.set('Access-Control-Request-Method', '*')
  res.headers.set('Access-Control-Allow-Methods', 'OPTIONS, GET, POST')
  res.headers.set('Access-Control-Allow-Headers', '*')
}

export const OPTIONS = () => {
  const response = new Response(null, {
    status: 204,
  })
  setCorsHeaders(response)
  return response
}

const handler = async (req: NextRequest) => {
  const supabase = createAnonServerClient()

  const response = await fetchRequestHandler({
    endpoint: getUrl(),
    router: appRouter,
    req,
    createContext: () =>
      createTRPCContext({
        supabase,
        headers: req.headers,
      }),
    onError({ error, path }) {
      console.error(`>>> tRPC Error on '${path}'`, error)
    },
  })

  setCorsHeaders(response)
  return response
}

export { handler as GET, handler as POST }
