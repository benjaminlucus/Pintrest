import Image from 'next/image'
import React from 'react'

const PostCard = () => {
  return (
    <div>
        <div className='hover:bg-black hover:opacity-80 rounded-2xl'>
            <Image src="/image.png" height={800} width={400} className='object-contain'/> 
        </div>
    </div>
  )
}

export default PostCard