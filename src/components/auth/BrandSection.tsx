import React from 'react'
import Image from 'next/image'

const BrandSection = () => {
  return (
    <div className="flex-1 bg-gradient-to-br from-primary/40 via-accent/50 to-secondary/60 relative flex items-center justify-center">
      <div className="absolute inset-0 bg-dark/60"></div>
      <div className="relative z-10 text-center space-y-6">
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
