import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useState } from "react";
import UpdateStatusModal from "./UpdateStatusModal";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import OrderAddress from "./OrderAddress";
import { Link } from "react-router-dom";

const OrderedItems = () => {

    const { successMessage } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [showModal, setShowModal] = useState(false);
    const [ordersInfo, setOrdersInfo] = useState("");
    const [address, setAddress] = useState({});
    const [showAddress, setShowAddress] = useState(false);
    const confirm = ["Confirm", "Shipped", "Delivered"];

    const { data: orders = [], refetch } = useQuery({
        queryKey: ["orders"],
        queryFn: async () => {
            const res = await axiosSecure.get("/orders");
            return res.data;
        }
    })

    const handleStatus = (index) => {
        setOrdersInfo(orders[index]);
        setShowModal(true);
    }

    const handleAddress = (index) => {
        const email = orders[index]?.orderInfo[0]?.email;
        axiosSecure.get(`/address/${email}`)
            .then(res => setAddress(res.data))
        setShowAddress(true);
    }

    const handleDelete = (orderId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Delete"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/orders/${orderId}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            successMessage("This Order has been deleted");
                        }
                    })
            }
        });
    }

    return (
        <div className="md:w-4/6 mx-auto mt-16">
            {
                orders.length > 0 ?
                    <>
                        <h1 className="text-center text-3xl font-medium">---Order Items---</h1>
                        {
                            orders.map((order, index) => <div key={order._id}>
                                <div className="bg-primary_bg_color mt-10 py-5 px-3 rounded-lg">
                                    <div className="flex flex-col lg:flex-row items-center lg:justify-around gap-3 py-5">
                                        <h3 className="text-xl font-medium">Order Id: {order.orderId}</h3>
                                        <h3>Order Date: {order.date.split(",")[0]}</h3>
                                        <h3>Status: {order.status}</h3>
                                        <button onClick={() => handleStatus(index)} className="btn btn-sm bg-black text-white">Update Status</button>
                                        <button onClick={() => handleAddress(index)} className="btn btn-sm bg-black text-white">Show Address</button>
                                        {
                                            confirm.includes(order.status) ?
                                                <Link to={`/dashboard/invoice/${order._id}`}>
                                                    <button className="btn btn-sm bg-black text-white">Invoice</button>
                                                </Link> : undefined
                                        }
                                        <button onClick={() => handleDelete(order.orderId)} className="btn btn-sm text-lg bg-black text-white"><MdDelete /></button>
                                    </div>
                                    <div>
                                        <div className="overflow-x-auto">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Image</th>
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
                                                            <td>$ {product.price}</td>
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
                    </> : <span className="text-center text-xl font-medium text-black block">No order at this moment !</span>
            }
            <div>
                {
                    showModal ? <UpdateStatusModal onClose={() => setShowModal(false)} order={ordersInfo} refetch={refetch}></UpdateStatusModal> : undefined
                }
            </div>
            <div>
                {
                    showAddress ? <OrderAddress onClose={() => setShowAddress(false)} address={address}></OrderAddress> : undefined
                }
            </div>
        </div>
    );
};

export default OrderedItems;