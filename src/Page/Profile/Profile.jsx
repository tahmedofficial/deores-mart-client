import useAuth from "../../Hooks/useAuth";

const Profile = () => {

    const { logOutUser } = useAuth();

    const handleLogOut = () => {
        logOutUser()
            .then(() => { })
    }

    return (
        <div>
            profile in
            <button onClick={handleLogOut} className="btn">Log Out</button>
        </div>
    );
};

export default Profile;