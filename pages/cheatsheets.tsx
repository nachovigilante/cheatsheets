import type { NextPage } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Head from "next/head";
import Cheatsheet, { CheatsheetType } from "../components/Cheatsheet";
import { useContext } from "react";
import { LoadingContext } from "../contexts/LoadingContext";
import router from "next/router";

const CheatsheetList = ({ cheatsheets }: { cheatsheets: CheatsheetType[] }) => {
    const { setLoading } = useContext(LoadingContext);
    return (
        <ul className="list">
            {cheatsheets.map((c) => (
                <li key={c.slug}>
                    <Cheatsheet
                        cheatsheet={c}
                        onClick={() => setLoading(true)}
                    />
                </li>
            ))}
        </ul>
    );
};

const Cheatsheets: NextPage = ({
    cheatsheets,
}: {
    cheatsheets: CheatsheetType[];
}) => {
    const { setLoading } = useContext(LoadingContext);

    router.events.on("routeChangeStart", () => setLoading(true));
    router.events.on("routeChangeComplete", () => setLoading(false));

    return (
        <div className="container">
            <Head>
                <title>TIC Cheatsheets</title>
            </Head>
            <CheatsheetList cheatsheets={cheatsheets} />
        </div>
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

export default Cheatsheets;
