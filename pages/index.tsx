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
            <div className="relative z-20 p-0 3xl:max-w-[1200px] 2xl:max-w-[1000px] xl:max-w-[900px] lg:max-w-[800px] m-auto">
                <Head>
                    <title>{"<TIC_Cheatsheets/>"}</title>
                </Head>
                <section className="flex justify-start items-center lg:pl-20 2xl:pl-0">
                    <div className="relative 3xl:h-[800px] 2xl:h-[700px] xl:h-[600px] lg:h-[400px] xl:mt-0 lg:mt-20 flex flex-col justify-center z-20 items-start">
                        <h1 className="flex gap-5 flex-col 3xl:text-9xl 2xl:text-8xl xl:text-7xl lg:text-6xl relative z-20 font-raleway font-black w-full drop-shadow-md">
                            <span>TIC</span>
                            <span className="underline underline-offset-[20px]">
                                CHEATSHEETS
                            </span>
                        </h1>
                        <a
                            href="#terminal"
                            className="2xl:text-xl xl:text-lg font-space font-semibold mt-20 relative z-20 no-ligature bg-black/20 border px-4 py-2 rounded-lg self-start hover:bg-black/30"
                        >
                            {"> Ir a la terminal"}
                        </a>
                        <img
                            src="/assets/images/notebook.png"
                            className="absolute top-30 3xl:left-[480px] 2xl:left-[400px] xl:left-[380px] lg:left-[300px] lg:w-[380px] 3xl:w-[800px] 2xl:w-[600px] xl:w-[400px] drop-shadow-notebook"
                            alt="notebook"
                        />
                    </div>
                </section>
                <Section className="my-40">
                    <Glassbox className="2xl:max-w-4xl xl:max-w-[800px] lg:max-w-[600px]">
                        <div className="flex justify-between">
                            <h2 className="3xl:text-3xl 2xl:text-2xl xl:text-xl lg:text-base font-space font-medium no-ligature">
                                {"¿Qué es <TIC_Cheatsheets />?"}
                            </h2>
                            <a
                                href="https://github.com/nachovigilante/cheatsheets"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="3xl:w-10 3xl:h-10 2xl:w-9 2xl:h-9 bg-github bg-contain bg-no-repeat bg-center rounded-full mr-4"
                                aria-label="Repositorio en GitHub"
                            />
                        </div>
                        <p className="3xl:text-xl xl:text-base lg:text-sm font-space font-extralight mt-3">
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
                        <div className="flex justify-between items-center">
                            <p className="3xl:text-xl 2xl:text-lg xl:text-base lg:text-sm font-space font-extralight">
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
