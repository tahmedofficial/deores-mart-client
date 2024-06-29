import { useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import logo from "../../assets/images/deoresLogo.jpg"

const Invoice = () => {

    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const [address, setAddress] = useState({});
    const [user, setUser] = useState({});
    const invoiceComponent = useRef();
    const date = new Date().toDateString().split(" ");
    const deliveryDate = `${date[2]} ${date[1]} ${date[3]}`;

    const { data: order = [] } = useQuery({
        queryKey: ["order"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders/invoice/${id}`);
            return res.data;
        }
    })

    const SudTotalPrice = order?.orderInfo?.reduce((sum, item) => sum + item.price, 0);

    useEffect(() => {
        if (order?.orderInfo) {
            axiosSecure.get(`/address/${order.email}`)
                .then(res => {
                    setAddress(res.data);
                })
        }
    }, [order, axiosSecure])

    useEffect(() => {
        if (order?.orderInfo) {
            axiosSecure.get(`/users/${order.email}`)
                .then(res => {
                    setUser(res.data);
                })
        }
    }, [order, axiosSecure])

    const handleInvoicePdf = useReactToPrint({
        content: () => invoiceComponent.current,
        documentTitle: "Invoice",
    })

    return (
        <div className="md:w-4/6 mx-auto mt-14">
            <h1 className="text-center text-3xl text-black font-medium">---Invoice---</h1>
            <div className="border mt-16 rounded-lg">
                <div ref={invoiceComponent} className="p-4 px-16">
                    <div className="flex justify-between items-center gap-10 mt-10">
                        <div>
                            <img className="mix-blend-multiply w-20" src={logo} alt="Logo" />
                        </div>
                        <h2 className="text-3xl font-semibold text-black pr-3">Invoice</h2>
                    </div>
                    <div className="flex justify-between p-3 gap-10 mt-5">
                        <div className="text-black space-y-1">
                            <h1 className="font-semibold">Billed To:</h1>
                            <h3>Name: {user.name}</h3>
                            <h3>Email: {user.email}</h3>
                            <div>
                                <h3 className="inline">Address: {address.house},</h3>
                                <h3 className="inline">{address.road},</h3>
                                <h3 className="inline">{address.area},</h3>
                                <h3 className="inline">{address.city}</h3>
                            </div>
                        </div>
                        <div className="text-black space-y-1">
                            <h3 className="font-semibold">Invoice No: {order.orderId}</h3>
                            <h3>Date: {deliveryDate}</h3>
                        </div>
                    </div>
                    <div className="divider"></div>
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Image</th>
                                    <th>Item</th>
                                    <th>Quantity</th>
                                    <th>Size</th>
                                    <th>Unit Price</th>
                                    <th>Total Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    order?.orderInfo?.map((item, index) => <tr key={item._id}>
                                        <th>{index + 1}</th>
                                        <td>
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img src={item.image} alt="image" />
                                                </div>
                                            </div>
                                        </td>
                                        <td>{item.title}</td>
                                        <td>{item.purchaseQuantity}</td>
                                        <td>{item.size}</td>
                                        <td>$ {item.price.toFixed(2)}</td>
                                        <td>$ {(item.price / item.purchaseQuantity).toFixed(2)}</td>
                                    </tr>)
                                }
                                <tr>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th>Sudtotal</th>
                                    <th>$ {SudTotalPrice}</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-24 text-black space-y-2">
                        <h1 className="text-xl font-medium">Your Satisfaction is Our Goal</h1>
                        <h3 className="font-medium">Dear {user.name},</h3>
                        <h3>Thank you for choosing Deores. We hope you love your new items, crafted with the utmost care for your satisfaction. For any questions or assistance, please contact our customer service team at deoresinfo@gmail.com</h3>
                    </div>
                </div>
            </div>
            <div className="mt-16">
                <button onClick={handleInvoicePdf} className="btn bg-black hover:bg-primary_color text-white rounded-none px-10">Print Invoice</button>
            </div>
        </div>
    );
};

export default Invoice;