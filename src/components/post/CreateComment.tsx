import {useEffect, useState} from "react";
import {Post as IPost} from "../../pages/home/home"
import * as yup from "yup";
import {db, auth} from "../../config/firebase"
import {useAuthState} from "react-firebase-hooks/auth";
import {addDoc, getDocs, deleteDoc, doc, collection, query, where} from "firebase/firestore";

interface Props {
    post: IPost;
}

interface Comment {
    commentId: string;
    userId: string;
    username: string;
    text: string;
}


export const CreateComment = (props: Props) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState<string>();
    const [user] = useAuthState(auth);
    const {post} = props;

    const schema = yup.object().shape({
        comment: yup.string().required(),
    });

    const commentsRef = collection(db, "comments");
    
    const commentsDoc = query(commentsRef, where("postId", "==", post.id));
    const getComments = async () => {
        const data = await getDocs(commentsDoc);
        setComments(data.docs.map((doc) => ({
            commentId: doc.id,
            userId: doc.data().userId,
            username: doc.data().username,
            text: doc.data().comment
        })));
    }

    const addComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment?.trim()) return;

        try{
            await addDoc(commentsRef, {
                userId: user?.uid,
                username: user?.displayName,
                postId: post.id,
                comment: newComment
            });
            setNewComment("");
            getComments();
            console.log("Commentaire ajouté");
        } catch (err) {
            console.error(err);
        }
    }

    // Charger les commentaires quand le composant est monté
    useEffect(() => {
        getComments();
    }, [])

    return (
        <div>
            <form onSubmit={addComment}>
                <textarea placeholder="Express Yourself" onChange={(e) => setNewComment(e.target.value)} value={newComment}/>
                <p>{newComment}</p>
                <input type="submit" className="btn" value="Add Comment" />
            </form>

            <div className="comments-list">
                <h4>Commentaire: </h4>
                {comments.length === 0 ? (
                    <p>Aucun commentaire pour le moment.</p>
                ) : (
                    comments.map((c) => (
                        <div>
                            <strong>{c.username} : {c.text}</strong>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}