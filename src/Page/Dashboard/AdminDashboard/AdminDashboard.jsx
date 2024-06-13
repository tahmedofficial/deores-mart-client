import { FaBorderAll, FaUser, FaUsers } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { IoHomeSharp } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const AdminDashboard = () => {
    return (
        <ul className="flex flex-col gap-3 px-5 pt-3 bg-primary_card_color rounded-xl w-56 h-full min-h-screen">
            <li><NavLink className={({isActive})=> isActive? "btn w-full bg-black text-white":"btn w-full"} to="/dashboard/profile"><FaUser />Profile</NavLink></li>
            <li><NavLink className={({isActive})=> isActive? "btn w-full bg-black text-white":"btn w-full"} to="/dashboard/allUsers"><FaUsers />All Users</NavLink></li>
            <li><NavLink className={({isActive})=> isActive? "btn w-full bg-black text-white":"btn w-full"} to="/dashboard/addItem"><IoMdAddCircle />Add Item</NavLink></li>
            <li><NavLink className={({isActive})=> isActive? "btn w-full bg-black text-white":"btn w-full"} to="/dashboard/order"><FaBorderAll />Ordered Item</NavLink></li>
            <div className="divider"></div>
            <li><NavLink className={({isActive})=> isActive? "btn w-full bg-black text-white":"btn w-full"} to="/"><IoHomeSharp />Home</NavLink></li>
        </ul>
    );
};

export default AdminDashboard;