import Link from "next/link";
import React from "react";
import styles from "./Header.module.scss";
import ThemeSwitch from "../utils/ThemeSwitch";
import { useRouter } from "next/router";

const Header = () => {
    const { pathname } = useRouter();

    return (
        <header className={styles["header"]}>
            <Link href="/">
                <a>
                    <h1>Cheatsheets</h1>
                </a>
            </Link>
            {pathname === "/cheatsheet/[slug]" ? <ThemeSwitch /> : null}
        </header>
    );
};

export default Header;
