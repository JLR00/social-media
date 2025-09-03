import {Link} from "react-router-dom";
import React from "react";
import {auth} from "../config/firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {signOut} from "firebase/auth";
import {Icon} from "@iconify/react";

export const Navbar = () => {
    const [user] = useAuthState(auth);
    const signUserOut = async () => {
        await signOut(auth);
    }

    return (
        <div className="navbar">
            {/*<img src="#" alt="logo"/>*/}
            <Icon icon="devicon:react" width="3rem"></Icon>
            <div>
                <Link to="/">Home</Link>
                {!user ? (
                    <Link to="/login">Login/Signup</Link>
                ) : (
                    <>
                        <Link to="/createpost">Create Post</Link>
                        <Link to={`/profile/${user.uid}`}>My Page</Link>
                    </>
                )}
            </div>
            <div>
                {user && (
                    <button onClick={signUserOut}>Log Out</button>
                )}
            </div>
        </div>
    );
}