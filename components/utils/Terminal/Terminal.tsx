import { useContext } from "react";
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
                "transition-all duration-75 rounded-default border-3 border-[#504e54] bg-[#2322256d] backdrop-blur-xl overflow-hidden w-full h-[600px]",
                error ? "error" : ""
            )}
        >
            <div className="bg-[#2a2831] font-space h-20 text-2xl flex items-center border-b-1 border-b-black">
                <div className="flex gap-3 p-5 self-start">
                    <div className="bg-[#ff5f56] w-5 h-5 rounded-full" />
                    <div className="bg-[#ffbd2e] w-5 h-5 rounded-full" />
                    <div className="bg-[#27c93f] w-5 h-5 rounded-full" />
                </div>
                <div className="flex-grow text-center">tic://cheatsheets</div>
            </div>
            <div className="flex h-[520px]">
                <div className="bg-[#242229] p-5 font-space">
                    <div className="text-xl mb-3">
                        <i className="fa-solid fa-chevron-down mr-3"></i>
                        CHEATSHEETS
                    </div>
                    <ul className="text-lg list-none pl-3 pb-16 w-60">
                        {cheatsheets.map((c) => (
                            <li
                                key={c.slug}
                                className="flex gap-2 items-center text-xl py-1 px-2 hover:bg-[#2a2831] cursor-pointer"
                            >
                                <img
                                    src={`/assets/images/${c.slug}.svg`}
                                    alt={`${c.slug} logo`}
                                    width="18"
                                    height="18"
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
