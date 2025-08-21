import {db, auth} from "../config/firebase";
import {useAuthState} from "react-firebase-hooks/auth";

export const Profile = () => {
    const [user] = useAuthState(auth);

    return (
        <div className="container">
            <div className="profile-header">
                <div className="profile-wallpaper">
                    <img src="https://cdn.prod.website-files.com/62d84e447b4f9e7263d31e94/6399a4d27711a5ad2c9bf5cd_ben-sweet-2LowviVHZ-E-unsplash-1.jpeg" alt="profile-wallpaper"/>
                </div>
                <img src={auth.currentUser?.photoURL || ""} alt="Profile picture" className="profile-image" />
                <h1>{auth.currentUser?.displayName}</h1>
            </div>
            <div className="profile-body">
                <div className="post-input-container">

                </div>
                {/*A voir comment mettre les posts filter seulement pour le profile*/}
            </div>
        </div>
    );
}