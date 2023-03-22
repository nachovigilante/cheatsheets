import { useContext, useRef, useState } from "react";
import { TerminalContext } from "../../../contexts/TerminalContext";
import { CheatsheetType } from "../../../pages";
import { AutocompleteCommand, AutocompleteFile } from "./Autocomplete";
import useCommandList from "./useCommandList";

const Command = ({
    index,
    initialCommand,
    active,
    cheatsheets,
}: {
    initialCommand: string;
    index: number;
    active: boolean;
    cheatsheets: CheatsheetType[];
}) => {
    const [copyCommand, setCopyCommand] = useState(index);
    const [text, setText] = useState(initialCommand);
    const [currentCommand, setCurrentCommand] = useState("");

    const {
        triggerError,
        addCommand,
        changeCommand,
        repeatCommand,
        clearCommands,
    } = useContext(TerminalContext);

    const commandList = useCommandList(clearCommands, cheatsheets, index);

    const containerRef = useRef<HTMLDivElement>(null);

    const addResponse = (content: string) => {
        const response = document.createElement("div");
        response.className = "text-[#9FEA18] font-normal";
        response.innerHTML = content;
        containerRef.current?.appendChild(response);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const input = e.target as HTMLInputElement;
        let params = input.value.split(" ");

        if (e.key === "Tab") {
            e.preventDefault();
            const value = input.value;
            const command = Object.keys(commandList).find((c) =>
                c.startsWith(value)
            );
            if (command) {
                input.value = command;
                changeCommand(command, index);
                setCurrentCommand(command);
            } else {
                setText("");
            }
        } else if (e.key === "Enter") {
            const value = input.value;
            const command = Object.keys(commandList).find(
                (c) => c === value.split(" ")[0]
            );
            if (command) {
                const { type, content, slug, preventAdd } =
                    commandList[command];
                if (!slug && !Object.keys(commandList).includes(command)) {
                    triggerError();
                    return;
                }

                if (type === "text") {
                    addResponse(content);
                    addCommand();
                } else if (type === "action") {
                    if (typeof content === "function") {
                        if (slug) {
                            if (cheatsheets.find((c) => c.slug === params[1])) {
                                changeCommand(value, index);
                                setCurrentCommand(value);
                                content(params[1]);
                                if (!preventAdd) addCommand();
                            } else triggerError();
                        } else {
                            changeCommand(value, index);
                            setCurrentCommand(value);
                            content();
                            if (!preventAdd) addCommand();
                        }
                    }
                }
            } else {
                triggerError();
            }
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (copyCommand === 0) return;
            input.value = repeatCommand(copyCommand - 1);
            setCopyCommand(copyCommand - 1);
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (copyCommand === index) return;
            input.value = repeatCommand(copyCommand + 1);
            setCopyCommand(copyCommand + 1);
        } else if (e.key === "l" && e.ctrlKey) {
            e.preventDefault();
            clearCommands();
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target as HTMLInputElement;
        setText(input.value);
    };

    return (
        <div
            className="flex gap-3 items-start text-xl py-[2px] font-mono flex-col justify-center relative"
            ref={containerRef}
        >
            <div className="text-[#ED57EC] font-medium">
                ~/ORT/TIC/cheatsheets{" "}
                <span className="text-[#9FEA18] font-normal">git:</span>
                <span className="text-[#E9D2F4] font-normal">(main)</span>
            </div>
            <div>
                <span className="mr-3">{">"}</span>
                <input
                    type="text"
                    className="absolute bg-transparent outline-none font-normal"
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    autoFocus={active}
                    disabled={!active}
                    defaultValue={initialCommand}
                />
                <AutocompleteCommand
                    content={text}
                    list={Object.keys(commandList)}
                />
                {currentCommand === "open" || currentCommand === "export" ? (
                    <AutocompleteFile
                        content={text}
                        list={[...cheatsheets.map((c) => c.slug)]}
                    />
                ) : null}
            </div>
        </div>
    );
};

export default Command;
