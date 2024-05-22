import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Page/Home/Home";
import AllProducts from "../Page/AllProducts/AllProducts";
import Login from "../Page/Login/Login";
import SignUp from "../Page/SignUp/SignUp";
import Profile from "../Page/Profile/Profile";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "allProducts",
                element: <AllProducts></AllProducts>
            },
            {
                path: "login",
                element: <Login></Login>
            },
            {
                path: "signUp",
                element: <SignUp></SignUp>
            },
            {
                path: "profile",
                element: <Profile></Profile>
            }
        ]
    },
]);

export default router;