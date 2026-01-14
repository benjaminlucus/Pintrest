"use client"

import React, { useState } from 'react'
import UplaodFile from './UplaodFile'
import UserTag from './UserTag'
import { useSession } from 'next-auth/react'
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '@/libs/firebaseConfig'
import Image from 'next/image'

const Form = () => {
    const [loading, setloading] = useState(false)
    const { data: session } = useSession()

    const [fileKey, setFileKey] = useState(Date.now());


    const [form, setForm] = useState({
        title: "",
        description: "",
        link: "",
        file: null,
    });


    const onSave = async () => {
        if (!form.file) {
            alert("Please select an image");
            return;
        }

        console.log("ONSAVE Function Called.")

        setloading(true);

        try {
            console.log("Entered try part Successfully.")

            const formData = new FormData();
            formData.append("file", form.file);

            console.log("File appended successfully.")


            const uploadRes = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            console.log("Response Compiled successfully.")

            const { url } = await uploadRes.json();

            console.log("Image URL FROM CLOUDINARY: ", url)

            const docRef = await addDoc(collection(db, "posts"), {
                title: form.title,
                description: form.description,
                link: form.link,
                image: url,
                user: {
                    name: session?.user?.name,
                    email: session?.user?.email,
                    image: session?.user?.image,
                },
                createdAt: serverTimestamp(),
            });

            console.log("DocRef Object: ", docRef)

            alert("Post created!");

            console.log("End of try part.")

            setForm({
                title: "",
                description: "",
                link: "",
                file: null,
            })

            setFileKey(Date.now());

        } catch (error) {
            console.error("An error occured: ", error);
            alert("Something went wrong");

        } finally {
            setloading(false);
            console.log("End of code finally.")

        }
    };

    return (
        <div className='bg-white p-16 rounded-2xl'>

            <div className='grid lg:grid-cols-3 grid-col-1 gap-10'>
                <UplaodFile key={fileKey} value={form.file} setFile={(file) =>
                    setForm((prev) => ({
                        ...prev,
                        file,
                    }))
                } />

                {/* <div> */}

                <div className='col-span-1 lg:col-span-2'>
                    <div className='w-full'>
                        <input
                            onChange={(e) =>
                                setForm((prev) => ({ ...prev, title: e.target.value }))
                            }
                             value={form.title}
                            type="text" placeholder='Add your Title' className='font-bold  border-b-[2px] border-gray-400 placeholder-gray-400 text-[35px] outline-none w-full' />
                        <h2 className='text-gray-400 w-full text-[12px] mb-8'>
                            The first 40 characters are what usually show up in feeds
                        </h2>

                        <div>
                            <UserTag />
                        </div>

                        <textarea
                            onChange={(e) =>
                                setForm((prev) => ({ ...prev, description: e.target.value }))
                            }
                             value={form.description}
                            type="text" placeholder="Tell everyone what your pin is about" className='mt-8 text-[14px]pb-4  border-b-[2px] border-gray-400 placeholder-gray-400 outline-none w-full' />

                        <input
                            onChange={(e) =>
                                setForm((prev) => ({ ...prev, link: e.target.value }))
                            }
                             value={form.link}

                            type="text"
                            placeholder="Add a Destination Link"
                            className="outline-none w-full pb-4 mt-[90px] border-b-[2px] border-gray-400 placeholder-gray-400"
                        />
                    </div>
                </div>

                {/* </div> */}
            </div>
            <div className='flex mt-4 justify-end items-end'>
                <button
                    onClick={() => onSave()}
                    className="bg-red-500 mb-8 text-end p-2 text-white font-semibold px-3 rounded-lg"
                >
                    {loading ? <Image src="/loading-indicator.png" width={30} height={30} alt="loading" className="animate-spin" /> : <span>Save</span>}


                </button>
            </div>
        </div>
    )
}

export default Form