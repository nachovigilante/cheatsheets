import { useRef, useState } from "react";
import { CheatsheetType } from "../../pages";

type TerminalProps = {
    cheatsheets: CheatsheetType[];
};

const openGithub = () => {
    window.open("https://github.com/nachovigilante/cheatsheets", "_blank");
};

const commands = {
    about: {
        type: "text",
        content: "TIC Cheatsheets",
    },
    help: {
        type: "text",
        content: "Comandos posibles: about, help, github, open, export",
    },
    github: {
        type: "action",
        content: openGithub,
    },
    open: {
        type: "text",
        content: "Abrir un cheatsheet",
    },
};

const Command = () => {
    const autocompleteRef = useRef<HTMLSpanElement>(null);
    const [autocompleteValue, setAutocompleteValue] = useState("");

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const input = e.target as HTMLInputElement;
        const value = input.value;
        if (value === "") {
            setAutocompleteValue("");
            return;
        }

        if (e.key === "Enter") {
            // TODO
        } else if (e.key === "Tab") {
            e.preventDefault();
            const command = Object.keys(commands).find((c) =>
                c.startsWith(value)
            );
            input.value = command;
        } else {
            const command = Object.keys(commands).find((c) =>
                c.startsWith(value)
            );

            if (command) {
                setAutocompleteValue(command);
            } else {
                setAutocompleteValue("");
            }
        }
    };

    return (
        <div className="flex gap-3 items-start text-xl py-[2px] font-mono flex-col justify-center">
            <div className="text-[#ED57EC] font-medium">
                ~/ORT/TIC/cheatsheets{" "}
                <span className="text-[#9FEA18] font-normal">git:</span>
                <span className="text-[#E9D2F4] font-normal">(main)</span>
            </div>
            <div>
                <span>{"> "}</span>
                <span className="absolute text-white/40" ref={autocompleteRef}>
                    {autocompleteValue}
                </span>
                <input
                    type="text"
                    className="bg-transparent outline-none font-normal"
                    onKeyDown={handleKeyDown}
                />
            </div>
        </div>
    );
};

const Terminal = ({ cheatsheets }: TerminalProps) => {
    return (
        <div className="rounded-default border-3 border-[#504e54] bg-[#2322256d] backdrop-blur-xl overflow-hidden w-full h-[600px]">
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
                                className="flex gap-2 items-center text-xl py-[2px]"
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
                <div className="flex-grow flex flex-col px-1 pb-3 pt-1">
                    <div className="p-5 flex flex-col items-start gap-3 overflow-y-scroll terminal-scroll h-full">
                        <Command />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Terminal;
