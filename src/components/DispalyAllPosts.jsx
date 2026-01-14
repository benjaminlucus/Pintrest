"use client";

import { db } from "@/libs/firebaseConfig";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { MoreHorizontal } from "lucide-react";
import { Download } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const DisplayAllPosts = () => {
    const [postInformation, setPostInformation] = useState([]);
    const [loading, setloading] = useState(false)

    const router = useRouter();

    // Fetch posts on mount
    useEffect(() => {
        getPostData();
    }, []);

    const getPostData = async () => {
        try {
            setloading(true);

            const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
            const snap = await getDocs(q);

            const posts = snap.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setPostInformation(posts);
        } catch (error) {
            console.error("Error fetching posts:", error);
        } finally {
            setloading(false)
        }
    };

    if (loading) {
        return <Image src="/loading-indicator.png" width={80} height={80} alt="loading" className="animate-spin" />
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">All Posts</h1>

            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
                {postInformation.length === 0 ? (
                    <p>No posts available.</p>
                ) : (
                    postInformation.map((post) => (
                        <div
                            key={post.id}
                            className="mb-4 cursor-pointer relative group break-inside-avoid rounded-xl overflow-hidden" onClick={() => router.push(`/posts/${post.id}`)}
                        >
                            {/* Post Image */}
                            {post.image && (
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full object-cover rounded-xl"
                                />
                            )}

                            {/* Overlay (optional dim) */}
                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-xl"></div>

                            {/* Save button at top-right (appears on hover) */}
                            <button className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 text-white font-semibold bg-red-500 px-4 py-2 rounded-xl shadow-md transition-opacity duration-300 cursor-pointer">
                                View
                            </button>

                            {/* Bottom buttons (appear on hover) */}
                            <div className="absolute bottom-2 mx-2 flex gap-2 z-20 opacity-0 group-hover:opacity-100 flex justify-between">
                                <div>

                                    <button className="bg-white cursor-pointer text-black px-3 py-1 rounded-xl hover:bg-gray-100 shadow-md">
                                        <Download />
                                    </button>
                                    <button className="bg-white cursor-pointer text-black px-3 py-1 rounded-xl hover:bg-gray-100 shadow-md">
                                        <MoreHorizontal />
                                    </button>
                                </div>

                                <Image onContextMenu={(e) => e.preventDefault()} target="_blank" src={postInformation.image || "/unknown.jpeg"} width={50} height={50} alt='Man iamge' className='cursor-pointer rounded-full' />


                            </div>
                        </div>

                    ))
                )}
            </div>
        </div>
    );
};

export default DisplayAllPosts;
