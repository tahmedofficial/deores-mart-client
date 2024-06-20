import AllProducts from "../AllProducts/AllProducts";
import Banner from "../Banner/Banner";
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {

    return (
        <div>
            <Banner></Banner>
            <AllProducts></AllProducts>
        </div>
    );
};

export default Home;