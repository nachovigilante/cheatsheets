import { useContext } from "react";

import MoonIcon from "../../public/assets/icons/Moon.svg";
import SunIcon from "../../public/assets/icons/Sun.svg";
import { ThemeContext } from "../../contexts/ThemeContext";

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
            <div
                className={twMerge(
                    theme === "dark" && "border-transparent",
                    "h-7 w-12 rounded-full bg-transparent flex items-center justify-between overflow-hidden theme-border"
                )}
            >
                {/* <div
                    className={twMerge(
                        theme !== "dark" && "flex-grow-0",
                        "h-full transition-[flex-grow_0.3s_ease] rounded-[15px] flex-grow bg-doc"
                    )}
                />
                <div
                    className={twMerge(
                        "h-full transition-[flex-grow_0.3s_ease] rounded-[15px] flex-grow w-3",
                        theme === "dark" && "flex-grow-0 w-0"
                    )}
                /> */}
            </div>
            <div
                className={twMerge(
                    "w-5 h-5 rounded-full absolute ml-1 transition-[margin_0.3s_ease] flex items-center justify-center shadow-lg bg-doc",
                    theme === "dark" && "ml-6"
                )}
            >
                {theme === "dark" ? (
                    <MoonIcon
                        height="15px"
                        width="15px"
                        viewBox="0 0 25 25"
                        fill="#170c60"
                    />
                ) : (
                    <SunIcon
                        height="15px"
                        width="15px"
                        viewBox="1 -1 25 25"
                        fill="#170c60"
                    />
                )}
            </div>
        </div>
    );
};

export default ThemeSwitch;
