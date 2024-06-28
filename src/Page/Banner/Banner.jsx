import AwesomeSlider from 'react-awesome-slider';
import "react-awesome-slider/dist/styles.css";
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import { FaCartShopping } from 'react-icons/fa6';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const AutoplaySlider = withAutoplay(AwesomeSlider);

const Banner = () => {

    return (
        <div>
            <AutoplaySlider className="h-[550px] md:h-[400px] bg-primary_bg_color" play={true} cancelOnInteraction={false} interval={6000} >
                <div className="bg-primary_bg_color w-full h-full">
                    <div className="bg-primary_bg_color py-10 px-5 md:py-8 md:pt-14 h-full md:w-5/6 mx-auto">
                        <div className="col-span-1 flex flex-col justify-center mb-8 md:mb-0">
                            <h1 className="text-5xl font-medium">Your Satisfaction is Our Goal</h1>
                            <h3 className="my-5">At Deores, your satisfaction is our top priority. We offer stylish, high-quality clothing designed to make you look and feel your best. From our curated collections to exceptional customer service, we ensure a delightful shopping experience. Your happiness drives us to excel, making your satisfaction our ultimate goal.</h3>
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
                    </div>
                </div>
                <div className="bg-primary_bg_color w-full h-full">
                    <div className="bg-primary_bg_color py-10 px-5 md:py-8 md:pt-14 h-full md:w-5/6 mx-auto">
                        <div className="col-span-1 flex flex-col justify-center mb-8 md:mb-0">
                            <h1 className="text-5xl font-medium">Quality You Can Trust</h1>
                            <h3 className="my-5">At Deores, your satisfaction is our top priority. We offer stylish, high-quality clothing designed to make you look and feel your best. From our curated collections to exceptional customer service, we ensure a delightful shopping experience. Your happiness drives us to excel, making your satisfaction our ultimate goal.</h3>
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
                    </div>
                </div>
                <div className="bg-primary_bg_color w-full h-full">
                    <div className="bg-primary_bg_color py-10 px-5 md:py-8 md:pt-14 h-full md:w-5/6 mx-auto">
                        <div className="col-span-1 flex flex-col justify-center mb-8 md:mb-0">
                            <h1 className="text-5xl font-medium">Fashion That Inspires Confidence</h1>
                            <h3 className="my-5">At Deores, your satisfaction is our top priority. We offer stylish, high-quality clothing designed to make you look and feel your best. From our curated collections to exceptional customer service, we ensure a delightful shopping experience. Your happiness drives us to excel, making your satisfaction our ultimate goal.</h3>
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
                    </div>
                </div>
            </AutoplaySlider>
        </div>
    );
};

export default Banner;