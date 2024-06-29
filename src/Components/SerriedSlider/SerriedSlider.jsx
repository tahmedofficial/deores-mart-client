import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';
import { motion } from "framer-motion";

const SerriedSlider = ({ category, id }) => {

    const axiosPublic = useAxiosPublic();
    const swiperRef = useRef(null);

    const { data: products = [], refetch } = useQuery({
        queryKey: [category, "products"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/products/${category}/${id}`)
            return res.data;
        }
    })

    useEffect(() => {
        refetch()
    }, [id, refetch])

    return (
        <div className='mt-20 relative'>
            {
                products.length > 0 ? <>
                    <div className='divider'></div>
                    <h1 className='my-8 text-center text-2xl md:text-3xl font-medium'>---Similar Products---</h1>
                    <Swiper
                        ref={swiperRef}
                        spaceBetween={30} pagination={{ clickable: true }}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        navigation={false}
                        modules={[Autoplay, Pagination, Navigation]}
                        className="mySwiper"
                        breakpoints={{
                            320: { slidesPerView: 2, spaceBetween: 10 },
                            480: { slidesPerView: 2, spaceBetween: 20 },
                            640: { slidesPerView: 3, spaceBetween: 30 },
                            768: { slidesPerView: 4, spaceBetween: 30 },
                            1024: { slidesPerView: 5, spaceBetween: 30 },
                        }}>
                        {
                            products.map(product => <SwiperSlide key={product._id}>
                                <div className='flex flex-col items-center md:min-h-[450px] lg:min-h-[520px]'>
                                    <div>
                                        <Link to={`/productDetails/${product._id}`}>
                                            <img className='w-screen h-56 md:h-auto rounded-lg' src={product.image} alt="image" />
                                        </Link>
                                    </div>
                                    <div className='md:flex-grow flex flex-col justify-end w-full mt-3'>
                                        <Link to={`/productDetails/${product._id}`}>
                                            <button className='btn btn-sm w-full rounded-none border-0 bg-black text-white'>View Details</button>
                                        </Link>
                                    </div>
                                    <div className='flex flex-col items-center w-full pt-4 h-full'>
                                        <h1 className='font-semibold'>{product.title.length > 20 ? product.title.slice(0, 20) + "..." : product.title}</h1>
                                        <h1 className='bg-rose-100 text-rose-700 font-medium px-8 py-1 rounded-lg text-center mt-2'>$ {product.price}</h1>
                                    </div>
                                </div>
                            </SwiperSlide>)
                        }
                    </Swiper>
                    <div onClick={() => swiperRef.current.swiper.slideNext()} className='absolute btn hover:bg-primary_color rounded-none border-0 btn-sm top-60 right-5 bg-black text-white z-10'>
                        <motion.span
                            animate={{ x: [0, 8, 0] }}
                            transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
                        >
                            <FaArrowRightLong />
                        </motion.span>
                    </div>
                    <div onClick={() => swiperRef.current.swiper.slidePrev()} className='absolute btn hover:bg-primary_color rounded-none border-0 btn-sm top-60 left-5 bg-black text-white z-10'>
                        <FaArrowLeftLong />
                    </div>
                </> : undefined
            }
        </div>
    );
};

export default SerriedSlider;

SerriedSlider.propTypes = {
    category: PropTypes.string,
    id: PropTypes.string
}