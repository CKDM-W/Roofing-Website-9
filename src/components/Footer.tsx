export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-16 border-t border-[#3d300f] px-4 py-8 text-sm text-stone-400">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="m-0">© {year} Creation Roofing · Peterborough</p>
        <p className="m-0">Second brand route: James Bryce Roofing</p>
      </div>
    </footer>
  )
}
