
const SizeChart = () => {
    return (
        <div>
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                    <h1 className="text-xl text-center md:text-2xl font-medium">CLOTHING SIZE CHART GIRLS</h1>
                    <div className="overflow-x-auto mt-5">
                        <table className="table table-zebra">
                            <thead>
                                <tr>
                                    <th className="text-lg">Category</th>
                                    <th className="text-lg">Measure your</th>
                                    <th className="text-lg">S</th>
                                    <th className="text-lg">M</th>
                                    <th className="text-lg">L</th>
                                    <th className="text-lg">XL</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>Tunic</th>
                                    <td>Chest</td>
                                    <td>{'38"'}</td>
                                    <td>{'39"'}</td>
                                    <td>{'41"'}</td>
                                    <td>{'42"'}</td>
                                </tr>
                                <tr>
                                    <th>Pant</th>
                                    <td>Waist</td>
                                    <td>{'36"'}</td>
                                    <td>{'37"'}</td>
                                    <td>{'39"'}</td>
                                    <td>{'40"'}</td>
                                </tr>
                                <tr>
                                    <th>Leggings</th>
                                    <td>Waist</td>
                                    <td>{'28"'}</td>
                                    <td>{'30"'}</td>
                                    <td>{'32"'}</td>
                                    <td>{'34"'}</td>
                                </tr>
                                <tr>
                                    <th>Leggings</th>
                                    <td>Waist</td>
                                    <td>{'26"'}</td>
                                    <td>{'27"'}</td>
                                    <td>{'28"'}</td>
                                    <td>{'29"'}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default SizeChart;