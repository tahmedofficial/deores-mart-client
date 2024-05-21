import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { updateProfile } from "firebase/auth";

const SignUp = () => {

    const { signUpUser, setUser } = useAuth()

    const handleSignUp = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const number = form.number.value;
        const email = form.email.value;
        const photo = form.photo.value;
        const password = form.password.value;
        const confirmPass = form.confirmPass.value;

        signUpUser(email, password)
            .then(res => {
                const user = res.user;
                updateProfile(user, {
                    displayName: name,
                    photoURL: photo,
                })
                    .then(() => {
                        setUser({
                            displayName: name,
                            photoURL: photo,
                        })
                    })
            })
            .catch(error => {
                console.log(error);
            })

        console.log(name, number, email, photo, password, confirmPass);
    }

    return (
        <div>

            <h1 className="font-semibold text-center text-black py-20 text-4xl">Register Now</h1>
            <form onSubmit={handleSignUp} className="flex flex-col gap-5 bg-primary_bg_color mx-3  p-10 md:w-4/6 md:mx-auto md:px-28 md:py-20 lg:px-44 rounded-2xl">
                <div>
                    <h3 className="mb-2 font-medium text-black">Name</h3>
                    <input className="h-10 w-full outline-none pl-3 rounded-lg" type="text" name="name" placeholder="Enter Your Name" required />
                </div>
                <div>
                    <h3 className="mb-2 font-medium text-black">Phone</h3>
                    <input className="h-10 w-full outline-none pl-3 rounded-lg" type="number" name="number" placeholder="Enter Your Phone Number" required />
                </div>
                <div>
                    <h3 className="mb-2 font-medium text-black">Email</h3>
                    <input className="h-10 w-full outline-none pl-3 rounded-lg" type="email" name="email" placeholder="Enter Your Email" required />
                </div>
                <div>
                    <h3 className="mb-2 font-medium text-black">Photo</h3>
                    <input className="h-10 w-full outline-none pl-3 rounded-lg" type="text" name="photo" placeholder="Enter Your Photo Url" required />
                </div>
                <div>
                    <h3 className="mb-2 font-medium text-black">Password</h3>
                    <input className="h-10 w-full outline-none pl-3 rounded-lg" type="password" name="password" placeholder="Enter Your Password" required />
                </div>
                <div>
                    <h3 className="mb-2 font-medium text-black">Confirm Password</h3>
                    <input className="h-10 w-full outline-none pl-3 rounded-lg" type="password" name="confirmPass" placeholder="Confirm Password" required />
                </div>
                <button className="btn bg-black text-white text-lg font-medium hover:bg-primary_color duration-300">Register</button>
                <div className="flex items-center font-medium mx-auto">
                    <h3 className="text-black">Already Register</h3>
                    <Link to="/login">
                        <h3 className=" btn btn-link">Login</h3>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default SignUp;