"use client";

import { db } from '@/libs/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { Heart, MessageCircle, Share2, MoreHorizontal, Maximize2, Sparkles, Download } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { use, useEffect, useState } from 'react'

const PostPage = ({ params }) => {
    const resolvedParams = use(params);
    const postId = resolvedParams.id;

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!postId) return;
        fetchPosts();
    }, [postId]);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const docRef = doc(db, "posts", postId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setPost(docSnap.data());
            }
        } catch (error) {
            console.error("Error occured", error);
        } finally {
            setLoading(false);
        }
    };

    const downloadImage = async () => {
        try {
            const res = await fetch(post.image);
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `post-${postId}.png`;
            link.click();
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Download failed", error);
        }
    };

    if (loading) return (
        <div className="flex h-screen items-center justify-center">
             <Image src="/loading-indicator.png" width={80} height={80} alt="loading" className="animate-spin" />
        </div>
    );
    
    if (!post) return <div className="p-10 text-center">Post not found</div>;

    return (
        <div className="min-h-screen bg-white p-4">
            {/* Pinterest Style Container */}
            <div className="max-w-[1000px] mx-auto bg-white rounded-[32px] shadow-2xl overflow-hidden flex flex-col md:flex-row">
                
                {/* Left Side: Image Section */}
                <div className="w-full md:w-1/2 p-4">
                    <div className="relative group overflow-hidden rounded-[24px]">
                        {/* The Main Image */}
                        <img 
                            src={post.image} 
                            alt={post.title} 
                            className="w-full h-auto object-cover" 
                        />

                        {/* AI Modified Badge (Bottom Left) */}
                        <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5">
                           <Sparkles size={14} /> AI modified
                        </div>

                        {/* Expand Button (Bottom Right Top) */}
                        <button className="absolute bottom-16 right-4 p-2 bg-white/90 rounded-full shadow-lg hover:scale-110 transition-transform">
                            <Maximize2 size={20} className="text-gray-800" onClick={downloadImage}/>
                        </button>

                        {/* Download/Action Button (Bottom Right Bottom) */}
                        <button 
                            onClick={downloadImage}
                            className="absolute bottom-4 right-4 p-2 bg-white/90 rounded-full shadow-lg hover:scale-110 transition-transform"
                        >
                            <Download size={20} className="text-gray-800" />
                        </button>
                    </div>
                </div>

                {/* Right Side: Header & Info Section */}
                <div className="w-full md:w-1/2 p-8 flex flex-col">
                    {/* Top Action Bar */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <button className="p-2 hover:bg-gray-100 rounded-full"><Heart size={24} /></button>
                            <button className="p-2 hover:bg-gray-100 rounded-full"><MessageCircle size={24} /></button>
                            <button className="p-2 hover:bg-gray-100 rounded-full"><Share2 size={24} /></button>
                            <button className="p-2 hover:bg-gray-100 rounded-full"><MoreHorizontal size={24} /></button>
                        </div>
                        <button onClick={downloadImage} className="bg-[#e60023] text-white px-6 py-3 rounded-full font-bold hover:bg-[#ad081b] transition-colors">
                            Save
                        </button>
                    </div>

                    {/* Content Section */}
                    <div>
                        <h1 className="text-3xl font-bold mb-4">{post.title || "Adorable Highland Calf"}</h1>
                        <p className="text-gray-600 leading-relaxed">
                            {post.description || "This is a beautiful high-resolution image of a miniature highland cow."}
                        </p>
                    </div>

                    {/* Back Button */}
                    <button 
                        onClick={() => router.back()} 
                        className="mt-auto text-sm font-semibold text-gray-500 hover:underline pt-10"
                    >
                        ← Back to feed
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PostPage;