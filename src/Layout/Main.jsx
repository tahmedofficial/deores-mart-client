import { Outlet } from "react-router-dom";
import Navbar from "../Page/Navbar/Navbar";
import Footer from "../Page/Footer/Footer";

const Main = () => {

    return (
        <main className="font-montserrat">
            <Navbar></Navbar>
            <div className="md:w-5/6 mx-auto px-4">
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </main>
    );
};

export default Main;