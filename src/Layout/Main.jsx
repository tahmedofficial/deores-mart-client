import { Outlet } from "react-router-dom";
import Navbar from "../Page/Navbar/Navbar";
import Footer from "../Page/Footer/Footer";
import { ToastContainer } from "react-toastify";

const Main = () => {

    return (
        <main className="font-montserrat">
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
            <ToastContainer />
        </main>
    );
};

export default Main;