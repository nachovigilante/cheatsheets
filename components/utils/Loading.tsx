import styles from "./Loading.module.scss";

const Loading = () => {
    return (
        <div className={styles["loading"]}>
            <div className={styles["loading-logo"]} />
            <h1>Cargando...</h1>
        </div>
    );
};

export default Loading;
