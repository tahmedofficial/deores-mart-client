import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import ProductCatrs from "../../Components/ProductCatrs/ProductCatrs";


const AllProducts = () => {

    const axiosPublic = useAxiosPublic();

    const { data: products = [] } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const res = await axiosPublic.get("/products");
            return res.data;
        }
    })

    return (
        <div className="md:w-5/6 mx-auto px-5">
            {
                products.length > 0 ?
                    <>
                        <h1 className="my-16 flex justify-center text-3xl text-black md:text-4xl font-medium">--- All Collection ---</h1>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                            {
                                products.map(product => <ProductCatrs key={product._id} product={product}></ProductCatrs>)
                            }
                        </div>
                    </> : <span className="loading loading-spinner loading-lg text-black flex mx-auto mt-20"></span>
            }
        </div>
    );
};

export default AllProducts;