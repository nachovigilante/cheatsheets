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
            <div className="relative z-20 p-0 3xl:max-w-[1200px] 2xl:max-w-[1000px] xl:max-w-[900px] lg:max-w-[800px] md:max-w-[640px] sm:max-w-[450px] max-w-[320px] m-auto">
                <Head>
                    <title>{"<TIC_Cheatsheets/>"}</title>
                </Head>
                <section className="flex justify-start items-center lg:pl-20 2xl:pl-0 md:pl-10 sm:pl-8">
                    <div className="relative xl:h-screen lg:h-[400px] md:h-[400px] sm:h-[350px] h-[300px] xl:mt-0 lg:mt-20 flex flex-col justify-center z-20 items-start">
                        <h1 className="flex lg:gap-5 sm:gap-2 flex-col 3xl:text-9xl 2xl:text-8xl xl:text-7xl lg:text-6xl md:text-5xl text-4xl relative z-20 font-raleway font-black w-full drop-shadow-md">
                            <span>TIC</span>
                            <span className="underline 2xl:underline-offset-[20px] xl:underline-offset-[15px] lg:underline-offset-[12px] md:underline-offset-[8px]">
                                CHEATSHEETS
                            </span>
                        </h1>
                        <a
                            href="#terminal"
                            className="2xl:text-xl lg:text-lg md:text-sm sm:text-xs text-[10px] font-space font-semibold xl:mt-20 lg:mt-16 md:mt-12 sm:mt-8 mt-6 relative z-20 no-ligature bg-black/20 border sm:px-4 sm:py-2 px-2 py-2 rounded-lg self-start hover:bg-black/30"
                        >
                            {"> Ir a la terminal"}
                        </a>
                        <img
                            src="/assets/images/notebook.png"
                            className="absolute top-30 3xl:left-[480px] 2xl:left-[400px] xl:left-[380px] lg:left-[300px] md:left-[250px] sm:left-[170px] left-[130px] lg:w-[380px] md:w-[320px] sm:w-[250px] 3xl:w-[800px] 2xl:w-[600px] xl:w-[400px] w-[200px] drop-shadow-notebook"
                            alt="notebook"
                        />
                    </div>
                </section>
                <Section className="xl:my-40 md:my-24 mb-16">
                    <Glassbox
                        className="2xl:max-w-4xl xl:max-w-[800px] lg:max-w-[600px] max-w-full"
                        containerClassName="2xl:gap-5 xl:gap-3 gap-2 2xl:py-10 2xl:px-9 xl:py-8 xl:px-7 py-6 px-5"
                    >
                        <div className="flex justify-between">
                            <h2 className="3xl:text-3xl 2xl:text-2xl xl:text-xl text-lg font-space font-medium no-ligature">
                                {"¿Qué es <TIC_Cheatsheets />?"}
                            </h2>
                            <a
                                href="https://github.com/nachovigilante/cheatsheets"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="3xl:w-10 3xl:h-10 2xl:w-9 2xl:h-9 lg:h-9 lg:w-9 md:h-7 md:w-7 sm:w-5 sm:h-5 bg-github bg-contain bg-no-repeat bg-center rounded-full mr-4"
                                aria-label="Repositorio en GitHub"
                            />
                        </div>
                        <p className="3xl:text-xl xl:text-base md:text-sm text-xs font-space font-extralight mt-3">
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
                            <p className="3xl:text-xl 2xl:text-lg xl:text-base md:text-sm text-xs font-space font-extralight">
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
                <Section className="xl:mb-40 mb-16" id="terminal">
                    <Terminal cheatsheets={cheatsheets} />
                </Section>
            </div>
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
