import { useEffect, useReducer, useState } from "react";

export type AutocompleteType = {
    hidden: string;
    visible: string;
};

type AutocompleteComponentType = {
    content: string;
    list: string[];
    padding?: string;
};

const autocompleteReducer = (
    state: AutocompleteType,
    action: { type: string; payload: { content: string; length: number } }
) => {
    switch (action.type) {
        case "SET":
            const { content, length } = action.payload;
            const hidden = content.slice(0, length);
            const visible = content.slice(length);
            return { hidden, visible };
        case "CLEAR":
            return { hidden: "", visible: "" };
        default:
            return state;
    }
};

export const AutocompleteCommand = ({
    content,
    list,
    padding,
}: AutocompleteComponentType) => {
    const [autocompleteValue, setAutocompleteValue] = useReducer(
        autocompleteReducer,
        {
            hidden: "",
            visible: "",
        }
    );

    useEffect(() => {
        if (content === "")
            return setAutocompleteValue({
                type: "CLEAR",
                payload: { content: "", length: 0 },
            });

        const command = list.find((c) => c.startsWith(content));

        if (command) {
            setAutocompleteValue({
                type: "SET",
                payload: { content: command, length: content.length },
            });
        } else {
            setAutocompleteValue({
                type: "CLEAR",
                payload: { content: "", length: 0 },
            });
        }
    }, [content]);

    return (
        <>
            <span className="relative text-transparent">
                {padding}
                {autocompleteValue.hidden}
            </span>
            <span className="absolute text-white/40">
                {autocompleteValue.visible}
            </span>
        </>
    );
};

export const AutocompleteFile = ({
    list,
    content,
}: {
    list: string[];
    content: string;
}) => {
    const [fileName, setFileName] = useState("");
    const [padding, setPadding] = useState("");

    useEffect(() => {
        const command = content.split(" ");
        // console.log(file);
        setFileName(command[1] || "");
        setPadding(command[0] + " ");
    }, [content]);

    return (
        <AutocompleteCommand content={fileName} list={list} padding={padding} />
    );
};
