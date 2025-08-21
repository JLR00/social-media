import {useState} from "react";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {addDoc, collection} from "firebase/firestore";
import {db, auth} from "../../config/firebase"
import {useAuthState} from "react-firebase-hooks/auth";

export const CreateComment = () => {
    const [comment, setComment] = useState<string>("");
    const [user] = useAuthState(auth);

    const schema = yup.object().shape({
        comment: yup.string().required(),
    });


    return (
        <form>
            <textarea placeholder="Express Yourself" onChange={(e) => setComment(e.target.value)} value={comment}/>
            <p>{comment}</p>
            <input type="submit" className="btn" value="Add Comment" />
        </form>
    );
}