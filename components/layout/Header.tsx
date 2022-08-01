import React from "react";
import styles from "./Header.module.scss";

const Header = ({ switchTheme }: { switchTheme: () => void }) => {
    return (
        <header className={styles["header"]}>
            <h1>Header</h1>
        </header>
    );
};

export default Header;
