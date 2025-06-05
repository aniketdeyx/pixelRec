'use client'
import { ChevronDown } from 'lucide-react'
import React, { useState } from 'react'

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const options = ['Most Recent', 'Most Liked']

  return (
    <div className="relative inline-block text-left">
      {/* Trigger */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-4 py-2 bg-zinc-100 hover:bg-zinc-200 rounded-md cursor-pointer transition"
      >
        <span className="text-sm font-medium">Most Recent</span>
        <ChevronDown className="w-4 h-4" />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul className="absolute mt-2 w-40 bg-white border border-zinc-200 rounded-md shadow-md z-10">
          {options.map((item) => (
            <li
              key={item}
              className="px-4 py-2 hover:bg-zinc-100 cursor-pointer text-sm"
              onClick={() => {
                setIsOpen(false)
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dropdown
