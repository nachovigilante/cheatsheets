import ArrowIcon from "../../public/assets/icons/Arrow.svg";
import styles from "./Arrow.module.scss";

export const enum ArrowDirection {
    left = "left",
    up = "up",
    right = "right",
    down = "down",
}

const Arrow = ({ direction }: { direction: ArrowDirection }) => {
    return (
        <div className={[styles["arrow"], styles[direction]].join(" ")}>
            <ArrowIcon />
        </div>
    );
};

export default Arrow;
