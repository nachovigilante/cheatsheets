import Link from "next/link";
import React, { useState } from "react";
import styles from "./Header.module.scss";
import Logo from "../../public/assets/icons/Logo.svg";
import ThemeSwitch from "../utils/ThemeSwitch";
import { useRouter } from "next/router";
import Sidebar from "./Sidebar";

const NavBar = () => {
    const { pathname } = useRouter();

    return (
        <div className={styles["navbar"]}>
            <Link href="/">
                <a className={pathname === "/" ? styles["active"] : ""}>Home</a>
            </Link>
            <Link href="/cheatsheets">
                <a
                    className={
                        pathname === "/cheatsheets" ? styles["active"] : ""
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
    const [open, setOpen] = useState(false);

    return (
        <header className={styles["header"]}>
            <Link href="/">
                <a className={styles["home"]}>
                    <Logo height="45    " />
                    <h1>TIC Cheatsheets</h1>
                </a>
            </Link>
            {pathname === "/cheatsheet/[slug]" ? <ThemeSwitch /> : <NavBar />}
            {pathname !== "/cheatsheet/[slug]" ? <Sidebar open={open} setOpen={setOpen}/> : null}
            {pathname !== "/cheatsheet/[slug]" ? <button className={styles["menu"]} onClick={() => setOpen(true)}>Menu</button> : null}
        </header>
    );
};

export default Header;
