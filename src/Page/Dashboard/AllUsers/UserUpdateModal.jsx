import PropTypes from "prop-types";
import { MdClose } from "react-icons/md";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";


const UserUpdateModal = ({ onClose, userInfo, refetch }) => {

    const { successMessage } = useAuth();
    const axiosSecure = useAxiosSecure();

    const handleRole = (event) => {
        event.preventDefault();
        const role = event.target.role.value;
        const updatedRole = {
            name: userInfo?.name,
            email: userInfo?.email,
            image: userInfo?.image,
            number: userInfo?.number,
            role: role

        }
        axiosSecure.patch(`/users/${userInfo.email}`, updatedRole)
            .then(res => {
                if (res.data?.modifiedCount) {
                    refetch();
                    onClose();
                    successMessage("Successfully Updated");
                }
            })
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-30">
            <div className="mt-10 flex flex-col gap-5 text-black">
                <button onClick={onClose} className="place-self-end text-2xl p-1 rounded-lg hover:bg-primary_bg_color duration-300"><MdClose /></button>
                <div className="bg-primary_bg_color rounded-xl px-20 py-10 flex flex-col gap-5 items-center mx-4">
                    <h1 className="text-2xl md:text-3xl font-semibold">Update User Role</h1>
                    <h3>Previous Role: {userInfo.role}</h3>
                    <form onSubmit={handleRole} className="flex flex-col gap-3">
                        <select defaultValue={userInfo.role} name="role" className="h-10 rounded-lg outline-none px-3">
                            <option disabled value={userInfo.role}>Select a role</option>
                            <option>admin</option>
                            <option>moderator</option>
                            <option>supporter</option>
                        </select>
                        <button className="btn bg-black px-10 py-2 mt-4 text-white rounded-lg">Update</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserUpdateModal;

UserUpdateModal.propTypes = {
    onClose: PropTypes.func,
    refetch: PropTypes.func,
    userInfo: PropTypes.object
}