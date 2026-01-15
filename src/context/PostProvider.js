"use client";
import { useEffect, useState } from "react";
import { PostContext } from "./PostContext";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/libs/firebaseConfig";

export default function PostProvider({ children }) {
    const [postInformation, setPostInformation] = useState([]);
    const [loading, setloading] = useState(false)
    const [searchTerm, setSearchTerm] = useState("");

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

    return (
        <PostContext.Provider value={{ postInformation, loading, setloading, searchTerm,setSearchTerm }}>
            {children}
        </PostContext.Provider>
    );
}


export const usePosts = () => useContext(PostContext);