import type { NextPage } from "next";
import styles from "./index.module.scss";
import Head from "next/head";

const Home: NextPage = () => {
    return (
        <div className={[styles["home"], "container"].join(" ")}>
            <Head>
                <title>TIC Cheatsheets</title>
            </Head>
        </div>
    );
};

export default Home;
