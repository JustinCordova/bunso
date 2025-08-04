import React from 'react'
import Image from 'next/image'

const BrandSection = () => {
  return (
    <div className="flex-1 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-24 h-24 relative">
            <Image
              src="/logo.png"
              alt="Bunso Logo"
              width={96}
              height={96}
              className="rounded-full shadow-lg"
              priority
            />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-white">bunso</h1>
      </div>
    </div>
  )
}

export default BrandSection
