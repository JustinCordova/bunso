'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Searchbar from '../common/Searchbar'

const Navbar = () => {
  const [searchValue, setSearchValue] = useState('')

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // Handle search
      console.log('Searching for:', searchValue)
    }
  }

  return (
    <nav className="bg-[#181a1b]/95 backdrop-blur-sm border-b border-[#181a1b]/20 px-3 py-1">
      <div className="relative flex items-center justify-between">
        {/* Logo - Top Left */}
        <div className="flex items-center space-x-2">
          <span className="text-primary font-bold text-2xl">bunso</span>
          <div className="w-8 h-8 relative">
            <Image
              src="/logo.png"
              alt="Bunso Logo"
              width={32}
              height={32}
              className="rounded-full"
            />
          </div>
        </div>

        {/* Search Bar - Center */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Searchbar
            value={searchValue}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
          />
        </div>

        {/* Navigation Icons - Top Right */}
        <div className="flex items-center space-x-2">
          <button className="p-1 hover:scale-110 hover:brightness-125 transition-all duration-200">
            <Image
              src="/nav/post.png"
              alt="Post"
              width={36}
              height={36}
              className="w-9 h-9 filter brightness-0 invert opacity-70 hover:opacity-100"
            />
          </button>
          <button className="p-1 hover:scale-110 hover:brightness-125 transition-all duration-200">
            <Image
              src="/nav/messages.png"
              alt="Messages"
              width={36}
              height={36}
              className="w-9 h-9 filter brightness-0 invert opacity-70 hover:opacity-100"
            />
          </button>
          <button className="p-1 hover:scale-110 hover:brightness-125 transition-all duration-200">
            <Image
              src="/nav/bookmarks.png"
              alt="Bookmarks"
              width={36}
              height={36}
              className="w-9 h-9 filter brightness-0 invert opacity-70 hover:opacity-100"
            />
          </button>
          <button className="p-1 hover:scale-110 hover:brightness-125 transition-all duration-200">
            <Image
              src="/nav/notifications.png"
              alt="Notifications"
              width={36}
              height={36}
              className="w-9 h-9 filter brightness-0 invert opacity-70 hover:opacity-100"
            />
          </button>
          <button className="p-1 hover:scale-110 hover:brightness-125 transition-all duration-200">
            <Image
              src="/nav/profile.png"
              alt="Profile"
              width={36}
              height={36}
              className="w-9 h-9 filter brightness-0 invert opacity-70 hover:opacity-100"
            />
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
