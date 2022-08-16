import styles from "./Sheet.module.scss";

const Sheet = ({ width }: { width: number }) => {
    const innerStyle = { "--width": width + "px" } as React.CSSProperties;

    return (
        <div className={styles["sheet"]} style={innerStyle}>
            <div className={[styles["vertical"], styles["line"]].join(" ")} />
            <div className={[styles["vertical"], styles["line"]].join(" ")} />
            {Array.from({ length: 18 }, (_, i) => (
                <div
                    className={[styles["horizontal"], styles["line"]].join(" ")}
                />
            ))}
        </div>
    );
};

export default Sheet;
