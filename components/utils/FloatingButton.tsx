import styles from "./FloatingButton.module.scss";

const FloatingButton = ({ onClick, children }: { onClick: () => void, children: React.ReactNode }) => {
    return (
        <button className={styles["floating-button"]} onClick={onClick} aria-label="Scroll to the top">
            {children}
        </button>
    );
};

export default FloatingButton;
