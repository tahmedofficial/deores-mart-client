import { NavLink } from "react-router-dom";

const AdminDashboard = () => {
    return (
        <>
            <ul className="menu menu-md bg-primary_card_color rounded-none w-56 min-h-screen">
                <li><NavLink to="profile">Profile</NavLink></li>
                <li><NavLink to="allUsers">All Users</NavLink></li>
                <li><NavLink to="addItem">Add Item</NavLink></li>
                <li><NavLink to="order">Ordered Item</NavLink></li>
                <div className="divider"></div>
                <li><NavLink to="/">Home</NavLink></li>
            </ul>
            <div className="menu menu-md bg-primary_card_color rounded-none w-56 min-h-screen">
                <li><NavLink to="login">All Users</NavLink></li>
                <li><NavLink to="addItem">Add Item</NavLink></li>
                <li><NavLink to="order">Ordered Item</NavLink></li>
            </div>

        </>
    );
};

export default AdminDashboard;