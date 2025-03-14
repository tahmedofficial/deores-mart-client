import { useQuery } from "@tanstack/react-query";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { useState } from "react";
import ProductUpdateModal from "./ProductUpdateModal";

const AllProductManage = () => {

    const { successMessage } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [showModal, setShowModal] = useState(false);
    const [productIndex, setProductIndex] = useState(0);
    const [isLoading, setLoading] = useState(true);

    const { data: products = [], refetch } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const res = await axiosSecure.get("/products");
            setLoading(false);
            return res.data;
        }
    })

    const handleProductUpdate = (index) => {
        setShowModal(true);
        setProductIndex(index);
    }

    const handleProductDelete = (id) => {
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
                axiosSecure.delete(`/products/${id}`)
                    .then(res => {
                        if (res?.data?.deletedCount > 0) {
                            refetch();
                            successMessage("Product has been delete");
                        }
                    })
            }
        });
    }

    if (isLoading) {
        return <span className="loading loading-spinner loading-lg text-black flex mx-auto mt-20"></span>
    }

    return (
        <div className="md:w-4/6 mx-auto">
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Product Code</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product, index) => <tr key={product._id} className="hover">
                                <th>{index + 1}</th>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img src={product.image} alt="Image" />
                                        </div>
                                    </div>
                                </td>
                                <td>{product.productCode}</td>
                                <td>${product.price.toFixed(2)}</td>
                                <td>
                                    <div className="flex gap-2">
                                        <button onClick={() => handleProductUpdate(index)} className="btn btn-sm bg-black text-white"><FaEdit className="text-lg" /></button>
                                        <button onClick={() => handleProductDelete(product._id)} className="btn btn-sm bg-black text-white"><MdDelete className="text-lg" /></button>
                                    </div>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            <div>
                {
                    showModal ? <ProductUpdateModal refetch={refetch} product={products[productIndex]} onClose={() => setShowModal(false)}></ProductUpdateModal> : undefined
                }
            </div>
        </div>
    );
};

export default AllProductManage;