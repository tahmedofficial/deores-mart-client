import useCart from "../../Hooks/useCart";
import { MdDelete } from "react-icons/md";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import AddressModal from "../../Components/Address/AddressModal";
import { useNavigate } from "react-router-dom";

const Cart = () => {

    const [carts, refetch] = useCart();
    const { user, successMessage, errorMessage } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("1");
    const totalPrice = carts.reduce((sum, cart) => sum + cart.price, 0);
    let today = new Date().toLocaleString();

    console.log(carts);

    const handleDelete = (id) => {
        axiosSecure.delete(`/carts/${id}`)
            .then(res => {
                if (res.data.deletedCount) {
                    refetch();
                    successMessage("Successfully Delete");
                }
            })
    }

    const { data: address = {}, refetch: reload } = useQuery({
        queryKey: [user?.email, "address"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/address/${user?.email}`);
            return res.data;
        }
    })

    const { data: thisUser = {} } = useQuery({
        queryKey: [user?.email, "user"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            return res.data;
        }
    })

    const handlePurchase = () => {

        if (address) {
            if (parseInt(paymentMethod) === 1) {

                axiosSecure.get(`/orderId/66787ced0a24731ddb7f0286`)
                    .then(res => {
                        const orderData = {
                            orderId: res?.data?.orderId,
                            email: user?.email,
                            date: today,
                            status: "Pending",
                            orderInfo: carts
                        }
                        axiosSecure.post("/orders", orderData)
                            .then(result => {
                                if (result?.data?.result?.insertedId) {
                                    const orderId = `DS-${parseInt(res.data.orderId.split("-")[1]) + 1}`;
                                    axiosSecure.patch(`/orderId/66787ced0a24731ddb7f0286`, { orderId })
                                        .then(response => {
                                            if (response.data.matchedCount > 0) {
                                                refetch();
                                                navigate("/allProducts");
                                                successMessage("You have successfully purchased");
                                            }
                                        })
                                }
                            })
                    })
            }
            else { errorMessage("Up Comming") }
        }
        else { setShowModal(true) }

    }

    return (
        <div className="md:w-4/6 mx-auto px-5">
            <h1 className="btn btn-ghost font-semibold text-black flex justify-center my-8 text-4xl">Deores</h1>
            <h3 className="text-3xl text-center mb-5 font-medium">Purchase Info</h3>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Size</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            carts.map((cart, index) => <tr key={cart._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-16 h-16">
                                            <img src={cart.image} alt="Image" />
                                        </div>
                                    </div>
                                </td>
                                <td>{cart.title}</td>
                                <td>{cart.size}</td>
                                <td>${cart.price}</td>
                                <td>{cart.purchaseQuantity}</td>
                                <td>
                                    <button onClick={() => handleDelete(cart._id)} className="btn btn-sm text-white bg-black text-lg">
                                        <MdDelete />
                                    </button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
            <div className="divider"></div>
            <div className="flex flex-col gap-2 p-5 rounded-lg bg-primary_bg_color md:w-5/6 lg:w-4/6 mx-auto">
                <div className="flex justify-around bg-white rounded-lg p-2 items-center">
                    <h2 className="md:text-lg font-medium">Total Price</h2>
                    <h2 className="md:text-lg font-medium">${totalPrice}</h2>
                </div>
                <div className="flex justify-around bg-white rounded-lg p-2 items-center">
                    <h2 className="md:text-lg font-medium">Shipping Fee</h2>
                    <h2 className="md:text-lg font-medium">$20</h2>
                </div>
                <div className="flex justify-around bg-white rounded-lg p-2 items-center">
                    <h2 className="md:text-lg font-medium">Payable Total</h2>
                    <h2 className="md:text-lg font-medium">${totalPrice + 20}</h2>
                </div>
                <div className="flex justify-around bg-white rounded-lg p-2 items-center">
                    <h2 className="md:text-lg font-medium">Payment Method</h2>
                    <select onChange={(e) => setPaymentMethod(e.target.value)} className="outline-none px-3 rounded-lg">
                        <option value={1}>Cash on delivery</option>
                        <option value={2}>Online Payment</option>
                    </select>
                </div>
            </div>
            {address ? <div className="divider"></div> : undefined}
            {
                address ? <div className="bg-primary_bg_color rounded-lg md:w-5/6 lg:w-4/6 mx-auto p-5 lg:px-16">
                    <h3 className="text-center font-medium text-xl pt-5">Shipping Address</h3>
                    <div className="space-x-1 text-center bg-white p-4 rounded-lg mt-5">
                        <h1>Name: {user.displayName}</h1>
                        <h1 className="py-1">Email: {user.email}</h1>
                        <h1 className="py-1">Number: {thisUser.number}</h1>
                        <h3 className="inline">Address: {address.house},</h3>
                        <h3 className="inline">{address.road},</h3>
                        <h3 className="inline">{address.area},</h3>
                        <h3 className="inline">{address.city}</h3>
                    </div>
                    <button onClick={() => setShowModal(true)} className="btn btn-sm bg-black text-white flex mx-auto mt-5">Update Address</button>
                </div> : undefined
            }
            <div className="divider"></div>
            <div className="mb-20">
                <button onClick={handlePurchase} className="btn bg-black text-white rounded-none px-14 flex mx-auto">Purchase</button>
            </div>
            <div>
                {showModal ? <AddressModal refetch={reload} address={address} onClose={() => setShowModal(false)}></AddressModal> : undefined}
            </div>
        </div>
    );
};

export default Cart;