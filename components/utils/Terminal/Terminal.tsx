import { useContext, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import {
    TerminalContext,
    TerminalProvider,
} from "../../../contexts/TerminalContext";
import { CheatsheetType } from "../../../pages";
import Command from "./Command";

type TerminalProps = {
    cheatsheets: CheatsheetType[];
};

const Console = ({ cheatsheets }: TerminalProps) => {
    const { commands } = useContext(TerminalContext);

    return (
        <div className="flex-grow flex flex-col px-1 pb-3 pt-1">
            <div className="p-5 flex flex-col items-start gap-3 overflow-y-scroll terminal-scroll h-full">
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

const Window = ({ cheatsheets }: TerminalProps) => {
    const { error } = useContext(TerminalContext);

    return (
        <div
            className={twMerge(
                "transition-all duration-75 rounded-default border-3 border-[#504e54] bg-[#2322256d] backdrop-blur-xl overflow-hidden w-full 2xl:h-[600px] h-[500px]",
                error ? "error" : ""
            )}
        >
            <div className="bg-[#2a2831] font-space 2xl:h-20 h-[70px] text-2xl flex items-center border-b-1 border-b-black">
                <div className="flex gap-3 2xl:p-5 p-4 self-start">
                    <div className="bg-[#ff5f56] 2xl:w-5 2xl:h-5 w-4 h-4 rounded-full" />
                    <div className="bg-[#ffbd2e] 2xl:w-5 2xl:h-5 w-4 h-4 rounded-full" />
                    <div className="bg-[#27c93f] 2xl:w-5 2xl:h-5 w-4 h-4 rounded-full" />
                </div>
                <div className="flex-grow text-center">tic://cheatsheets</div>
            </div>
            <div className="flex 2xl:h-[520px] h-[430px]">
                <div className="bg-[#242229] p-5 font-space pb-16">
                    <div className="2xl:text-xl text-lg 2xl:mb-3 mb-2">
                        <i className="fa-solid fa-chevron-down mr-3"></i>
                        CHEATSHEETS
                    </div>
                    <ul className="list-none w-60 overflow-y-auto pb-10 pl-3 max-h-full fade-bottom-scroll">
                        {cheatsheets.map((c) => (
                            <li
                                key={c.slug}
                                className="flex gap-2 items-center 2xl:text-xl text-lg py-1 px-2 hover:bg-[#2a2831] cursor-pointer"
                            >
                                <img
                                    src={`/assets/images/${c.slug}.svg`}
                                    alt={`${c.slug} logo`}
                                    className="h-5 w-5"
                                />
                                <span>{c.slug}.md</span>
                            </li>
                        ))}
                    </ul>
                </div>
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
