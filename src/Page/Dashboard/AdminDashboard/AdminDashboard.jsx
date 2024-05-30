import { NavLink } from "react-router-dom";

const AdminDashboard = () => {
    return (
        <ul className="menu menu-md bg-primary_card_color rounded-none w-56 min-h-screen">
            <li><NavLink to="/dashboard/profile">Profile</NavLink></li>
            <li><NavLink to="/dashboard/allUsers">All Users</NavLink></li>
            <li><NavLink to="/dashboard/addItem">Add Item</NavLink></li>
            <li><NavLink to="/dashboard/order">Ordered Item</NavLink></li>
            <div className="divider"></div>
            <li><NavLink to="/">Home</NavLink></li>
        </ul>
    );
};

export default AdminDashboard;