import PropTypes from "prop-types";
import { useRef } from "react";
import { MdClose } from "react-icons/md";

const OrderAddress = ({ onClose, address }) => {

    const modalRef = useRef();

    const closeModal = (event) => {
        if (modalRef.current === event.target) {
            onClose();
        }
    }

    return (
        <div ref={modalRef} onClick={closeModal} className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-30">
            <div className="mt-10 flex flex-col gap-5 text-black">
                <button onClick={onClose} className="place-self-end text-2xl p-1 rounded-lg hover:bg-primary_bg_color duration-300"><MdClose /></button>
                <div className="bg-primary_bg_color rounded-xl px-20 py-10 flex flex-col gap-5 items-center mx-4">
                    <h1 className="text-2xl md:text-3xl font-semibold">Shipping Address</h1>
                    <div className="space-x-1 text-center bg-white p-4 rounded-lg mt-5">
                        <h3 className="inline">Address: {address.house},</h3>
                        <h3 className="inline">{address.road},</h3>
                        <h3 className="inline">{address.area},</h3>
                        <h3 className="inline">{address.city}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderAddress;

OrderAddress.propTypes = {
    onClose: PropTypes.func,
    address: PropTypes.object
}