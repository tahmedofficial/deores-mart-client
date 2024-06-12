import PropTypes from "prop-types";
import { MdClose } from "react-icons/md";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const AddressModal = ({ onClose, refetch, address }) => {

    const { user, successMessage } = useAuth();
    const axiosSecure = useAxiosSecure();

    const handleAddress = (event) => {
        event.preventDefault();
        const form = event.target;
        const house = form.house.value;
        const road = form.road.value;
        const area = form.area.value;
        const city = form.city.value;
        const detailsAddress = form.detailsAddress.value;

        const address = {
            name: user?.displayName,
            email: user?.email,
            house,
            road,
            area,
            city,
            detailsAddress,
        }

        axiosSecure.patch(`/address/${user?.email}`, address)
            .then(res => {
                if (res?.data?.modifiedCount > 0 || res?.data?.upsertedCount > 0) {
                    refetch();
                    onClose();
                    successMessage("Your Address Updated Successfully");
                }
            })

    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-30">
            <div className="mt-10 flex flex-col gap-5 text-black">
                <button onClick={onClose} className="place-self-end text-2xl p-1 rounded-lg hover:bg-primary_bg_color duration-300"><MdClose /></button>
                <div className="bg-primary_bg_color rounded-xl px-20 py-10 flex flex-col gap-5 items-center mx-4">
                    <h1 className="text-2xl md:text-3xl font-semibold">Update Address</h1>
                    <form onSubmit={handleAddress} className="flex flex-col gap-3">
                        <div className="lg:flex gap-4">
                            <div>
                                <h3 className="ml-2 mb-1">Houser<span className="text-red-500">*</span></h3>
                                <input className="md:w-96 h-10 px-3 outline-none rounded-lg text-black" type="text" name="house" defaultValue={address.house} required />
                            </div>
                            <div className="mt-3 lg:mt-0">
                                <h3 className="ml-2 mb-1">Road<span className="text-red-500">*</span></h3>
                                <input className="md:w-96 h-10 px-3 outline-none rounded-lg text-black" type="text" name="road" defaultValue={address.road} required />
                            </div>
                        </div>
                        <div className="lg:flex gap-4">
                            <div>
                                <h3 className="ml-2 mb-1">Area<span className="text-red-500">*</span></h3>
                                <input className="md:w-96 h-10 px-3 outline-none rounded-lg text-black" type="text" name="area" defaultValue={address.area} required />
                            </div>
                            <div className="mt-3 lg:mt-0">
                                <h3 className="ml-2 mb-1">City<span className="text-red-500">*</span></h3>
                                <input className="md:w-96 h-10 px-3 outline-none rounded-lg text-black" type="text" name="city" defaultValue={address.city} required />
                            </div>
                        </div>
                        <div>
                            <h3 className="ml-2 mb-1">Details Address</h3>
                            <input className="md:w-full h-10 px-3 outline-none rounded-lg text-black" type="text" name="detailsAddress" defaultValue={address.detailsAddress} />
                        </div>
                        <button className="btn bg-black px-10 py-2 mt-4 text-white rounded-lg">Update</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddressModal;

AddressModal.propTypes = {
    onClose: PropTypes.func,
    refetch: PropTypes.func,
    address: PropTypes.object
}