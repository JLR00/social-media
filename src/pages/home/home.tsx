import {getDocs, collection} from "firebase/firestore";
import {db} from "../../config/firebase";
import {useEffect, useState} from "react";
import {Post} from "../../components/post/post";
import {CreatePost} from "../create-post/create-post";
import {Icon} from "@iconify/react";

export interface Post {
    id: string;
    userId: string;
    title: string;
    username: string;
    description: string;
}

export const Home = () => {
    const postRef = collection(db, "posts");
    const [postList, setPostList] = useState<Post[] | null>(null);

    const getPost = async () => {
        const data = await getDocs(postRef);
        setPostList(data.docs.map((doc) => ({...doc.data(), id: doc.id})) as Post[]
        );
    }

    useEffect(() => {
        getPost();
    }, [])
    return (
        <div className="container">
            <div className="profile-container"></div>
            <div className="post-container">
                <div>
                    <div className="post-header">
                        <Icon icon="gridicons:add" className="icon" />
                        <p>Create a post</p>
                    </div>
                    <CreatePost />
                </div>
                {postList?.map((post) => <Post post={post} />)}
            </div>
        </div>
    );
}