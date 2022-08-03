import ArrowIcon from "../../public/icons/arrow.svg";
import styles from "./Arrow.module.scss";

export const enum ArrowDirection {
    left = "left",
    up = "up",
    right = "right",
    down = "down",
}

const Arrow = ({ direction }: { direction: ArrowDirection }) => {
    console.log(direction);

    return (
        <div className={[styles["arrow"], styles[direction]].join(" ")}>
            <ArrowIcon />
        </div>
    );
};

export default Arrow;
