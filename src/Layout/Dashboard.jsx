import { Outlet } from "react-router-dom";
import AdminDashboard from "../Page/Dashboard/AdminDashboard/AdminDashboard";

const Dashboard = () => {
    return (
        <div className="flex gap-3">
            <div>
                <AdminDashboard></AdminDashboard>
            </div>
            <div>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;