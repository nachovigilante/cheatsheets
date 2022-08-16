import type { NextPage } from "next";
import styles from "./index.module.scss";
import Head from "next/head";

const Home: NextPage = () => {
    return (
        <div className={[styles["home"], "container"].join(" ")}>
            <Head>
                <title>TIC Cheatsheets</title>
            </Head>
            <h1>Bienvenidos al repositorio de cheatsheets de TIC</h1>
            <p>
                En esta web se encuentra una colección de{" "}
                <strong>&quot;hojas de trucos&quot;</strong> a las que se puede
                recurrir a la hora de programar en cualquiera de los lenguajes
                disponibles.
            </p>
            <p>
                La idea es que éste sea de realización colectiva, es decir, que
                todos (tanto profesores como <strong>alumnos</strong>) puedan
                hacer su aporte a los cheatsheets, con el objetivo de aumentar
                la calidad y la cantidad de información.
            </p>

            <h2>Aportes</h2>

            <p>
                Para aportar algún cambio o un cheatsheet nuevo, es{" "}
                <strong>muy importante</strong> que leas el{" "}
                <a
                    href="https://github.com/nachovigilante/cheatsheets#readme"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    README
                </a>{" "}
                del repositorio.
            </p>

            <h2>Estrellas</h2>

            <p>
                Si te fue útil este repositorio dale una estrella{" "}
                <a
                    href="https://github.com/nachovigilante/cheatsheets"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    acá
                </a>
                .
            </p>
            <div className={styles["star"]}>
                <div className={styles["image"]} />
                <h2> ----&gt; </h2>
                <div className={styles["image"]} />
            </div>
        </div>
    );
};

export default Home;
