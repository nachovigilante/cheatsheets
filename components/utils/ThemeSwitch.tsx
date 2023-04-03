import { useContext } from "react";

import MoonIcon from "../../public/assets/icons/Moon.svg";
import SunIcon from "../../public/assets/icons/Sun.svg";
import { ThemeContext } from "../../contexts/ThemeContext";

import styles from "./ThemeSwitch.module.scss";
import { twMerge } from "tailwind-merge";

const ThemeSwitch = () => {
    const { theme, setTheme } = useContext(ThemeContext)!;

    return (
        <div
            className="flex items-center cursor-pointer bg-transparent"
            onClick={() => {
                setTheme((theme) => (theme === "light" ? "dark" : "light"));
            }}
        >
            <div className="h-6 w-12 rounded-full bg-transparent flex items-center justify-between overflow-hidden shadow-sm">
                <div
                    className={twMerge(
                        "h-full transition-[flex-grow_0.3s_ease] rounded-[15px_0px_0px_15px] flex-grow-0 bg-[#0c043f]",
                        theme === "dark" && "flex-grow"
                    )}
                />
                <div
                    className={twMerge(
                        "h-full transition-[flex-grow_0.3s_ease] rounded-[0px_15px_15px_0px] flex-grow bg-doc w-3",
                        theme === "dark" && "flex-grow-0 w-3"
                    )}
                />
            </div>
            <div
                className={twMerge(
                    "w-7 h-7 rounded-full absolute ml-0 bg-doc transition-[margin_0.3s_ease] flex items-center justify-center shadow-sm",
                    theme === "dark" && "ml-6 bg-dark-doc"
                )}
            >
                {theme === "dark" ? (
                    <MoonIcon height="17px" width="17px" viewBox="0 0 25 25" />
                ) : (
                    <SunIcon height="17px" width="17px" viewBox="1 -1 25 25" fill="white" />
                )}
            </div>
        </div>
    );
};

export default ThemeSwitch;
