import { IoCheckmarkCircleSharp } from "react-icons/io5";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { motion } from "framer-motion";

const OrderStatus = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: orders = [] } = useQuery({
        queryKey: [user?.email, "orders"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders/${user?.email}`);
            return res.data;
        }
    })

    const pending = ["Pending", "Confirm", "Shipped", "Delivered"];
    const confirm = ["Confirm", "Shipped", "Delivered"];
    const shipped = ["Shipped", "Delivered"];

    return (
        <div className="md:w-4/6 mx-auto p-4 mt-16">
            {
                orders.length > 0 ?
                    <>
                        <h1 className="text-center text-3xl font-medium">---Order Status---</h1>
                        {
                            orders.map(order => <div key={order._id}>
                                <div className="bg-primary_bg_color mt-10 py-5 px-3 rounded-lg">
                                    <div className="flex justify-center pb-5">
                                        <ul className="timeline timeline-vertical lg:timeline-horizontal">
                                            <li>
                                                <div className={pending.includes(order.status) ? "timeline-start btn btn-sm rounded-full bg-green-500 text-white" : "timeline-start btn btn-sm rounded-full bg-white border-gray-400"}>Pending</div>
                                                <div className={pending.includes(order.status) ? "timeline-middle text-green-500" : "timeline-middle text-black"}>
                                                    <IoCheckmarkCircleSharp className="text-2xl" />
                                                </div>
                                                <hr />
                                            </li>
                                            <li>
                                                <hr />
                                                <div className={confirm.includes(order.status) ? "timeline-end btn btn-sm rounded-full bg-green-500 text-white" : "timeline-end btn btn-sm rounded-full bg-white border-gray-400"}>Confirm</div>
                                                <div className={confirm.includes(order.status) ? "timeline-middle text-green-500" : "timeline-middle text-black"}>
                                                    <IoCheckmarkCircleSharp className="text-2xl" />
                                                </div>
                                                <hr />
                                            </li>
                                            <li>
                                                <hr />
                                                <div className={shipped.includes(order.status) ? "timeline-start btn btn-sm rounded-full bg-green-500 text-white" : "timeline-start btn btn-sm rounded-full bg-white border-gray-400"}>Shipped</div>
                                                <div className={shipped.includes(order.status) ? "timeline-middle text-green-500" : "timeline-middle text-black"}>
                                                    <IoCheckmarkCircleSharp className="text-2xl" />
                                                </div>
                                                <hr />
                                            </li>
                                            <li>
                                                <hr />
                                                <div className={order.status === "Delivered" ? "timeline-end btn btn-sm rounded-full bg-green-500 text-white" : "timeline-end btn btn-sm rounded-full bg-white border-gray-400"}>Delivered</div>
                                                <div className={order.status === "Delivered" ? "timeline-middle text-green-500" : "timeline-middle text-black"}>
                                                    <IoCheckmarkCircleSharp className="text-2xl" />
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        <div className="overflow-x-auto">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Image</th>
                                                        <th>Order Id</th>
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
                                                            <td>{order.orderId}</td>
                                                            <td>$ {product.price}</td>
                                                            <td>{product.purchaseQuantity}</td>
                                                            <td>{product.size}</td>
                                                        </tr>)
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                        {order.status === "Pending" ? <button className="btn btn-sm bg-red-500 text-white rounded-full px-5 flex mx-auto my-6">Cancel Order</button> : undefined}
                                    </div>
                                </div>
                            </div>)
                        }
                    </> : <span className="loading loading-spinner loading-lg text-black flex mx-auto mt-20"></span>
            }
            <div>
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
        </div>
    );
};

export default OrderStatus;