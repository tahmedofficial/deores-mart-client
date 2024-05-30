import { FaFacebookF, FaGoogle } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {

    const { loginUsingGoogle, sweetMessage, errorMessage } = useAuth();
    const navigate = useNavigate();

    const handleGoogleLogin = () => {
        loginUsingGoogle()
            .then(data => {
                sweetMessage("Logged in successfully")
                console.log(data.user);
                navigate(location?.state ? location.state : "/")
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