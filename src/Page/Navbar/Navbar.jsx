import { Link, NavLink } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import profileIcon from "../../assets/images/profileIcon.jpg";


const Navbar = () => {

    const { user } = useAuth();

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
                        <div tabIndex={0} role="button" className="btn btn-ghost text-primary_text_color lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="flex flex-col bg-white text-primary_text_color gap-3 dropdown-content mt-3 z-[1] p-6 shadow rounded-box w-52">
                            {navItems}
                        </ul>
                    </div>
                    <button className="btn px-10 text-xl bg-primary_color text-white hidden lg:block">Deores</button>
                </div>
                <button className="btn px-10 text-xl bg-primary_color text-white lg:hidden">Deores</button>
                <div className="navbar-center hidden lg:flex">
                    <ul className="flex gap-6 text-primary_text_color text-[17px]">
                        {navItems}
                    </ul>
                </div>
                <div className="navbar-end gap-3">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle hover:bg-primary_color avatar tooltip">
                            <img className="w-full h-full rounded-full" src={user ? user?.photoURL : profileIcon} alt="Profile" />
                        </div>
                        <ul tabIndex={0} className="dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {
                                user ? <li className="btn btn-sm bg-black text-white w-full hover:bg-primary_color duration-300"><Link to="profile">Profile</Link></li> :
                                    <Link to="login">
                                        <li className="btn btn-sm bg-black text-white w-full hover:bg-primary_color duration-300"><Link to="profile">Login</Link></li>
                                    </Link>
                            }
                        </ul>
                    </div>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;