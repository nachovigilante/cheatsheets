import Link from "next/link";
import { useContext, useRef } from "react";
import { twMerge } from "tailwind-merge";
import {
    TerminalContext,
    TerminalProvider,
} from "../../../contexts/TerminalContext";
import { CheatsheetType } from "../../../pages";
import Command from "./Command";
import Image from "next/image";
import { useWindowSize } from "usehooks-ts";

type TerminalProps = {
    cheatsheets: CheatsheetType[];
};

const Console = ({ cheatsheets }: TerminalProps) => {
    const { commands } = useContext(TerminalContext);

    return (
        <div className="flex-grow flex flex-col px-1 pb-3 pt-1">
            <div className="thin-scroll 2xl:p-5 xl:p-4 p-3 flex flex-col items-start 2xl:gap-3 gap-2 overflow-y-scroll overflow-x-hidden terminal-scroll h-full">
                {commands.map((c, i) => (
                    <Command
                        key={i}
                        index={i}
                        initialCommand={c}
                        active={c === commands[commands.length - 1]}
                        cheatsheets={cheatsheets}
                    />
                ))}
            </div>
        </div>
    );
};

const WindowHeader = () => {
    return (
        <div className="bg-[#2a2831] font-space 2xl:h-20 md:h-[70px] h-14 md:text-2xl sm:text-xl text-lg flex items-center border-b-1 border-b-black">
            <div className="flex md:gap-3 sm:gap-2 gap-1 2xl:p-5 sm:p-4 p-3 self-start">
                <div className="bg-[#ff5f56] 2xl:w-5 2xl:h-5 md:w-4 md:h-4 sm:h-3 sm:w-3 h-2 w-2 rounded-full" />
                <div className="bg-[#ffbd2e] 2xl:w-5 2xl:h-5 md:w-4 md:h-4 sm:h-3 sm:w-3 h-2 w-2 rounded-full" />
                <div className="bg-[#27c93f] 2xl:w-5 2xl:h-5 md:w-4 md:h-4 sm:h-3 sm:w-3 h-2 w-2 rounded-full" />
            </div>
            <div className="flex-grow text-center md:static absolute w-full xl:text-2xl md:text-lg text-base">
                tic://cheatsheets
            </div>
        </div>
    );
};

const Sidebar = ({ cheatsheets }: TerminalProps) => {
    const windowSize = useWindowSize();
    return (
        <div className="bg-[#242229] xl:p-5 p-4 pb-10 font-space hidden md:block">
            <div className="2xl:text-xl text-lg 2xl:mb-3 mb-2">
                <i className="fa-solid fa-chevron-down mr-3"></i>
                CHEATSHEETS
            </div>
            <ul className="list-none 2xl:w-60 xl:w-52 overflow-y-auto pl-3 max-h-full fade-bottom-scroll mb-10">
                {cheatsheets.map((c) => (
                    <li key={c.slug}>
                        <Link href={`/cheatsheet/${c.slug}`}>
                            <a className="flex gap-2 items-center 2xl:text-xl xl:text-lg text-md py-1 px-2 hover:bg-[#2a2831] cursor-pointer">
                                <Image
                                    src={
                                        c.frontmatter.image
                                            ? c.frontmatter.image
                                            : `/assets/images/${c.slug}.svg`
                                    }
                                    alt={`${c.slug} logo`}
                                    width={windowSize.width >= 1250 ? 20 : 16}
                                    height={windowSize.width >= 1250 ? 20 : 16}
                                />
                                <span>{c.slug}.md</span>
                            </a>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const Window = ({ cheatsheets }: TerminalProps) => {
    const { error } = useContext(TerminalContext);

    return (
        <div
            className={twMerge(
                "transition-all duration-75 rounded-default border-3 border-[#504e54] bg-[#2322256d] backdrop-blur-xl overflow-hidden w-full 2xl:h-[600px] h-[500px]",
                error ? "error" : ""
            )}
        >
            <WindowHeader />
            <div className="flex 2xl:h-[520px] h-[430px]">
                <Sidebar cheatsheets={cheatsheets} />
                <Console cheatsheets={cheatsheets} />
            </div>
        </div>
    );
};

const Terminal = ({ cheatsheets }: TerminalProps) => {
    return (
        <TerminalProvider>
            <Window cheatsheets={cheatsheets} />
        </TerminalProvider>
    );
};

export default Terminal;
