import Link from "next/link";
import React from "react";
import styles from "./Header.module.scss";

const Header = ({ switchTheme }: { switchTheme: () => void }) => {
    return (
        <header className={styles["header"]}>
            <Link href="/">
                <a>
                    <h1>Cheatsheets</h1>
                </a>
            </Link>
        </header>
    );
};

export default Header;
