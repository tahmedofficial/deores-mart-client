import { MdVerified } from "react-icons/md";
import useAuth from "../../../Hooks/useAuth";
import profileIcon from "../../../assets/images/profileIcon.jpg";
import { useNavigate } from "react-router-dom";
import Address from "../../../Components/Address/Address";
import MyOrders from "../../../Components/MyOrders/MyOrders";
import { useState } from "react";
import UpdateProfileModal from "./UpdateProfileModal";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Profile = () => {

    const { user, logOutUser, successMessage } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [showUpdateProfile, setShowUpdateProfile] = useState(false);

    const { data: userInfo = {} } = useQuery({
        queryKey: [user?.email, "user"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            return res.data;
        }
    })

    const handleLogOut = () => {
        logOutUser()
            .then(() => {
                navigate("/");
                successMessage("Log Out Successfully");
            })
    }

    return (
        <div className="grid md:grid-cols-3">
            <div className="col-span-1 mt-10">
                <div className="flex flex-col items-center">
                    <img className="w-60 h-60 rounded-full" src={user?.photoURL ? user?.photoURL : profileIcon} alt="Profile" />
                </div>
                <div className="flex flex-col items-center mt-3">
                    <h1 className="text-lg">Name: {user?.displayName}</h1>
                    <div className="flex items-center gap-1">
                        <h3 className="text-lg">Email: {user?.email}</h3>
                        <span>{user?.emailVerified ? <MdVerified className="text-green-500" /> : undefined}</span>
                    </div>
                </div>
                <button onClick={() => setShowUpdateProfile(true)} className="btn bg-black text-white flex mt-5 mx-auto">Update Profile</button>
            </div>

            <div className="md:col-span-2">
                <Address></Address>
                <MyOrders></MyOrders>
                <button onClick={handleLogOut} className="btn bg-black text-white px-10 mt-10">Log Out</button>
            </div>

            <div>
                {
                    showUpdateProfile ? <UpdateProfileModal userInfo={userInfo} onClose={() => setShowUpdateProfile(false)}></UpdateProfileModal> : undefined
                }
            </div>
        </div>
    );
};

export default Profile;