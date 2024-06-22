import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import WaitMadal from "../../../Components/WaitMadal/WaitMadal";

const image_key = import.meta.env.VITE_imageKey;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_key}`;

const AddItem = () => {

    const { user, successMessage } = useAuth();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const [gender, setGender] = useState(true);
    const [isPublishing, setPublishing] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    let today = new Date().toLocaleString();

    const onSubmit = async (data) => {

        setPublishing(true);
        const imageFile = { image: data.image[0] }
        const result = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: { "content-type": "multipart/form-data" }
        });

        if (result.data.success) {
            const productInfo = {
                publisherEmail: user?.email,
                publishedDate: today,
                title: data.title,
                description: data.description,
                gender: data.gender,
                category: data.category,
                sQuantity: parseInt(data.sQuantity),
                mQuantity: parseInt(data.mQuantity),
                lQuantity: parseInt(data.lQuantity),
                xlQuantity: parseInt(data.xlQuantity),
                quantity: parseInt(data.sQuantity) + parseInt(data.mQuantity) + parseInt(data.xlQuantity) + parseInt(data.xxlQuantity),
                price: parseInt(data.price),
                image: result?.data?.data?.display_url
            }
            const res = await axiosSecure.post("/products", productInfo);
            if (res?.data?.insertedId) {
                reset();
                setPublishing(false);
                successMessage("The product has been published");
            }
            else {
                setPublishing(false);
            }
        }
        else {
            setPublishing(false);
        }

    }


    return (
        <div>
            <h1 className="my-16 flex justify-center text-3xl text-black md:text-4xl font-medium">--- Publish Products ---</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-primary_bg_color flex flex-col justify-center p-8 lg:w-4/6 mx-auto md:px-16 md:py-10 lg:px-20 lg:py-16 mt-10 rounded-lg">
                <div className="flex flex-col md:flex-row w-full gap-5">
                    <div className="w-full">
                        <input {...register("title", { required: true })} className="h-10 outline-none px-3 rounded-lg w-full" type="text" placeholder="Title" />
                        {errors.title && <span className="text-red-600">This field is required</span>}
                    </div>
                    <div className="w-full">
                        <input {...register("description", { required: true })} className="h-10 outline-none px-3 rounded-lg w-full" type="text" placeholder="Description" />
                        {errors.description && <span className="text-red-600">This field is required</span>}
                    </div>
                </div>
                <div className="flex flex-col md:flex-row w-full gap-5 mt-5">
                    <select {...register("gender", { required: true })} defaultValue="Male" onChange={(e) => setGender(e.target.value === "Male")} className="h-10 outline-none px-3 rounded-lg w-full">
                        <option disabled value="Male">Select gender</option>
                        <option>Male</option>
                        <option>Female</option>
                    </select>
                    {
                        gender ?
                            <select {...register("category", { required: true })} defaultValue="Formal pant" className="h-10 outline-none px-3 rounded-lg w-full">
                                <option disabled value="Formal pant">Select a category</option>
                                <option>Formal pant</option>
                                <option>Formal shirt</option>
                                <option>Gabardine pant</option>
                                <option>Jeans pant</option>
                                <option>Polo</option>
                                <option>Punjabi</option>
                                <option>Shirt</option>
                                <option>Trouser</option>
                                <option>T-shirt</option>
                            </select> :
                            <select {...register("category", { required: true })} defaultValue="Kurti" className="h-10 outline-none px-3 rounded-lg w-full">
                                <option disabled value="Kurti">Select a category</option>
                                <option>Kurti</option>
                                <option>Leggings</option>
                                <option>Orna</option>
                                <option>Pajama</option>
                                <option>Palazzo</option>
                                <option>Sari</option>
                                <option>Shalwar kameez</option>
                                <option>Three piece</option>
                                <option>Trouser</option>
                                <option>Tunic</option>
                            </select>
                    }
                </div>
                <div className="flex flex-col md:flex-row w-full gap-5 mt-5">
                    <div className="w-full">
                        <input {...register("sQuantity", { required: true })} className="h-10 outline-none px-3 rounded-lg w-full" type="number" placeholder="S quantity" />
                        {errors.sQuantity && <span className="text-red-600">This field is required</span>}
                    </div>
                    <div className="w-full">
                        <input {...register("mQuantity", { required: true })} className="h-10 outline-none px-3 rounded-lg w-full" type="number" placeholder="M quantity" />
                        {errors.mQuantity && <span className="text-red-600">This field is required</span>}
                    </div>
                </div>
                <div className="flex flex-col md:flex-row w-full gap-5 mt-5">
                    <div className="w-full">
                        <input {...register("lQuantity", { required: true })} className="h-10 outline-none px-3 rounded-lg w-full" type="number" placeholder="L quantity" />
                        {errors.xlQuantity && <span className="text-red-600">This field is required</span>}
                    </div>
                    <div className="w-full">
                        <input {...register("xlQuantity", { required: true })} className="h-10 outline-none px-3 rounded-lg w-full" type="number" placeholder="XL quantity" />
                        {errors.xxlQuantity && <span className="text-red-600">This field is required</span>}
                    </div>
                </div>
                <div className="flex flex-col md:flex-row w-full gap-5 mt-5">
                    <div className="w-full">
                        <input {...register("price", { required: true })} className="h-10 outline-none px-3 rounded-lg w-full" type="number" placeholder="Price" />
                        {errors.price && <span className="text-red-600">This field is required</span>}
                    </div>
                    <div className="w-full">
                        <input {...register("image", { required: true })} className="file-input file-input-bordered h-10 w-full border-0" type="file" />
                        {errors.image && <span className="text-red-600">This field is required</span>}
                    </div>
                </div>
                <button className="btn bg-black text-white mt-10 w-52 hover:bg-primary_color mx-auto">Publish</button>
            </form>
            <div>
                {
                    isPublishing ? <WaitMadal massege="Publishing"></WaitMadal> : undefined
                }
            </div>
        </div>
    );
};

export default AddItem;