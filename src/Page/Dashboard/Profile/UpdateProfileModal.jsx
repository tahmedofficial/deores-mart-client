import PropTypes from "prop-types";
import { MdClose } from "react-icons/md";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import WaitMadal from "../../../Components/WaitMadal/WaitMadal";
import { updateProfile } from "firebase/auth";

const image_key = import.meta.env.VITE_imageKey;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_key}`;

const UpdateProfileModal = ({ onClose, userInfo }) => {

    const { user, setUser, successMessage } = useAuth();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const [isWorking, setWorking] = useState(false);
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {

        if (data.image.length) {
            setWorking(true);
            const imageFile = { image: data.image[0] }
            const result = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: { "content-type": "multipart/form-data" }
            });

            if (result.data.success) {
                updateProfile(user, {
                    displayName: data.name,
                    photoURL: result?.data?.data?.display_url
                })
                    .then(() => {
                        setUser({
                            displayName: data.name,
                            photoURL: result?.data?.data?.display_url || userInfo?.image
                        })
                        const userData = {
                            name: data.name,
                            email: data.email,
                            image: result?.data?.data?.display_url,
                            number: data.number,
                            role: userInfo.role
                        }
                        axiosSecure.patch(`/users/${user?.email}`, userData)
                            .then(res => {
                                if (res?.data?.modifiedCount) {
                                    reset();
                                    onClose();
                                    setWorking(false);
                                    successMessage("Successfully Updated");
                                }
                            })
                    })
                setWorking(false);
            }
            setWorking(false);
        }
        else {
            updateProfile(user, { displayName: data.name })
                .then(() => {
                    setUser({ displayName: data.name })
                    const userData = {
                        name: data.name,
                        email: data.email,
                        image: userInfo.image,
                        number: data.number,
                        role: userInfo.role
                    }
                    axiosSecure.patch(`/users/${user?.email}`, userData)
                        .then(res => {
                            if (res?.data?.modifiedCount) {
                                reset();
                                onClose();
                                successMessage("Successfully Updated");
                            }
                        })
                })
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-30">
            <div className="mt-10 flex flex-col gap-5 text-black">
                <button onClick={onClose} className="place-self-end text-2xl p-1 rounded-lg hover:bg-primary_bg_color duration-300"><MdClose /></button>
                <div className="bg-primary_bg_color rounded-xl px-20 py-10 flex flex-col gap-5 items-center mx-4">
                    <h1 className="text-2xl md:text-3xl font-semibold">Update Profile</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                        <div className="lg:flex gap-4">
                            <div>
                                <h3 className="ml-2 mb-1">Name</h3>
                                <input {...register("name")} className="w-full md:w-96 h-10 px-3 outline-none rounded-lg text-black" type="text" defaultValue={userInfo.name} />
                            </div>
                            <div className="mt-3 lg:mt-0">
                                <h3 className="ml-2 mb-1">Email</h3>
                                <input {...register("email")} className="w-full md:w-96 h-10 px-3 outline-none rounded-lg text-black" type="email" defaultValue={userInfo.email} />
                            </div>
                        </div>
                        <div className="lg:flex gap-4">
                            <div>
                                <h3 className="ml-2 mb-1">Number</h3>
                                <input {...register("number")} className="w-full md:w-96 h-10 px-3 outline-none rounded-lg text-black" type="number" defaultValue={userInfo.number} />
                            </div>
                            <div>
                                <h3 className="ml-2 mb-1">Profile Image</h3>
                                <input {...register("image")} type="file" className="file-input file-input-bordered w-full h-10 border-0" />
                            </div>
                        </div>
                        <button className="btn bg-black px-10 py-2 mt-4 text-white rounded-lg">Update</button>
                    </form>
                </div>
            </div>
            <div>
                {
                    isWorking ? <WaitMadal massege="Please Wait"></WaitMadal> : undefined
                }
            </div>
        </div>
    );
};

export default UpdateProfileModal;

UpdateProfileModal.propTypes = {
    onClose: PropTypes.func,
    userInfo: PropTypes.object
}