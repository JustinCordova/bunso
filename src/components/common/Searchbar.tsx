import React from 'react'
import { FiSearch } from 'react-icons/fi'

interface SearchbarProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

const Searchbar = ({ value, onChange, onKeyDown }: SearchbarProps) => {
  return (
    <div className="relative w-80 mx-auto">
      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted w-5 h-5 pointer-events-none" />
      <input
        type="text"
        placeholder="Search"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className="font-sans text-sm text-white pl-12 pr-4 py-1.5 rounded-full bg-[#1C1E1F] placeholder-muted/80 focus:outline-none h-8 w-full"
      />
    </div>
  )
}

export default Searchbar
