import Link from "next/link";
import React from "react";
import styles from "./Header.module.scss";
import Logo from "../../public/assets/icons/Logo.svg";
import ThemeSwitch from "../utils/ThemeSwitch";
import { useRouter } from "next/router";

const Header = () => {
    const { pathname } = useRouter();

    return (
        <header className={styles["header"]}>
            <Link href="/">
                <a className={styles["home"]}>
                    <Logo height="45    " />
                    <h1>TIC Cheatsheets</h1>
                </a>
            </Link>
            {pathname === "/cheatsheet/[slug]" ? <ThemeSwitch /> : null}
        </header>
    );
};

export default Header;
