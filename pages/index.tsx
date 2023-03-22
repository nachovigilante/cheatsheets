import type { NextPage } from "next";
import Head from "next/head";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import GitHubButton from "react-github-btn";
import Background from "../components/layout/Background";
import Terminal from "../components/utils/Terminal/Terminal";
import Glassbox from "../components/utils/Glassbox";
import Section from "../components/layout/Section";

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
            <div className="relative z-20 p-0 max-w-[1200px] m-auto">
                <Head>
                    <title>{"<TIC_Cheatsheets/>"}</title>
                </Head>
                <Section className="relative h-screen">
                    <h1 className="flex gap-5 -mt-28 flex-col text-9xl font-raleway font-black w-full items-start relative z-20 drop-shadow-md">
                        <span>TIC</span>
                        <span className="underline underline-offset-[20px]">
                            CHEATSHEETS
                        </span>
                    </h1>
                    <a
                        href="#terminal"
                        className="mt-14 text-xl font-space font-semibold no-ligature bg-black/20 border px-4 py-2 rounded-lg self-start hover:bg-black/30"
                    >
                        {"> Ir a la terminal"}
                    </a>
                    <img
                        src="/assets/images/notebook.png"
                        className="absolute top-40 right-0 w-[800px] drop-shadow-notebook"
                        alt="notebook"
                    />
                </Section>
                <Section className="my-40">
                    <Glassbox className="max-w-4xl">
                        <div className="flex justify-between">
                            <h2 className="text-3xl font-space font-medium no-ligature">
                                {"¿Qué es <TIC_Cheatsheets />?"}
                            </h2>
                            <a
                                href="https://github.com/nachovigilante/cheatsheets"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-github bg-contain bg-no-repeat bg-center rounded-full mr-4"
                                aria-label="Repositorio en GitHub"
                            />
                        </div>
                        <p className="text-xl font-space font-extralight mt-3">
                            En esta web se encuentra una colección de
                            &quot;hojas de trucos&quot; a las que se puede
                            recurrir a la hora de programar en cualquiera de los
                            lenguajes disponibles. La idea es que ésta sea de
                            realización colectiva, es decir, que todos (tanto
                            profesores como alumnos) puedan hacer su aporte a
                            los cheatsheets, con el objetivo de aumentar la
                            calidad y la cantidad de la información. Para
                            aportar algún cambio o un cheatsheet nuevo, es muy
                            importante que leas el README del repositorio.
                        </p>
                        <div className="flex justify-between">
                            <p className="text-xl font-space font-extralight">
                                Si este repositorio te sirve podés darle una
                                estrellita{" "}
                            </p>
                            <GitHubButton
                                href="https://github.com/nachovigilante/cheatsheets"
                                data-icon="octicon-star"
                                data-size="large"
                                data-show-count="true"
                                aria-label="Star nachovigilante/cheatsheets on GitHub"
                            >
                                Star
                            </GitHubButton>
                        </div>
                    </Glassbox>
                </Section>
                <Section className="mb-52" id="terminal">
                    <Terminal cheatsheets={cheatsheets} />
                </Section>
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
