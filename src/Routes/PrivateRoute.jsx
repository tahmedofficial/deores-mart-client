import PropTypes from 'prop-types';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {

    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <span className="loading loading-spinner loading-lg text-black flex mx-auto mt-20"></span>
    }

    if (user) {
        return children;
    }

    return <Navigate to="/login" state={location.pathname} replace></Navigate>
};

export default PrivateRoute;

PrivateRoute.propTypes = {
    children: PropTypes.node
}