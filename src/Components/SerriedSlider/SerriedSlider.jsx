import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { Link } from 'react-router-dom';

const SerriedSlider = ({ category }) => {

    const axiosPublic = useAxiosPublic();

    const { data: products = [] } = useQuery({
        queryKey: [category, "products"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/products/${category}`)
            return res.data;
        }
    })

    return (
        <div className='mt-20'>
            <Swiper spaceBetween={30} pagination={{ clickable: true }} modules={[Pagination]} className="mySwiper"
                breakpoints={{
                    320: { slidesPerView: 1, spaceBetween: 10 },
                    480: { slidesPerView: 2, spaceBetween: 20 },
                    640: { slidesPerView: 3, spaceBetween: 30 },
                    768: { slidesPerView: 4, spaceBetween: 30 },
                    1024: { slidesPerView: 5, spaceBetween: 30 },
                }}>
                {
                    products.map(product => <SwiperSlide key={product._id}>
                        <div className='flex flex-col items-center min-h-[420px] md:min-h-[450px] lg:min-h-[520px]'>
                            <div>
                                <img className='w-full rounded-lg' src={product.image} alt="image" />
                            </div>
                            <div className='flex-grow flex flex-col justify-end w-full mt-3'>
                                <Link to={`/productDetails/${product._id}`}>
                                    <button className='btn btn-sm w-full rounded-none border-0 bg-black text-white'>View Details</button>
                                </Link>
                            </div>
                            <div className='flex flex-col items-center w-full pt-4 h-full'>
                                <h1 className='font-semibold'>{product.title.length > 20 ? product.title.slice(0, 20) + "..." : product.title}</h1>
                                <h1 className='bg-rose-100 text-rose-700 font-medium px-8 py-1 rounded-lg text-center mt-2 lg:mt-0'>$ {product.price}</h1>
                            </div>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </div>
    );
};

export default SerriedSlider;

SerriedSlider.propTypes = {
    category: PropTypes.string
}