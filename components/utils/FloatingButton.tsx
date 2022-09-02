import styles from "./FloatingButton.module.scss";

const FloatingButton = ({
    onClick,
    children,
    ariaLabel,
    link,
    download,
}: {
    onClick?: () => void;
    children?: React.ReactNode;
    ariaLabel?: string;
    link?: string;
    download?: boolean;
}) => {
    return link ? (
        <a
            href={link}
            className={[styles["floating-button"], "floating-button"].join(" ")}
            aria-label={ariaLabel}
            download={download}
        >
            {children}
        </a>
    ) : (
        <button
            className={[styles["floating-button"], "floating-button"].join(" ")}
            onClick={onClick}
            aria-label={ariaLabel}
        >
            {children}
        </button>
    );
};

export default FloatingButton;
