import { MdVerified } from "react-icons/md";
import useAuth from "../../../Hooks/useAuth";
import profileIcon from "../../../assets/images/profileIcon.jpg";
import { useNavigate } from "react-router-dom";
import Address from "./Address/Address";
import MyOrders from "./MyOrders/MyOrders";

const Profile = () => {

    const { user, logOutUser, successMessage } = useAuth();
    const navigate = useNavigate();



    const handleLogOut = () => {
        logOutUser()
            .then(() => {
                navigate("/");
                successMessage("Log Out Successfully");
            })
    }

    return (
        <div className="grid md:grid-cols-3">
            <div className="col-span-1">
                <div className="flex flex-col items-center">
                    <img className="max-w-96" src={user?.photoURL ? user?.photoURL : profileIcon} alt="Profile" />
                </div>
                <div className="flex flex-col items-center mt-3">
                    <h1 className="text-lg">Name: {user?.displayName}</h1>
                    <div className="flex items-center gap-1">
                        <h3 className="text-lg">Email: {user?.email}</h3>
                        <span>{user?.emailVerified ? <MdVerified className="text-green-500" /> : undefined}</span>
                    </div>
                </div>
                <button className="btn bg-black text-white flex mt-5 mx-auto">Update Profile</button>
            </div>

            <div className="md:col-span-2">
                <Address></Address>
                <MyOrders></MyOrders>
                <button onClick={handleLogOut} className="btn bg-black text-white px-10 mt-10">Log Out</button>
            </div>

        </div>
    );
};

export default Profile;