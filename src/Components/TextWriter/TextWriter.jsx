import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from "react";

const TextWriter = ({ text, speed = 100 }) => {
    const [displayedText, setDisplayedText] = useState("");
    const textRef = useRef(null);
    const [trigger, setTrigger] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (textRef.current?.getBoundingClientRect().top < window.innerHeight) {
                setTrigger(true);
            }
        };
        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (!trigger) return;
        setDisplayedText("");
        let i = 0;
        const interval = setInterval(() => {
            setDisplayedText((prev) => text.slice(0, prev.length + 1));
            if (i++ >= text.length) clearInterval(interval);
        }, speed);
        return () => clearInterval(interval);
    }, [text, speed, trigger]);

    return <h3 ref={textRef}>{displayedText}</h3>;
};

export default TextWriter;

TextWriter.propTypes = {
    text: PropTypes.string,
    speed: PropTypes.number,
}