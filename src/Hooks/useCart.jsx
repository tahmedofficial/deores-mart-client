import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useCart = () => {

    const axiosSecure = useAxiosSecure();

    const { user } = useAuth();

    const { data: carts = [], refetch } = useQuery({
        queryKey: ["carts"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/carts/${user?.email}`);
            return res.data;
        }
    })

    return [carts, refetch];
};

export default useCart;