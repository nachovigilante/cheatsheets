import Link from "next/link";
import styles from "./Sidebar.module.scss";
import { useRouter } from "next/router";

const Sidebar = ({
    open,
    setOpen,
}: {
    open: boolean;
    setOpen: (boolean) => void;
}) => {
    const { pathname } = useRouter();

    return (
        <div
            className={[styles["sidebar"], open ? styles["open"] : ""].join(
                " "
            )}
        >
            <div className={styles["sidebar-header"]}>
                <h1>Menú</h1>
                <button
                    className={styles["close"]}
                    onClick={() => setOpen(false)}
                >
                    Close
                </button>
            </div>
            <nav className={styles["sidebar-nav"]}>
                <Link href="/">
                    <a className={pathname === "/" ? styles["active"] : ""}>
                        Home
                    </a>
                </Link>
                <div className={styles["divisor"]} />
                <Link href="/cheatsheets">
                    <a
                        className={
                            pathname === "/cheatsheets" ? styles["active"] : ""
                        }
                    >
                        Cheatsheets
                    </a>
                </Link>
                <div className={styles["divisor"]} />
                <a
                    className={styles["github-link"]}
                    href="https://github.com/nachovigilante/cheatsheets"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Repositorio en GitHub"
                />
            </nav>
        </div>
    );
};

export default Sidebar;
