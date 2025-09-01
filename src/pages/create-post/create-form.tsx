import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { UploadImage } from "./UploadImage";

interface CreateFormData {
  title: string;
  description: string;
}

export const CreateForm = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState<string>("");

  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFormData>({
    resolver: yupResolver(schema),
  });
  const postsRef = collection(db, "posts");
  const onCreatePost = async (data: CreateFormData) => {
    await addDoc(postsRef, {
      ...data,
      username: user?.displayName,
      userId: user?.uid,
      imageUrl: imageUrl,
    });

    //navigate("/");
    window.location.reload();
  };
  return (
    <form onSubmit={handleSubmit(onCreatePost)}>
      <input
        type="text"
        placeholder="Title"
        {...register("title")}
        className="title-input"
      />
      <p>{errors.title?.message}</p>
      <textarea placeholder="Description" {...register("description")} />
      <p>{errors.description?.message}</p>
      <UploadImage onUpload={(url) => setImageUrl(url)} />
      <input type="submit" className="btn" />
    </form>
  );
};
