"use client";

import { Compass } from 'lucide-react'
import { LayoutIcon } from 'lucide-react'
import { BellIcon } from 'lucide-react'
import { MessageCircleMore } from 'lucide-react'
import { PersonStandingIcon } from 'lucide-react';
import { User } from 'lucide-react';
import { Settings } from 'lucide-react'
import { SquarePlus } from 'lucide-react'
import { HomeIcon } from 'lucide-react'
import { useSession } from 'next-auth/react';
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const Sidebar = () => {
    const router = useRouter()

    const {data: session} = useSession();

    return (
        <div className='flex flex-col border-r-[1px] border-gray-300 top-0 gap-4 justify-between items-center max-h-screen sticky xm:p-4 p-2'>
            <div>
                <Image onClick={()=>router.push("/")}  src="/logo.png" width={50} height={50} className='hover:bg-gray-300 xm:p-2 rounded-full cursor-pointer' alt='logo' />
            </div>
            <div className='flex gap-10 flex-col items-center'>
                <HomeIcon onClick={()=>router.push("/")} width={30} height={30} className='cursor-pointer'/>
                <Compass width={30} height={30} className='cursor-pointer'/>
                <User onClick={()=>router.push(`/profile/${session?.user?.email}`)} width={30} height={30} className='cursor-pointer'/>
                <SquarePlus onClick={()=>router.push("/create")} width={30} height={30} className='cursor-pointer'/>
                <BellIcon width={30} height={30} className='cursor-pointer'/>
                <MessageCircleMore width={30} height={30} className='cursor-pointer'/>
            </div>

            <div>
                <Settings className='cursor-pointer'/>
            </div>
        </div>
    )
}

export default Sidebar