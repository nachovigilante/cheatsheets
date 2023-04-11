import { useEffect, useState } from "react";

const getCurrentSize = () => {
    if (typeof window !== "undefined") {
        return {
            width: window.innerWidth,
            height: window.innerHeight,
        };
    }
    return {
        width: 0,
        height: 0,
    };
};

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState(getCurrentSize);

    useEffect(() => {
        window.addEventListener("resize", () =>
            setWindowSize(getCurrentSize())
        );

        return () => {
            window.removeEventListener("resize", () =>
                setWindowSize(getCurrentSize())
            );
        };
    }, []);

    return windowSize;
};
