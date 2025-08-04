import Navbar from '@/components/common/Navbar'
import NoPosts from '@/components/common/NoPosts'

export default function Page() {
  return (
    <div className="min-h-screen bg-[#181a1b] text-white">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-6 py-8">
          <NoPosts />
        </div>
      </main>
    </div>
  )
}
