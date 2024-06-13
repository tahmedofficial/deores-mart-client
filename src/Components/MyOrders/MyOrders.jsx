
const MyOrders = () => {
    return (
        <div className="bg-primary_bg_color mt-10 rounded-xl py-3">
            <h1 className="text-center text-2xl font-semibold py-5">My Orders</h1>
            <div className="divider"></div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Order Id</th>
                            <th>Order Date</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="hover bg-white">
                            <th>2</th>
                            <td>
                                <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src="https://img.daisyui.com/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div>
                            </td>
                            <td>T-Shart</td>
                            <td>DS-570422</td>
                            <td>22-6-2024</td>
                            <td>$15</td>
                        </tr>
                        <tr className="hover bg-white">
                            <th>2</th>
                            <td>
                                <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src="https://img.daisyui.com/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div>
                            </td>
                            <td>T-Shart</td>
                            <td>DS-570422</td>
                            <td>22-6-2024</td>
                            <td>$15</td>
                        </tr>
                        <tr className="hover bg-white">
                            <th>2</th>
                            <td>
                                <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src="https://img.daisyui.com/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div>
                            </td>
                            <td>T-Shart</td>
                            <td>DS-570422</td>
                            <td>22-6-2024</td>
                            <td>$15</td>
                        </tr>
                        <tr className="hover bg-white">
                            <th>2</th>
                            <td>
                                <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src="https://img.daisyui.com/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div>
                            </td>
                            <td>T-Shart</td>
                            <td>DS-570422</td>
                            <td>22-6-2024</td>
                            <td>$15</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;