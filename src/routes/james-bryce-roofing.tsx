import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/james-bryce-roofing')({
  component: JamesBryceRoofingPage,
})

function JamesBryceRoofingPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 pb-16 pt-10 text-stone-100">
      <section className="rounded-3xl border border-[#594511] bg-[#0f0f0f] p-8 sm:p-10">
        <p className="text-xs font-semibold tracking-[0.35em] text-[#d4af37]">SECOND BRAND</p>
        <h1 className="mt-4 text-4xl font-bold text-[#f8e7aa]">James Bryce Roofing</h1>
        <p className="mt-5 text-base leading-7 text-stone-300">
          This dedicated brand route supports campaigns and referrals for James Bryce Roofing while remaining part of the same
          premium web platform.
        </p>
        <p className="mt-4 text-sm text-stone-300">
          For shared operations and quote handling, inquiries are processed through the same Convex-backed lead system.
        </p>
      </section>
    </main>
  )
}
