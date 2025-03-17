import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
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

const MenuToggle = ({ isOpen, setOpen }) => {

    const scope = useMenuAnimation(isOpen);
    const [isClosed, setClosed] = useState(false)

    const navItems = [
        { name: "Home", path: "/" },
        { name: "All Products", path: "allProducts" },
        { name: "Login", path: "login" },
        { name: "Sign Up", path: "signUp" },
    ];

    useEffect(() => {
        const timer = setTimeout(() => {
            setClosed(true);
        }, 900);

        if (isOpen) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }

        return () => {
            clearTimeout(timer);
            document.body.classList.remove("overflow-hidden");
        };

    }, [isOpen]);

    return (
        <div ref={scope}>
            <nav className={isClosed ? "bg-black absolute z-50 w-full md:w-80 md:rounded-r-lg pt-10 h-screen" : "hidden"}>
                <ul>
                    <li className='text-white text-center font-medium text-4xl py-10'>Deores</li>
                </ul>
                <ul className='flex flex-col gap-5'>
                    {
                        navItems.map(item => <li key={item.path} className="origin-left transform">
                            <NavLink onClick={() => setOpen(false)} to={item.path} className={({ isActive }) => isActive ? "bg-white block text-black px-3 py-1" : "px-3 py-1 text-white"}>{item.name}</NavLink>
                        </li>)
                    }
                </ul>
            </nav>
        </div>
    );
};

export default MenuToggle;

MenuToggle.propTypes = {
    isOpen: PropTypes.bool,
    setOpen: PropTypes.func,
}