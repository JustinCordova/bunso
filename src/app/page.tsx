import Navbar from '@/components/common/Navbar'
import Home from '@/pages/Home'

export default function Page() {
  return (
    <div className="min-h-screen bg-[#181a1b] text-white">
      <Navbar />
      <main className="flex-1">
        <Home />
      </main>
    </div>
  )
}
