import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { marked } from "marked";
import Head from "next/head";
const { highlightAuto } = require("highlight.js");
import "highlight.js/styles/github-dark.css";
import React from "react";

marked.setOptions({
    langPrefix: "hljs language-",
    highlight: (code) => {
        return highlightAuto(code).value;
    },
});

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
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            {/* <img src={image} alt={title} /> */}
            <h1
                style={{
                    padding: "40px 10px",
                    margin: "0 auto",
                    maxWidth: "1100px",
                    textAlign: "center",
                    backgroundColor: "var(--doc-bg-color)",
                    color: "var(--doc-font-color)",
                    marginTop: "calc(var(--header-height) + 50px)",
                }}
            >
                {title}
            </h1>
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
