import type { NextPage } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Head from "next/head";
import Cheatsheet, { CheatsheetType } from "../components/Cheatsheet";
import { useState } from "react";

const Loading = () => {
    return (
        <div>
            <h1>Loading...</h1>
        </div>
    );
}

const Home: NextPage = ({ cheatsheets }: { cheatsheets: CheatsheetType[] }) => {
const [loading, setLoading] = useState(false);

    return (
        <div>
            <Head>
                <title>Cheatsheets</title>
            </Head>
            <div className="container">
                {loading ? (
                    <Loading />
                ) : (
                    <ul className="list">
                        {cheatsheets.map((c) => (
                            <li key={c.slug}>
                                <Cheatsheet cheatsheet={c} onClick={() => setLoading(true)} />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
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

export default Home;
