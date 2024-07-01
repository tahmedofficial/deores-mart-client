import PropTypes from 'prop-types';
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const DetailsSideBar = ({ gender, id }) => {

    const axiosPublic = useAxiosPublic();

    const { data: randomProducts = [], refetch } = useQuery({
        queryKey: ["randomProducts"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/randomProducts/${gender}/${id}`);
            return res.data;
        }
    })

    useEffect(() => {
        refetch();
    }, [gender, id, refetch])

    return (
        <div>
            {
                randomProducts.length > 0 ? <>
                    <h1 className='mb-5 mt-5 md:mt-0 text-center text-2xl font-medium'>---Suggestion---</h1>
                    <div className='grid grid-cols-2 md:grid-cols-3 gap-5'>
                        {
                            randomProducts.map(product => <div key={product._id}>
                                <div className='flex flex-col items-center'>
                                    <div className='w-full'>
                                        <Link to={`/productDetails/${product._id}`}>
                                            <img className='w-screen rounded-lg h-56 lg:h-52' src={product.image} alt="Phote" />
                                        </Link>
                                    </div>
                                    <div className='flex flex-col justify-end w-full mt-3'>
                                        <Link to={`/productDetails/${product._id}`}>
                                            <button className='btn btn-sm w-full rounded-none border-0 bg-black text-white'>View Details</button>
                                        </Link>
                                    </div>
                                    <div className='flex justify-center w-full pt-2'>
                                        <h1 className='bg-rose-100 text-rose-700 font-medium px-8 py-1 rounded-lg text-center mt-2'>$ {product.price.toFixed(2)}</h1>
                                    </div>
                                </div>
                            </div>)
                        }
                    </div>
                </> : <span className="loading loading-ball loading-lg flex mx-auto text-black mt-20"></span>
            }
        </div >
    );
};

export default DetailsSideBar;

DetailsSideBar.propTypes = {
    gender: PropTypes.string,
    id: PropTypes.string
}