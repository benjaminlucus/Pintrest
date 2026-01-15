"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import DropdownMenu from './DropdownMenu'
import { getFirestore, doc, setDoc } from "firebase/firestore"
import { app } from '@/libs/firebaseConfig'
import SearchBar from './SearchBar'

import { useContext } from "react";
import { PostContext } from '@/context/PostContext'

const Header = () => {
    const { data: session } = useSession()
    const router = useRouter()

    const [isOpen, setIsOpen] = useState(false)

    const {  searchTerm, setSearchTerm} = useContext(PostContext);

    const db = getFirestore(app)

    useEffect(() => {
        saveUserInfo();
    }, [session])

    const saveUserInfo = async () => {
        if (session.user) {
            await setDoc(doc(db, "users", session?.user?.email), {
                name: session?.user?.name,
                email: session?.user?.email,
                userImage: session?.user?.image
            })
        }
    }

    return (
        <div className='flex gap-4 md:gap-8 items-center p-4 justify-between'>

            <div className='w-full'>
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>

            {session ? <div className='flex items-center gap-1'>
                <Image onContextMenu={(e) => e.preventDefault()} target="_blank" onClick={() => router.push(`/profile/${session?.user?.email}`)} src={session?.user?.image || "/unknown.jpeg"} width={30} height={30} alt='Man iamge' className='cursor-pointer rounded-full' />
                <ChevronDown className='cursor-pointer' width={20} height={20} onClick={() => setIsOpen(true)} />
            </div> : <>
                <button onClick={() => signIn()} className='bg-transparent cursor-pointer border border-gray-300 rounded-md p-2'>Login</button>
            </>
            }
        </div>
    )
}

export default Header