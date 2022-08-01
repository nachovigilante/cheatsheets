import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { marked } from "marked";
import { useEffect } from "react";
import Head from "next/head";
const { highlight } = require("highlight.js");

type CheatsheetPageProps = {
    frontmatter: {
        title: string;
        image: string;
    };
    content: string;
};

const CheatsheetPage = ({
    frontmatter: { title, image },
    content,
}: CheatsheetPageProps) => {

    useEffect(() => {
        marked.setOptions({
            highlight: (code) => {
                return highlight(code).value;
            },
        });
    }, []);

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <img src={image} alt={title} />
            <h1 style={{ margin: "auto", width: "fit-content" }}>{title}</h1>
            <div
                className="cheatsheet"
                dangerouslySetInnerHTML={{ __html: marked(content) }}
            />
        </>
    );
};

export const getStaticPaths = async () => {
    const files = fs.readdirSync(path.join("cheatsheets"));

    const paths = files
        .map((file) => {
            const slug = file.replace(".md", "");

            return {
                params: {
                    slug,
                },
            };
        })
        .filter((p) => p.params.slug !== "index");

    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps = async ({ params: { slug } }) => {
    const markdownWithMeta = fs.readFileSync(
        path.join("cheatsheets", `${slug}.md`),
        "utf8"
    );

    const { data: frontmatter, content } = matter(markdownWithMeta);

    return {
        props: {
            frontmatter,
            content,
        } as CheatsheetPageProps,
    };
};

export default CheatsheetPage;
