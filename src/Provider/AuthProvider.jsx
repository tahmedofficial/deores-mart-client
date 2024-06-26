import PropTypes from 'prop-types';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, signOut, sendEmailVerification } from 'firebase/auth';
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config"
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import useAxiosSecure from '../Hooks/useAxiosSecure';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();

    const errorMessage = (message) => {
        toast.error(message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    const successMessage = (message) => {
        Swal.fire({
            position: "center",
            icon: "success",
            title: message,
            showConfirmButton: false,
            timer: 1500
        });
    }

    const alartMessage = (message) => {
        Swal.fire({
            title: message,
            icon: "success"
        });
    }

    const signUpUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleProvider = new GoogleAuthProvider();
    const loginUsingGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const facebookProvider = new FacebookAuthProvider();
    const loginUsingFacebook = () => {
        setLoading(true);
        return signInWithPopup(auth, facebookProvider);
    }

    const emailVerification = () => {
        setLoading(true);
        return sendEmailVerification(auth.currentUser);
    }

    const logOutUser = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);

            // jwt token implement
            if (currentUser) {
                const userInfo = { email: currentUser?.email }
                axiosSecure.post("/jwt", userInfo)
                    .then(res => {
                        localStorage.setItem("auth-token", res?.data?.token);
                        setLoading(false);
                    })
            }
            else {
                localStorage.removeItem("auth-token");
                setLoading(false);
            }
        })
        return () => {
            unsubscribe();
        }
    }, [user, axiosSecure])

    const authInfo = {
        user,
        loading,
        signUpUser,
        loginUser,
        loginUsingGoogle,
        loginUsingFacebook,
        setUser,
        emailVerification,
        logOutUser,
        successMessage,
        alartMessage,
        errorMessage
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

AuthProvider.propTypes = {
    children: PropTypes.node
}