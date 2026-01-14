import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Image from 'next/image'


const UserTag = () => {
    const { data: session } = useSession()

    return (
        <div>
            {session &&
                <div className='flex gap-4 w-full items-center'>
                    <Image src={session?.user?.image} alt='user image' width={50} height={50} className='rounded-full w-15 h-15' />

                    <div>
                        <h2 className='text-[30px] font-semibold'>{session?.user?.name}</h2>
                        <h2 className='text-gray-400'>{session?.user?.email}</h2>
                    </div>
                </div>}
        </div>
    )
}

export default UserTag