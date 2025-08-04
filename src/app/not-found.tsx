import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-6">This Page does not exist.</p>
      <Link
        href="/"
        className="text-blue-500 underline hover:text-blue-700 transition"
      >
        Home
      </Link>
    </div>
  )
}
