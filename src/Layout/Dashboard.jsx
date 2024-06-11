import { NavLink, Outlet } from "react-router-dom";
import { Twirl as Hamburger } from 'hamburger-react'
import AdminDashboard from "../Page/Dashboard/AdminDashboard/AdminDashboard";
import { useState } from "react";
import { FaBorderAll, FaUser, FaUsers } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { IoHomeSharp } from "react-icons/io5";

const Dashboard = () => {

    const [isOpen, setOpen] = useState(true);

    return (
        <div className="flex gap-3 px-2">
            <div>
                <Hamburger toggled={isOpen} toggle={setOpen} />
                {isOpen ? <AdminDashboard></AdminDashboard> :
                    <div>
                        <ul className="flex flex-col gap-3 pt-3 items-center bg-primary_card_color rounded-sm min-h-screen">
                            <li><NavLink className={({ isActive }) => isActive ? "bg-black btn text-white btn-square" : "btn btn-square"} to="/dashboard/profile"><FaUser className="text-lg" /></NavLink></li>
                            <li><NavLink className={({ isActive }) => isActive ? "bg-black btn text-white btn-square" : "btn btn-square"} to="/dashboard/allUsers"><FaUsers className="text-xl" /></NavLink></li>
                            <li><NavLink className={({ isActive }) => isActive ? "bg-black btn text-white btn-square" : "btn btn-square"} to="/dashboard/addItem"><IoMdAddCircle className="text-xl" /></NavLink></li>
                            <li><NavLink className={({ isActive }) => isActive ? "bg-black btn text-white btn-square" : "btn btn-square"} to="/dashboard/order"><FaBorderAll className="text-xl" /></NavLink></li>
                            <div className="divider"></div>
                            <li><NavLink className={({ isActive }) => isActive ? "bg-black btn text-white btn-square" : "btn btn-square"} to="/"><IoHomeSharp className="text-xl" /></NavLink></li>
                        </ul>
                    </div>
                }
            </div>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;