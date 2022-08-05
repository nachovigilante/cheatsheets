import type { NextPage } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Head from "next/head";
import Cheatsheet, { CheatsheetType } from "../components/Cheatsheet";
import { useState } from "react";
import Loading from "../components/utils/Loading";

const Home: NextPage = ({ cheatsheets }: { cheatsheets: CheatsheetType[] }) => {
    const [loading, setLoading] = useState(true);

    return (
        <div className="container">
            <Head>
                <title>TIC Cheatsheets</title>
            </Head>
            {loading ? (
                <Loading />
            ) : (
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
            )}
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
