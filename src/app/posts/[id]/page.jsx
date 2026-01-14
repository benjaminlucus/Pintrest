"use client";

import { db } from '@/libs/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { use, useEffect, useState } from 'react'

const PostPage = ({ params }) => {

    const resolvedParams = use(params);
    const postId = resolvedParams.id;

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    console.log("Post id: ", postId)

    useEffect(() => {
        if (!postId) return;
        fetchPosts();
    }, [postId])


    const fetchPosts = async () => {

        try {
            console.log("entered trycatch")

            setLoading(true);

            const docRef = doc(db, "posts", postId);
            const docSnap = await getDoc(docRef);
            console.log("Docsnap aprt below")

            if (docSnap.exists()) {
                setPost(docSnap.data())
                console.log("Docdata: ", docSnap.data())

            } else {
                console.log("No such post!");
            }
            console.log("ended try")

        } catch (error) {
            console.error("Error occured", error)
            console.log("ended catch")

        } finally {
            setLoading(false);
            console.log("ended finally")
        }
    }

    if (loading) return <Image src="/loading-indicator.png" width={80} height={80} alt="loading" className="animate-spin" />;
    if (!post) return <p>Post not found</p>;

    const downloadImage = async () => {
        try {
            const res = await fetch(post.image);
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = `post-${postId}.png`;
            link.click();

            URL.revokeObjectURL(url); // clean up memory
        } catch (error) {
            console.error("Download failed", error);
        }
    }


    return (
        <div>
            <button onClick={() => router.back()} className="text-blue-500 mb-4">← Back</button>

            <div className="p-4 max-w-xl mx-auto grid gap-4 md:grid-cols-2 grid-cols-1 ">
                <div>

                    <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
                    <p className="text-gray-500 mb-4">{post.description}</p>
                </div>

                {post.image && (
                    <div className="relative">
                        <img src={post.image} alt={post.title} className="w-full rounded-lg mb-4" />
                        <button
                            onClick={downloadImage}
                            className="absolute top-2 right-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
                        >
                            Download
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PostPage