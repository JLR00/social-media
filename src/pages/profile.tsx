import { db, auth } from "../config/firebase";
import { getDocs, collection, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState, useEffect } from "react";
import { Post } from "../components/post/post";
import { useParams } from "react-router-dom";

export interface Post {
  id: string;
  userId: string;
  title: string;
  username: string;
  description: string;
  imageUrl: string;
}

export const Profile = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user] = useAuthState(auth);
  const postRef = collection(db, "posts");
  const [postList, setPostList] = useState<Post[] | null>(null);

  const getPost = async () => {
    const postsDoc = query(postRef, where("userId", "==", userId));
    const data = await getDocs(postsDoc);
    setPostList(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[]
    );
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className="container">
      <div className="profile-header">
        <div className="profile-wallpaper">
          <img
            src="https://cdn.prod.website-files.com/62d84e447b4f9e7263d31e94/6399a4d27711a5ad2c9bf5cd_ben-sweet-2LowviVHZ-E-unsplash-1.jpeg"
            alt="profile-wallpaper"
          />
        </div>
        <img
          src={auth.currentUser?.photoURL || ""}
          alt="Profile picture"
          className="profile-image"
        />
        <img src="" className="profile-Image" />
        <h1>{auth.currentUser?.displayName}</h1>
      </div>
      <div className="profile-body">
        <div className="post-input-container"></div>
        <div className="post-container">
          {postList?.map((post) => (
            <Post post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};
