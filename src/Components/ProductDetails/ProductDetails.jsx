import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useState } from "react";
import SizeChart from "../SizeChart/SizeChart";
import SerriedSlider from "../SerriedSlider/SerriedSlider";


const ProductDetails = () => {

    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const [size, setSize] = useState(1);

    const { data: product = {} } = useQuery({
        queryKey: [id, "product"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/product/${id}`);
            return res.data;
        }
    })

    const { image, category, description, gender, sQuantity, mQuantity, lQuantity, xlQuantity, price, title } = product;

    return (
        <div className="md:w-5/6 mx-auto px-5 mt-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div>
                    <img className="rounded-lg mix-blend-multiply h-full" src={image} alt="image" />
                </div>
                <div className="flex flex-col gap-2">
                    <h1 className="text-xl font-medium">Title: {title}</h1>
                    <h3><span className="font-semibold">Price:</span> ${price}</h3>
                    <h3><span className="font-semibold">Category:</span> {category}</h3>
                    <h3><span className="font-semibold">For:</span> {gender}</h3>
                    <h3><span className="font-semibold">Description:</span> {description}</h3>
                    <div className="mt-5">
                        <h2 className="text-2xl">Size<span className="text-red-600">*</span></h2>
                        <div className="flex gap-2 mt-3">
                            <div>
                                {
                                    sQuantity > 0 ? <button onClick={() => setSize(1)} className={size === 1 ? "btn btn-circle text-lg bg-primary_color text-white" : "btn btn-circle text-lg bg-white"}>S</button>
                                        : <button disabled className="btn btn-circle text-lg bg-white">S</button>
                                }
                            </div>
                            <div>
                                {
                                    mQuantity > 0 ? <button onClick={() => setSize(2)} className={size === 2 ? "btn btn-circle text-lg bg-primary_color text-white" : "btn btn-circle text-lg bg-white"}>M</button>
                                        : <button disabled className="btn btn-circle text-lg bg-white">M</button>
                                }
                            </div>
                            <div>
                                {
                                    lQuantity > 0 ? <button onClick={() => setSize(3)} className={size === 3 ? "btn btn-circle text-lg bg-primary_color text-white" : "btn btn-circle text-lg bg-white"}>L</button>
                                        : <button disabled className="btn btn-circle text-lg bg-white">L</button>
                                }
                            </div>
                            <div>
                                {
                                    xlQuantity > 0 ? <button onClick={() => setSize(4)} className={size === 4 ? "btn btn-circle text-lg bg-primary_color text-white" : "btn btn-circle text-lg bg-white"}>XL</button>
                                        : <button disabled className="btn btn-circle text-lg bg-white">XL</button>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-10 mt-10">
                        <button className="btn bg-black text-white rounded-none px-10">Add To Cart</button>
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