import { createContext, useState, useEffect } from "react";

type TerminalContextType = {
    error: boolean;
    triggerError: () => void;
    errorMsg: string;
    addCommand: () => void;
    changeCommand: (newCommand: string, i: number) => void;
    repeatCommand: (i: number) => string;
    clearCommands: () => void;
    commands: string[];
};

export const TerminalContext = createContext(
    null as null | TerminalContextType
);

export const TerminalProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [commands, setCommands] = useState([""]);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const addCommand = () => {
        setCommands([...commands, ""]);
        setErrorMsg("");
    };

    const clearCommands = () => {
        setCommands([]);
        setTimeout(() => {
            setCommands([""]);
        }, 100);
    };
    const repeatCommand = (i: number) => {
        return commands[i];
    };

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (error) {
            timeout = setTimeout(() => {
                setError(false);
            }, 500);
        }

        return () => {
            clearTimeout(timeout);
        };
    }, [error]);

    const changeCommand = (newCommand: string, i: number) => {
        const newCommands = [...commands];
        newCommands[i] = newCommand;
        setCommands(newCommands);
    };

    const triggerError = () => {
        setError(true);
        setErrorMsg(
            "Comando no existente. Escriba 'help' para ver los comandos disponibles."
        );
    };

    return (
        <>
            <TerminalContext.Provider
                value={{
                    error,
                    errorMsg,
                    triggerError,
                    addCommand,
                    changeCommand,
                    repeatCommand,
                    clearCommands,
                    commands,
                }}
            >
                {children}
            </TerminalContext.Provider>
        </>
    );
};
