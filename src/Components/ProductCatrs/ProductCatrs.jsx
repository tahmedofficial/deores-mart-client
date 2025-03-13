import PropTypes from 'prop-types';
import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const ProductCatrs = ({ product }) => {

    const [wish, setWish] = useState(false);
    const { _id, image, title, price } = product;

    return (
        <div className='flex flex-col items-center h-full group'>
            <Link to={`/productDetails/${_id}`}>
                <div className='relative'>
                    {
                        wish ? <FaHeart onClick={() => setWish(!wish)} className='text-2xl text-rose-500 absolute top-5 right-5 opacity-0 group-hover:opacity-100 duration-500' />
                            : <FaRegHeart onClick={() => setWish(!wish)} className='text-2xl text-rose-500 absolute top-5 right-5 opacity-0 group-hover:opacity-100 duration-500' />
                    }
                    <div className='w-full'>
                        {
                            image ? <img className='h-56 md:h-auto lg:max-h-[500px] lg:min-h-[495px] w-screen' src={image} alt="Phote" />
                                : <span className="loading loading-ball loading-lg flex mx-auto mt-20"></span>
                        }
                    </div>
                </div>
                <div className='w-full mt-3'>
                    <button className='btn w-full rounded-none border-0 bg-black text-white'>View Details</button>
                </div>
                <div className='py-3'>
                    <h1 className='font-semibold'>{title.length > 20 ? title.slice(0, 20) + "..." : title}</h1>
                </div>
                <div className='w-full mt-auto lg:mb-12'>
                    <h1 className='bg-rose-100 text-rose-700 font-medium px-8 py-1 rounded-lg text-center mt-2 lg:mt-0'>$ {price.toFixed(2)}</h1>
                </div>
            </Link>
        </div>
    );
};

export default ProductCatrs;

ProductCatrs.propTypes = {
    product: PropTypes.object.isRequired
}