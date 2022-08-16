import type { NextPage } from "next";
import styles from "./index.module.scss";
import Head from "next/head";
import Sheet from "../components/utils/Sheet";

const Home: NextPage = () => {
    return (
        <div className={[styles["home"], "container"].join(" ")}>
            <Head>
                <title>TIC Cheatsheets</title>
            </Head>
            <h1>Bienvenidos al repositorio de cheatsheets de TIC</h1>
            <p>
                En esta web se encuentra una colección de &quot;hojas de
                trucos&quot; a las que se puede recurrir a la hora de programar
                en cualquiera de los lenguajes disponibles.
            </p>
            <p>
                La idea es que éste sea de realización colectiva, es decir, que
                todos (tanto profesores como alumnos) puedan hacer su aporte a
                los cheatsheets, con el objetivo de aumentar la calidad y
                cantidad de información.
            </p>
        </div>
    );
};

export default Home;
