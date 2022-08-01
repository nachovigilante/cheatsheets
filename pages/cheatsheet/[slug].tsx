import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { marked } from "marked";

type CheatsheetPageProps = {
    frontmatter: {
        title: string;
        image: string;
    };
    slug: string;
    content: string;
};

const CheatsheetPage = ({
    frontmatter: { title, image },
    slug,
    content,
}: CheatsheetPageProps) => {
    return (
        <>
            <img src={image} alt={title} />
            <div dangerouslySetInnerHTML={{ __html: marked(content) }} />
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
            slug,
            content,
        } as CheatsheetPageProps,
    };
};

export default CheatsheetPage;
