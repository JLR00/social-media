import {useState} from "react";
import {Post as IPost} from "../../pages/home/home"
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {db, auth} from "../../config/firebase"
import {useAuthState} from "react-firebase-hooks/auth";
import {addDoc, getDocs, deleteDoc, doc, collection, query, where} from "firebase/firestore";

interface Props {
    post: IPost;
}

interface Comment {
    commentId: string;
    userId: string;
}


export const CreateComment = (props: Props) => {
    const [comment, setComment] = useState<Comment[] | null>(null);
    const [user] = useAuthState(auth);
    const {post} = props;

    const schema = yup.object().shape({
        comment: yup.string().required(),
    });

    const commentsRef = collection(db, "comments");
    
    const commentsDoc = query(commentsRef, where("postId", "==", post.id));
    const getComments = async () => {
        const data = await getDocs(commentsDoc);
        setComment(data.docs.map((doc) => ({userId: doc.data().userId, commentId: doc.id})));
    }

    //const handleSubmit = async (e: React.FormEvent) => {
    //    //e.preventDefault
//
    //    console.log("Comment envoyé: ", comment)
//
    //    //await addDoc(collection(db, "comments"), {
    //    //    text: comment,
    //    //    user: user?.uid,
    //    //})
//
    //    setComment("")
    //}

    const addComment = async () => {
        try{
            const newDoc = await addDoc(commentsRef, {
                userId: user?.uid,
                postId: post.id,
            });
            if (user) {
                setComment((prev) => prev ? [...prev, {userId: user?.uid, likeId: newDoc.id}] : [{userId: user?.uid, likeId: newDoc.id}]);
            }
            console.log("Commentaire ajouté");
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <textarea placeholder="Express Yourself" onChange={(e) => setComment(e.target.value)} value={comment}/>
            <p>{comment}</p>
            <input type="submit" className="btn" value="Add Comment" />
        </form>
    );
}