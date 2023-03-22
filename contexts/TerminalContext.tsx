import {
    createContext,
    useState,
    Dispatch,
    SetStateAction,
    useEffect,
} from "react";

type TerminalContextType = {
    error: boolean;
    triggerError: () => void;
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

    const addCommand = () => {
        setCommands([...commands, ""]);
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
    };

    return (
        <>
            <TerminalContext.Provider
                value={{
                    error,
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
