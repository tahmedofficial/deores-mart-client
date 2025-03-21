import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import profileIcon from "../../assets/images/profileIcon.jpg";
import { BsCart3 } from "react-icons/bs";
import useAdmin from "../../Hooks/useAdmin";
import useCart from "../../Hooks/useCart";
import { useEffect, useState } from "react";
import MenuToggle from "./MenuToggle";
import Hamburger from "hamburger-react";


const Navbar = () => {

    const { user } = useAuth();
    const [isAdmin] = useAdmin();
    const [carts, refetch] = useCart();
    const [showCart, setShowCart] = useState(false);
    const [isOpen, setOpen] = useState(false);
    const totalPrice = carts.reduce((sum, cart) => sum + cart.price, 0);
    const bannerCss = location.pathname === "/";

    useEffect(() => {
        refetch();
    }, [refetch, user?.email])

    const skeletonStyle = {
        borderRadius: '8px',
        '--tw-bg-opacity': 1,
        willChange: 'background-position',
        animation: 'skeleton 1.8s ease-in-out infinite',
        backgroundImage: 'linear-gradient(105deg, transparent 0%, transparent 40%, #d8d8d8 50%, transparent 60%, transparent 100%)',
        backgroundSize: '200% auto',
        backgroundRepeat: 'no-repeat',
        backgroundPositionX: '-50%',
    };

    return (
        <div className={bannerCss && "bg-black"}>
            <MenuToggle isOpen={isOpen} setOpen={setOpen}></MenuToggle>
            <div className="navbar px-0">
                <div className="navbar-start text-black">
                    <div className={`z-50 ${isOpen || bannerCss ? "text-white" : undefined}`}>
                        <Hamburger toggled={isOpen} toggle={setOpen} size={20}></Hamburger>
                    </div>
                </div>
                <Link to="/">
                    <button style={skeletonStyle} className={`py-1 px-5 ${bannerCss ? "text-white font-medium" : "text-black font-semibold"} text-4xl`}>Deores</button>
                </Link>
                <div className="navbar-end gap-3 pr-2">

                    <div className="dropdown dropdown-end z-20">
                        <div onClick={() => setShowCart(true)} tabIndex={0} role="button" className={`btn relative btn-ghost btn-circle`}>
                            <div>
                                <BsCart3 className={`h-5 w-5 ${bannerCss ? "text-white" : "text-black"}`} />
                            </div>
                            <span className={`absolute top-0 z-10 right-0 badge badge-sm ${bannerCss ? "bg-white text-black" : "bg-black text-white"}`}>{carts.length}</span>
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
                                        {
                                            carts.length ?
                                                <Link className="w-full" to="/cart">
                                                    <button onClick={() => setShowCart(false)} className="btn btn-sm w-full bg-black text-white">View cart</button>
                                                </Link>
                                                : <button disabled className="btn btn-sm w-full bg-black text-white">View cart</button>
                                        }
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
        </div>
    );
};

export default Navbar;