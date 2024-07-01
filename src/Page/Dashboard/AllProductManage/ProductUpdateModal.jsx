import PropTypes from 'prop-types';
import { MdClose } from "react-icons/md";
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';

const ProductUpdateModal = ({ onClose, refetch, product }) => {

    const axiosSecure = useAxiosSecure();
    const { successMessage } = useAuth();
    const { _id, title, description, gender, category, sQuantity, mQuantity, lQuantity, xlQuantity, price } = product;

    const handleUpdateProduct = (event) => {
        event.preventDefault();
        const form = event.target;
        const title = form.title.value
        const description = form.description.value
        const gender = form.gender.value
        const category = form.category.value
        const sQuantity = parseInt(form.sQuantity.value)
        const mQuantity = parseInt(form.mQuantity.value)
        const lQuantity = parseInt(form.lQuantity.value)
        const xlQuantity = parseInt(form.xlQuantity.value)
        const price = parseInt(form.price.value)
        const productInfo = { title, description, gender, category, sQuantity, mQuantity, lQuantity, xlQuantity, price }

        axiosSecure.patch(`/products/${_id}`, productInfo)
            .then(res => {
                if (res?.data?.modifiedCount > 0) {
                    refetch();
                    onClose();
                    successMessage("Product has been updated");
                }
            })
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-30">
            <div className="mt-10 flex flex-col gap-5 text-black">
                <button onClick={onClose} className="place-self-end text-2xl p-1 rounded-lg hover:bg-primary_bg_color duration-300"><MdClose /></button>
                <div className="bg-primary_bg_color rounded-xl px-20 py-10 flex flex-col gap-5 items-center mx-4">
                    <h1 className="text-2xl md:text-3xl font-semibold">Product Update</h1>
                    <form onSubmit={handleUpdateProduct}>
                        <div className='flex flex-col lg:flex-row gap-3 lg:gap-5'>
                            <div className='flex flex-col'>
                                <span className='text-black mb-1'>Title</span>
                                <input className='h-10 outline-none px-3 rounded-lg w-72 lg:w-96' type="text" name='title' defaultValue={title} />
                            </div>
                            <div className='flex flex-col'>
                                <span className='text-black mb-1'>Price</span>
                                <input className='h-10 outline-none px-3 rounded-lg w-72 lg:w-96' type="number" name='price' defaultValue={price} />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row w-full gap-5 mt-5">
                            <div className='flex flex-col'>
                                <span className='text-black mb-1'>Gender</span>
                                <select defaultValue={gender} name='gender' className="h-10 outline-none px-3 rounded-lg w-72 lg:w-96">
                                    <option disabled value={gender}>{gender}</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                </select>
                            </div>
                            {
                                gender === "Male" ?
                                    <div className='flex flex-col'>
                                        <span className='text-black mb-1'>Category</span>
                                        <select defaultValue={category} name='category' className="h-10 outline-none px-3 rounded-lg w-72 lg:w-96">
                                            <option disabled value={category}>{category}</option>
                                            <option>Formal pant</option>
                                            <option>Formal shirt</option>
                                            <option>Gabardine pant</option>
                                            <option>Jeans pant</option>
                                            <option>Polo</option>
                                            <option>Punjabi</option>
                                            <option>Shirt</option>
                                            <option>Trouser</option>
                                            <option>T-shirt</option>
                                        </select>
                                    </div> :
                                    <div className='flex flex-col'>
                                        <span className='text-black mb-1'>Category</span>
                                        <select defaultValue={category} name='category' className="h-10 outline-none px-3 rounded-lg w-72 lg:w-96">
                                            <option disabled value={category}>{category}</option>
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
                                    </div>
                            }
                        </div>
                        <div className='flex flex-col lg:flex-row gap-3 lg:gap-5 mt-3'>
                            <div className='flex flex-col'>
                                <span className='text-black mb-1'>S Quantity</span>
                                <input className='h-10 outline-none px-3 rounded-lg w-72 lg:w-96' type="number" name='sQuantity' defaultValue={sQuantity} />
                            </div>
                            <div className='flex flex-col'>
                                <span className='text-black mb-1'>M Quantity</span>
                                <input className='h-10 outline-none px-3 rounded-lg w-72 lg:w-96' type="number" name='mQuantity' defaultValue={mQuantity} />
                            </div>
                        </div>
                        <div className='flex flex-col lg:flex-row gap-3 lg:gap-5 mt-3'>
                            <div className='flex flex-col'>
                                <span className='text-black mb-1'>L Quantity</span>
                                <input className='h-10 outline-none px-3 rounded-lg w-72 lg:w-96' type="number" name='lQuantity' defaultValue={lQuantity} />
                            </div>
                            <div className='flex flex-col'>
                                <span className='text-black mb-1'>XL Quantity</span>
                                <input className='h-10 outline-none px-3 rounded-lg w-72 lg:w-96' type="number" name='xlQuantity' defaultValue={xlQuantity} />
                            </div>
                        </div>
                        <div className='flex flex-col mt-3'>
                            <span className='text-black mb-1'>Description</span>
                            <input className='h-10 outline-none px-3 rounded-lg w-full' type="text" name='description' defaultValue={description} />
                        </div>
                        <button className='btn bg-black text-white px-12 rounded-none mt-8 flex mx-auto'>Update</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProductUpdateModal;

ProductUpdateModal.propTypes = {
    onClose: PropTypes.func,
    refetch: PropTypes.func,
    product: PropTypes.object
}