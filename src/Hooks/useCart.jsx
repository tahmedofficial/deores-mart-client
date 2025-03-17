import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useState } from 'react';

const useCart = () => {

    const axiosSecure = useAxiosSecure();
    const [loded, setLoded,] = useState(false);

    const { user } = useAuth();

    const { data: carts = [], refetch } = useQuery({
        queryKey: ["carts"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/carts/${user?.email}`);
            setLoded(true);
            return res.data;
        }
    })

    return [carts, refetch, loded];
};

export default useCart;