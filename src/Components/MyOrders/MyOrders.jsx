import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { IoArrowBackSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const MyOrders = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: orders = [] } = useQuery({
        queryKey: [user?.email, "orders"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders/${user?.email}`);
            return res.data;
        }
    })

    return (
        <div className="md:w-5/6 mx-auto px-3">
            {
                orders.length > 0 ?
                    <div className="bg-primary_bg_color mt-10 p-5 rounded-xl">
                        <h1 className="text-center text-2xl font-semibold py-5">My Orders</h1>
                        <div className="divider"></div>
                        <div className="overflow-x-auto">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Image</th>
                                        <th>Title</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Size</th>
                                        <th>Order Id</th>
                                        <th>Order Date</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {
                                        orders.map(order => <>
                                            {order.orderInfo.map(product => <tr key={product._id} className="hover">
                                                <td></td>
                                                <td>
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle w-12 h-12">
                                                            <img src={product.image} alt="Avatar Tailwind CSS Component" />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{product.title}</td>
                                                <td>${product.price}</td>
                                                <td>{product.purchaseQuantity}</td>
                                                <td>{product.size}</td>
                                                <td>{order.orderId}</td>
                                                <td>{order.date.split(",")[0]}</td>
                                                <td>
                                                    {
                                                        order.status === "Canceled" ? <button className="btn btn-sm bg-red-500 text-white">{order.status}</button> :
                                                            <button className="btn btn-sm bg-green-500 text-white">
                                                                {order.status}
                                                            </button>
                                                    }
                                                </td>
                                            </tr>)}
                                        </>)
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div > : <span className="loading loading-spinner loading-lg text-black flex mx-auto mt-20"></span>
            }
            <Link to="/">
                <button className="btn bg-black text-white rounded-none px-10 mt-10"><IoArrowBackSharp />Go Home</button>
            </Link>
        </div>
    );
};

export default MyOrders;