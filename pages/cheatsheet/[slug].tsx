import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { marked } from "marked";
import Head from "next/head";
const { highlightAuto } = require("highlight.js");
import "highlight.js/styles/github-dark.css";
import React, { useContext, useEffect } from "react";
import FloatingButton from "../../components/utils/FloatingButton";
import Arrow, { ArrowDirection } from "../../components/utils/Arrow";
import { LoadingContext } from "../../contexts/LoadingContext";
import router from "next/router";
import hljs from "highlight.js";

marked.setOptions({
    langPrefix: "hljs language-",
    //highlight: (code) => {
    //    return highlightAuto(code).value;
    //},
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
    const { setLoading } = useContext(LoadingContext);

    router.events.on("routeChangeStart", () => setLoading(true));
    router.events.on("routeChangeComplete", () => setLoading(false));

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <div className="doc">
                <h1>{title}</h1>
                <div
                    className="cheatsheet"
                    dangerouslySetInnerHTML={{ __html: marked(content) }}
                    ref={(el) => {
                        if (el) {
                            el.querySelectorAll<HTMLElement>(
                                "pre code"
                            ).forEach((block) => {
                                hljs.highlightElement(block);
                            });
                        }
                    }}
                />
            </div>
            <FloatingButton onClick={() => window.scrollTo(0, 0)}>
                <Arrow direction={ArrowDirection.up} />
            </FloatingButton>
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
