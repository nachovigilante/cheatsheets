type CommandItem = {
    type: "text" | "voidAction" | "action";
    content?: string;
    action?:
        | ((...args: any[]) => void)
        | ((...args: any[]) => string)
        | ((...args: any[]) => boolean);
    args?: string[];
    preventAdd?: boolean;
    man: string;
    usesFileNames?: boolean;
};

type CommandList = {
    [key: string]: CommandItem;
};

type CommandListFunction = (cheatsheets: any[], router: any) => CommandList;

const useCommandList: CommandListFunction = (cheatsheets, router) => {
    const commands: CommandList = {
        help: {
            type: "text",
            content: `
                <span>Comandos disponibles:</span>
                <br>
                <ul class="list-none">
                    <li>about</li>
                    <li>clear</li>
                    <li>code</li>
                    <li>export</li>
                    <li>github</li>
                    <li>help</li>
                    <li>ls</li>
                    <li>open</li>
                    <li>pwd</li>
                    <li>shutdown</li>
                </ul>
            `,
            man: `
                <span>help</span>
                <br>
                <span>
                    Muestra una lista de los comandos disponibles.
                </span>
            `,
        },
        about: {
            type: "text",
            content: `
                    <span>¿Qué es &lt;TIC Cheatsheets/&gt;?</span>
                    <br>
                    <span>
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
                    </span>`,
            man: `
                <span>about</span>
                <br>
                <span>
                    Muestra información sobre la web.
                </span>
            `,
        },
        github: {
            type: "voidAction",
            action: () =>
                window.open(
                    "https://github.com/nachovigilante/cheatsheets",
                    "_blank"
                ),
            man: `
                <span>github</span>
                <br>
                <span>
                    Abre el repositorio de la web en una nueva pestaña.
                </span>
            `,
        },
        open: {
            type: "voidAction",
            action: (slug: string, validFileNames: string[]) => {
                if (!validFileNames.includes(slug)) return false;

                const link = slug.split(".")[0];
                router.push(`/cheatsheet/${link}`);
                return true;
            },
            args: ["slug"],
            man: `
                <span>open [slug].md</span>
                <br>
                <span>
                    Abre el cheatsheet con el slug indicado.
                </span>
            `,
            usesFileNames: true,
        },
        export: {
            type: "voidAction",
            action: (slug: string, validFileNames: string[]) => {
                if (!validFileNames.includes(slug)) return false;

                const link = slug.split(".")[0];
                const anchor = document.createElement("a");
                anchor.href = `/download/${link}.pdf`;
                anchor.download = `${link}.pdf`;
                document.body.appendChild(anchor);
                anchor.click();
                return true;
            },
            args: ["slug"],
            man: `
                <span>export [slug]</span>
                <br>
                <span>
                    Descarga el cheatsheet con el slug indicado.
                </span>
            `,
            usesFileNames: true,
        },
        clear: {
            type: "voidAction",
            action: () => {
                // simulate a ctrl + l
                const event = new KeyboardEvent("keydown", {
                    ctrlKey: true,
                    key: "l",
                });
                document.dispatchEvent(event);
            },
            preventAdd: true,
            man: `
                <span>clear</span>
                <br>
                <span>
                    Limpia la terminal.
                </span>
            `,
        },
        ls: {
            type: "text",
            content: `
                <ul class="list-none">
                    ${
                        cheatsheets
                            .map((c) => `<li>${c.slug}.md</li>`)
                            .join("") || "No hay cheatsheets disponibles"
                    }
                </ul>
            `,
            man: `
                <span>ls</span>
                <br>
                <span>
                    Muestra una lista de los cheatsheets disponibles.
                </span>
            `,
        },
        pwd: {
            type: "text",
            content: "tic://cheatsheets/",
            man: `
                <span>pwd</span>
                <br>
                <span>
                    Muestra la ruta actual.
                </span>
            `,
        },
        code: {
            type: "voidAction",
            action: () => {
                window.open(
                    "https://vscode.dev/github/nachovigilante/cheatsheets",
                    "_blank"
                );
            },
            man: `
                <span>code</span>
                <br>
                <span>
                    Abre el repositorio de la web en VS Code.
                </span>
            `,
        },
        shutdown: {
            type: "voidAction",
            action: () => {
                window.open(
                    "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    "_blank"
                );
            },
            man: `
                <span>shutdown</span>
                <br>
                <span>
                    Apaga la terminal.
                </span>
            `,
        },
        man: {
            type: "action",
            action: (command: string) => {
                console.log("AAAAAAAA");
                const commandItemKey = Object.keys(commands).find(
                    (c) => c === command
                );
                const commandItem = commands[commandItemKey];
                if (commandItem) {
                    return commandItem.man;
                }
                return "No se ha encontrado el comando indicado.";
            },
            args: ["command"],
            man: `
                <span>man [command]</span>
                <br>
                <span>
                    Muestra la documentación del comando indicado.
                </span>
            `,
        },
    };

    return commands;
};

export default useCommandList;
