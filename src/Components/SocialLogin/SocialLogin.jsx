import { FaFacebookF, FaGoogle } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {

    const { setUser, loginUsingGoogle, sweetMessage, errorMessage } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const handleGoogleLogin = () => {
        loginUsingGoogle()
            .then(data => {
                setUser({
                    email: data?.user?.email,
                    displayName: data?.user?.displayName,
                    photoURL: data?.user?.photoURL
                })
                const user = {
                    name: data?.user?.displayName,
                    number: data?.user?.phoneNumber,
                    email: data?.user?.email,
                }
                axiosSecure.post("/users", user)
                    .then(() => {
                        sweetMessage("Logged in successfully")
                        navigate(location?.state ? location.state : "/")
                    })
            }
            )
            .catch(error => {
                if (error.code === "auth/account-exists-with-different-credential") {
                    errorMessage("Email address already exists")
                }
            })
    }

    const handleFacebookLogin = () => {
        // loginWithFacebook()
        //     .then(() => {
        //         toastMessage("Logged in successfully")
        //         navigate(location?.state ? location.state : "/")
        //     }
        //     )
        //     .catch(error => {
        //         if (error.code === "auth/account-exists-with-different-credential") {
        //             errorMessage("Email address already exists")
        //         }
        //     })
    }

    return (
        <div>
            <div className="flex gap-3 justify-center mt-5">
                <button onClick={handleGoogleLogin} className="btn btn-circle bg-black text-white hover:bg-primary_color"> <FaGoogle className="text-2xl" /></button>
                <button onClick={handleFacebookLogin} className="btn btn-circle bg-black text-white hover:bg-primary_color"><FaFacebookF className="text-2xl" /></button>
            </div>
        </div>
    );
};

export default SocialLogin;