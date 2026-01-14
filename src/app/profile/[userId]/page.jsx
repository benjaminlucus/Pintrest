"use client"
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '@/libs/firebaseConfig';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { use, useEffect, useState } from 'react'
import { useRouter } from "next/navigation";

const ProfilePage = ({ params }) => {

    const [userInformation, setUserInformation] = useState(null);
    const { data: session, status } = useSession();

    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            alert("Please register or login First!!")
            signIn();
        }
    }, [status]);

    const resolvedParams = use(params);
    const emailID = decodeURIComponent(resolvedParams.userId)

    useEffect(() => {
        if (!emailID) return;
        getUserInfo();
    }, [emailID])

    const getUserInfo = async () => {

        const q = query(collection(db, "users"), where("email", "==", emailID));
        const snap = await getDocs(q);

        console.log("snap data", snap)
        if (!snap.exists) {

            setUserInformation(snap.doc[0].data());
        }

    };
    return (
        <div className='flex items-center justify-center flex-col gap-2'>

            <Image src={session?.user?.image || "/unknown.jpeg"} width={120} height={120} className=' p-2 transition rounded-full cursor-pointer' alt='logo' />
            <h2 className='text-[30px] font-semibold'>{session?.user?.name}</h2>
            <h2 className='text-gray-400'>{session?.user?.email}</h2>

            <div className='flex gap-4'>
                {session ?
                    <button onClick={() => signOut()} className='bg-gray-100 cursor-pointer px-4 py-2 rounded-xl font'>Logout</button> :
                    <button onClick={() => signIn()} className='bg-gray-100 cursor-pointer px-4 py-2 rounded-xl font'>Login</button>
                }
                <button className='bg-gray-100 cursor-pointer px-4 py-2 rounded-xl font'>Share</button>
            </div>
        </div>
    )
}


export default ProfilePage