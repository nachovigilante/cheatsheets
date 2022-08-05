import styles from "./Loading.module.scss";
import Image from "next/image";
import { useContext } from "react";
import { LoadingContext } from "../../contexts/LoadingContext";

const Loading = () => {
    const { loading } = useContext(LoadingContext);

    return (
        <div
            className={[styles["loading"], loading ? styles["show"] : ""].join(
                " "
            )}
        >
            <Image
                src="/assets/images/Logo-anim.gif"
                height="100"
                width="100"
            />
            <h1>Cargando...</h1>
        </div>
    );
};

export default Loading;
