import { Link } from '@tanstack/react-router'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#3d300f] bg-black/95 px-4 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-4 py-4 text-sm">
        <Link to="/" className="text-lg font-semibold tracking-[0.15em] text-[#f8e7aa] no-underline">
          CREATION ROOFING
        </Link>
        <div className="ml-auto flex items-center gap-4 text-stone-300">
          <Link to="/" className="no-underline hover:text-[#f3d56d]" activeProps={{ className: 'text-[#f3d56d] no-underline' }}>
            Home
          </Link>
          <Link
            to="/james-bryce-roofing"
            className="no-underline hover:text-[#f3d56d]"
            activeProps={{ className: 'text-[#f3d56d] no-underline' }}
          >
            James Bryce Roofing
          </Link>
          <a href="tel:07919435511" className="rounded-full bg-[#d4af37] px-4 py-2 font-semibold text-black no-underline">
            Free Quote
          </a>
        </div>
      </nav>
    </header>
  )
}
