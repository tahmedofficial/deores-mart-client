import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Page/Navbar/Navbar";
import Footer from "../Page/Footer/Footer";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "../Components/ScrollToTop/ScrollToTop";

const Main = () => {

    const location = useLocation();
    const isCartPage = location.pathname.includes("/cart");

    return (
        <main className="font-montserrat">
            <ScrollToTop></ScrollToTop>
            {isCartPage ? undefined : <Navbar></Navbar>}
            <Outlet></Outlet>
            {isCartPage ? undefined : <Footer></Footer>}
            <ToastContainer />
        </main>
    );
};

export default Main;