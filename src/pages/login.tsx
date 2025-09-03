import { auth, provider, db } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { setDoc, addDoc, getDocs, doc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

interface user {
  uid: string;
  username: string;
  email: string;
  photoUrl: string;
  xp: number;
  lvl: number;
  createdAt: Date;
}

export const Login = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<any>();

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    createUserProfile(result.user);
    getUsers();
    navigate("/");
  };

  const createUserProfile = async (user: any) => {
    await setDoc(
      doc(db, "users", user.uid),
      {
        uid: user.uid,
        username: user.displayName,
        email: user.email,
        photoUrl: user.photoURL,
        xp: 0,
        lvl: 1,
        createdAt: new Date(),
      },
      { merge: true }
    );
  };

  const usersRef = collection(db, "users");

  const getUsers = async () => {
    const data = await getDocs(usersRef);
    setUsers(
      data.docs.map((doc) => ({
        uid: doc.data().uid,
        username: doc.data().username,
        photoUrl: doc.data().photoUrl,
        xp: doc.data().xp,
        lvl: doc.data().lvl,
        createdAt: doc.data().createdAt,
      }))
    );
  };

  //const createUserProfile = async (user: any) => {
  //  console.log("Ajouter le nouvelle");
  //  await addDoc(usersRef, {
  //    uid: user.uid,
  //    username: user.displayName,
  //    /*email: user.email,*/
  //    photoUrl: user.photoURL,
  //    xp: 0,
  //    lvl: 1,
  //    createdAt: new Date(),
  //  });
  //};

  useEffect(() => {
    console.log("Users updated:", users);
  }, [users]);

  return (
    <div>
      <p>Sign In With Google To Conitnue</p>
      <button onClick={signInWithGoogle}>Sign In With Google</button>
    </div>
  );
};
