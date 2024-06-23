import { Link, NavLink } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import profileIcon from "../../assets/images/profileIcon.jpg";
import { BsCart3 } from "react-icons/bs";
import { RiMenu2Fill } from "react-icons/ri";
import useAdmin from "../../Hooks/useAdmin";
import useCart from "../../Hooks/useCart";
import { useEffect, useState } from "react";


const Navbar = () => {

    const { user } = useAuth();
    const [isAdmin] = useAdmin();
    const [carts, refetch] = useCart();
    const [showCart, setShowCart] = useState(false);
    const totalPrice = carts.reduce((sum, cart) => sum + cart.price, 0);

    useEffect(() => {
        refetch();
    }, [refetch, user?.email])

    const navItems = <>
        <li><NavLink to="/" className={({ isActive }) => isActive ? "border-b-2 duration-300 text-black font-medium px-3 pb-2 border-black" : "font-medium"}>Home</NavLink></li>
        <li><NavLink to="allProducts" className={({ isActive }) => isActive ? "border-b-2 duration-300 text-black font-medium px-3 pb-2 border-black" : "font-medium"}>allProducts</NavLink></li>
        <li><NavLink to="login" className={({ isActive }) => isActive ? "border-b-2 duration-300 text-black font-medium px-3 pb-2 border-black" : "font-medium"}>Login</NavLink></li>
        <li><NavLink to="signUp" className={({ isActive }) => isActive ? "border-b-2 duration-300 text-black font-medium px-3 pb-2 border-black" : "font-medium"}>Sign Up</NavLink></li>
    </>

    return (
        <nav>
            <div className="navbar md:w-5/6 mx-auto px-3">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost text-black">
                            <RiMenu2Fill className="h-5 w-5" />
                        </div>
                        <ul tabIndex={0} className="flex flex-col z-10 bg-primary_bg_color text-black gap-3 dropdown-content mt-3 p-6 shadow rounded-box w-52">
                            {navItems}
                        </ul>
                    </div>
                </div>
                <button className="btn btn-ghost font-semibold text-black text-4xl">Deores</button>
                <div className="navbar-end gap-3">

                    <div className="dropdown dropdown-end z-20">
                        <div onClick={() => setShowCart(true)} tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <BsCart3 className="h-5 w-5" />
                                <span className="badge badge-sm indicator-item bg-rose-500 text-white">{carts.length}</span>
                            </div>
                        </div>
                        {
                            showCart ? <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
                                <div className="card-body">
                                    <span className="font-bold text-lg">{carts.length} Items</span>

                                    <div className="overflow-x-auto">
                                        <table className="table">
                                            <tbody>
                                                {
                                                    carts.map(cart => <tr key={cart._id}>
                                                        <td>
                                                            <div className="avatar">
                                                                <div className="mask mask-squircle w-12 h-12">
                                                                    <img src={cart.image} alt="Image" />
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>${cart.price}</td>
                                                    </tr>)
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    {
                                        carts.length > 0 ? <span className="text-black text-lg">Subtotal: ${totalPrice}</span> : undefined
                                    }
                                    <div className="card-actions">
                                        <Link className="w-full" to="/cart">
                                            <button onClick={() => setShowCart(false)} className="btn btn-sm w-full bg-black text-white">View cart</button>
                                        </Link>
                                    </div>
                                </div>
                            </div> : undefined
                        }
                    </div>

                    {
                        user ?
                            <>
                                {
                                    isAdmin ? <Link to="dashboard/profile">
                                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle hover:bg-primary_color avatar tooltip">
                                            <img className="w-full h-full rounded-full" src={user?.photoURL ? user?.photoURL : profileIcon} alt="Profile" />
                                        </div>
                                    </Link> :
                                        <Link to="/userProfile">
                                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle hover:bg-primary_color avatar tooltip">
                                                <img className="w-full h-full rounded-full" src={user?.photoURL ? user?.photoURL : profileIcon} alt="Profile" />
                                            </div>
                                        </Link>
                                }
                            </>
                            : <Link to="/login">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle hover:bg-primary_color avatar tooltip">
                                    <img className="w-full h-full rounded-full" src={user?.photoURL ? user?.photoURL : profileIcon} alt="Profile" />
                                </div>
                            </Link>
                    }
                </div>

            </div>
        </nav>
    );
};

export default Navbar;