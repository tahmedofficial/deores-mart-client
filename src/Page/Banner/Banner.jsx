import { FaCartShopping } from 'react-icons/fa6';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import img from "../../assets/images/DSC_1411.png";
import TextWriter from "../../Components/TextWriter/TextWriter";
import Navbar from "../../Page/Navbar/Navbar";


const Banner = () => {

    return (
        <div className=''>
            <div>

            </div>


            <div className='relative md:hidden'>
                <div>
                    <img className='' src={img} alt="Banner" />
                </div>
                <div className='absolute top-0 w-full h-full bg-[#0000006e]'>
                    <Navbar></Navbar>
                    <div className='text-white font-medium text-4xl pt-20 text-center'>
                        <TextWriter text="Your Satisfaction is Our Goal"></TextWriter>
                    </div>
                    <div className='flex justify-around text-white font-medium py-20'>
                        <h3 className='border-b pb-1'>Shop for Men</h3>
                        <h3 className='border-b pb-1'>Shop for Women</h3>
                    </div>
                    <div className='text-center'>
                        <Link to="/allProducts">
                            <button className="btn border-0 font-medium rounded-none px-10 md:mt-10 bg-black text-white hover:bg-primary_color duration-300">
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
                    <div className='text-white flex justify-around mt-20'>
                        <div className='rotate-90'>
                            <h3 className='font-medium text-3xl flex'>::::::</h3>
                        </div>
                        <div className='rotate-90'>
                            <h3 className='font-medium text-3xl flex'>::::::</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;