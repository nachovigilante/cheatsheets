import Link from "next/link";
import React from "react";
import styles from "./Header.module.scss";
import Logo from "../../public/assets/icons/Logo.svg";
import ThemeSwitch from "../utils/ThemeSwitch";
import { useRouter } from "next/router";

const NavBar = () => {
    const router = useRouter();
    return (
        <div className={styles["navbar"]}>
            <Link href="/">
                <a className={router.pathname === "/" ? styles["active"] : ""}>
                    Home
                </a>
            </Link>
            <Link href="/cheatsheets">
                <a
                    className={
                        router.pathname === "/cheatsheets"
                            ? styles["active"]
                            : ""
                    }
                >
                    Cheatsheets
                </a>
            </Link>
            <a
                href="https://github.com/nachovigilante/cheatsheets"
                target="_blank"
                rel="noopener noreferrer"
                className={styles["github-link"]}
                aria-label="Repositorio en GitHub"
            />
        </div>
    );
};

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
            {pathname === "/cheatsheet/[slug]" ? <ThemeSwitch /> : <NavBar />}
        </header>
    );
};

export default Header;
