import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import { updateProfile } from "firebase/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import WaitMadal from "../../Components/WaitMadal/WaitMadal";

const SignUp = () => {

    const { signUpUser, emailVerification, logOutUser, alartMessage, errorMessage } = useAuth()
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const [showPass, setShowPass] = useState(true);
    const [showConfirmPass, setShowConfirmPass] = useState(true);
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [isCreating, setCreating] = useState(false);
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const onSubmit = (data) => {
        const { name, email, password, confirmPass } = data;
        setPassword(password);
        setConfirmPass(confirmPass);
        setCreating(true);

        if (password === confirmPass) {
            signUpUser(email, password)
                .then(data => {
                    updateProfile(data.user, {
                        displayName: name,
                    })
                        .then(() => {
                            const user = {
                                name: data?.user?.displayName,
                                number: data?.user?.phoneNumber,
                                email: data?.user?.email,
                                role: "supporter"
                            }
                            axiosSecure.post("/users", user)
                                .then(() => {
                                    emailVerification()
                                        .then(() => {
                                            logOutUser()
                                                .then(() => {
                                                    setCreating(false);
                                                    navigate("/login");
                                                    alartMessage("We send a email please verify");
                                                })
                                        })
                                })
                        })
                        .catch(() => { undefined })
                })
                .catch(error => {
                    setCreating(false);
                    if (error.code === "auth/email-already-in-use") {
                        errorMessage("Email address already in use")
                    }
                })
        }
        else {
            setCreating(false);
        }

    }


    return (
        <div>

            <h1 className="font-semibold text-center text-black py-20 text-4xl">Sign Up Now</h1>
            <div className="bg-primary_bg_color mx-3  p-10 md:w-4/6 md:mx-auto md:px-28 md:py-20 lg:px-44 rounded-2xl">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                    <div>
                        <h3 className="mb-2 font-medium text-black">Name</h3>
                        <input {...register("name", { required: true })} className="h-10 w-full outline-none pl-3 rounded-lg" type="text" placeholder="Enter Your Name" />
                        {errors.name && <span className="text-red-600">This field is required</span>}
                    </div>
                    <div>
                        <h3 className="mb-2 font-medium text-black">Email</h3>
                        <input {...register("email", { required: true })} className="h-10 w-full outline-none pl-3 rounded-lg" type="email" placeholder="Enter Your Email" />
                        {errors.email && <span className="text-red-600">This field is required</span>}
                    </div>
                    <div>
                        <h3 className="mb-2 font-medium text-black">Password</h3>
                        <div className="relative">
                            <input {...register("password", { required: true })} className="h-10 w-full outline-none pl-3 rounded-lg" type={showPass ? "password" : "text"} placeholder="Enter Your Password" />
                            {
                                showPass ? <span onClick={() => setShowPass(!showPass)} className="absolute right-4 top-3 text-lg"><FaEye /></span>
                                    : <span onClick={() => setShowPass(!showPass)} className="absolute right-4 top-3 text-lg"><FaEyeSlash /></span>
                            }
                        </div>
                        {errors.password && <span className="text-red-600">This field is required</span>}
                    </div>
                    <div>
                        <h3 className="mb-2 font-medium text-black">Confirm Password</h3>
                        <div className="relative">
                            <input {...register("confirmPass", { required: true })} className="h-10 w-full outline-none pl-3 rounded-lg" type={showConfirmPass ? "password" : "text"} placeholder="Confirm Password" />
                            {
                                showConfirmPass ? <span onClick={() => setShowConfirmPass(!showConfirmPass)} className="absolute right-4 top-3 text-lg"><FaEye /></span>
                                    : <span onClick={() => setShowConfirmPass(!showConfirmPass)} className="absolute right-4 top-3 text-lg"><FaEyeSlash /></span>
                            }
                        </div>
                        {errors.confirmPass && <span className="text-red-600">This field is required</span>}
                        {password === confirmPass ? undefined : <span className="text-red-600">Password did not match</span>}
                    </div>
                    <button className="btn bg-black text-white text-lg font-medium hover:bg-primary_color duration-300">Sign Up</button>
                    <div className="flex items-center font-medium mx-auto">
                        <h3 className="text-black">Already Sign Up</h3>
                        <Link to="/login">
                            <h3 className=" btn btn-link">Login</h3>
                        </Link>
                    </div>
                </form>
                <div>
                    <SocialLogin></SocialLogin>
                </div>
            </div>
            <div>
                {
                    isCreating ? <WaitMadal massege="Please Wait"></WaitMadal> : undefined
                }
            </div>
        </div>
    );
};

export default SignUp;