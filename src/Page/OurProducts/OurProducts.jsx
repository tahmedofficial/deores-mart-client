import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import ProductCatrs from "../../Components/ProductCatrs/ProductCatrs";

const OurProducts = () => {

    const axiosPublic = useAxiosPublic();

    const { data: products = [] } = useQuery({
        queryKey: ["rdmProducts"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/randomProducts`);
            return res.data;
        }
    })

    console.log(products);

    return (
        <div className="md:w-5/6 mx-auto mt-16 px-4 md:px-0">
            {
                products.length > 0 ?
                    <>
                        <h1 className="mb-10 flex justify-center text-3xl text-black md:text-4xl font-medium">--- Our Products ---</h1>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {
                                products.map(product => <ProductCatrs key={product._id} product={product}></ProductCatrs>)
                            }
                        </div>
                    </> : <span className="loading loading-spinner loading-lg text-black flex mx-auto mt-20"></span>
            }
        </div>
    );
};

export default OurProducts;