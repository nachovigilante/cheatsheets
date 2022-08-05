import { useContext } from "react";

import MoonIcon from "../../public/assets/icons/Moon.svg";
import SunIcon from "../../public/assets/icons/Sun.svg";
import { ThemeContext } from "../../contexts/ThemeContext";

import styles from "./ThemeSwitch.module.scss";

const ThemeSwitch = () => {
    const { theme, setTheme } = useContext(ThemeContext)!;

    return (
        <div
            className={[styles["switch"], theme === "dark" ? styles["on"] : ""].join(" ")}
            onClick={() => {
                setTheme((theme) => (theme === "light" ? "dark" : "light"));
            }}
        >
            <div className={["shadow-small", styles["switch-body"]].join(" ")}>
                <div className={styles["dark"]}></div>
                <div className={styles["light"]}></div>
            </div>
            <div className={styles["switch-circle"]}>
                {theme === "dark" ? (
                    <MoonIcon height="17px" width="17px" viewBox="0 0 25 25" />
                ) : (
                    <SunIcon height="17px" width="17px" viewBox="1 -1 25 25" />
                )}
            </div>
        </div>
    );
};

export default ThemeSwitch;
