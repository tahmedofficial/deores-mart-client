import { MdVerified } from "react-icons/md";
import useAuth from "../../../Hooks/useAuth";
import profileIcon from "../../../assets/images/profileIcon.jpg";
import { useNavigate } from "react-router-dom";

const Profile = () => {

    const { user, logOutUser, successMessage } = useAuth();
    const navigate = useNavigate();
    console.log(user?.emailVerified);

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
                <div className="bg-primary_bg_color p-5 rounded-xl mt-10 lg:w-4/6">
                    <h1 className="text-center text-2xl font-semibold">Address</h1>
                    <h3 className="h-10 bg-white mt-3 px-3 py-2 rounded-xl">House: </h3>
                    <h3 className="h-10 bg-white mt-3 px-3 py-2 rounded-xl">Road: </h3>
                    <h3 className="h-10 bg-white mt-3 px-3 py-2 rounded-xl">Area: </h3>
                    <h3 className="h-10 bg-white mt-3 px-3 py-2 rounded-xl">City: </h3>
                    <h3 className="h-10 bg-white mt-3 px-3 py-2 rounded-xl">Detaild Address: </h3>
                    <button className="btn bg-black text-white mt-5 px-10 flex mx-auto">Update Address</button>
                </div>

                <div className="bg-primary_bg_color mt-10 rounded-xl py-3">
                    <h1 className="text-center text-2xl font-semibold py-5">My Orders</h1>
                    <div className="divider"></div>
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Image</th>
                                    <th>Product Name</th>
                                    <th>Order Id</th>
                                    <th>Order Date</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="hover bg-white">
                                    <th>2</th>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src="https://img.daisyui.com/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </td>
                                    <td>T-Shart</td>
                                    <td>DS-570422</td>
                                    <td>22-6-2024</td>
                                    <td>$15</td>
                                </tr>
                                <tr className="hover bg-white">
                                    <th>2</th>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src="https://img.daisyui.com/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </td>
                                    <td>T-Shart</td>
                                    <td>DS-570422</td>
                                    <td>22-6-2024</td>
                                    <td>$15</td>
                                </tr>
                                <tr className="hover bg-white">
                                    <th>2</th>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src="https://img.daisyui.com/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </td>
                                    <td>T-Shart</td>
                                    <td>DS-570422</td>
                                    <td>22-6-2024</td>
                                    <td>$15</td>
                                </tr>
                                <tr className="hover bg-white">
                                    <th>2</th>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src="https://img.daisyui.com/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </td>
                                    <td>T-Shart</td>
                                    <td>DS-570422</td>
                                    <td>22-6-2024</td>
                                    <td>$15</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <button onClick={handleLogOut} className="btn bg-black text-white px-10 mt-10">Log Out</button>
            </div>
        </div>
    );
};

export default Profile;