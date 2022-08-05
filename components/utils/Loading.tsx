import styles from "./Loading.module.scss";
import Image from "next/image";

const Loading = () => {
    return (
        <div className={styles["loading"]}>
            <Image src="/assets/images/Logo-anim.gif" height="100" width="100" />
            <h1>Cargando...</h1>
        </div>
    );
};

export default Loading;
