import PropTypes from "prop-types";
import { MdClose } from "react-icons/md";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

const UpdateStatusModal = ({ onClose, order, refetch }) => {

    const { successMessage } = useAuth();
    const axiosSecure = useAxiosSecure();

    const handleStatus = (event) => {
        event.preventDefault();
        const status = event?.target?.status?.value;
        axiosSecure.patch(`/orders/${order.orderId}`, { status })
            .then(res => {
                if (res.data?.matchedCount > 0) {
                    refetch();
                    onClose();
                    successMessage("Ststus Updated");
                }
            })
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-30">
            <div className="mt-10 flex flex-col gap-5 text-black">
                <button onClick={onClose} className="place-self-end text-2xl p-1 rounded-lg hover:bg-primary_bg_color duration-300"><MdClose /></button>
                <div className="bg-primary_bg_color rounded-xl px-20 py-10 flex flex-col gap-5 items-center mx-4">
                    <h1 className="text-2xl md:text-3xl font-semibold">Update Status</h1>
                    <div className="text-center space-y-1">
                        <h3>Order Id: {order.orderId}</h3>
                        <h3>Previous Status: {order.status}</h3>
                    </div>
                    <form onSubmit={handleStatus} className="flex flex-col gap-3">
                        <select defaultValue={order.status} name="status" className="h-10 rounded-lg outline-none px-3">
                            <option disabled value={order.status}>Select a role</option>
                            <option>Pending</option>
                            <option>Confirm</option>
                            <option>Shipped</option>
                            <option>Delivered</option>
                        </select>
                        <button className="btn bg-black px-10 py-2 mt-4 text-white rounded-lg">Update</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateStatusModal;

UpdateStatusModal.propTypes = {
    onClose: PropTypes.func,
    refetch: PropTypes.func,
    order: PropTypes.object
}