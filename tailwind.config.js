/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./styles/**/*.{js,ts,jsx,tsx,scss,css}",
    ],
    theme: {
        fontFamily: {
            mono: ["Fira Code", "monospace"],
            space: ["Space Mono", "monospace"],
            raleway: ["Raleway", "sans-serif"],
        },
        extend: {
            borderWidth: {
                1: "1px",
                3: "3px",
            },
            borderRadius: {
                default: "15px",
            },
            colors: {
                accent: "#e61366",
                "accent-hover": "#be1559",
                "accent-active": "#a20f4e",
            },
            boxShadow: {
                default: "0px 0px 15px 0px rgba(0, 0, 0, 0.3)",
            },
            dropShadow: {
                default: "0px 0px 10px rgba(0, 0, 0, 0.3)",
                notebook: "2px 2px 10px rgba(0, 0, 0, 0.8)",
            },
            backgroundImage: {
                main: "url('/assets/images/bg.svg')",
                github: "url('/assets/icons/GitHubLogo.png')",
            },
            backgroundSize: {
                200: "200%",
            },
        },
    },
    plugins: [],
};
