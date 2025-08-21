import {Post as IPost} from "../../pages/home/home"
import {addDoc, getDocs, deleteDoc, doc, collection, query, where} from "firebase/firestore";
import {db, auth} from "../../config/firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {useEffect, useState} from "react";
import { Icon } from "@iconify/react";
import {CreateComment} from "./CreateComment";

interface Props {
    post: IPost;
}

interface Like {
    likeId: string;
    userId: string;
}

export const Post = (props: Props) => {
    const {post} = props;
    const [user] = useAuthState(auth);

    const [likes, setLikes] = useState<Like[] | null>(null);

    const likesRef = collection(db, "likes");

    const likesDoc = query(likesRef, where("postId", "==", post.id));
    const getLikes = async () => {
        const data = await getDocs(likesDoc);
        setLikes(data.docs.map((doc) => ({userId: doc.data().userId, likeId: doc.id})));
    }

    const removeLike = async () => {
        try{
            const likeToDeleteQuery = query(likesRef,
                where("postId", "==", post.id),
                where("userId", "==", user?.uid)
            );

            const likeToDeleteData = await getDocs(likeToDeleteQuery);
            const likeId = likeToDeleteData.docs[0].id;
            const likeToDelete = doc(db, "likes", likeId);

            await deleteDoc(likeToDelete);
            if (user) {
                setLikes((prev) => prev && prev.filter((like) => like.likeId !== likeId));
            }
        } catch (err) {
            console.error(err);
        }
    }

    const addLike = async () => {
        try{
            const newDoc = await addDoc(likesRef, {
                userId: user?.uid,
                postId: post.id,
            });
            if (user) {
                setLikes((prev) => prev ? [...prev, {userId: user?.uid, likeId: newDoc.id}] : [{userId: user?.uid, likeId: newDoc.id}]);
            }
            console.log("Like ajouté");
        } catch (err) {
            console.error(err);
        }
    }

    const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

    useEffect(() => {
        getLikes();
    }, []);
    return(
        <div className="post">
            <div className="post-header">
                <img src={auth.currentUser?.photoURL || ""} alt="Profile Picture"/>
                <p>@{post.username}</p>
            </div>
            <div className="post-card">
                <div className="post-title">
                    <h2>{post.title}</h2>
                </div>
                <div className="post-description">
                    <p>{post.description}</p>
                </div>
                <div className="post-reactions-count">
                    {likes && <p>Likes: {likes?.length}</p>}
                </div>
                <div className="post-reactions">
                    <button onClick={hasUserLiked ? removeLike : addLike} className={`${hasUserLiked && "liked"} btn`}>
                        {!hasUserLiked ? <><Icon icon="weui:like-outlined" className="icon" />Like</> : <><Icon icon="weui:like-filled" className="icon" />Unlike</>} {/*&#128077; &#128078;*/}
                    </button>
                    <button className="btn"><Icon icon="mdi-light:comment" className="icon" />Comment</button>
                    <button className="btn"><Icon icon="mynaui:share" className="icon" />Share</button>
                </div>
                <div>
                    <CreateComment />
                </div>
            </div>
        </div>
    );
}