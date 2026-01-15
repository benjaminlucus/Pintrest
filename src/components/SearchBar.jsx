"use client";

import { SearchIcon } from 'lucide-react';
import React, { useState } from 'react'

const SearchBar = ({ searchTerm, setSearchTerm }) => {


    return (
        <div>
            <div className='rounded-xl flex bg-[#e9e9e9] gap-3 xm:p-2 p-4 w-full '>
                <SearchIcon className='text-[25px]' />
                <input onChange={(e) => setSearchTerm(e.target.value)} className='rounded-md bg-transparent outline-none w-full ' placeholder='Search' />
            </div>
        </div>
    )
}

export default SearchBar