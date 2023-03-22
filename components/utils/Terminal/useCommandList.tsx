type CommandItem = {
    type: "text" | "action";
    content?: string;
    action?: (...args: any[]) => void;
    args?: string[];
    preventAdd?: boolean;
};

type CommandList = {
    [key: string]: CommandItem;
};

type CommandListFunction = (cheatsheets: any[], router: any) => CommandList;

const useCommandList: CommandListFunction = (cheatsheets, router) => {
    return {
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
        },
        help: {
            type: "text",
            content: "Comandos posibles: about, help, github, open, export",
        },
        github: {
            type: "action",
            action: () =>
                window.open(
                    "https://github.com/nachovigilante/cheatsheets",
                    "_blank"
                ),
        },
        open: {
            type: "action",
            action: (slug: string) => {
                router.push(`/cheatsheet/${slug}`);
            },
            args: ["slug"],
        },
        export: {
            type: "action",
            action: (slug: string) => {
                const anchor = document.createElement("a");
                anchor.href = `/download/${slug}.pdf`;
                anchor.download = `${slug}.pdf`;
                document.body.appendChild(anchor);
                anchor.click();
            },
            args: ["slug"],
        },
        clear: {
            type: "action",
            action: () => {
                // simulate a ctrl + l
                const event = new KeyboardEvent("keydown", {
                    ctrlKey: true,
                    key: "l",
                });
                document.dispatchEvent(event);
            },
            preventAdd: true,
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
        },
        pwd: {
            type: "text",
            content: "tic://cheatsheets/",
        },
    };
};

export default useCommandList;
