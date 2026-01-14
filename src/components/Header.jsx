"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { SearchIcon } from 'lucide-react'
import { ChevronDown } from 'lucide-react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import DropdownMenu from './DropdownMenu'
import { getFirestore, doc, setDoc } from "firebase/firestore"
import { app } from '@/libs/firebaseConfig'



const Header = () => {
    const { data: session } = useSession()

    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)

    const db = getFirestore(app)


    useEffect(() => {
        saveUserInfo();
        console.log("Done successfully1");

    }, [session])

    const saveUserInfo = async () => {

        if (session.user) {
            await setDoc(doc(db, "users", session?.user?.email), {
                name: session?.user?.name,
                email: session?.user?.email,
                userImage: session?.user?.image
            })
            console.log("Done successfully2");

        }

        console.log("Done successfully3");

    }
    return (
        <div className='flex gap-4 md:gap-8 items-center p-4 justify-between'>

            <div className='rounded-xl flex bg-[#e9e9e9] gap-3 xm:p-2 p-4 w-full '>
                <SearchIcon className='text-[25px]' />
                <input className='rounded-md bg-transparent outline-none' placeholder='Search' />
            </div>

            {session ? <div className='flex items-center gap-1'>
                
                <Image onContextMenu={(e) => e.preventDefault()}  target="_blank" onClick={()=>router.push(`profile/${session?.user?.email}`)} src={session?.user?.image || "/unknown.jpeg"} width={30} height={30} alt='Man iamge' className='cursor-pointer rounded-full' />
                <ChevronDown className='cursor-pointer' width={20} height={20} onClick={() => setIsOpen(true)} />


            </div> : <>
                <button onClick={() => signIn()} className='bg-transparent cursor-pointer border border-gray-300 rounded-md p-2'>Login</button>
            </>
            }


        </div>
    )
}

export default Header