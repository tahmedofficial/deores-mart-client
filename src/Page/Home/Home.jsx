import SocialLogin from "../../Components/SocialLogin/SocialLogin";
import Banner from "../Banner/Banner";
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {

    return (
        <div>
            <Banner></Banner>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Home;