import { withoutAuthServerTrpc } from '~/trpc/server'

export default async function HomePage() {
  await withoutAuthServerTrpc.auth.getUser()
  return (
    <main className="container h-screen py-16">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Create <span className="text-primary">T3</span> Turbo
        </h1>
      </div>
    </main>
  )
}
