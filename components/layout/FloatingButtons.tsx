import styles from "./FloatingButtons.module.scss";

const FloatingButtons = ({ children }: { children: React.ReactNode }) => {
    return (
        <div
            className={[styles["floating-buttons"], "floating-buttons"].join(
                " "
            )}
        >
            {children}
        </div>
    );
};

export default FloatingButtons;
