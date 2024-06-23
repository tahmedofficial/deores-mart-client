import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import SizeChart from "../SizeChart/SizeChart";
import SerriedSlider from "../SerriedSlider/SerriedSlider";
import useAuth from "../../Hooks/useAuth";
import useCart from "../../Hooks/useCart";
import useAxiosSecure from "../../Hooks/useAxiosSecure";


const ProductDetails = () => {

    const { id } = useParams();
    const { user, successMessage, errorMessage } = useAuth();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const location = useLocation();
    const navigate = useNavigate();
    const [size, setSize] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [availableQuantity, setAvailableQuantity] = useState(0);
    const [, refetch] = useCart();

    const { data: product = {} } = useQuery({
        queryKey: [id, "product"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/product/${id}`);
            return res.data;
        }
    })

    const { image, category, description, gender, sQuantity, mQuantity, lQuantity, xlQuantity, price, title } = product;

    useEffect(() => {
        setSize("");
    }, [product])

    useEffect(() => {
        setQuantity(1);
    }, [size])

    const handleSize = (size) => {
        setSize(size);
        if (size === "S") { return setAvailableQuantity(sQuantity) }
        if (size === "M") { return setAvailableQuantity(mQuantity) }
        if (size === "L") { return setAvailableQuantity(lQuantity) }
        if (size === "XL") { return setAvailableQuantity(xlQuantity) }
    }

    const handlePlusQuantity = (q) => {
        if (q) {
            if (availableQuantity - 1) {
                setQuantity(q);
                setAvailableQuantity(availableQuantity - 1);
            }
            else { errorMessage("Product is not available") }
        }
        else { errorMessage("Minimum quantity 1") }
    }

    const handleMinusQuantity = (q) => {
        if (q) {
            setQuantity(q);
            setAvailableQuantity(availableQuantity + 1);
        }
        else { errorMessage("Minimum quantity 1") }
    }

    const handleAddToCart = () => {
        if (user) {
            if (size) {
                const productInfo = {
                    email: user?.email,
                    productId: id,
                    image: image,
                    title: title,
                    size: size,
                    purchaseQuantity: quantity,
                    price: (price * quantity)
                }

                axiosSecure.post("/carts", productInfo)
                    .then(res => {
                        if (res.data?.insertedId) {
                            refetch();
                            successMessage("Product added to your cart");
                        }
                        else { errorMessage("You have already added to the cart") }
                    })
            }
            else {
                errorMessage("Please select your product size")
            }
        }
        else {
            navigate("/login", { state: location.pathname });
        }

    }

    return (
        <div className="md:w-5/6 mx-auto px-5 mt-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div>
                    <img className="rounded-lg mix-blend-multiply h-full" src={image} alt="image" />
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-xl font-medium">Title: {title}</h1>
                        <h3><span className="font-semibold">Category:</span> {category}</h3>
                        <h3><span className="font-semibold">For:</span> {gender}</h3>
                        <h3><span className="font-semibold">Description:</span> {description}</h3>
                        <h3 className="mt-5 bg-black text-white w-2/5 text-center px-3 py-1 font-medium">$ {price}</h3>
                        {
                            size ? <div className="mt-2 bg-black text-white px-3 w-3/5 text-center py-1 font-medium">
                                {
                                    size === "S" ? <h3 >Available Quantity {availableQuantity - 1}</h3> :
                                        <div>
                                            {
                                                size === "M" ? <h3>Available Quantity {availableQuantity - 1}</h3> :
                                                    <div>
                                                        {
                                                            size === "L" ? <h3>Available Quantity {availableQuantity - 1}</h3> :
                                                                <div>
                                                                    {size === "XL" ? <h3>Available Quantity {availableQuantity - 1}</h3> : undefined}
                                                                </div>
                                                        }
                                                    </div>
                                            }
                                        </div>
                                }
                            </div> : undefined
                        }
                    </div>
                    <div className="mt-5">
                        <h2 className="text-2xl">Size<span className="text-red-600">*</span></h2>
                        <div className="flex gap-2 mt-3">
                            <div>
                                {
                                    sQuantity > 0 ? <button onClick={() => handleSize("S")} className={size === "S" ? "btn btn-circle text-lg bg-primary_color text-white" : "btn btn-circle text-lg bg-white"}>S</button>
                                        : <button disabled className="btn btn-circle text-lg bg-white">S</button>
                                }
                            </div>
                            <div>
                                {
                                    mQuantity > 0 ? <button onClick={() => handleSize("M")} className={size === "M" ? "btn btn-circle text-lg bg-primary_color text-white" : "btn btn-circle text-lg bg-white"}>M</button>
                                        : <button disabled className="btn btn-circle text-lg bg-white">M</button>
                                }
                            </div>
                            <div>
                                {
                                    lQuantity > 0 ? <button onClick={() => handleSize("L")} className={size === "L" ? "btn btn-circle text-lg bg-primary_color text-white" : "btn btn-circle text-lg bg-white"}>L</button>
                                        : <button disabled className="btn btn-circle text-lg bg-white">L</button>
                                }
                            </div>
                            <div>
                                {
                                    xlQuantity > 0 ? <button onClick={() => handleSize("XL")} className={size === "XL" ? "btn btn-circle text-lg bg-primary_color text-white" : "btn btn-circle text-lg bg-white"}>XL</button>
                                        : <button disabled className="btn btn-circle text-lg bg-white">XL</button>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3 items-center mt-8">
                        <button onClick={() => handlePlusQuantity(quantity + 1)} className="btn btn-sm text-lg w-8 border-0 rounded-none bg-black text-white">+</button>
                        <button className="btn btn-sm border-black bg-white rounded-none text-black">{quantity}</button>
                        <button onClick={() => handleMinusQuantity(quantity - 1)} className="btn btn-sm text-lg w-8 border-0 rounded-none bg-black text-white">-</button>
                    </div>
                    <div className="flex gap-10 mt-10">
                        <button onClick={handleAddToCart} className="btn bg-black text-white rounded-none px-10">Add To Cart</button>
                        <button onClick={() => document.getElementById('my_modal_2').showModal()} className="btn bg-transparent border-black text-black rounded-none px-10">Size Chart</button>
                    </div>
                </div>
                <div>

                </div>
            </div>
            <div>
                <SerriedSlider category={category}></SerriedSlider>
            </div>

            <div>
                <SizeChart></SizeChart>
            </div>
        </div>
    );
};

export default ProductDetails;