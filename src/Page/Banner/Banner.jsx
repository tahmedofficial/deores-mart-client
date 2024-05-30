import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import { Link } from "react-router-dom";

const Banner = () => {
    return (
        <div>
            <AwesomeSlider className="md:pt-10 h-[500px] bg-primary_bg_color">
                {/* slider 1 */}
                <div className="bg-white w-full h-full">
                    <div className="grid md:grid-cols-2 md:gap-8 bg-primary_bg_color p-5">
                        <div className="col-span-1 flex flex-col justify-center mb-8 p-8 md:mb-0">
                            <h1 className="text-5xl font-medium">It is not just food, It is an Exerience</h1>
                            <h3 className="my-5">Wagyu beef boasts intense marbling thin streaks of fat dispersed evenly throughout the meat. This translates to a more tender, flavourful cut of meat that can actually be cooked longer without getting too tough or dried out.</h3>
                            <Link to="/">
                                <button className="btn rounded-none px-10 md:mt-20 bg-black text-white hover:bg-primary_color duration-300">Purchase</button>
                            </Link>
                        </div>
                        <div className="col-span-1">
                            <img className="md:h-96 lg w-full rounded-xl" src="" alt="" />
                        </div>
                    </div>
                </div>
            </AwesomeSlider>
        </div>
    );
};

export default Banner;