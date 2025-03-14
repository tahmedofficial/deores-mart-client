import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useState } from "react";

const MyOrders = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [isLoading, setLoading] = useState(true);

    const { data: orders = [] } = useQuery({
        queryKey: [user?.email, "orders"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders/delivered/${user?.email}`);
            setLoading(false);
            return res.data;
        }
    })

    if (isLoading) {
        return <span className="loading loading-spinner loading-lg text-black flex mx-auto mt-20"></span>
    }

    return (
        <div className="md:w-5/6 mx-auto px-3">
            {
                orders.length > 0 ?
                    <>
                        <h1 className="text-center text-3xl font-medium mt-10">---My Orders---</h1>
                        {
                            orders.map(order => <div key={order._id}>
                                <div className="bg-primary_bg_color mt-10 py-5 px-3 rounded-lg">
                                    <div className="flex flex-col lg:flex-row items-center lg:justify-around gap-3 py-5">
                                        <h3 className="text-xl font-medium">Order Id: {order.orderId}</h3>
                                        <h3>Order Date: {order.date.split(",")[0]}</h3>
                                        <button className="btn btn-sm bg-green-500 text-white">{order.status}</button>
                                    </div>
                                    <div>
                                        <div className="overflow-x-auto">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Image</th>
                                                        <th>Title</th>
                                                        <th>Price</th>
                                                        <th>Quantity</th>
                                                        <th>Size</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white">
                                                    {
                                                        order.orderInfo.map((product, index) => <tr key={product._id}>
                                                            <th>{index + 1}</th>
                                                            <td>
                                                                <div className="avatar">
                                                                    <div className="mask mask-squircle h-12 w-12">
                                                                        <img
                                                                            src={product.image} alt="Image" />
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>{product.title}</td>
                                                            <td>${product.price}</td>
                                                            <td>{product.purchaseQuantity}</td>
                                                            <td>{product.size}</td>
                                                        </tr>)
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>)
                        }
                    </> : <span className="text-center text-xl font-medium text-black block mt-16">You have no previous order !</span>
            }
            <Link to="/">
                <motion.button className="btn px-10 bg-black hover:bg-black text-white rounded-none mt-14 md:mt-20 flex items-center" whileHover="hover">
                    <motion.span
                        variants={{ hover: { x: -10 } }}
                        transition={{ type: "spring", stiffness: 300 }}>
                        <FaArrowLeftLong />
                    </motion.span>
                    <span className="ml-2">Go Home</span>
                </motion.button>
            </Link>
        </div>
    );
};

export default MyOrders;