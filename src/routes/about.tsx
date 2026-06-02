import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 pb-16 pt-10 text-stone-100">
      <section className="rounded-3xl border border-[#594511] bg-[#0f0f0f] p-8 sm:p-10">
        <p className="text-xs font-semibold tracking-[0.35em] text-[#d4af37]">ABOUT CREATION ROOFING</p>
        <h1 className="mt-4 text-4xl font-bold text-[#f8e7aa]">Trusted roofing specialists in Peterborough.</h1>
        <p className="mt-5 text-base leading-7 text-stone-300">
          Creation Roofing is led by Ben and focused on high-quality slating, tiling and flat roofing across Peterborough.
          We combine premium workmanship with clear communication and dependable aftercare.
        </p>
      </section>
    </main>
  )
}
