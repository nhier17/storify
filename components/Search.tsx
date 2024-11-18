import React from 'react'
import Image from 'next/image'
import { Input } from './ui/input'

const Search = () => {
  return (
    <div className="search">
      <div className="search-input-wrapper">
        <Image 
          src="/assets/icons/search.svg" 
          alt="search" 
          width={24} 
          height={24} 
        />
        <Input 
          type="text" 
          placeholder="Search" 
          className="search-input" 
        />
      </div>
    </div>
  )
}

export default Search
