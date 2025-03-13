import { FaCartShopping } from 'react-icons/fa6';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";


const Banner = () => {

    return (
        <div>
            <div>
                <Link to="/allProducts">
                    <button className="btn rounded-none px-10 md:mt-10 bg-black text-white hover:bg-primary_color duration-300">
                        <motion.span
                            animate={{ x: [-2, 2, -2, 2, -2, 2, -2, 2, -2, 0] }}
                            transition={{ repeat: Infinity, repeatDelay: 1, duration: 1.5, ease: "easeInOut" }} // Duration and easing
                            className="mr-1"
                        >
                            <FaCartShopping />
                        </motion.span>
                        Purchase
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Banner;