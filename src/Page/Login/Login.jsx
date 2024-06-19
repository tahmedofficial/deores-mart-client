import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";

const Login = () => {

    const { setUser, loginUser, logOutUser, successMessage, errorMessage } = useAuth();
    const [showPass, setShowPass] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        loginUser(email, password)
            .then(data => {
                if (data?.user?.emailVerified) {
                    setUser({
                        email: data?.user?.email,
                        displayName: data?.user?.displayName,
                        photoURL: data?.user?.photoURL
                    });
                    successMessage("Logged in successfully");
                    navigate(location?.state ? location.state : "/");
                }
                else {
                    logOutUser()
                        .then(() => {
                            errorMessage("please verify your email")
                        })
                }
            })
            .catch(error => {
                if (error) {
                    errorMessage("Enter a valid email and password");
                }
            })
    }

    return (
        <div>
            <h1 className="font-semibold text-center py-20 text-black text-4xl">Login Now</h1>
            <div className="bg-primary_bg_color mx-3  p-10 md:w-4/6 md:mx-auto md:px-28 md:py-20 lg:px-44 rounded-2xl">
                <form onSubmit={handleLogin} className="flex flex-col gap-5">
                    <div>
                        <h3 className="mb-2 font-medium text-black">Email</h3>
                        <input className="h-10 w-full outline-none pl-3 rounded-lg" type="email" name="email" placeholder="Enter Your Email" required />
                    </div>
                    <div>
                        <h3 className="mb-2 font-medium text-black">Password</h3>
                        <div className="relative">
                            <input className="h-10 w-full outline-none pl-3 rounded-lg" type={showPass ? "password" : "text"} name="password" placeholder="Enter Your Password" required />
                            {
                                showPass ? <span onClick={() => setShowPass(!showPass)} className="absolute right-4 top-3 text-lg"><FaEye /></span>
                                    : <span onClick={() => setShowPass(!showPass)} className="absolute right-4 top-3 text-lg"><FaEyeSlash /></span>
                            }
                        </div>
                    </div>
                    <button className="btn bg-black text-white text-lg hover:bg-primary_color">Login</button>
                    <div className="flex items-center font-medium mx-auto">
                        <h3>Do not have account?</h3>
                        <Link to="/signUp">
                            <h3 className=" btn btn-link">Sign Up</h3>
                        </Link>
                    </div>
                </form>
                <div>
                    <SocialLogin></SocialLogin>
                </div>
            </div>
        </div>
    );
};

export default Login;