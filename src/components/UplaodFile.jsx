"use client";

import { ArrowUpCircle } from 'lucide-react'
import React, { useRef, useState } from 'react'


const UplaodFile = ({ setFile }) => {
    const [selectedFile, setSelectedFile] = useState(null)

    const handleChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        setSelectedFile(file);
        setFile(file);

        e.target.value = "";
    }

    return (
        <div className='h-[450px] bg-[#e9e9e9] rounded-lg'>
            <label htmlFor="dropimage" className='flex flex-col justify-center items-center m-5 border-dashed border h-[90%]  border-[2px] cursor-pointer'>


                <input  onChange={handleChange} type="file" className='hidden' id='dropimage' />
                {!selectedFile ?
                    <div className='flex flex-col justify-center items-center'>
                        <ArrowUpCircle className="text-[24px] mb-2" />
                        <h2 className="font-semibold">Click to Upload</h2>

                        <p className="text-sm text-gray-400 mt-1">
                            PNG, JPG, GIF
                        </p>
                    </div> :
                    <img src={window.URL.createObjectURL(selectedFile)} width={500}
                        height={800}
                        alt="selectedfile"
                        className='object-contain h-[90%]' />
                }

            </label>
        </div>
    )
}

export default UplaodFile