import { FaCartShopping } from 'react-icons/fa6';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import banner1 from "../../assets/images/bannerImg1.png";
import womenClothing from "../../assets/images/womenClothing.png";
import menClothing from "../../assets/images/menClothing.png";
import newArrival from "../../assets/images/newArrival.png";
import signatureCollection from "../../assets/images/signatureCollection.png";
import TextWriter from "../../Components/TextWriter/TextWriter";

const Banner = () => {

    return (
        <div className=''>
            <div className='hidden md:block'>
                <img src={womenClothing} alt="Banner" />
            </div>

            <div className='md:hidden'>
                <div className='relative'>
                    <div>
                        <img src={banner1} alt="Banner" />
                    </div>
                    <div className='absolute top-0 w-full h-full bg-[#0000006e]'>
                        <div className='text-white font-medium text-4xl pt-20 text-center'>
                            <TextWriter text="Your Satisfaction is Our Goal"></TextWriter>
                        </div>
                        <div className='grid grid-cols-2 gap-16 text-center text-white font-medium py-20'>
                            <h3 className='border-b pb-1' data-aos="fade-up" data-aos-duration="2000">Shop for Men</h3>
                            <h3 className='border-b pb-1' data-aos="fade-up" data-aos-duration="2000">Shop for Women</h3>
                            <h3 className='border-b pb-1' data-aos="fade-up" data-aos-duration="2000">New Arrival</h3>
                            <h3 className='border-b pb-1' data-aos="fade-up" data-aos-duration="2000">Signature Collection</h3>
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
                                    Buy Now
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
                <div className='grid gap-5 grid-cols-3 p-3 py-5'>
                    <div className='col-span-2 relative' data-aos="fade-up" data-aos-duration="2000">
                        <img className='rounded-lg h-full' src={womenClothing} alt="Women Clothing" />
                        <div className='absolute bg-black bg-opacity-40 h-full w-full top-0 rounded-lg'>
                            <h3 className='text-white font-medium text-xl text-center px-3 py-20'>Shop for Wemen</h3>
                        </div>
                    </div>
                    <div className='col-span-1 relative' data-aos="fade-up" data-aos-duration="2000">
                        <img className='rounded-lg h-full' src={menClothing} alt="Men Clothing" />
                        <div className='absolute bg-black bg-opacity-40 h-full w-full top-0 rounded-lg'>
                            <h3 className='text-white font-medium text-xl text-center px-3 py-20'>Shop for Men</h3>
                        </div>
                    </div>
                    <div className='col-span-1 relative' data-aos="fade-up" data-aos-duration="2000">
                        <img className='rounded-lg h-full' src={newArrival} alt="New Arrival" />
                        <div className='absolute bg-black bg-opacity-40 h-full w-full top-0 rounded-lg'>
                            <h3 className='text-white font-medium text-xl text-center px-3 py-20'>New Arrival</h3>
                        </div>
                    </div>
                    <div className='col-span-2 relative' data-aos="fade-up" data-aos-duration="2000">
                        <img className='rounded-lg h-full' src={signatureCollection} alt="Signature Collection" />
                        <div className='absolute bg-black bg-opacity-40 h-full w-full top-0 rounded-lg'>
                            <h3 className='text-white font-medium text-xl text-center px-3 py-20'>Signature Collection</h3>
                        </div>
                    </div>
                    <div className='bg-red-600 col-span-3 text-white rounded-lg px-3 py-10' data-aos="fade-up" data-aos-duration="2000">
                        <h3 className='text-5xl text-center'>Sale Up To</h3>
                        <div className='flex items-center font-medium justify-center'>
                            <h3 className='text-8xl'>50</h3>
                            <div className='flex flex-col text-2xl items-center'>
                                <span>%</span>
                                <span>OF</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Banner;