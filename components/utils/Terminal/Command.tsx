import { useRouter } from "next/router";
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
    const router = useRouter();

    const {
        triggerError,
        addCommand,
        changeCommand,
        repeatCommand,
        clearCommands,
    } = useContext(TerminalContext);

    const commandList = useCommandList(cheatsheets, router);
    const containerRef = useRef<HTMLDivElement>(null);

    const addResponse = (content: string) => {
        const response = document.createElement("div");
        response.className = "text-[#9FEA18] font-normal";
        response.innerHTML = content;
        containerRef.current?.appendChild(response);
    };

    const suggestCommand = (input: HTMLInputElement) => {
        const command = Object.keys(commandList).find((c) =>
            c.startsWith(input.value)
        );
        if (command) {
            input.value = command;
            changeCommand(command, index);
            setCurrentCommand(command);
        } else {
            setText("");
        }
    };

    const suggestFile = (input: HTMLInputElement) => {
        const [commandName, ...args] = input.value.split(" ");
        const command = commandList[commandName];

        if (!command) {
            triggerError();
            return;
        }

        if (command.type !== "action" && command.type !== "voidAction") {
            triggerError();
            return;
        }
        
        const file =
        (cheatsheets.find((f) => (f.slug + ".md").startsWith(args[0]))
                ?.slug as string);

        if (file) {
            input.value = `${commandName} ${file}.md`;
            changeCommand(`${commandName} ${file}.md`, index);
            setCurrentCommand(`${commandName} ${file}.md`);
        } else {
            triggerError();
        }
    };

    const parseCommand = (inputValue: string) => {
        const [commandName, ...args] = inputValue.split(" ");
        const command = commandList[commandName];

        if (!command) {
            triggerError();
            return;
        }

        if (command.args && command.args.length !== args.length) {
            triggerError();
            return;
        }

        if (!command.args && args.length > 0) {
            triggerError();
            return;
        }

        if (command.type === "voidAction") {
            let result: boolean;
            if (command.usesFileNames) {
                result = command.action(
                    ...args,
                    cheatsheets.map((c) => c.slug + ".md")
                ) as boolean;
            } else {
                result = command.action(...args) as boolean;
            }
            if (result) {
                addCommand();
            } else {
                triggerError();
            }
        } else if (command.type === "action") {
            addResponse(command.action(...args) as string);
            addCommand();
        } else if (command.type === "text") {
            addResponse(command.content);
            addCommand();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const input = e.target as HTMLInputElement;

        if (e.key === "Tab") {
            e.preventDefault();
            if (input.value.split(" ").length > 1) {
                suggestFile(input);
            } else {
                suggestCommand(input);
            }
        } else if (e.key === "Enter") {
            e.preventDefault();
            parseCommand(input.value);
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
            className="flex 2xl:gap-3 xl:gap-2 gap-1 items-start 2xl:text-xl xl:text-lg text-md py-[2px] font-mono flex-col justify-center relative"
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
                        list={[...cheatsheets.map((c) => c.slug + ".md")]}
                    />
                ) : null}
            </div>
        </div>
    );
};

export default Command;
