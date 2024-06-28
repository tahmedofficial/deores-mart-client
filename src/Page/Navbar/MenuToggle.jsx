import PropTypes from 'prop-types';
import { useEffect } from "react";
import { useAnimate, stagger } from "framer-motion";
import { NavLink } from 'react-router-dom';

const useMenuAnimation = (isOpen) => {
    
    const [scope, animate] = useAnimate();

    useEffect(() => {
        const menuAnimations = isOpen
            ? [
                [
                    "nav",
                    { transform: "translateX(0%)" },
                    { ease: [0.08, 0.65, 0.53, 0.96], duration: 0.6 }
                ],
                [
                    "li",
                    { transform: "scale(1)", opacity: 1, filter: "blur(0px)" },
                    { delay: stagger(0.05), at: "-0.1" }
                ]
            ]
            : [
                [
                    "li",
                    { transform: "scale(0.5)", opacity: 0, filter: "blur(10px)" },
                    { delay: stagger(0.05, { from: "last" }), at: "<" }
                ],
                ["nav", { transform: "translateX(-100%)" }, { at: "-0.1" }]
            ];

        animate([
            [
                "path.top",
                { d: isOpen ? "M 3 16.5 L 17 2.5" : "M 2 2.5 L 20 2.5" },
                { at: "<" }
            ],
            ["path.middle", { opacity: isOpen ? 0 : 1 }, { at: "<" }],
            [
                "path.bottom",
                { d: isOpen ? "M 3 2.5 L 17 16.346" : "M 2 16.346 L 20 16.346" },
                { at: "<" }
            ],
            ...menuAnimations
        ]);
    }, [isOpen, animate]);

    return scope;
}

const MenuToggle = ({ isOpen }) => {

    const scope = useMenuAnimation(isOpen);

    const ulStyle = {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        padding: "15px"
    }

    const liStyle = {
        color: "#ffffff",
        transformOrigin: "-20px 50%",
        fontSize: "16px",
        willChange: "transform, opacity, filter",
        listStyle: "none",
        marginTop: "5px"
    }

    return (
        <div ref={scope}>
            <nav className="bg-black bg-opacity-80 absolute z-20 w-full md:w-80 md:rounded-r-lg h-full pl-3">
                <ul style={ulStyle}>
                    <li style={liStyle}><NavLink to="/" className={({ isActive }) => isActive ? "border-b-2 duration-300 text-white font-medium px-3 pb-2 border-white" : "font-medium"}>Home</NavLink></li>
                    <li style={liStyle}><NavLink to="allProducts" className={({ isActive }) => isActive ? "border-b-2 duration-300 text-white font-medium px-3 pb-2 border-white" : "font-medium"}>allProducts</NavLink></li>
                    <li style={liStyle}><NavLink to="login" className={({ isActive }) => isActive ? "border-b-2 duration-300 text-white font-medium px-3 pb-2 border-white" : "font-medium"}>Login</NavLink></li>
                    <li style={liStyle}><NavLink to="signUp" className={({ isActive }) => isActive ? "border-b-2 duration-300 text-white font-medium px-3 pb-2 border-white" : "font-medium"}>Sign Up</NavLink></li>
                </ul>
            </nav>
        </div>
    );
};

export default MenuToggle;

MenuToggle.propTypes = {
    isOpen: PropTypes.bool
}