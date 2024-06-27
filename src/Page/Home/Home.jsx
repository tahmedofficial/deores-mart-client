// import { useState } from "react";
import Banner from "../Banner/Banner";
import 'react-toastify/dist/ReactToastify.css';
// import MenuToggle from "../Navbar/MenuToggle";

const Home = () => {

    // const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <Banner></Banner>
            {/* <button onClick={() => setIsOpen(!isOpen)} className="btn mt-20 btn-circle bg-black text-white">tanvir</button>
            <MenuToggle isOpen={isOpen}></MenuToggle> */}
        </div>
    );
};

export default Home;
