import fs from "fs";
import matter from "gray-matter";
import path from "path";
import Head from "next/head";
import "highlight.js/styles/github-dark.css";
import React, { useContext, useEffect } from "react";
import FloatingButton from "../../components/utils/FloatingButton";
import { LoadingContext } from "../../contexts/LoadingContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import router from "next/router";
import hljs from "highlight.js";
import marked from "marked-katex";
import katex from "katex";
import { twMerge } from "tailwind-merge";
import prisma from "./prismaHighlighter/prisma";

hljs.registerLanguage("prisma", prisma);

marked.setOptions({
    highlight: function (code, lang) {
        if (typeof lang === "undefined") {
            return hljs.highlightAuto(code).value;
        } else if (lang === "nohighlight") {
            return code;
        } else {
            return hljs.highlight(lang, code).value;
        }
    },
    kaTex: katex,
});

type CheatsheetPageProps = {
    frontmatter: {
        title: string;
        image: string;
    };
    content: string;
    slug: string;
};

const CheatsheetPage = ({
    frontmatter: { title, image },
    content,
    slug,
}: CheatsheetPageProps) => {
    const { setLoading } = useContext(LoadingContext);
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        router.events.on("routeChangeStart", () => setLoading(true));
        router.events.on("routeChangeComplete", () => setLoading(false));

        return () => {
            router.events.off("routeChangeStart", () => setLoading(true));
            router.events.off("routeChangeComplete", () => setLoading(false));
        };
    }, []);

    // console.log(slug);

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <div
                className={twMerge(
                    theme === "dark" ? "bg-dark-doc dark" : "bg-doc",
                    "text-doc-font xl:rounded-xl rounded-none m-auto xl:mb-20 mb-0 max-w-[1250px] pt-0 px-12 py-8 shadow-xl xl:mt-32 md:mt-20 mt-16 relative z-30"
                )}
            >
                <h1 className="px-10 py-3 m-auto my-0 max-w-full text-center select-none font-bold text-2xl">
                    {title}
                </h1>
                <div
                    className={twMerge(
                        theme === "dark" && "dark",
                        "cheatsheet"
                    )}
                    dangerouslySetInnerHTML={{
                        __html: marked(content),
                    }}
                />
            </div>
            <div className="fixed xl:bottom-10 xl:right-12 bottom-4 right-4 z-50 flex justify-center items-center xl:gap-3 gap-2 bg-transparent">
                <FloatingButton
                    onClick={() => window.scrollTo(0, 0)}
                    ariaLabel="Scroll to the top"
                >
                    <i className="fa-solid fa-arrow-up"></i>
                </FloatingButton>
                <FloatingButton
                    link={`/download/${slug}.pdf`}
                    ariaLabel="Download PDF"
                    download
                >
                    <i className="fa-solid fa-file-arrow-down"></i>
                </FloatingButton>
            </div>
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
            slug,
        } as CheatsheetPageProps,
    };
};

export default CheatsheetPage;
