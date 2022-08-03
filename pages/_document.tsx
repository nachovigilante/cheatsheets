import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
    return (
        <Html lang="en">
            <Head>
                <link rel="manifest" href="/manifest.json" />
                <link rel="shortcut icon" href="/favicon.ico" />
                <meta name="theme-color" content="#0c043f" />
                <link rel="apple touch icon" href="/icons/icon-192x192.png" />
                <meta charSet="utf-8" />
                <meta
                    name="description"
                    content="Una colección de cheatsheets de distintos lenguajes de programación y herramientas, principalmente pensada para alumnos de TIC ORT."
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
};

export default Document;
