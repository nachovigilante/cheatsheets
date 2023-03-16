import styles from "./Terminal.module.scss";

type TerminalProps = {
    title: string;
};

const Terminal = ({ title }: TerminalProps) => {
    return (
        <div className={styles.terminal}>
            <div className={styles.titleBar}>
                <div className={styles.buttons}>
                    <div className={styles.close}></div>
                    <div className={styles.minimize}></div>
                    <div className={styles.maximize}></div>
                </div>
                <div className={styles.title}>{title}</div>
            </div>
            <div className={styles.content}>
                <div className={styles.sideBar}>
                    <div className={styles.sideBarTitle}>CHEATSHEETS</div>
                    <ul className={styles.sideBarContent}>
                        <li>bash.md</li>
                        <li>css.md</li>
                        <li>git.md</li>
                        <li>html.md</li>
                        <li>js.md</li>
                        <li>node.md</li>
                        <li>php.md</li>
                        <li>python.md</li>
                        <li>react.md</li>
                        <li>sql.md</li>
                    </ul>
                </div>
                <div className={styles.mainContent}>{/* TODO */}</div>
            </div>
        </div>
    );
};

export default Terminal;
