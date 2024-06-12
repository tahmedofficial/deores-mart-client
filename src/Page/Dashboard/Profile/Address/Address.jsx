import { useState } from "react";
import AddressModal from "./AddressModal";
import useAuth from "../../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const Address = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [showModal, setShowModal] = useState(false);

    const { data: address = {}, refetch } = useQuery({
        queryKey: [user?.email, "address"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/address/${user?.email}`);
            return res.data;
        }
    })

    return (
        <div className="bg-primary_bg_color p-5 rounded-xl mt-10 lg:w-4/6">
            <h1 className="text-center text-2xl font-semibold">Address</h1>
            <h3 className="h-10 bg-white mt-3 px-3 py-2 rounded-xl">House: {address.house}</h3>
            <h3 className="h-10 bg-white mt-3 px-3 py-2 rounded-xl">Road: {address.road}</h3>
            <h3 className="h-10 bg-white mt-3 px-3 py-2 rounded-xl">Area: {address.area}</h3>
            <h3 className="h-10 bg-white mt-3 px-3 py-2 rounded-xl">City: {address.city}</h3>
            <h3 className="h-10 bg-white mt-3 px-3 py-2 rounded-xl">Detaild Address: {address.detailsAddress}</h3>
            <button onClick={() => setShowModal(true)} className="btn bg-black text-white mt-5 px-10 flex mx-auto">Update Address</button>
            <div>
                {
                    showModal ? <AddressModal refetch={refetch} address={address} onClose={() => setShowModal(false)}></AddressModal> : undefined
                }
            </div>
        </div>
    );
};

export default Address;