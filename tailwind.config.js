/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./styles/**/*.{js,ts,jsx,tsx,scss,css}",
    ],
    theme: {
        screens: {
            sm: "500px",
            md: "800px",
            lg: "1000px",
            xl: "1250px",
            "2xl": "1450px",
            "3xl": "1900px",
        },
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
                doc: "#e2e2e2",
                "dark-doc": "#170c60",
                "doc-link": "#3c3cff",
                "dark-doc-link": "#e61366",
                "doc-font": "#282828",
                "dark-doc-font": "#e2e2e2",
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
            keyframes: {
                shake: {
                    "0%": {
                        transform: "translateX(0)",
                    },
                    "50%": {
                        transform: "translateX(10px)",
                    },
                    "100%": {
                        transform: "translateX(0)",
                    },
                },
            },
            animation: {
                shake: "shake 0.2s ease-in-out infinite",
            },
        },
    },
    plugins: [],
};
