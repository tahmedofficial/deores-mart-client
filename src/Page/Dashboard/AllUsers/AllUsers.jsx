import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import profileIcon from "../../../assets/images/profileIcon.jpg";
import { FaEdit } from "react-icons/fa";
import UserUpdateModal from "./UserUpdateModal";
import { useEffect, useState } from "react";

const AllUsers = () => {

    const axiosSecure = useAxiosSecure();
    const [showModal, setShowModal] = useState(false);
    const [search, setSearch] = useState("");
    const [index, setIndex] = useState(0);

    const { data: users = [], refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?search=${search}`);
            return res.data;
        }
    })

    useEffect(() => {
        refetch();
    }, [search, refetch])

    const handleUpdateUser = (index) => {
        setIndex(index);
        setShowModal(true);
    }

    return (
        <div>
            <div>
                <input onChange={(e) => setSearch(e.target.value)} className="h-10 px-3 bg-primary_bg_color md:w-96 outline-none rounded-lg flex lg:mx-auto my-10" type="text" placeholder="Search hear" />
            </div>
            {
                users.length > 0 ?
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Number</th>
                                    <th>Role</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map((user, index) =>
                                        <tr key={user._id} className="hover">
                                            <th>{index + 1}</th>
                                            <td>
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={user.image || profileIcon} alt="profile" />
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.number}</td>
                                            <td>{user.role}</td>
                                            <td>
                                                <button onClick={() => handleUpdateUser(index)} className="btn btn-sm bg-green-500 text-white"><FaEdit /></button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div> : <span className="loading loading-spinner loading-lg text-black flex mx-auto mt-20"></span>
            }
            <div>
                {
                    showModal ? <UserUpdateModal refetch={refetch} userInfo={users[index]} onClose={() => setShowModal(false)}></UserUpdateModal> : undefined
                }
            </div>
        </div>
    );
};

export default AllUsers;