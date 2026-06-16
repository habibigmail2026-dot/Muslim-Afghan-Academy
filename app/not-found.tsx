import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-[#F4EFE6] text-[#1E1E1E]">
      <h2 className="text-4xl font-black mb-4 uppercase tracking-tight text-[#299A8E]">404 - Not Found</h2>
      <p className="mb-6 opacity-80 font-medium">Could not find requested resource</p>
      <Link href="/" className="px-6 py-2 bg-[#E27D22] text-white rounded-md font-bold hover:bg-[#F5A623] transition-colors shadow-sm">
        Return Home
      </Link>
    </div>
  )
}
