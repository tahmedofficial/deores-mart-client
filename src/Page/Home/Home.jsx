import Banner from "../Banner/Banner";
import 'react-toastify/dist/ReactToastify.css';
import OurProducts from "../OurProducts/OurProducts";
import OurItems from "../OurItems/OurItems";

const Home = () => {

    return (
        <div>
            <Banner></Banner>
            <OurProducts></OurProducts>
            <OurItems></OurItems>
        </div>
    );
};

export default Home;
