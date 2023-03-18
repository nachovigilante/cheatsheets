import type { NextPage } from "next";
import styles from "./index.module.scss";
import Head from "next/head";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Background from "../components/layout/Background";
import Terminal from "../components/utils/Terminal";

export type CheatsheetType = {
    slug: string;
    frontmatter: {
        title: string;
        image: string;
    };
};

const Home: NextPage = ({ cheatsheets }: { cheatsheets: CheatsheetType[] }) => {
    return (
        <>
            <div className={[styles["home"], "container"].join(" ")}>
                <Head>
                    <title>TIC Cheatsheets</title>
                </Head>

                <Terminal cheatsheets={cheatsheets} />
            </div>
            <Background />
        </>
    );
};

export const getStaticProps = async () => {
    const files = fs.readdirSync(path.join("cheatsheets"));

    const cheatsheets = files.map((file) => {
        const slug = file.replace(".md", "");

        const markdownWithMeta = fs.readFileSync(
            path.join("cheatsheets", file),
            "utf8"
        );

        const { data: frontmatter } = matter(markdownWithMeta);

        return {
            slug,
            frontmatter,
        } as CheatsheetType;
    });

    return {
        props: {
            cheatsheets,
        },
    };
};

export default Home;
