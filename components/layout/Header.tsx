import Link from "next/link";
import React, { useState } from "react";
import styles from "./Header.module.scss";
import Logo from "../../public/assets/icons/Logo.svg";
import ThemeSwitch from "../utils/ThemeSwitch";
import { useRouter } from "next/router";
import Sidebar from "./Sidebar";

const MenuButton = ({
    open,
    onClick,
}: {
    open: boolean;
    onClick: () => void;
}) => {
    const { pathname } = useRouter();

    return (
        <div
            className={[
                styles["menu"],
                open ? styles["active"] : "",
                pathname === "/cheatsheet/[slug]" ? styles["cheatsheet"] : "",
            ].join(" ")}
            onClick={onClick}
        >
            <div className={styles["line"]} />
            <div className={styles["line"]} />
            <div className={styles["line"]} />
        </div>
    );
};

const NavBar = () => {
    const { pathname } = useRouter();

    return (
        <div
            className={[
                styles["navbar"],
                pathname === "/cheatsheet/[slug]" ? styles["cheatsheet"] : "",
            ].join(" ")}
        >
            <Link href="/">
                <a className={pathname === "/" ? styles["active"] : ""}>
                    <i className="fa-solid fa-house"></i> Home
                </a>
            </Link>
            <Link href="/cheatsheets">
                <a
                    className={
                        pathname === "/cheatsheets" ? styles["active"] : ""
                    }
                >
                    <i className="fa-solid fa-file-lines"></i> Cheatsheets
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
            <div className={styles["right"]}>
                <NavBar />
                {pathname === "/cheatsheet/[slug]" ? <ThemeSwitch /> : null}
                <Sidebar open={open} setOpen={setOpen} />
                <MenuButton onClick={() => setOpen((o) => !o)} open={open} />
            </div>
        </header>
    );
};

export default Header;
