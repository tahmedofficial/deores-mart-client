import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Dashboard from "../Layout/Dashboard";
import Home from "../Page/Home/Home";
import AllProducts from "../Page/AllProducts/AllProducts";
import Login from "../Page/Login/Login";
import SignUp from "../Page/SignUp/SignUp";
import Profile from "../Page/Dashboard/Profile/Profile";
import AllUsers from "../Page/Dashboard/AllUsers/AllUsers";
import AddItem from "../Page/Dashboard/AddItem/AddItem";
import Cart from "../Page/Cart/Cart";


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
                path: "/allProducts",
                element: <AllProducts></AllProducts>
            },
            {
                path: "/cart",
                element: <Cart></Cart>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/signUp",
                element: <SignUp></SignUp>
            },
        ]
    },
    {
        path: "dashboard",
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: "profile",
                element: <Profile></Profile>
            },
            {
                path: "allUsers",
                element: <AllUsers></AllUsers>
            },
            {
                path: "addItem",
                element: <AddItem></AddItem>
            }
        ]
    }
]);

export default router;